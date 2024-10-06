/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import Header from "../../components/Header.jsx";
import { getRecoil } from "recoil-nexus";
import {
  addressState,
  progettiState,
  progettiImageState,
} from "../../recoilState.js";
import Link from "next/link";
import Image from "next/image";
import CardPref from "../../components/PaginaCard/CardPref.jsx";
import Card from "../../components/PaginaCard/Card.jsx";
import { useTranslation } from "../../i18n/client.js";
import { downloadProjects, retriveFavorites } from "@/utils/firebase/retriveInfo.jsx";



const Favourites = () => {
  const { t } = useTranslation();
  const [investedCard, setinvestedCard] = useState([]);
  const [favoriteCard, setfavoriteCard] = useState([]);
 
  const address = getRecoil(addressState);


  
 

  useEffect(() => {
    // Update the document title using the browser API
    async function fetchData() {
      let tempCard = [];
      const favorites = await retriveFavorites();
      const projects = await downloadProjects();
      for (const project of projects) {
        if (!project.investors) continue;
        let tiers = project.investors[address];
        for (const tierId in tiers) {
          if (tiers.hasOwnProperty(tierId) /* && tiers[tierId] !== 0*/) {
            tempCard.push(
              <Card
              key={project.address}
                progetto={project}
                immagini={getRecoil(progettiImageState)[project.address]}
                address={project.address}
                tier={project.tier}
                
              ></Card>
            );
          }
        }
      }
      setinvestedCard(tempCard);

      let tempCard2 = [];
      for (const element of favorites) {
        let project = projects.find((project) => project.address === element);
        tempCard2.push(
          <Card
          key={project.address}
            progetto={project}
            immagini={getRecoil(progettiImageState)[project.address]}
            address={project.address}
            tier={project.tier}
          ></Card>
        );
      }
      setfavoriteCard(tempCard2);
    }

    fetchData();
  }, [address, t]);



  return (
    <div className="app">
      <main className="dashboard small">
        <div className="dashboard-header">
          <Header />
        </div>
      </main>
      <div className="box">
        <div className=" box back">
          <a href="/Dashboard">Back</a>
        </div>
        <main className="box profile-page row">
          <section className="profile-top-section col-lg-3">
            {/* <img className="profile-hero" src={ProfileHero} alt="ProfileHero" /> */}

            <div className="pts-content">
              <div className="pts-left">
                <div className="profile-img-box">
                  <img src="/assets/img/img-profile-pred.svg" alt="" />
                  <h3>
                    {address &&
                      address.toString().substring(0, 5) +
                        "..." +
                        address.toString().substring(38, 42)}
                  </h3>
                </div>
              </div>
              <div className="pts-right">
                <div className="pts-right-grid">
                  <div className="pts-right-grid-card ">
                    <Link href={"/Profile"}>
                      <p>My Investments</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card active">
                    <Link href={"/Favourites"}>
                      <p>My Favourites</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"/InsProgetto"}>
                      <p>Create Campaign</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"/MyNft"}>
                      <p>My NFTs</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"/MyProjects"}>
                      <p>My Projects</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link
                      href={
                        "https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>DAO</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link
                      href={"https://app.proofofhumanity.id"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>Verify Identity</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <div className="box0">
          <div className="sec-inv-desk-flex">
            <img
              src={"/assets/img/profile-icon-grd-1.png"}
              alt="ProfileIconGrd"
            />
            <p>{t("myinvestments")}</p>
          </div>
          <div className="sec-pref-desk-flex">
            <img
              src={"/assets/img/profile-icon-grd-2.png"}
              alt="ProfileIconGrd"
            />
            <p>{t("myfavourites")}</p>
          </div>
        </div> */}

          {/* <div className="box1">
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
        </div> */}

          <section className="profile-bottom col-lg-9">
            <div className="box">
              <div className="ins-head">
                {/* <Link href="/">
                <img src={"/assets/img/profile-icon-arrow-left.png"} alt="ProfileIconArrowLeft" />
              </Link> */}
                <h2>My Favourites</h2>
              </div>
              <div className="profile-dash-cards">
                {favoriteCard}

                {/* <div className={isActive ? "pmg-right" : "sec-display-none-pref"}>
                {favoriteCard}
              </div> */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Favourites;
