/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import Link from "next/link";
import Header from "../components/Header.jsx";

const Home = ({ t }) => {
  const [isTempMsgHidden, setIsTempMsgHidden] = useState(false);

  return (
    <>
      <section className="hero-section" id="hero-section">
        <Header />
        {/* <img
          className="hero-bg"
          src={"/assets/img/header-bgg.svg"}
          alt="HeroImg"
        /> */}
        <div className="box-hero-1">
          <div className="hero-content">
            {/* <img src={LogoWhite} alt="LogoWhite" /> */}
            <h2
              data-aos="fade-right"
              data-aos-delay="700"
              data-aos-duration="750"
            >
              <img src="\assets\img\Icon.png" alt="" />
              Crowdfunding meets the power of blockchain
            </h2>
            <h1
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-duration="750"
            >
              Revolutionizing crowdfunding with blockchain.
            </h1>

            <h2
              data-aos="fade-right"
              data-aos-delay="700"
              data-aos-duration="750"
            >
              Dopot is the world's first decentralized platform revolutionizing
              crypto-crowdfunding.
            </h2>
            <div className="main-btns-box">
              <div style={{ padding: 0 }} className="box">
                <div className="mbb-content">
                  <Link href={"/LoadingPage"}>
                    <h4
                      // data-aos="fade-right"
                      // data-aos-delay="700"
                      // data-aos-duration="750"
                      style={{}}
                    >
                      See Our Projects
                    </h4>
                  </Link>
                </div>
                <div
                  className="mbb-content"
                  style={{ justifyContent: "start" }}
                >
                  <Link
                    href="https://www.dx.app/dxsale/view?address=0x9672876A9B1D3cB60E6942B068f432fA85CF3EE3&chain=42161"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h4
                      // data-aos="fade-right"
                      // data-aos-delay="700"
                      // data-aos-duration="750"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--whitetr)",
                      }}
                    >
                      Private Sale
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="scorpi-section">
        <div className="box">
          <div className="scorpi-content">
            <h3
              data-aos="zoom-in-up"
              data-aos-duration="800"
              className="section-heading"
            >
              Find out what you can do
            </h3>
            <div className="scorpi-grid">
              <div
                data-aos="fade-up "
                data-aos-delay="500"
                data-aos-duration="1000"
                className="scorpi-grid-card"
              >
                <img src={"/assets/img/logo-invest.png"} alt="IconArrowGrd" />
                <h4>Invest</h4>
                <p>Help grow ambitious projects and win with them</p>
              </div>
              {/* <div
data-aos="fade-up"
data-aos-delay="750"
data-aos-duration="1000"
className="scorpi-grid-card"
>
<img src={IconDollarGrd} alt="IconDollarGrd" />
<h4>{t("earn")}</h4>
<p>{t("earnsub")}</p>
</div> */}
              <div
                data-aos="fade-up"
                data-aos-delay="750"
                data-aos-duration="1000"
                className="scorpi-grid-card"
              >
                <img src={"/assets/img/logo-learn.png"} alt="IconPersonGrd" />
                <h4>Learn</h4>
                <p>Learn more about cryptocurrencies and crowdfunding</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="1250"
                data-aos-duration="1000"
                className="scorpi-grid-card"
              >
                <img
                  src={"/assets/img/logo-connect.png"}
                  alt="IconCommentsGrd"
                />
                <h4>Connect</h4>
                <p>Interact with our community</p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="qui-section">
        {/* <img
          className="qui-bottom-sparkles"
          src={"/assets/img/qui-bottom-sparkles.svg"}
          alt="QuiBottomSparkles"
        /> */}

        <div className="box">
          <div className="ill-web">
            <div>
              <h4>
                The Future of Web is Here: Innovate and Contribute to the Web
                3.0 Revolution
              </h4>
              <p>
                Web 3.0 and blockchain are empowering startups to innovate like
                never before. <br />
                Join us in shaping these groundbreaking projects and be part of
                the revolution.
              </p>
            </div>
            <div>
              <img src="/assets/img/img-web.svg" alt="" />
            </div>
          </div>
        </div>

        <div className="box">
          <h4 className="crowd-funding">
            Why invest in <span>Crowdfounding 3.0</span>
          </h4>
          <div className="crowd-box">
            <div className="ill-text-info-box">
              <img src="\assets\img\CustomIcon1.png" alt="" />
              <h5>The Advantages of Decentralization</h5>
              <p>
                The Dopot platform is 100% decentralized, this means that no
                individual can tamper with the data or carry out fraudulent
                actions with the funds raised thanks to the security provided by
                the blockchain. What people invest is transferred to a smart
                contract without intermediaries and in a totally secure way
                thanks to encryption.
              </p>
            </div>

            <div className="ill-text-info-box">
              <img src="\assets\img\CustomIcon2.png" alt="" />
              <h5>What Benefits Does It Provide?</h5>
              <p>
                A DAO smart contract provides more security on fundraising
                without requiring collateral from the money applicants. This
                system extends the possibility to anyone who wants to carry out
                a crowdfunding, regardless of economic possibilities; and at the
                same time secure investors' money.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="scelgono-section">
        <div className="box">
          <h3 id="faq" className="section-heading" data-aos="zoom-in-up">
            Why choose <span>Dopot?</span>
          </h3>
          <div className="scelgono-grid-box">
            <div
              className="scelgono-grid-text-box"
              data-aos="zoom-out-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h5>Less bureaucracy thanks to Smart Contracts</h5>
              <p>
                Thanks to blockchain technology it is now possible to create
                smart contracts that replace bureaucratic procedures, carrying
                out a contractual relationship in complete autonomy.
              </p>
            </div>
            <img
              src={"/assets/img/left-side2.svg"}
              alt="ScelgonoImg1"
              data-aos="zoom-out-left"
              data-aos-delay="750"
              data-aos-duration="1000"
            />
          </div>
          <div className="scelgono-grid-box">
            <img
              src={"/assets/img/left-side2.svg"}
              alt="ScelgonoImg2"
              data-aos="zoom-out-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            />
            <div
              className="scelgono-grid-text-box"
              data-aos="zoom-out-left"
              data-aos-delay="750"
              data-aos-duration="1000"
            >
              <h5>Fast transactions</h5>
              <p>
                Peer-to-peer transactions will be instantaneous and much safer
                than traditional payment methods.
              </p>
            </div>
          </div>
          <div className="scelgono-grid-box">
            <div
              className="scelgono-grid-text-box"
              data-aos="zoom-out-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h5>No intermediary</h5>
              <p>
                The functioning of smart contracts, allows not to have
                intermediaries, this reduces costs and speeds up the investment
                process.
              </p>
            </div>
            <img
              src={"/assets/img/left-side2.svg"}
              alt="ScelgonoImg3"
              data-aos="zoom-out-left"
              data-aos-delay="750"
              data-aos-duration="1000"
            />
          </div>
        </div>
      </section>
      {/* <section className="roadmap-section">
        <div className="box">
          <img
            className="img-main-roadmap"
            src="assets/img/Group-roadmap.svg"
            alt=""
          />
          <h3
            className="section-heading"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <span>Roadmap </span>For Sale Phase
          </h3>
          <div className="roadmap-grid">
            <div className="roadmap-con">
              <div className="roadmap-step-box">
                <h3>Mercury phase</h3>
                <p>Mainnet Launch & Private Sale: Q2 2024</p>
              </div>
            </div>
            <div className="roadmap-con">
              <div className="roadmap-step-box">
                <h3>Venus Phase</h3>
                <p>ILO (Pre Sale) with Vesting: Q1 2025</p>
              </div>
            </div>
            <div className="roadmap-con">
              <div className="roadmap-step-box">
                <h3>Earth phase</h3>
                <p>Public Sale: Q2 2025</p>
              </div>
            </div>
            <div className="roadmap-con">
              <div className="roadmap-step-box">
                <h3>Moon Phase</h3>
                <p>
                  Listing on CEX in Q4 2025 and Equity launch in <br /> Q2 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Cos’è DAI Secction */}
      <section className="dai-section">
        <div className="box">
          <div className="dai-right-text-box">
            <div>
              <h4>
                What’s <span>DAI?</span>
              </h4>
              <p>
                DAI cryptocurrency (DAI) is an ERC-20 token that has been
                designed to function as a stablecoin or stable currency whose
                value is pegged to the dollar. <br />
                This currency is issued in a decentralized manner thanks to
                collateralisation of guarantees that serve to guarantee their
                issue at any time.
              </p>
            </div>
          </div>
          <div className="container-dai-grid">
            <div className="dai-grid-box">
              <img src="/assets/img/frame.svg" alt="" />
              <h4>Stablecoin</h4>
              <p>
                MakerDAO's smart contracts allow anyone to make stable high
                value transactions at the speed of the blockchain.
              </p>
            </div>
            <div className="dai-grid-box">
              <img src="/assets/img/frame.svg" alt="" />
              <h4>Multi Blockchain</h4>
              <p>
                It can be transferred between all major blockchains and is
                supported by over 200 exchanges.
              </p>
            </div>
          </div>
          <div className="container-dai-grid">
            <div className="dai-grid-box">
              <img src="/assets/img/frame.svg" alt="" />
              <h4>Value</h4>
              <p>
                DAI is proving its worth by becoming part of over 400 apps and
                decentralized services.
              </p>
            </div>
            <div className="dai-grid-box">
              <img src="/assets/img/frame.svg" alt="" />
              <h4>Holding</h4>
              <p>
                Users can keep DAI in their wallets, hedging their bets against
                the volatility of accumulated digital assets, or they can trade
                it on the market.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
