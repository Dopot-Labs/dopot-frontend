""
import { getPushUser, getIdentity, init, db } from "./firebaseInit.jsx"
import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState, providerState, progettiState } from '../../recoilState.js';
import { genproj, bundlrFund, bundlrAdd, contrattoProjectAddTier, initialiseBundlr, webIrys } from "../genproj.jsx"
import { getProvider, downloadProjects, pushEnv } from "./retriveInfo.jsx";
import addressFundingToken from '../../abi/fundingToken/address.js';
import addressDpt from '../../abi/dpt/address.js';
const abiProject = require('../../abi/project/1.json');
const abiFundingToken = require('../../abi/fundingToken/1.json');
const abiDpt = require('../../abi/dpt/1.json');
const { ethers } = require("ethers");
import Web3 from 'web3'
import { getData, openIndexedDB, uploadFileToPinata, writeData } from "./ipfs-db.jsx";

const pushChannelAddress = "0x63381e4b8fe26cb1f55cc38e8369990594e017b1";



async function optInNotifications() {
  const signer = getRecoil(providerState).getSigner();
  const address = await signer.getAddress();
  const pushUser = await getPushUser();
  const subscriptions = await pushUser.notification.subscriptions({ user: `eip155:42161:${address}`, pushEnv });
  console.dir(subscriptions)
  if (!subscriptions.some(r => r.channel === pushChannelAddress)) {
    const subscribeStatus = await pushUser.notification.subscribe(`eip155:42161:${pushChannelAddress}`);
    console.dir(subscribeStatus);
  }
}

async function pushChatSend(projectCreatorAddress, content) {
  const signer = getRecoil(providerState).getSigner();
  const pushUser = await getPushUser();
  const params = {
    content,
    type: 'Text',
    signer,
    //pgpPrivateKey: pgpDecryptedPvtKey,
    //env
  }
  const response = await pushUser.chat.send(`eip155:${projectCreatorAddress}`, params);
  console.dir(response);
}

export async function addproj(inputs, t) {
  try {
    const address = await getProvider();
    setRecoil(addressState, address);
    //!webIrys && await initialiseBundlr(getRecoil(providerState));

    let domanda = [];
    Object.keys(inputs).forEach(key => {
      if (key.startsWith("domanda")) {
        domanda.push(inputs[key]);
        delete inputs[key];
      }
    });

    inputs.domanda = domanda;
    inputs.addressCreator = address;

    console.log("Adding project");

    // try {
    //   await bundlrFund();
    // } catch (err) {
    //   console.error("Error funding Bundlr:", err);
    //   throw new Error("Failed to fund Bundlr. Please check your balance or network status.");
    // }

    try {
      inputs.address = await genproj(inputs);
    } catch (err) {
      console.error("Error generating project:", err);
      throw new Error("Failed to generate project. Please try again later.");
    }

    async function updateListFiles(listFiles) {
      try {
        const updatedElements = await Promise.all(
          listFiles.map(async (element) => {
            const  id  = await uploadFileToPinata(element)
            return id;
          })
        );
        console.log(updatedElements)
        return updatedElements;
      } catch (err) {
        console.error(`Error uploading files (${contentType}):`, err);
        throw new Error(`Failed to upload ${contentType} files. Please check the files and try again.`);
      }
    }

    let inputKeys = [
      { key: 'documentazioneListFiles' },
      { key: 'fotoProdotto1ListFiles'},
      { key: 'logoAziendaListFiles'},
    ];

    inputs.fotoProdotto2ListFiles && inputKeys.push({ key: 'fotoProdotto2ListFiles'});
    inputs.fotoProdotto3ListFiles && inputKeys.push({ key: 'fotoProdotto3ListFiles'});
    inputs.fotoProdotto4ListFiles && inputKeys.push({ key: 'fotoProdotto4ListFiles'});

    for (const input of inputKeys) {
      try {
        inputs[input.key] = await updateListFiles(inputs[input.key]);
      } catch (err) {
        console.error(`Error processing files for key: ${input.key}`, err);
        throw new Error(`Failed to process files for ${input.key}. Please verify the file type and try again.`);
      }
    }

    const inputsNoTiers = { ...inputs };
    inputsNoTiers.imageNftDefListFiles = [];

    try {
      const tiers = await contrattoProjectAddTier(inputs);
      inputsNoTiers.imageNftDefListFiles = tiers;
    } catch (err) {
      console.error("Error adding project tiers:", err);
      throw new Error("Failed to add project tiers. Please check your tiers configuration and try again.");
    }

    if (typeof inputsNoTiers.giorniCampagna === 'number') {
      inputsNoTiers.giorniCampagna = inputsNoTiers.giorniCampagna.toString();
    }

    try {
      const result = await writeData("projects", inputsNoTiers.address, inputsNoTiers);
    } catch (err) {
      console.error("Error writing project data to the database:", err);
      throw new Error("Failed to save project data. Please try again later.");
    }

    
    await optInNotifications();

    try {
      let projects = await downloadProjects(t);
    } catch (err) {
      console.error("Error downloading projects:", err);
      throw new Error("Failed to download projects. Please try again.");
    }

  } catch (e) {
    console.error("An error occurred in addproj:", e);
    throw new Error("Failed to add project. Please try again later.");
  }
}

