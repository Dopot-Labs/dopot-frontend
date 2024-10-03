/* eslint-disable @next/next/no-img-element */
"";
import React, { useState } from "react";
import { InfBase, InfBaseHeader } from "../../components/forms/InfBase.jsx";
import {
  Questionario,
  QuestionarioHeader,
} from "../../components/forms/Questionario.jsx";
import { Progetto, ProgettoHeader } from "../../components/forms/Progetto.jsx";
import { Prodotto, ProdottoHeader } from "../../components/forms/Prodotto.jsx";
import { Faq, FaqHeader } from "../../components/forms/Faq.jsx";
import { addproj } from "../../utils/firebase/writeInfos.jsx";
import Footer from "../../components/Footer.jsx";
import { getRecoil } from "recoil-nexus";
import { addressState } from "../../recoilState.js";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "../../i18n/client.js";
import Header from "../../components/Header.jsx";
import Link from "next/link";
import Image from "next/image";

function getFileExtension(filename) {
  // Find the last occurrence of a dot (.) in the filename
  const dotIndex = filename.lastIndexOf(".");

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

  const handleChange = (e, nProdotto) => {
    let name = e.target.name;
    const value = e.target.value;

    if (e.target.files != null) {
      // Create an array from e.target.files
      let selectedFiles = [];

      // Check if we already have files stored in the state for this input field
      const propName = name + "ListFiles";

      // If the state already has files for this input, copy them to selectedFiles
      setInputs((prevState) => {
        if (prevState[propName]) {
          selectedFiles = [...prevState[propName]];
        } else {
          selectedFiles = [...e.target.files]; // copy all files if no state exists yet
        }
        return prevState;
      });

      // Now, only insert the newly uploaded file into the specific nProdotto index if nProdotto is defined
      if ((typeof nProdotto !== "undefined") && (name !== "fotoProdotto1") && (name !== "fotoProdotto2") && (name !== "fotoProdotto3")) {
        selectedFiles[nProdotto] = e.target.files[0];
      }else{
        selectedFiles[0] = e.target.files[0];
      }

      // Update the state with the updated selectedFiles array
      setInputs((prevState) => ({
        ...prevState,
        [propName]: selectedFiles,
      }));

      //console.log(selectedFiles);
    } else {
      // Handle other input types (non-file inputs)
      setInputs((values) => ({ ...values, [name]: value }));
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
    //console.dir(inputs);
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
        const fileExtension = getFileExtension(file.name);
        const updatedInputs = [...prevState.imageNftDefListFiles];
        updatedInputs[nProdotto] = { base64, fileExtension };
        return { ...prevState, imageNftDefListFiles: updatedInputs };
      });
    };
  };

  const handleSubmit = async (event) => {

   
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
            setState={incrementStep}
            handleSubmit={handleSubmit}
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

  const incrementStep = (e, step) => {
    e.preventDefault()
    setprogressionStep(progressionStep + step);
  };
  const address = getRecoil(addressState);

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
        <main className="box ins-progetto-page row">
          <section className="profile-top-section col-lg-3">
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
                  <div className="pts-right-grid-card">
                    <Link href={"/Profile"}>
                      <p>My Investments</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card">
                    <Link href={"/Profile"}>
                      <p>My Favourites</p>
                    </Link>
                  </div>
                  <div className="pts-right-grid-card active">
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

          <section className="ins-progetto-content col-lg-9">
            <div className="box">
              <div className="ins-head">
                {/* <Link href="/">
                <img src={"/assets/img/profile-icon-arrow-left.png"} alt="ProfileIconArrowLeft" />
              </Link> */}
                <h2>Create campaign</h2>
              </div>
              {renderCurrentSelectionHeader()}
              <form  >
                {renderCurrentSelection()}
              </form>
            </div>
          </section>
          <ToastContainer />
        </main>
      </div>
    </div>
  );
};

export default InsProgetto;
