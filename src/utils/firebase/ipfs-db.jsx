import { db } from "@/firebase";
import { doc, getDoc, getDocs, setDoc, updateDoc, collection } from "firebase/firestore";
import { getInvestors, getProjectFunds } from "./retriveInfo";
import { getRecoil, setRecoil } from 'recoil-nexus';
import { providerState } from '../../recoilState.js';
const abiProject = require('../../abi/project/1.json');
const { ethers, Contract } = require("ethers");

async function getCidFromFirestore(type, id) {
    try {
        // Use the modular syntax for Firestore
        const docRef = doc(collection(db, 'dopot', 'main', type), id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().ipfs; // Return the CID from Firestore
        } else {
            throw new Error('Document not found in Firestore');
        }
    } catch (error) {
        console.error("Error fetching CID from Firestore: ", error);
        throw error;
    }
}


async function getFromCache(cid) {
    const db = await openIndexedDB();
    const transaction = db.transaction(["cache"], "readonly");
    const store = transaction.objectStore("cache");

    // Wrap the get request in a promise to handle the asynchronous nature
    const cachedData = await new Promise((resolve, reject) => {
        const request = store.get(cid);
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
    });

    if (cachedData) {
        const cachedTimestamp = cachedData.timestamp;

        const isCacheValid = (Date.now() - cachedTimestamp) < 5 * 60 * 1000; // 5 minutes


        // Check if the cached data is still valid (i.e., within the 5-minute window)
        if (isCacheValid) {
            return cachedData.data; // Return cached data if valid
        }
    }

    // Return null if cache is invalid or expired
    return null;
}

// Open the IndexedDB
export async function openIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("IPFSCacheDB", 1);
        request.onupgradeneeded = function () {
            const db = request.result;
            if (!db.objectStoreNames.contains("cache")) {
                db.createObjectStore("cache");
            }
        };
        request.onsuccess = function () {
            resolve(request.result);
        };
        request.onerror = function () {
            reject("Error opening IndexedDB");
        };
    });
}
// Fetch JSON from IPFS using the CID
async function fetchFromIPFS(cid) {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN}`);
    if (!response.ok) {
        throw new Error('Failed to fetch JSON from IPFS');
    }
    return await response.json();
}

// Save JSON data to IndexedDB cache
async function saveToCache(cid, jsonData) {
    const db = await openIndexedDB();
    const transaction = db.transaction(["cache"], "readwrite");
    const store = transaction.objectStore("cache");

    // Create a cache entry with the current timestamp
    const cacheEntry = {
        cid: cid,
        data: jsonData,
        timestamp: Date.now() // Store the current time
    };

    store.put(cacheEntry, cid); // Store data by CID
}

async function uploadJsonToPinata(jsonData) {
    const formData = new FormData();
    // Convert JSON data into a blob to upload via Pinata
    const blob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });
    formData.append("file", blob);

    // Upload to Pinata
    const resFile = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        body: formData,
        headers: {
            'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
        },
    });

    if (!resFile.ok) {
        throw new Error('Failed to upload JSON to IPFS via Pinata');
    }

    const data = await resFile.json();
    // Return the IPFS hash (CID) of the uploaded file
    return data.IpfsHash;
}
async function updateCidInFirestore(type, id, newCid) {
    try {
        // Use the modular syntax to get the document reference
        const docRef = doc(collection(db, 'dopot', 'main', type), id);

        // Use updateDoc to update the document
        await updateDoc(docRef, {
            ipfs: newCid // Update the CID in Firestore
        });

        console.log('Document updated successfully');
    } catch (error) {
        console.error("Error updating CID in Firestore: ", error);
        throw error;
    }
}

async function removeFromCache(cid) {
    const db = await openIndexedDB();
    const transaction = db.transaction(['cache'], 'readwrite');
    const store = transaction.objectStore('cache');
    await store.delete(cid); // Remove the old cache entry by its CID
}

async function refreshCacheWithNewJson(cid, jsonData) {
    await saveToCache(cid, jsonData); // Save new JSON to IndexedDB cache
}

async function unpinOldCidFromPinata(oldCid) {
    const res = await fetch(`https://api.pinata.cloud/pinning/unpin/${oldCid}`, {
        method: 'DELETE',
        headers: {
            'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
        }
    });

    if (!res.ok) {
        throw new Error('Failed to unpin old CID from Pinata');
    }

    console.log(`Successfully unpinned CID: ${oldCid}`);
}

