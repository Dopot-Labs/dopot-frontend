/* eslint-disable @next/next/no-img-element */
"";
import React from "react";
import Header from "../../components/Header.jsx";

import { useTranslation } from "../../i18n/client.js";

import Link from "next/link";
import { addTokenToMetaMask } from "@/utils/firebase/writeInfos.jsx";

const tokens = [
  {
    symbol: "DPT",
    address: "0x1060021efb8d97DDe0720d66398efe92d56aFf82", // Replace with actual token contract address
    decimals: 18,
    image: "/assets/img/dpt-img.svg", // Path to the token image
  },
  {
    symbol: "DAI",
    address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1", // Replace with actual token contract address
    decimals: 18,
    image: "/assets/img/dai.png", // Path to the token image
  },
];

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
            <h5>Dopot Token (DPT) :
            </h5>
            <h5>
              The Platform Token Utility</h5>
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

          <h4>
            Investors can stake Dopot tokens in projects they believe in. Once the funding goal is met, they will earn a percentage of the commissions.
          </h4>
          <h4>

            Project creators will pay a total commission distributed as follows:
          </h4>
          <ul>
            <li>0.5% to the Team for development and maintenance</li>
            <li>1% to the Anti-Fraud Fund for ensuring platform security</li>
            <li>1% to reward investors who stake their tokens</li>
            <li>1.5% to Swap and Liquify, which enhances liquidity in the liquidity pool</li>


            <li>
              Project creators can extend their campaign expiration by 30 days using Dopot tokens.
            </li>
            <li>
              Projects that stake more Dopot tokens will rank higher on the homepage, gaining better visibility and attracting new investors.
            </li>
            <li>
              DPT token holders can vote, propose changes, and approve projects via the Dopot DAO.
            </li>
          </ul>
        </div>
        <div className="box">
          <h3 style={{
            fontSize: "3.5rem !important",
            fontWeight: "600"
          }}>Add to Metamask</h3>
          <div className="p-cards-grid">
            <div className="p-card"
              onClick={() => addTokenToMetaMask(tokens[0])}
              style={{ cursor: "pointer" }}
            >
              <img src={"/logo192.png"} alt="dpt token" />
              <p>DPT</p>
            </div>
            <div className="p-card"
              onClick={() => addTokenToMetaMask(tokens[1])}
              style={{ cursor: "pointer" }}
            >
              <img src={"/assets/img/dai-img.svg"} alt="dai token" />
              <p>DAI</p>
            </div>
          </div>



        </div>


        <iframe
          src="https://app.uniswap.org/swap/?chain=arbitrum&inputCurrency=0xda10009cbd5d07dd0cecc66161fc93d7c9000da1&outputCurrency=0x1060021efb8d97DDe0720d66398efe92d56aFf82"
          style={{
            width: "100%",
            height: "600px",
            border: "none",
          }}
          title="Uniswap Swap"
        ></iframe>


      </div>
    </div>
  );
};

export default DopotPower;
