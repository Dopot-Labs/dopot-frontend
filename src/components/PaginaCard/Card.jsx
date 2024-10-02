"";
import React, { useEffect } from "react";
import { useState } from "react";
import IconInfoCard from "../../components/PaginaCard/IconInfoCard";
import IconInfoDai from "../../components/PaginaCard/IconInfoDai";
// import { CircularProgressbar } from "react-circular-progressbar";
import { Line } from "rc-progress";
import Flag from "react-world-flags";
import { addFavorites, postpone } from "../../utils/firebase/writeInfos";
import { useTranslation } from "../../i18n/client";
import {
  getWithdrawalFees,
  getPWithSigner,
} from "../../utils/firebase/writeInfos";
const { ethers } = require("ethers");
import { useRouter } from "next/router"; // Import useRouter
import { retriveFavorites } from "@/utils/firebase/retriveInfo";
import { getFileFromIPFS } from "@/utils/firebase/ipfs-db";

const Card = (props) => {
  const { t } = useTranslation();
  const { progetto, loadFees } = props;
  const percentage = (progetto.funds / progetto.quota) * 100;
  const fundRaisingDeadline = progetto.fundRaisingDeadline;
  const isMyProject = props.isMyProject;
  const { address } = progetto;
  const [toggleHeart, setToggleHeart] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const router = useRouter(); // Initialize useRouter

  //if(progetto?.funds == 0 && )
  useEffect( () => {
    async function fetchFavs(){

      let favs = await retriveFavorites()
      setToggleHeart(
        favs.includes(address) ?
        true:
        false
      );
    }
    fetchFavs()
    
  }, [trigger]);

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

  const [fees, setFees] = useState(null);

  const handleHeartClick = () => {
    addFavorites(address)
    setTrigger((prev) => prev + 1); // Trigger a re-render
  };

  useEffect(() => {
    // Define an async function to retrieve the value
    const fetchFees = async () => {
      try {
        const result = await getWithdrawalFees(await getPWithSigner(address));
        setFees(ethers.utils.formatUnits(result.toString(), 18));
      } catch (error) {
        console.error("Error fetching fees:", error);
        setFees(0);
      }
    };
    if (loadFees) fetchFees();
  }, []);

  function handleRedirect(e) {
    router.push(`/Card/${address}`);
    window.scrollTo(0, -1000000);
  }
  let desc = String(progetto.descProgetto);
  return (
    <div className="profile-box-dash">
      <div
        className="pmg-right-card"
       
      >
        <div className="pmg-rc-left-card" style={{ width: "100%" }}>
          <div>
            {progetto.totalStaked !== "0" && (
              <div style={{ marginBottom: "1rem" }} className="settore">
                <span className="box-bk-over-logo">
                  {progetto.totalStaked} DPT staked
                </span>
              </div>
            )}
            {/* <div className="settore">
              { <span className="box-bk-over-logo">{props.progetto.settore}</span> }
            </div> */}
            <div
              style={{ marginBottom: "1rem" }}
              className="settore card-header"
            >
              <span className="box-bk-over-logo">{progetto.tipoCampagna}</span>
              <div>
                {isMyProject ? (
                  <div className="menu-nav">
                    <div className="dropdown-container d-flex " tabindex="-1">
                      <div className="three-dots "></div>
                      <div className="dropdown">
                        <a onClick={() => props.withdraw(address)}>
                          <div>Withdraw funds {fees} DPT)</div>
                        </a>
                        <a onClick={() => postpone(address)}>
                          <div>Postpone the deadline</div>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={
                     handleHeartClick
                    }
                    // className="grd-btn dopot-btn-lg"
                    style={{
                      background: "none",
                      margin: "0",
                    }}
                  >
                    {toggleHeart ? (
                      <img src={"/assets/img/cuore-dis.svg"} />
                    ) : (
                      <img src={"/assets/img/cuore-able.svg"} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div onClick={handleRedirect} className="box-card-logo">
            <div
              className="logo"
              style={{
                backgroundImage: imageSrc ? `url(${imageSrc})` : 'none',
              }}
            ></div>
          </div>
          <h3 onClick={handleRedirect} className="nome-azienda">
            {progetto.nomeAzienda}
          </h3>
          <h3 className="link-azienda">
            <span>
              <a
                className="link-social-new"
                href={props.progetto.sito}
                target="_blank"
              >
                {progetto.sito}
              </a>
            </span>
          </h3>

          <input
            type="checkbox"
            className="read-more-state"
            id="post-{props.progetto.nomeAzienda}"
          />
          <p className="read-more-target ">{desc}</p>

          {desc.length > 200 ? (
            <label
              for="post-{props.progetto.nomeAzienda}"
              className="read-more-trigger"
            ></label>
          ) : null}
        </div>

        <div className="pmg-rc-right">
          <div className="pc-hero-icon-grid">
            <IconInfoDai
              text={progetto.funds}
              text2={`${t("of")} ${progetto.quota}`}
            />
            <IconInfoCard
              text={`${progetto.investorsNumber || 0}`}
              text2={`Investors`}
            />
            {
              <IconInfoCard
                text={
                  isMyProject ? progetto.stateText : `${fundRaisingDeadline}`
                }
                text2={`Remaining`}
              />
            }
          </div>
          <div className="pmg-btn-box">
            {/* <button onClick={handleRedirect} className="grd-btn dopot-btn-lg">
              {t("findoutmore")}
            </button> */}
            <div>Country</div>
            <div style={{ bottom: 0, right: 0 }}>
              <Flag code={progetto.nazioneAzienda} height="20" />
            </div>
          </div>
          <div className="pc-70-box">
            <div className="percent-box">
              <p>Investment Progress</p>
              <p>{`${Math.round(percentage)}%`}</p>
            </div>
            <div className="graph-box">
              {/* <CircularProgressbar
                value={percentage}
                text={`${Math.round(percentage)}%`}
                strokeWidth={15}
              /> */}
              <Line
                percent={percentage}
                strokeWidth={4}
                trailWidth={4}
                strokeColor="#E85556"
                trailColor="#D9D9D9"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
