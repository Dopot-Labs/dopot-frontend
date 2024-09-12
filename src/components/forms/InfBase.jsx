/* eslint-disable react/jsx-key */
"use client";
import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "../../i18n/client";

const InfBase = ({
  inputs,
  handleChange,
  handleCountryChange,
  handleChangeArray,
  setState,
}) => {
  const { t, i18n } = useTranslation();
  const [val, setVal] = useState([]);
  const handleAdd = (e) => {
    e.preventDefault();
    const abc = [...val, []];
    setVal(abc);
  };

  const handleDelete = (e, i) => {
    e.preventDefault();
    const deletVal = [...val];
    deletVal.splice(i - 1, 1);
    inputs[e.target.name].splice(i, 1);
    setVal(deletVal);
  };
  //val 2
  const [val2, setVal2] = useState([]);
  const handleAdd2 = (e) => {
    e.preventDefault();
    const abc2 = [...val2, []];
    setVal2(abc2);
  };
  const handleChange2 = (onChangeValue, i) => {
    const inputdata2 = [...val2];
    inputdata2[i] = onChangeValue.target.value;
    setVal2(inputdata2);
  };
  const handleDelete2 = (e, i) => {
    e.preventDefault();
    const deletVal2 = [...val2];
    deletVal2.splice(i, 1);
    setVal2(deletVal2);
  };

  const [files, setFiles] = useState([]);

  // Funzione per gestire il caricamento dei file
  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // Funzione per rimuovere un file
  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  // Funzione per gestire il caricamento dei file
  const handleFileUpload2 = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // Funzione per rimuovere un file
  const handleRemoveFile2 = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <>
      <h1>Basic information</h1>
      <h3 style={{ color: "#646A69" }}>
        Update your photo and personal details here.
      </h3>
      <div className="ins-input-box">
        <h4>Company name</h4>
        <input
          type="text"
          name="nomeAzienda"
          value={inputs.nomeAzienda}
          onChange={handleChange}
          placeholder="Insert Company Name"
        />
      </div>
      <div className="ins-input-box">
        <h4>Company country</h4>
        <ReactFlagsSelect
          className="nazioneAziendaSelect"
          selected={inputs.nazioneAzienda}
          onSelect={handleCountryChange}
          searchable
        />
        ;
      </div>
      <div className="ins-input-box">
        <h4>Corporate sector</h4>
        <select name="settore" onChange={handleChange}>
          <option disabled selected value>
            Select Category
          </option>
          <option disabled value>
            {t("social")}
          </option>
          <option value="tipo1"> {t("socialcare")}</option>
          <option value="tipo2"> {t("healthcare")}</option>
          <option value="tipo3"> {t("socialhealthass")}</option>
          <option value="tipo4"> {t("educationtraining")}</option>
          <option value="tipo5"> {t("environmental")}</option>
          <option value="tipo6"> {t("enhancementcultural")}</option>
          <option value="tipo7"> {t("socialtourism")}</option>
          <option value="tipo8">{t("universitypost")}</option>
          <option value="tipo9"> {t("extracurricular")}</option>
          <option value="tipo10">{t("socialenterprises")}</option>
          <option disabled value>
            {t("blockchain")}
          </option>
          <option value="tipo11">{t("blockchainfinance")}</option>
          <option value="tipo12">{t("blockchaininsurance")}</option>
          <option value="tipo13">{t("blockchainpaydigital")}</option>
          <option value="tipo14">{t("blockchainagrifood")}</option>
          <option value="tipo15">{t("blockchain4.0")}</option>
          <option value="tipo16">{t("blockchainiot")}</option>
          <option value="tipo17">{t("blockchainhealthcare")}</option>
          <option value="tipo18">{t("blockchainadministration")}</option>
          <option value="tipo19">{t("blockchainretail")}</option>
          <option value="tipo20">{t("blockchainmusic")}</option>
          <option value="tipo21">{t("blockchainsmartenergy")}</option>
          <option value="tipo22">{t("blockchainunbanked")}</option>
          <option value="tipo23">{t("cryptostartup")}</option>
          <option value="tipo24">{t("decentralizedstartup")}</option>
          <option value="tipo25">{t("decentralizedproject")}</option>
          <option disabled value>
            {t("traditional")}
          </option>
          <option value="tipo26"> {t("foodstartup")}</option>
          <option value="tipo27"> {t("fashionstartup")}</option>
          <option value="tipo28"> {t("wearstartup")}</option>
          <option value="tipo29"> {t("travelstartup")}</option>
          <option value="tipo30"> {t("bigdata")}</option>
          <option value="tipo31"> {t("biotechnology")}</option>
          <option value="tipo32"> {t("ecosustainability")}</option>
          <option value="tipo33"> {t("engineering")}</option>
          <option value="tipo34"> {t("mobile")}</option>
          <option value="tipo35"> {t("modelling")}</option>
          <option value="tipo36"> {t("research")}</option>
          <option value="tipo37"> {t("software")}</option>
          <option value="tipo38"> {t("power")}</option>
          <option value="tipo39"> {t("artificialintelligence")}</option>
          <option value="tipo40"> {t("science")}</option>
          <option value="tipo41"> {t("work")}</option>
          <option value="tipo42"> {t("telecommunications")}</option>
          <option value="tipo43"> {t("robot")}</option>
          <option value="tipo44"> {t("pharmaceutical")}</option>
          <option value="tipo45"> {t("foodandwater")}</option>
          <option value="tipo46"> {t("education")}</option>
          <option value="tipo47"> {t("humanlife")}</option>
          <option value="tipo48"> {t("publicadministration")}</option>
          <option value="tipo49"> {t("augmentedreality")}</option>
          <option value="tipo50"> {t("programming")}</option>
          <option value="tipo51"> {t("showbusiness")}</option>
          <option value="tipo52"> {t("automation")}</option>
          <option value="tipo53"> {t("tech")}</option>
          <option value="tipo54"> {t("emergingcountries")}</option>
          <option value="tipo55"> {t("businesssoftware")}</option>
          <option value="tipo57"> {t("manufacturing")}</option>
          <option value="tipo58"> {t("games")}</option>
          <option value="tipo59"> {t("music")}</option>
          <option value="tipo60"> {t("realestate")}</option>
          <option value="tipo61"> {t("investment")}</option>
          <option value="tipo62"> {t("educationaltechnology")}</option>
          <option value="tipo63"> {t("ionnovation")}</option>
          <option value="tipo64"> {t("credit")}</option>
          <option value="tipo65"> {t("insurance")}</option>
          <option value="tipo66"> {t("agriculturaltecno")}</option>
          <option value="tipo67"> {t("aerospace")}</option>
          <option value="tipo68"> {t("hitech")}</option>
        </select>
      </div>
      <div className="ins-input-box">
        <div>
          <h4>Logo</h4>
          <h3>This will be displayed on your profile.</h3>
        </div>

        <div class="file-upload">
          <input
            key="logoAzienda"
            name="logoAzienda"
            value={inputs.logoAzienda}
            onChange={handleFileUpload}
            type="file"
            id="file"
            accept=".png,.jpg,.jpeg"
            class="file-input"
          />
          <label for="file">
            <div style={{ width: "100%" }} class="upload-icon">
              <img src="/assets/img/logo-upload.svg" alt="Upload Icon" />
            </div>
            <p>Click to upload</p>
            <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
          </label>
          {/* Lista dei file caricati */}
          <div className="file-list">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-details">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">
                    {(file.size / 1024).toFixed(2)} KB
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleRemoveFile(file.name)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ins-input-box">
        <div>
          <h4>Project description</h4>
          <h3>Write a short note.</h3>
        </div>
        <textarea
          name="descrizione"
          value={inputs.descrizione}
          onChange={handleChange}
          type="textarea"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>VAT number (optional)</h4>
        <input
          name="pIva"
          value={inputs.pIva}
          onChange={handleChange}
          type="text"
          placeholder="Enter Number"
        />
      </div>
      <div className="ins-input-box">
        <h4>Website</h4>
        <input
          name="sito"
          value={inputs.sito || ""}
          onChange={handleChange}
          type="text"
          placeholder="www.yourwebsite.com"
        />
      </div>
      <div className="ins-input-box ">
        <h4>Social Media hnadles</h4>
        <div className="box-link-cont">
          <div className="container-plus">
            <input
              name="socialMedia"
              type="text"
              onChange={(e) => handleChangeArray(e, 0)}
              placeholder="Insert link"
            />

            <button className="btn-plus-minus" onClick={(e) => handleAdd(e)}>
              +
            </button>
          </div>
          {val.map((data, i) => {
            return (
              <div className="container-plus">
                <input
                  name={"socialMedia"}
                  type="text"
                  placeholder="Insert link"
                  onChange={(e) => handleChangeArray(e, i + 1)}
                />
                <button
                  className="btn-plus-minus"
                  name={"socialMedia"}
                  onClick={(e) => handleDelete(e, i + 1)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ins-input-box">
        <div>
          <h4>Company Documentation </h4>
          <h3>(pitch, business plan, relationships with partners)</h3>
        </div>

        <div class="file-upload">
          <input
            name="documentazione"
            onChange={handleFileUpload2}
            type="file"
            id="file2"
            multiple
            accept=".pdf"
            class="file-input"
          />
          <label for="file2">
            <div style={{ width: "100%" }} class="upload-icon">
              <img src="/assets/img/logo-upload.svg" alt="Upload Icon" />
            </div>
            <p>Click to upload</p>
            <span>PDF, DOC, PPT or TXT</span>
          </label>
          {/* Lista dei file caricati */}
          <div className="file-list">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-details">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">
                    {(file.size / 1024).toFixed(2)} KB
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleRemoveFile2(file.name)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ins-input-box ">
        <div>
          <h4>Introduction</h4>
          <h3>Write a short note.</h3>
        </div>
        <textarea
          value={inputs.introduzione}
          onChange={handleChange}
          name="introduzione"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box ">
        <div>
          <h4>History</h4>
          <h3>Company history</h3>
        </div>
        <textarea
          value={inputs.storia}
          onChange={handleChange}
          name="storia"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box ">
        <div>
          <h4>Vision</h4>
          <h3>Company vision</h3>
        </div>

        <textarea
          value={inputs.vision}
          onChange={handleChange}
          name="vision"
          placeholder="Type here"
        />
      </div>

      {(() => {
        if (setState != null) {
          return (
            <div className="add-btn-box">
              <a onClick={setState}>Save</a>
            </div>
          );
        }
      })()}
    </>
  );
};

const InfBaseHeader = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="ins-progress">
        <div className="ins-circle ins-circle-active">
          <img src="/assets/img/info-base1.svg" alt="" />
          <p>Basic Info</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <img src="/assets/img/info-base2.svg" alt="" />
          <p>Survey</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <img src="/assets/img/info-base3.svg" alt="" />
          <p>Project</p>
        </div>
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <img src="/assets/img/info-base4.svg" alt="" />
          <p>Product & NFTs Mint</p>
        </div>
        {/* <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <p>NFTs Mint</p>
        </div> */}
        <div className="ins-line ins-line-pending"></div>
        <div className="ins-circle ins-circle-pending">
          <img src="/assets/img/info-base5.svg" alt="" />
          <p>FAQ</p>
        </div>
      </div>
    </>
  );
};

export { InfBase, InfBaseHeader };
