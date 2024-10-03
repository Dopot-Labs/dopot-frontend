""
import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState, providerState } from '../../recoilState.js';
import { db, getIdentity, init } from './firebaseInit.jsx';
import addressProjectFactory from '../../abi/projectFactory/address.js';
import addressFundingToken from '../../abi/fundingToken/address.js';
import addressDopotReward from '../../abi/dopotReward/address.js';
import { useTranslation } from "../../i18n/client.js";
import Web3 from 'web3'
import { getAllProjects, openIndexedDB, getData, getFileFromIPFS } from './ipfs-db.jsx';
const { ethers, Contract } = require("ethers");
const abiProject = require('../../abi/project/1.json');
const abiProjectFactory = require('../../abi/projectFactory/1.json');
const abiFundingToken = require('../../abi/fundingToken/1.json');
const abiDopotReward = require('../../abi/dopotReward/1.json');
let investorsLenght;
const chainId = /*'0x7a69'*/ '0xa4b1'
const jsonRPC = /*"http://192.168.1.63:8545"*/ "https://arb1.arbitrum.io/rpc"

export const pushLink = /*"https://staging.push.org"*/ "https://app.push.org"
export const pushEnv = "prod";

export async function getProvider() {
    if (!window.ethereum) return;
    let signer;
    try {
        if (typeof window !== "undefined") {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId }],
            });
        }
    } catch (switchError) {
        if (switchError.code === 4902 && typeof window !== "undefined") {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: chainId,
                        // rpcUrls: ["https://arbitrum-mainnet.infura.io/v3/cdb16b02bd2d4b5e8e402a07d9bc2bb5"],
                        rpcUrls: [jsonRPC],
                        chainName: "Arbitrum One",
                        nativeCurrency: {
                            name: "ETH",
                            symbol: "ETH",
                            decimals: 18
                        },
                        blockExplorerUrls: ["https://arbiscan.io"]
                    }]
                });
            } catch (addError) {
                // handle "add" error
                console.log(addError)
            }
        }
    }
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", [])
        signer = provider.getSigner();
        setRecoil(providerState, provider);
    } catch (e) { console.log(e) }
    return await signer.getAddress();
}

export async function getAddr(setState, dontAutoConnect, t) {
    let address;
    if (dontAutoConnect) { //Just get stored address
        const provider = getRecoil(providerState);
        if (provider) {
            let signer = await provider.getSigner();
            address = await signer.getAddress();
            setRecoil(addressState, address)
            setState(address.toString().substring(0, 7) + "...")
        } else {
            setState("Connect Wallet")
        }

    } else { //Web3 connect
        address = await getProvider();
        setRecoil(addressState, address)
        setState(address.toString().substring(0, 7) + "...")
        //await init();
        //await getIdentity(t);
    }
}

export async function getInvestors(projdb, dopotReward) {
    try {
        const web3 = new Web3("https://arb1.arbitrum.io/rpc");
        const instance = new web3.eth.Contract(abiProjectFactory, addressProjectFactory);

        // Ensure projdb.investors is initialized
        if (!projdb.investors) {
            projdb.investors = {};
        }

        // Retrieve past 'ProjectInvested' events for the specific project
        const events = await instance.getPastEvents('ProjectInvested', {
            filter: { projectAddress: projdb.address },
            fromBlock: 0, // Adjust starting block based on when your contract was deployed
            toBlock: 'latest'
        });

        let counter = 0;
        let projectAddress = null;
        const uniqueInvestors = new Set();  // Use a Set to track unique investor addresses

        // Loop through events asynchronously
        for (const event of events) {
            const investor = event.returnValues.investor;
            projectAddress = event.returnValues.project;
            const tokenId = event.returnValues.tokenId;

            // Ensure the event is for the correct project
            if (projectAddress !== projdb.address) {
                continue;
            }

            try {
                // Fetch the reward balance for the investor
                const rewardBalanceBN = await dopotReward.balanceOf(investor, tokenId);
                const rewardBalance = rewardBalanceBN ? rewardBalanceBN.toNumber() : 0;

                console.log("🚀 ~ rewardBalance:", rewardBalance);

                // If the reward balance is valid and project matches, add investor
                if (rewardBalance > 0) {
                    if (!projdb.investors[investor]) {
                        projdb.investors[investor] = {};
                    }
                    // Assign the tokenId and reward balance to the investor
                    projdb.investors[investor][tokenId] = rewardBalance;

                    // Add the investor to the unique investors set
                    uniqueInvestors.add(investor);
                }
            } catch (error) {
                console.error("🚀 ~ Error retrieving balance for investor:", error);
            }
        }

        // Update the counter based on unique investor addresses
        projdb.investorsNumber = uniqueInvestors.size;

        console.log("🚀 ~ Total unique investors count:", uniqueInvestors.size);

    } catch (error) {
        console.error("🚀 ~ Error retrieving events:", error);
    }
}



export async function getProjectFunds(addressProject) {
    const address = await getProvider()
    const provider = getRecoil(providerState);
    const dai = new ethers.Contract(addressFundingToken, abiFundingToken, provider);
    return await dai.balanceOf(addressProject);
}

export async function getInsuranceFunds() {
    const address = await getProvider()
    const provider = getRecoil(providerState);
    
    const dai = new ethers.Contract(addressFundingToken, abiFundingToken, provider);
    return await dai.balanceOf(addressProjectFactory);

    
}



