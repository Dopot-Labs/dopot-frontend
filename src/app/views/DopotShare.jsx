"use client"
import React from "react";
import "../styles/dashboard.css";
import "../styles/globals.css";
import Header from "../components/Header";
import "../styles/components/header.css";
import DImg5 from "/assets/img/img-5.png";
import DImg6 from "/assets/img/img-6.png";
import DImg7 from "/assets/img/img-7.png";
import DImg8 from "/assets/img/img-8.png";
import "react-circular-progressbar/dist/styles.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import "../styles/dopottoken.css";
import Footer from "../components/Footer";

const DopotShare = () => {

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header></Header>
        </div>
        <div className="box">
          <div className="dopot-power">
            <h1>SCOPRI I DUE TOKEN DI DOPOT</h1>

            {/* <div className="p-btn-box">
              <button
                style={{
                  border: "2px solid rgb(186, 178, 178)",
                  borderRadius: "10px 10px 0 0",
                  padding: "8px 15px",
                  boxShadow: "none",
                }}
                onClick={(e) => navigate("/dopottoken")}
                className="purple-border-btn dopot-btn-lg"
              >
                Dopot token
              </button>
              <button
                style={{
                  border: "2px solid rgb(186, 178, 178)",
                  borderRadius: "10px 10px 0 0",
                  padding: "8px 15px",
                }}
                className="grd-btn dopot-btn-lg"
              >
                Dopotshare
              </button>
            </div> */}
            <h2>DOPOTSHARE TOKEN: L’UTILITY TOKEN DELLA PIATTAFORMA</h2>
            <h3>
              DopotShare è il token della piattaforma, è un LP Token, con cui la
              gente potrà avere questi vantaggi:
            </h3>
            {/* <img className="p-hand-img" src={PHand2} alt="PHand1" /> */}

            <div className="p-cards-grid">
              <div className="p-card">
                <img src={DImg5} alt="dopot meno commissioni" />
                <p>meno commissioni</p>
              </div>
              <div className="p-card">
                <img src={DImg6} alt="dopot sicurezza" />
                <p>sicurezza</p>
              </div>
              <div className="p-card">
                <img src={DImg7} alt="dopot velocità" />
                <p>velocità</p>
              </div>
              <div className="p-card">
                <img src={DImg8} alt="dopot scaliabilita" />
                <p>scalabilità</p>
              </div>
            </div>
            <h3>Caratteristiche</h3>
            <ul>
              <li>
                Acquistare share tokens (depositare nel dao) burnare share
                tokens (prelevare e quindi vendere dal dao)
              </li>
              <li>
                Se si pagano le commissioni con DS token anziché in stablecoin,
                si avrà lo sconto del 50% dall'ammontare iniziale delle
                commissioni
              </li>
              <li>
                Se si raggiunge il minimo di goal del 51%, si potrà richiedere
                l'allungamento di 30 giorni del crowdfunding pagando l'1% della
                somma richiesta in DopotShare Token.
              </li>
            </ul>
          </div>
        </div>
        {/* <img className="dopot-power-img" src={PBottom} alt="PBottom" /> */}
        <Footer />
      </main>
    </div>
  );
};

export default DopotShare;