//modified to store favorites in local-db instead of writing it on remote db.
export async function addFavorites(addressProject) {
  try {
      let address = await getProvider(); // Get the user's wallet address
      const db = await openIndexedDB(); // Open IndexedDB
      const transaction = db.transaction(["cache"], "readwrite"); // Create a read/write transaction
      const store = transaction.objectStore("cache"); // Access the "cache" object store

      // Retrieve the current cache entry for the user address
      let cacheEntry = await new Promise((resolve, reject) => {
          const request = store.get(address);
          request.onsuccess = () => resolve(request.result);
          request.onerror = (event) => reject(event.target.error);
      });

      // If cache entry doesn't exist, create a new one
      if (!cacheEntry) {
          cacheEntry = {
              address: address,
              favorites: [] // Initialize the favorites array if it doesn't exist
          };
      }

      // Ensure the favorites array exists in the cache entry
      const favorites = cacheEntry.favorites || [];

      // Check if the addressProject is in favorites
      const index = favorites.indexOf(addressProject);

      if (index === -1) {
          // If addressProject is not in favorites, add it
          favorites.push(addressProject);
      } else {
          // If addressProject is already in favorites, remove it
          favorites.splice(index, 1);
      }

      // Update the cache entry with the modified favorites array
      cacheEntry.favorites = favorites;

      // Store the updated entry back to the cache
      await new Promise((resolve, reject) => {
          const request = store.put(cacheEntry, address);
          request.onsuccess = () => resolve();
          request.onerror = (event) => reject(event.target.error);
      });

      console.log(`Updated favorites for address: ${address}`, cacheEntry.favorites);
  } catch (error) {
      console.error("Error updating favorites:", error);
      throw error;
  }
}