export async function downloadProjects(t) {
    // console.log('inside here----')
    const web3 = new Web3("https://arbitrum.drpc.org")
    const address = await getProvider()
    setRecoil(addressState, address)
    
    try {
        const dopotReward = new Contract(addressDopotReward, abiDopotReward, getRecoil(providerState));
        // console.log("🚀 ~ downloadProjects ~ dopotReward:", dopotReward)
        let projects = await getAllProjects(dopotReward) //await db.get("projects"/*, identity*/);

        
        return projects
        
    } catch (e) { console.log(e, '-----') }
    
}

// export async function downloadProject(address) {
//     await getProvider()
//     const progetto = await db.get("projects", ["address"], ["address", "==", address])
//     console.dir(progetto)
//     return progetto
// }

export async function getNftImage(tokenId) {
    const address = await getProvider()
    const provider = await getRecoil(providerState)
    const dopotReward = new Contract(addressDopotReward, abiDopotReward, provider);
    const result = await dopotReward.uri(tokenId);
    const response = await  getFileFromIPFS(result)//fetch(result.replace("ar://", "https://arweave.net/"));
    const data = await response.json();
    return { image: data.image, addressDopotReward };
}

export async function retriveInvestment(t) {
    let address = await getProvider()
    const provider = await getRecoil(providerState)
    
    const dopotReward = new Contract(addressDopotReward, abiDopotReward, provider);
    let projects = await downloadProjects(t)
    console.dir(projects)
    let progettiInvested = [];
    for (const project of projects) {
        progettiInvested.push(await dopotReward.uri(project.investors[address][0] - 1))
    }
    console.dir(progettiInvested);

    return progettiInvested
}

//modified to store favorites in local-db instead of writing it on remote db.
export async function retriveFavorites() {
    try {
        // Get the user's address
        const address = await getProvider();
        console.log("address",address)
        // Open the IndexedDB database
        const db = await openIndexedDB();
        
        // Start a transaction to read from the cache
        const transaction = db.transaction(["cache"], "readonly");
        const store = transaction.objectStore("cache");
        
        // Get the cache entry for the user's address
        const cacheEntry = await new Promise((resolve, reject) => {
            const request = store.get(address);
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    
        if (cacheEntry && cacheEntry.favorites) {
            return cacheEntry.favorites;
        } else {
            // If no cache entry exists or there are no favorites, return an empty array
            return [];
        }
        // If the cache entry exists, return the favorites array
        
    } catch (error) {
        console.error("Error retrieving favorites:", error);
        throw error;
    }
}


export async function retriveProjectStakes(projectAddress) {
    const address = await getProvider()
    //await init()
    let addressLogged = getRecoil(addressState)
    try{
        const user = await getData("users", addressLogged) //db.get("users", ["addressUser"], ["addressUser", "==", addressLogged?.toString().toLowerCase()]);
        return (user.projectStakes ? user.projectStakes : [])

    }catch (error) {
        console.error("Error retrieving Stakes:", error);
        return []
    }
}

export function RetriveProjectTypes(tipoKey) {
    const { t } = useTranslation();
    const types = {
        tipo1: t("socialcare"),
        tipo2: t("healthcare"),
        tipo3: t("socialhealthass"),
        tipo4: t("educationtraining"),
        tipo5: t("environmental"),
        tipo6: t("enhancementcultural"),
        tipo7: t("socialtourism"),
        tipo8: t("universitypost"),
        tipo9: t("extracurricular"),
        tipo10: t("socialenterprises"),
        tipo11: t("blockchainfinance"),
        tipo12: t("blockchaininsurance"),
        tipo13: t("blockchainpaydigital"),
        tipo14: t("blockchainagrifood"),
        tipo15: t("blockchain4.0"),
        tipo16: t("blockchainiot"),
        tipo17: t("blockchainhealthcare"),
        tipo19: t("blockchainretail"),
        tipo20: t("blockchainmusic"),
        tipo21: t("blockchainsmartenergy"),
        tipo22: t("blockchainunbanked"),
        tipo23: t("cryptostartup"),
        tipo24: t("decentralizedstartup"),
        tipo25: t("decentralizedproject"),
        tipo26: t("foodstartup"),
        tipo27: t("fashionstartup"),
        tipo28: t("wearstartup"),
        tipo29: t("travelstartup"),
        tipo30: t("bigdata"),
        tipo31: t("biotechnology"),
        tipo32: t("ecosustainability"),
        tipo33: t("engineering"),
        tipo34: t("mobile"),
        tipo35: t("modelling"),
        tipo36: t("research"),
        tipo37: t("software"),
        tipo38: t("power"),
        tipo39: t("artificialintelligence"),
        tipo40: t("science"),
        tipo41: t("work"),
        tipo42: t("telecommunications"),
        tipo43: t("robot"),
        tipo44: t("pharmaceutical"),
        tipo45: t("foodandwater"),
        tipo46: t("education"),
        tipo47: t("humanlife"),
        tipo48: t("publicadministration"),
        tipo49: t("augmentedreality"),
        tipo50: t("programming"),
        tipo51: t("showbusiness"),
        tipo52: t("automation"),
        tipo53: t("tech"),
        tipo54: t("emergingcountries"),
        tipo55: t("businesssoftware"),
        tipo57: t("manufacturing"),
        tipo58: t("games"),
        tipo59: t("music"),
        tipo60: t("realestate"),
        tipo61: t("investment"),
        tipo62: t("educationaltechnology"),
        tipo63: t("ionnovation"),
        tipo64: t("credit"),
        tipo65: t("insurance"),
        tipo66: t("agriculturaltecno"),
        tipo67: t("aerospace"),
        tipo68: t("hitech"),
    };
    return types[tipoKey];
}