"use client"
import "../styles/globals.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import React from "react";
import { getRecoil } from "recoil-nexus";
import { addressState } from "../recoilState";
import "react-circular-progressbar/dist/styles.css";

const Profile = () => {
  return (
    <div className="app">
      <main className="profile-page">
        <section className="profile-top-section">
          <div className="box">
            <div className="pts-content">
              <div className="pts-left">
                <a href="#">
                  <img src={"/assets/img/profile-icon-arrow-left.png"} alt="ProfileIconArrowLeft" />
                </a>
                <div className="profile-img-box">
                  <h3>
                    Profilo di{" "}
                    {getRecoil(addressState).toString().substring(0, 5) +
                      "..." +
                      getRecoil(addressState).toString().substring(38, 42)}
                  </h3>
                  <img src={"/assets/img/profile-img.png"} alt="ProfileImg" />
                </div>
              </div>
              <div className="pts-right">
                <div className="pts-right-grid">
                  <div className="pts-right-grid-card">
                    <a href={"/#/profile"}>
                      <img src={"/assets/img/profile-icon-1.png"} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/profile"}>
                      <p>Panoramica</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/insprogetto"}>
                      <img src={"/assets/img/ins-project-def.png"} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/insprogetto"}>
                      <p>Crea Campagna</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/mynft"}>
                      <img src={"/assets/img/profile-icon-3.png"} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/mynft"}>
                      <p>I Miei NFT</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/myprojects"}>
                      <img className="" src={"/assets/img/profile-icon-4.png"} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/myprojects"}>
                      <p>I Miei Progetti</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"} target="_blank" rel="noreferrer">
                      <img src={"/assets/img/widget.png"} alt="ProfileIcon" />
                    </a>
                    <a href={"https://app.aragon.org/#/daos/arbitrum/0x8115cf635a71fe591b9c74d706a6d028ba44a776/dashboard"} target="_blank" rel="noreferrer">
                      <p>DAO</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"https://app.proofofhumanity.id"} target="_blank" rel="noreferrer">
                      <img
                        className="myprojects-img"
                        src={"/assets/img/impostazioni.png"}
                        alt="ProfileIcon"
                      />
                    </a>
                    <a href={"https://app.proofofhumanity.id"} target="_blank" rel="noreferrer">
                      <p>Verify Identity</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
