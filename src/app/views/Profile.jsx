"use client"
import "../styles/globals.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import React, { useState, useEffect } from "react";
import { getRecoil } from "recoil-nexus";
import {
  addressState,
  progettiState,
  progettiImageState,
} from "../recoilState";

import "react-circular-progressbar/dist/styles.css";
import CardPref from "../components/PaginaCard/CardPref";
import { useTranslation } from "react-i18next";

import { retriveFavorites } from "../utils/firebase/retriveInfo";

const Profile = () => {
  const { t } = useTranslation();
  const [investedCard, setinvestedCard] = useState([]);
  const [favoriteCard, setfavoriteCard] = useState([]);
  const [isActive, setActive] = useState(true);
  const [isActive2, setActive2] = useState(false);
  const address = getRecoil(addressState);
  let projects = getRecoil(progettiState);
  
  useEffect(() => {
    // Update the document title using the browser API
    async function fetchData() {
      let tempCard = [];
      const favorites = await retriveFavorites();
      for (const project of projects) {
        if(!project.investors) continue;
        let tiers = project.investors[address];
        for (const tierId in tiers) {
          if (tiers.hasOwnProperty(tierId) /* && tiers[tierId] !== 0*/) {
            tempCard.push(
              <CardPref
                progetto={project}
                immagini={getRecoil(progettiImageState)[project.address]}
                address={project.address}
                tier={project.tier}
                progettiFavourites={favorites}
              ></CardPref>
            );
          }
        }
      }
      setinvestedCard(tempCard);

      let tempCard2 = [];
      for (const element of favorites) {
        let project = projects.find((project) => project.address === element);
        tempCard2.push(
          <CardPref
            progetto={project}
            immagini={getRecoil(progettiImageState)[project.address]}
            address={project.address}
            tier={project.tier}
            progettiFavourites={favorites}
          ></CardPref>
        );
      }
      setfavoriteCard(tempCard2);
    }

    fetchData();
  }, []);

  const ToggleSec = () => {
    setActive(!isActive);
    setActive2(false);
  };
  const ToggleSec2 = () => {
    setActive2(!isActive2);
    setActive(false);
  };

  return (
    <div className="app">
      <main className="profile-page">
        <section className="profile-top-section">
          {/* <img className="profile-hero" src={ProfileHero} alt="ProfileHero" /> */}

          <div className="box">
            <div className="pts-content">
              <div className="pts-left">
                <a href="#">
                  <img src={"/assets/img/profile-icon-arrow-left.png"} alt="ProfileIconArrowLeft" />
                </a>
                <div className="profile-img-box">
                  <h3>
                    {t("profileof")}{" "}
                    {address &&
                      address.toString().substring(0, 5) + "..." + address &&
                      address.toString().substring(38, 42)}
                  </h3>
                </div>
              </div>
              <div className="pts-right">
                <div className="pts-right-grid">
                  <div className="pts-right-grid-card">
                    <a href={"/#/profile"}>
                      <img
                        className="panoramica-img"
                        src={"/assets/img/profile-icon-1.png"}
                        alt="ProfileIcon"
                      />
                    </a>
                    <a href={"/#/profile"}>
                      <p>{t("overview")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/insprogetto"}>
                      <img src={"/assets/img/ins-project-def.png"} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/insprogetto"}>
                      <p>{t("createcampaign")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/mynft"}>
                      <img src={"/assets/img/profile-icon-3.png"} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/mynft"}>
                      <p>{t("mynft")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/myprojects"}>
                      <img src={"/assets/img/profile-icon-4.png"} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/myprojects"}>
                      <p>{t("myprojects")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a
                      href={
                        "https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={"/assets/img/widget.png"} alt="ProfileIcon" />
                    </a>
                    <a
                      href={
                        "https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>DAO</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a
                      href={"https://app.proofofhumanity.id"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={"/assets/img/identity.png"} alt="ProfileIcon" />
                    </a>
                    <a
                      href={"https://app.proofofhumanity.id"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>{t("identity")}</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="box0">
          <div className="sec-inv-desk-flex">
            <img src={"/assets/img/profile-icon-grd-1.png"} alt="ProfileIconGrd" />
            <p>{t("myinvestments")}</p>
          </div>
          <div className="sec-pref-desk-flex">
            <img src={"/assets/img/profile-icon-grd-2.png"} alt="ProfileIconGrd" />
            <p>{t("myfavourites")}</p>
          </div>
        </div>

        <div className="box1">
          <div className="sec-inv-mob">
            <button onClick={ToggleSec2}>
              <img
                className={isActive2 ? "shadow-inv" : null}
                src={"/assets/img/profile-icon-grd-1.png"}
                alt="ProfileIconGrd"
              />
              <p>{t("myinvestments")}</p>
            </button>
          </div>
          <div className="sec-pref-mob">
            <button onClick={ToggleSec}>
              <img
                className={isActive ? "shadow-inv" : null}
                src={"/assets/img/profile-icon-grd-2.png"}
                alt="ProfileIconGrd"
              />
              <p>{t("myfavourites")}</p>
            </button>
          </div>
        </div>

        <section className="profile-bottom">
          <div className="box">
            <div className="profile-main-grid">
              <div className={isActive2 ? "pmg-left" : "sec-display-none-inv"}>
                {investedCard}
              </div>

              <div className={isActive ? "pmg-right" : "sec-display-none-pref"}>
                {favoriteCard}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
