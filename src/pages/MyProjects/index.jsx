/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { getRecoil } from "recoil-nexus";
import Header from "../../components/Header.jsx";
import {
  addressState,
  progettiState,
  progettiImageState,
} from "../../recoilState.js";
import { withdraw } from "../../utils/firebase/writeInfos.jsx";
import Card from "../../components/PaginaCard/Card.jsx";
import { useTranslation } from "../../i18n/client.js";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

const Profile = () => {
  const { t } = useTranslation();
  const [projectsCard, setProjectsCard] = useState([]);
  const address = getRecoil(addressState);
  let projects = getRecoil(progettiState);

  useEffect(() => {
    // Update the document title using the browser API
    async function fetchData() {
      let myProjects = [];
      projects
        .filter((p) => p.addressCreator === address)
        .forEach((project) => {
          myProjects.push(
            <Card
              progetto={project}
              immagini={getRecoil(progettiImageState)[project.address]}
              address={project.address}
              tier={project.tier}
              state={project.stateText}
              withdraw={handleWithdraw}
              isMyProject={true}
              loadFees={true}
            ></Card>
          );
        });

      setProjectsCard(myProjects);
    }

    async function handleWithdraw(projectAddress) {
      try {
        await toast.promise(withdraw(projectAddress), {
          pending: t("confirm"),
          success: t("withdrawn"),
          error: t("error"),
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [address, projects, t]);

  useEffect(() => {
    // Update the document title using the browser API
    async function fetchData() {
      let myProjects = [];
      projects
        .filter((p) => p.addressCreator === address)
        .forEach((project) => {
          myProjects.push(
            <Card
              progetto={project}
              immagini={getRecoil(progettiImageState)[project.address]}
              address={project.address}
              tier={project.tier}
              state={project.stateText}
              withdraw={handleWithdraw}
              isMyProject={true}
              loadFees={true}
            ></Card>
          );
        });

      setProjectsCard(myProjects);
    }
    fetchData();
  }, [address, projects]);

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
                  <div className="pts-right-grid-card">
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
                  <div className="pts-right-grid-card active">
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

          <section className="profile-bottom col-lg-9">
            <div className="box">
              <div className="ins-head projects">
                <h2>My Projects</h2>
                <Link
                  href="https://app.push.org/chat"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="grd-btn">
                    <div className="shipping">
                      <p
                        style={{
                          margin: "0",
                          fontSize: "1.5rem",
                          color: "black",
                        }}
                      >
                        Shipping Details
                      </p>
                    </div>
                  </button>
                </Link>
              </div>
              <div className="profile-main-grid">{projectsCard}</div>
            </div>
          </section>
          <ToastContainer />
        </main>
      </div>
    </div>
  );
};

export default Profile;
