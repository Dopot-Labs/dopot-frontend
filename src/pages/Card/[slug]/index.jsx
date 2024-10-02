"";
import React, { useState, useEffect } from "react";
import IconInfoDai from "../../../components/PaginaCard/IconInfoDai";
import Header from "../../../components/Header.jsx";
import Link from "next/link";
import ImageIcon from "react";
import IconInfoCard from "../../../components/PaginaCard/IconInfoCard";
import InvestiCard from "../../../components/PaginaCard/InvestiCard";
import { CircularProgressbar } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import { progettiState } from "../../../recoilState";
import { getRecoil } from "recoil-nexus";
import TabCampagna from "../../../components/TabCampagna";
import TabRoadmap from "../../../components/TabRoadmap";
import TabFaq from "../../../components/TabFaq";
import TabSocial from "../../../components/TabSocial";
import TabQuestionario from "../../../components/TabQuestionario";
import TabDocumenti from "../../../components/TabDocumenti";
import { Line } from "rc-progress";
import { addFavorites } from "../../../utils/firebase/writeInfos";
import {
  downloadProjects,
  retriveFavorites,
  RetriveProjectTypes,
  retriveProjectStakes,
  getNftImage,
} from "../../../utils/firebase/retriveInfo";

import { useTranslation } from "../../../i18n/client";
import { getFileFromIPFS } from "@/utils/firebase/ipfs-db";
const PaginaCard = () => {
  const { t } = useTranslation();
  const [toggleHeart, setToggleHeart] = useState(false);
  const [progettiStakes, setProgettiStakes] = useState([]);
  const [percentage, setPercentage] = useState(0);

  //let { address } = useParams();
  const currentURL = typeof window !== "undefined" ? window.location.href : "";
  const urlWithoutTrailingSlash = currentURL.endsWith("/")
    ? currentURL.slice(0, -1)
    : currentURL;
  const address = urlWithoutTrailingSlash.split("/").pop();
  const [progetto, setProgetto] = useState({ logoAziendaListFiles: [] });
  const [base64Data, setBase64Data] = useState([]);
  const [cards, setCards] = useState([]);

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

  useEffect(() => {
    const fetchBase64Data = async () => {
      let prog = await downloadProjects(t);
      
      const fetchedProgetto = prog.find(
        (x) => x.address === address
      );
      
      setProgetto(fetchedProgetto);
      const fav = await retriveFavorites();
      setToggleHeart(fav ? fav.includes(address) : false);
      setProgettiStakes(await retriveProjectStakes(address));

      if (fetchedProgetto) {
        const base64DataArray = [];
        if (fetchedProgetto.imageNftDefListFiles) {
          for (const tier of fetchedProgetto.imageNftDefListFiles) {
            const response = await getFileFromIPFS(tier["image"])
            const imageUrl = URL.createObjectURL(response);
            base64DataArray.push(imageUrl);
          }
        }
        setBase64Data(base64DataArray);

        const localCards = [];
        for (let i = 1; i < parseInt(fetchedProgetto.numeroProdotti) + 1; i++) {
          localCards.push(
            <InvestiCard
              key={i}
              address={fetchedProgetto.address}
              numTier={i}
              spec={fetchedProgetto["specs" + i]}
              supply={fetchedProgetto["supply" + i]}
              price={fetchedProgetto["price" + i]}
              img={base64DataArray[i - 1]}
              titolo={fetchedProgetto["name" + i]}
              currentSupply={
                fetchedProgetto.imageNftDefListFiles[i - 1]["currentSupply"]
              }
              state={fetchedProgetto.stateText}
            />
          );
        }
        setCards(localCards);
        setPercentage((fetchedProgetto.funds / fetchedProgetto.quota) * 100);
      }
    };

    fetchBase64Data();
  }, [address, t]);

  let i = 1;

  const [tab, setTab] = useState(0);

  function isCurrentState(i) {
    return tab === i;
  }

  return (
    <div className="app">
      <main className="dashboard small">
        <div className="dashboard-header">
          <Header />
        </div>
      </main>
      <main className="pagina-card">
        <div className="back">
          <a href="/Dashboard">Back</a>
        </div>
        <section className="pc-hero-section">
          {/*<img
            className="pagina-card-hero-img"
            src={ImageBackLogo}
            alt="PaginaCardHero"
          />*/}

          <div className="box-main-header">
            {/* <img className="image-icon" src={"/assets/img/pc-img-icon.png"} alt="ImageIcon" /> */}
            <div className="pc-hero-grid">
              <div className="pc-hero-grid-left">
                <div
                  className="logo-card-ins"
                  style={{
                    backgroundImage: imageSrc ? `url(${imageSrc})` : 'none',
                  }}
                ></div>
              </div>
              <div className="pc-hero-grid-right">
                <div
                  style={{ marginBottom: "2rem" }}
                  className="settore card-header"
                >
                  <div className="box-bk-over-logo right">
                    <span>{progetto.tipoCampagna}</span>
                  </div>
                  <div className="pc-btn-box">
                    <button
                      // onClick={() => {
                      //   addFavorites(address, t);
                      //   setToggleHeart(!toggleHeart);
                      // }}
                      // className="grd-btn dopot-btn-lg"
                      style={{ background: "none" }}
                    >
                      {!toggleHeart ? (
                        <img
                          alt="Favourite"
                          src={"/assets/img/cuore-able.svg"}
                        />
                      ) : (
                        <img
                          alt="Unfavourite"
                          src={"/assets/img/cuore-dis.svg"}
                        />
                      )}
                    </button>
                    {/* <button className="grd-btn dopot-btn-lg">
                    <img src={IconPlane} alt="IconPlane" /> Scopri di più
                  </button> */}
                  </div>
                </div>
                <h1 className="nome-azienda">{progetto.nomeAzienda}</h1>

                <p className="desc">{progetto.descProgetto}</p>

                <div className="box-link">
                  <div className="row-link">
                    <p>Website</p>
                    <h3>
                      <span>
                        <a
                          className="link"
                          href={progetto.sito}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {progetto.sito}
                        </a>
                      </span>
                    </h3>
                  </div>
                  <div className="row-link">
                    <p>Creator</p>
                    <div className="span-card">
                      <span>
                        <Link
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          target="_blank"
                          href={`https://app.proofofhumanity.id/profile/${progetto.addressCreator}`}
                          rel="noreferrer"
                        >
                          {progetto.addressCreator}
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="box-white">
                  <div className="pc-hero-icon-grid white">
                    <IconInfoDai
                      text={`${progetto.funds}`}
                      text2={`${t("of")} ${progetto.quota}`}
                    />

                    <IconInfoCard
                      text={`${progetto.investorsNumber}`}
                      text2={`Investors`}
                      investors={progetto.investors}
                    />
                    <IconInfoCard
                      text={`${progetto.team}`}
                      text2={`Team Members`}
                    />
                    {progetto.fundRaisingDeadline > 0 && (
                      <IconInfoCard
                        text={`${progetto.fundRaisingDeadline} Days`}
                        text2={`Remaining`}
                      />
                    )}
                  </div>
                </div>

                <div className="pc-70-box">
                  <div className="percent-box">
                    <p>Investment Progress</p>
                    <p>{`${Math.round(percentage)}%`}</p>
                  </div>
                  <div className="graph-box">
                    <Line
                      percent={percentage}
                      strokeWidth={3}
                      trailWidth={3}
                      strokeColor="#E85556"
                      trailColor="#D9D9D9"
                    />
                  </div>
                  <div style={{ marginTop: "3rem" }} className="percent-box">
                    <p>VAT Number</p>
                    <p style={{ textTransform: "uppercase" }}>
                      {progetto.pIva}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="anchor-links-box">
          <div className="box">
            <div className="alb-content">
              <a
                onClick={() => setTab(0)}
                className={isCurrentState(0) ? "pc-active-link" : ""}
              >
                Campaign
              </a>
              <a
                onClick={() => setTab(1)}
                className={isCurrentState(1) ? "pc-active-link" : ""}
              >
                Roadmap
              </a>
              <a
                onClick={() => setTab(2)}
                className={isCurrentState(2) ? "pc-active-link" : ""}
              >
                Reward
              </a>
              <a
                onClick={() => setTab(3)}
                className={isCurrentState(3) ? "pc-active-link" : ""}
              >
                Community
              </a>
              <a
                onClick={() => setTab(4)}
                className={isCurrentState(4) ? "pc-active-link" : ""}
              >
                Tutorials
              </a>
              <a
                onClick={() => setTab(5)}
                className={isCurrentState(5) ? "pc-active-link" : ""}
              >
                Survey
              </a>
              <a
                onClick={() => setTab(6)}
                className={isCurrentState(6) ? "pc-active-link" : ""}
              >
                Documents
              </a>
            </div>
          </div>
        </section>
        <section>
          <section className="pc-main-content">
            <div className="box">
              <div className="pc-content-grid">
                {(() => {
                  switch (tab) {
                    case 0:
                      return (
                        <TabCampagna
                          introduzione={progetto.introduzione}
                          fotoIntroListFiles={progetto.fotoStoriaListFiles}
                          vision={progetto.vision}
                          fotoVisionListFiles={progetto.fotoVisionListFiles}
                          storia={progetto.storia}
                          fotoStoriaListFiles={progetto.fotoStoriaListFiles}
                          address={progetto.address}
                          progettiStakes={progettiStakes}
                          state={progetto.stateText}
                        />
                      );
                    case 1:
                      return (
                        <TabRoadmap
                          titoloRoadStep={progetto.titoloRoadStep}
                          descrRoadStep={progetto.descrRoadStep}
                        />
                      );
                    case 3:
                      return (
                        <TabSocial
                          socialMedia={progetto.socialMedia}
                        ></TabSocial>
                      );
                    case 4:
                      return <TabFaq progetto={progetto} />;
                    case 5:
                      return <TabQuestionario progetto={progetto} />;
                    case 6:
                      return <TabDocumenti progetto={progetto} />;

                    default:
                      break;
                  }
                })()}
                <div className="pc-content-grid-right">
                  <div className="basic-info-box">
                    {/* <div className="pmg-btn-box-nft">
                      { <input type="checkbox" id="click" />
                      <label htmlFor="click" style={{ cursor: "pointer" }}>
                        <img
                          src={(() => {
                            if (progetto.logoAziendaListFiles[0] != null) {
                              return (
                                "https://arweave.net/" +
                                progetto.logoAziendaListFiles[0]
                              );
                            } else return ImageIcon;
                          })()}
                          alt="ImageIcon"
                        />
                      </label> }
                      <div className="content logo-center">
                        <img
                          src={(() => {
                            if (progetto.logoAziendaListFiles[0] != null) {
                              return (
                                "https://arweave.net/" +
                                progetto.logoAziendaListFiles[0]
                              );
                            } else return ImageIcon;
                          })()}
                          alt="ImageIcon"
                        />
                        <div className="text"></div>
                        <label htmlFor="click" id="temp">
                          x
                        </label>
                      </div>
                    </div> */}
                    {/* <h3 className="box-bk-over-logo">{progetto.nomeAzienda}</h3> */}
                    {/* <h4 className="box-bk-over-logo">
                      {t("website")}:{" "}
                      <span>
                        {" "}
                        <a
                          className="link-social-new "
                          href={progetto.sito}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {progetto.sito}
                        </a>{" "}
                      </span>{" "}
                    </h4> */}
                    {/* <p>
                    Campagna di {progetto.tipoCampagna}. <br />
                    Team composta da {progetto.team}.<br />
                    Nel settore della {RetriveProjectTypes(progetto.settore)}.<br />
                    Sito Web {progetto.sito}
                    P.iva {progetto.pIva}
                  </p> }
                  </div>
                  {/* <h5>{t("investpagecard")}</h5> */}
                    {cards}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default PaginaCard;