export async function addProjectStake(addressProject, amount) {
  let address = await getProvider();
  
  try {
    const newStake = { timestamp: new Date().getTime(), amount, address: addressProject }
    let result = await getData("users",address) //db.cget("users", ["addressUser"], ["addressUser", "==", address]);
    if (result === null) {
      const obj = { addressUser: address, addressProjects: [], shippingNft: {}, projectStakes: [newStake] };
      
      await writeData("users",address, obj)//db.set(obj, "users", address, identity)
    }
    else {
      let projectStakes = result.projectStakes;
      if (projectStakes) projectStakes.push(newStake);
      else result.projectStakes = [newStake];
      
      await writeData("users",address, result) //await db.update(result[0].data, "users", result[0].id, identity)
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addShippingDetailsNft(projectAddress, tokenId, shippingDetails, title) {
  const result = await getData("projects",projectAddress)
  await pushChatSend(result.addressCreator, `Project ${title}, Token Id ${tokenId}, Shipping Details ${shippingDetails}`)
}

export async function refundNft(project, tokenId, t) {
  console.log(project, tokenId);
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner();
  const pWithSigner = projectContract.connect(signer);

  try {
    const tx = await pWithSigner.refund(tokenId, {
      gasLimit: 1000000 // Adjust the gas limit as needed
    });
    await tx.wait(1);
    //setRecoil(progettiState, null);
    if (typeof window !== "undefined") window.location.href = "/";
  } catch (e) {
    console.error(e);
  }
}

async function allowDptPay(signer, projectContract, project, amount) {
  const address = await getProvider();
  if (await projectContract.dptAddressesSet()) {
    const infinite = /*amount ||*/ "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    const dptContract = new ethers.Contract(addressDpt, abiDpt, signer);
    const fWithSigner = dptContract.connect(signer);
    const allowance = await dptContract.allowance(address, project);
    if (allowance.lt(infinite)) {
      const tx = await fWithSigner.approve(project, infinite);
      await tx.wait(1);
    } else console.log("Skipping dpt allowance")
  } else console.log("Skipping dpt allowance")
}

export async function getPWithSigner(project) {
  const provider = getRecoil(providerState);
  const signer = provider.getSigner();
  const projectContract = new ethers.Contract(project, abiProject, provider);
  return projectContract.connect(signer);
}

export async function getWithdrawalFees(pWithSigner) {
  const fees = (await pWithSigner.getWithdrawalFee()).add((await pWithSigner.getStakingRewards()));
  console.log(fees.toString());
  return fees;
}

export async function withdraw(project) {
  const provider = getRecoil(providerState);
  const signer = provider.getSigner();
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const pWithSigner = projectContract.connect(signer);

  if (await pWithSigner.dptAddressesSet()) {
    const amount = await getWithdrawalFees(pWithSigner);
    await allowDptPay(signer, projectContract, project, amount);
  }
  try {
    await pWithSigner.withdraw(); // still asking me to pay way to much dpt
  } catch (e) {
    console.error(e);
  }
}

export async function stakeProject(project, amount, t) {
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  await allowDptPay(signer, projectContract, project, amount);
  try {
    const tx = await pWithSigner.stake(ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait(1);

    await addProjectStake(project, amount) 

  } catch (e) {
    console.error(e);
  }
}

export async function unstakeProject(project) {
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  try {
    const tx = await pWithSigner.unstake();

    await tx.wait(1);
    
  } catch (e) {
    console.error(e);
  }
}

export async function postpone(project) {
  const provider = getRecoil(providerState);
  await getProvider();
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  await allowDptPay(signer, projectContract, project);
  try {
    await pWithSigner.postponeDeadline();
  } catch (e) {
    console.error(e);
  }
}

export async function addInvestment(pAddress, numTier, price, title, t) {
  const amount = ethers.utils.parseEther(price);
  numTier--;
  try {
    const address = await getProvider();
    const provider = getRecoil(providerState);
    const signer = await provider.getSigner();
    const projectContract = new ethers.Contract(pAddress, abiProject, provider);
    const pWithSigner = projectContract.connect(signer);
    const fundingTokenContract = new ethers.Contract(addressFundingToken, abiFundingToken, provider);
    const fWithSigner = fundingTokenContract.connect(signer);
    const allowance = await fundingTokenContract.allowance(address, pAddress);
    if (!allowance.gte(price)) {
      const tx = await fWithSigner.approve(pAddress, amount, {
        gasLimit: 1000000 // Adjust the gas limit as needed
      });
      await tx.wait(1);
    }
    const tx = await pWithSigner.invest(numTier, {
      gasLimit: 1000000 // Adjust the gas limit as needed
    });
    await tx.wait(1);
    const shippingDetails = typeof window !== "undefined" ? window.prompt(t("shippingDetails")) : "";
    await addShippingDetailsNft(pAddress, title, shippingDetails, title);
    await optInNotifications();


    let projects = await downloadProjects(t);

  } catch (e) {
    console.error(e);
  }
}
