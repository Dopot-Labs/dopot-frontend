"use client"
import React, { useState } from "react";
import "../styles/globals.css";
import "../styles/ins-progetto.css";
import { InfBase, InfBaseHeader } from "../components/forms/InfBase";
import {
  Questionario,
  QuestionarioHeader,
} from "../components/forms/Questionario";
import { Progetto, ProgettoHeader } from "../components/forms/Progetto";
import { Prodotto, ProdottoHeader } from "../components/forms/Prodotto";
import { Faq, FaqHeader } from "../components/forms/Faq";

import { addproj } from "../utils/firebase/writeInfos";
import Footer from "../components/Footer";

import { getRecoil } from "recoil-nexus";
import { addressState } from "../recoilState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

function getFileExtension(filename) {
  // Find the last occurrence of a dot (.) in the filename
  const dotIndex = filename.lastIndexOf('.');

  // Check if a dot was found and ensure it is not the last character
  if (dotIndex !== -1 && dotIndex < filename.length - 1) {
    // Extract the substring after the last dot as the file extension
    return filename.slice(dotIndex + 1).toLowerCase();
  } else {
    // No dot or dot is the last character, indicating no valid extension
    return null;
  }
}

const InsProgetto = () => {
  const { t } = useTranslation();
  let step = [];
  const [inputs, setInputs] = useState({
    logoAziendaListFiles: [],
    documentazioneListFiles: [],
    imageNftDefListFiles: [],
    giorniCampagna: "45",
    numeroProdotti: "1",
    tipoCampagna: "reward",
    settore: "tipo1",
    socialMedia: [],
    titoloRoadStep: [],
    descrRoadStep: [],
    titoloDomanda: [],
    rispostaDomanda: [],
  });
  const [progressionStep, setprogressionStep] = useState(0);

  const handleChange = (e) => {
    let name = e.target.name;
    const value = e.target.value;

    if (e.target.files != null) {
      setInputs((prevState) => ({
        ...prevState,
        [propName]: [],
      }));
      const selectedFiles = [...e.target.files];
      const propName = name + "ListFiles";
      console.dir(selectedFiles);
      selectedFiles.forEach((file, i) => {
        const fileExtension = getFileExtension(file.name);
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const buff = Buffer.from(reader.result);
          setInputs((prevState) => ({
            ...prevState,
            [propName]: [...prevState[propName], fileExtension ? {buff, fileExtension} : buff],
          }));
          console.dir(inputs);
        };
        reader.onerror = () => {
          console.log("Error reading file!");
        };
      });
    } else {
      setInputs((values) => ({ ...values, [name]: value }));
      //console.dir(inputs);
    }
  };

  const handleChangeArray = (e, i) => {
    const { name, value } = e.target;
    let array = [...inputs[name]];

    if (array[i]) {
      array[i] = value;
    } else {
      array = [...array, value];
    }
    console.dir(inputs);
    setInputs((prevState) => {
      return { ...prevState, [name]: array };
    });
  };

  const handleCountryChange = (e) => {
    const name = "nazioneAzienda";
    const value = e;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleChangeNft = (e, nProdotto) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result;
      setInputs((prevState) => {
        const fileExtension = getFileExtension(file.name)
        const updatedInputs = [...prevState.imageNftDefListFiles];
        updatedInputs[nProdotto] = {base64, fileExtension};
        return { ...prevState, imageNftDefListFiles: updatedInputs };
      });
    };
  };

  const handleSubmit = async (event) => {
    if (event.target.id === "submit") {
      event.preventDefault();
      try {
        await toast.promise(addproj(inputs, t), {
          pending: t("confirm"),
          success: t("created"),
          error: t("error"),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderCurrentSelection = () => {
    switch (progressionStep) {
      case 0:
        step[0] = (
          <InfBase
            inputs={inputs}
            handleChange={handleChange}
            handleCountryChange={handleCountryChange}
            setState={incrementStep}
            handleChangeArray={handleChangeArray}
          ></InfBase>
        );
        return step;
      case 1:
        step[0] = (
          <InfBase inputs={inputs} handleChange={handleChange}></InfBase>
        );
        step[1] = (
          <Questionario
            inputs={inputs}
            handleChange={handleChange}
            setState={incrementStep}
          ></Questionario>
        );
        return step;

      case 2:
        step[0] = (
          <InfBase inputs={inputs} handleChange={handleChange}></InfBase>
        );
        step[1] = (
          <Questionario
            inputs={inputs}
            handleChange={handleChange}
          ></Questionario>
        );
        step[2] = (
          <Progetto
            inputs={inputs}
            handleChange={handleChange}
            setState={incrementStep}
            handleChangeArray={handleChangeArray}
          ></Progetto>
        );
        return step;

      case 3:
        step[0] = (
          <InfBase inputs={inputs} handleChange={handleChange}></InfBase>
        );
        step[1] = (
          <Questionario
            inputs={inputs}
            handleChange={handleChange}
          ></Questionario>
        );
        step[2] = (
          <Progetto
            inputs={inputs}
            handleChange={handleChange}
            handleChangeArray={handleChangeArray}
          ></Progetto>
        );
        step[3] = (
          <Prodotto
            inputs={inputs}
            handleChange={handleChange}
            handleChangeNft={handleChangeNft}
            setState={incrementStep}
          ></Prodotto>
        );
        return step;

      case 4:
        step[0] = (
          <InfBase inputs={inputs} handleChange={handleChange}></InfBase>
        );
        step[1] = (
          <Questionario
            inputs={inputs}
            handleChange={handleChange}
          ></Questionario>
        );
        step[2] = (
          <Progetto
            inputs={inputs}
            handleChange={handleChange}
            handleChangeArray={handleChangeArray}
          ></Progetto>
        );
        step[3] = (
          <Prodotto
            inputs={inputs}
            handleChange={handleChange}
            handleChangeNft={handleChangeNft}
          ></Prodotto>
        );
        step[4] = (
          <Faq
            inputs={inputs}
            handleChange={handleChange}
            handleChangeArray={handleChangeArray}
          ></Faq>
        );

        return step;

      default:
        return null;
    }
  };

  const renderCurrentSelectionHeader = () => {
    switch (progressionStep) {
      case 0:
        return <InfBaseHeader></InfBaseHeader>;
      case 1:
        return <QuestionarioHeader> </QuestionarioHeader>;
      case 2:
        return <ProgettoHeader></ProgettoHeader>;

      case 3:
        return <ProdottoHeader></ProdottoHeader>;

      /*case 4:
        return <NftMintHeader></NftMintHeader>;*/
      case 4:
        return <FaqHeader></FaqHeader>;
      default:
        return null;
    }
  };

  const incrementStep = () => {
    setprogressionStep(progressionStep + 1);
  };
  const address = getRecoil(addressState);

  return (
    <div className="app">
      <main className="ins-progetto-page">
        <section style={{ zIndex: 100000 }} className="profile-top-section">
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
                      <img src={"/assets/img/profile-icon-1.png"} alt="ProfileIcon" />
                    </a>
                    <a href={"/#/profile"}>
                      <p>{t("overview")}</p>
                    </a>
                  </div>
                  <div className="pts-right-grid-card">
                    <a href={"/#/insprogetto"}>
                      <img
                        className="camp-img"
                        src={"/assets/img/ins-project-def.png"}
                        alt="ProfileIcon"
                      />
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

        <section className="ins-progetto-content">
          <div className="box">
            <div className="ins-head">
              {/* <a href="#">
                <img src={"/assets/img/profile-icon-arrow-left.png"} alt="ProfileIconArrowLeft" />
              </a> */}
              <h2>{t("enterproject")}</h2>
            </div>
            {renderCurrentSelectionHeader()}
            <form id="submit" onSubmit={handleSubmit}>
              {renderCurrentSelection()}
            </form>
          </div>
        </section>
        <Footer />
        <ToastContainer />
      </main>
    </div>
  );
};

export default InsProgetto;
