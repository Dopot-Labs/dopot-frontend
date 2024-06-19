"use client"
import WeaveDB from "weavedb-sdk"
import { get, set } from 'idb-keyval';
import { Buffer } from "buffer"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addressDpt from '../../abi/dpt/address.js';
import { PushAPI } from '@pushprotocol/restapi';
import { getRecoil  } from 'recoil-nexus';
import { providerState } from "../../recoilState";

const contractTxId = "NkYdataKkg9KYtjbopSyjqeFTfBGEa6h66zHSdB33W8";
export let db, pushUser;

async function addDptToken() {
  const tokenSymbol = 'DPT';
  const tokenDecimals = 18;
  const tokenImage = 'ipfs://QmQTcCgeYoN5wZFjngaMq22QxYEdL5rWZYtZmskG766WCg/dpttokenlogo.png';
  try {
      await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
          type: 'ERC20',
          options: {
              address: addressDpt,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage,
          },
          },
      });
  } catch (error) {
  console.log(error);
  }
}

export async function init ()  {
  try{
    window.Buffer = Buffer
    if(!db){
      db = new WeaveDB({ contractTxId });
      await db.init();
    }
    const signer = await getRecoil(providerState).getSigner();
    if(!pushUser){
      pushUser = await PushAPI.initialize(signer, {
        env: 'prod',
      });
      console.dir(pushUser)
    }
  } catch (e) { console.log(e)}
  
}

export async function getIdentity(t){
  try{
    const storedIdentity = await get("weavedb-identity");
    if(!storedIdentity){
      toast.info(t("sign"));
      console.dir(db);
      let { identity } = await db.createTempAddress();
      await set("weavedb-identity", identity);
      await addDptToken();
      return identity;
    } else return storedIdentity;
  } catch (e){
    console.log(e)
  }
  
}