// Get JSON data from Firestore, Cache, or IPFS
export async function getData(type, id) {
    try {
        // Step 1: Get CID from Firestore
        const cid = await getCidFromFirestore(type, id);

        // Step 2: Check for cached data in IndexedDB
        const cachedData = await getFromCache(cid);
        if (cachedData) {
            console.log('Returning data from cache');
            return cachedData; // Return cached data
        }

        // Step 3: If no valid cache, fetch from IPFS
        const jsonData = await fetchFromIPFS(cid);

        // Step 4: Cache the fetched data in IndexedDB
        await saveToCache(cid, jsonData);

        console.log('Returning fresh data from IPFS');
        return jsonData; // Return the fresh data

    } catch (error) {
        if (error.message === 'Document not found in Firestore') {
            return null; // Document does not exist, proceed with creating a new one
        } else {
            console.error("Error fetching data: ", error);
            throw error; // Handle the error
        }
       
    }
}

async function createNewDocInFirestore(type, id, newCid) {
    try {
        const docRef = doc(collection(db, 'dopot', 'main', type), id);
        await setDoc(docRef, { ipfs: newCid }); // Create new document with CID
        console.log('Document created successfully');
    } catch (error) {
        console.error("Error creating new document in Firestore: ", error);
        throw error;
    }
}


export async function writeData(type, id, jsonData) {
    try {
        let oldCid = null;
        let isExistingDoc = false;

        // Step 1: Check if the document exists in Firestore
        try {
            oldCid = await getCidFromFirestore(type, id);
            isExistingDoc = true; // If no error is thrown, the document exists
        } catch (error) {
            if (error.message === 'Document not found in Firestore') {
                isExistingDoc = false; // Document does not exist, proceed with creating a new one
            } else {
                throw error; // Re-throw any other errors
            }
        }

        // Step 2: Upload the JSON file to IPFS via Pinata
        const newCid = await uploadJsonToPinata(jsonData);

        if (isExistingDoc) {
            // Step 3a: If the document exists, update the CID in Firestore
            await updateCidInFirestore(type, id, newCid);
        } else {
            // Step 3b: If the document does not exist, create a new document in Firestore
            await createNewDocInFirestore(type, id, newCid);
        }

        // Step 4: Refresh the cache with the new JSON and CID
        await refreshCacheWithNewJson(newCid, jsonData);

        // Step 5: If the document exists, unpin the old CID from Pinata
        if (isExistingDoc && oldCid) {
            await unpinOldCidFromPinata(oldCid);
            await removeFromCache(oldCid); // Remove old file from cache
        }

        console.log('JSON file successfully updated or created, cache refreshed, old CID unpinned if needed');
        return newCid; // Return the new CID

    } catch (error) {
        console.error("Error updating or creating JSON file: ", error);
        throw error;
    }
}


//HELPERS----------------------
async function getAllProjectDocumentNames() {
    try {
        // Reference the "projects" collection under /dopot/main
        const projectsCollectionRef = collection(db, 'dopot', 'main', 'projects');

        // Fetch all documents in the collection
        const querySnapshot = await getDocs(projectsCollectionRef);

        // Extract document IDs from the querySnapshot
        const projectNames = querySnapshot.docs.map(doc => doc.id);

        console.log('Project document names:', projectNames);
        return projectNames; // Return the list of document names
    } catch (error) {
        console.error("Error fetching project document names: ", error);
        throw error;
    }
}

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000

