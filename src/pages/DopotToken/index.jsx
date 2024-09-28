/* eslint-disable @next/next/no-img-element */
"";
import React from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { useTranslation } from "../../i18n/client.js";
import Image from "next/image";

const DopotPower = () => {
  const { t } = useTranslation();

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header></Header>
        </div>
        <div className="box">
          <div className="dopot-power">
            <h5>
              <img
                style={{ marginRight: "0.7rem", marginBottom: "0.35rem" }}
                src="\assets\img\Icon.png"
                alt=""
              />
              Dopot Token
            </h5>
            <h1>Discover The Dopot Token</h1>
            <h5>Dopot Token (DPT) : The Platform Token Utility</h5>
          </div>
        </div>
      </main>
      <div className="box-token">
        <h1>
          The <span>“DPT”</span> token advantages
        </h1>
        {/* <img className="p-hand-img" src={PHand1} alt="PHand1" /> */}
        <div className="p-cards-grid">
          <div className="p-card">
            <img src={"/assets/img/voting-img.svg"} alt="dopot votazioni" />
            <p>Voting security</p>
          </div>
          <div className="p-card">
            <img src={"/assets/img/dec-img.svg"} alt="dopot dex" />
            <p>Decentralization</p>
          </div>
          <div className="p-card">
            <img src={"/assets/img/easy-img.svg"} alt="dopot facilita" />
            <p>Easy to use</p>
          </div>
          <div className="p-card">
            <img src={"/assets/img/sus-img.svg"} alt="dopot sostenibilità" />
            <p>Sustainability</p>
          </div>
        </div>
        <div className="char-cont">
          <h3>Characteristics</h3>
          <ul>
            <li>
              The investor will be able to stake Dopot tokens in the projects he
              believes in, and upon complete collection he will receive a
              percentage of the commissions.
            </li>
            <li>
              The creator of a project will pay only 2% commission in Dopot
              tokens, an additional 1% in DAI for the shared insurance fund and
              1% to reward stakers.
            </li>
            <li>
              The creator will also have the option to add 30 days to the
              expiration of their campaign using Dopot tokens.
            </li>
            <li>
              Projects that stake more Dopot tokens will appear higher up on the
              home page, gaining visibility and new investors
            </li>
            <li>
              DPT token holders can vote, propose changes and approve projects
              on the Dopot DAO
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DopotPower;
