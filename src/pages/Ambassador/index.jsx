"use client"
/* eslint-disable @next/next/no-img-element */
import React from "react";
import "../styles/dashboard.css";
import "../styles/globals.css";
import Header from "../components/Header.jsx";
import "../styles/components/header.css";
import "../styles/paginacard.css";
import "../styles/profile.css";
import "../styles/dopottoken.css";
import Footer from "../components/Footer.jsx";

const Ambassador = () => {

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header />
        </div>
        <div className="box">
          <div className="dopot-power">
            <h1 className="mb-5">{"Ambassador Program"}</h1>
            <img src={"/assets/img/Ambassador_program.png"} style={{width: "100%"}} alt="Ambassador program" />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Ambassador;