export async function getAllProjects(dopotReward) {
    try {
        const db = await openIndexedDB(); // Open IndexedDB
        const transaction = db.transaction(['cache'], 'readonly');
        const store = transaction.objectStore('cache');
      


        // Wrap the get request in a promise to handle the asynchronous nature
        const cachedData = await new Promise((resolve, reject) => {
            const request = store.get('allProjects');
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });

        if (cachedData) {
            const cachedTimestamp = cachedData.timestamp;

            const isCacheValid = (Date.now() - cachedTimestamp) < CACHE_EXPIRATION_TIME; // 5 minutes


            // Check if the cached data is still valid (i.e., within the 5-minute window)
            if (isCacheValid) {
                console.log('Returning cached projects');
                return cachedData.data; // Return cached data if valid
            }
        }



        // If cache is not valid or missing, fetch fresh data from Firestore
        console.log('Fetching projects from Firestore...');
        let projects_array = [];
        let project_addresses = await getAllProjectDocumentNames();

        // Collect all promises to get project data
        let projectPromises = project_addresses.map(async (project_address) => {
            return await getData('projects', project_address);
        });

        // Wait for all promises to resolve
        projects_array = await Promise.all(projectPromises);




        for (let projdb of projects_array) {
            //const instance = new web3.eth.Contract(abiProject, projdb.address)
            if (!projdb.address) continue;
            const project = new Contract(projdb.address, abiProject, getRecoil(providerState));
            // const tiersLenghts = 3
            const tiersLenghts = await project.getTiersLength();

            for (let t = 0; t < tiersLenghts; t++) {
                try {
                    // projdb.imageNftDefListFiles[t].currentSupply = 2
                    projdb.imageNftDefListFiles[t].currentSupply = 0
                    // projdb.imageNftDefListFiles[t].currentSupply = (await dopotReward.currentSupplyByProjectAndURI(projdb.address, projdb.imageNftDefListFiles[t]?.uri)).toNumber()

                } catch (error) {
                    console.log("🚀 ~ downloadProjects ~ error:--", error)
                }
            }

            projdb.investors = {};
            await getInvestors(projdb, dopotReward);
            console.log("🚀 ~ downloadProjects ~ projdb:-------object", Object.keys(projdb.investors))
            // projdb.investorsNumber = Object.keys(projdb.investors).length;
            console.log("🚀 ~ downloadProjects ~ projdb.investors:------2", projdb.investors)
            const projectFunds = Math.round(Number(ethers.utils.formatEther(await getProjectFunds(projdb.address))));
            projdb.funds = projectFunds || 0;
            const deadline = await project.fundRaisingDeadline();
            const now = new Date();
            const difference = deadline * 1000 - now;
            const seconds = Math.floor(difference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            projdb.fundRaisingDeadline = days;
            projdb.minInvestment = Math.min(...projdb.imageNftDefListFiles.map(item => parseInt(item.price)));
            projdb.state = await project.state();
            projdb.totalStaked = typeof project.totalStaked === 'function' ? (await project.totalStaked()).toString().replace(/\d{18}$/, '') : 0;

            if (days < 0 && projdb.state !== 0) projdb.state = 4;
            switch (projdb.state) {
                case 0:
                    projdb.stateText = "Pending Approval";
                    break;
                case 1:
                    projdb.stateText = "Rejected";
                    break;
                case 2:
                    projdb.stateText = "Ongoing";
                    break;
                case 3:
                    projdb.stateText = "Successful";
                    if (projdb.funds === 0) projdb.funds = projdb.quota;
                    break;
                case 4:
                    projdb.stateText = "Expired";
                    break;
                case 5:
                    projdb.stateText = "Cancelled";
                    break;
                default: break;
            }
        }


        // Cache the new data with a timestamp
        const cacheEntry = {
            data: projects_array,
            timestamp: Date.now(),
        };

        const writeTransaction = db.transaction(['cache'], 'readwrite');
        const writeStore = writeTransaction.objectStore('cache');
        await writeStore.put(cacheEntry, 'allProjects');

        console.log('Projects cached successfully');
        return projects_array;
    } catch (error) {
        console.error('Error fetching projects: ', error);
        throw error;
    }
}






