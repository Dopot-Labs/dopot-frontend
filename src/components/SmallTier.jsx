""
import React, { useEffect, useState } from "react";
import BlogImg from "../../../public/assets/img/void.jpg";
import ProfileCardLeft from "./Profile/ProfileCardLeft";
import { progettiState, progettiImageState} from "../recoilState";
import { getRecoil, setRecoil } from 'recoil-nexus';


import { getFileFromIPFS } from "@/utils/firebase/ipfs-db";
const SmallTier = (props) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const fileBlob = await getFileFromIPFS(progetto.logoAziendaListFiles[0]);
        // Convert Blob to a URL that can be used as an image source
        const imageUrl = URL.createObjectURL(fileBlob);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching image from IPFS:', error);
      }
    }

    fetchImage();
  }, [progetto.logoAziendaListFiles]);

  var progetto=getRecoil(progettiState).find(x => x.address === props.address);
  console.dir(props.tier)
  return (
    <ProfileCardLeft img={imageSrc ? `url(${imageSrc})` : 'none'} price={"DAI " + progetto["price"+props.tier]}>
    <h4> {progetto["name"+props.tier]}</h4>
      <p>
       {progetto["specs"+props.tier]}
      </p>
      <br />
      <p>{progetto.imageNftDefListFiles[props.tier-1]["currentSupply"]}/{progetto["supply" + props.tier]} supply</p>

    </ProfileCardLeft>
  );
};

export default SmallTier;
