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
            SOCIAL
          </option>
          <option value="tipo1"> Social care</option>
          <option value="tipo2"> Health Care</option>
          <option value="tipo3"> Social health assistance</option>
          <option value="tipo4"> Education-education-training</option>
          <option value="tipo5">Environmental and ecosystem protection</option>
          <option value="tipo6"> Enhancement of cultural heritage</option>
          <option value="tipo7">Social tourism</option>
          <option value="tipo8">University-post-graduate training</option>
          <option value="tipo9"> Extra-curricular training</option>
          <option value="tipo10">
            Instrumental services for social enterprises
          </option>
          <option disabled value>
            BLOCKCHAIN ​​AND WEB3 INNOVATION
          </option>
          <option value="tipo11">Blockchain in finance and banking</option>
          <option value="tipo12">Blockchain in insurance</option>
          <option value="tipo13">Blockchain in digital payments</option>
          <option value="tipo14">Blockchain in agrifood</option>
          <option value="tipo15">Blockchain in industry 4.0</option>
          <option value="tipo16">Blockchain in the IoT</option>
          <option value="tipo17">Blockchain in healthcare</option>
          <option value="tipo18">Blockchain in public administration</option>
          <option value="tipo19">Blockchain in retail</option>
          <option value="tipo20">Blockchain in music</option>
          <option value="tipo21">Blockchain in smart energy</option>
          <option value="tipo22">Blockchain for unbanked</option>
          <option value="tipo23">Crypto-Startup</option>
          <option value="tipo24">Decentralized Startup</option>
          <option value="tipo25">Decentralized Project</option>
          <option disabled value>
            TRADITIONAL CATEGORIES
          </option>
          <option value="tipo26">Food startup</option>
          <option value="tipo27"> Fashion startup</option>
          <option value="tipo28"> Wear startup</option>
          <option value="tipo29"> Travel startup</option>
          <option value="tipo30"> Big data and internet apps</option>
          <option value="tipo31"> Biotechnology</option>
          <option value="tipo32"> Eco-sustainability</option>
          <option value="tipo33"> Engineering</option>
          <option value="tipo34"> Mobile and smartphones</option>
          <option value="tipo35"> 3D modeling</option>
          <option value="tipo36"> Research and development</option>
          <option value="tipo37"> Software and the internet of things</option>
          <option value="tipo38"> Power</option>
          <option value="tipo39"> Artificial intelligence</option>
          <option value="tipo40"> Science and transport</option>
          <option value="tipo41"> Work</option>
          <option value="tipo42"> Telecommunications</option>
          <option value="tipo43"> Robot</option>
          <option value="tipo44"> Pharmaceutical</option>
          <option value="tipo45"> Food and water</option>
          <option value="tipo46"> Education</option>
          <option value="tipo47"> Improvement of human life</option>
          <option value="tipo48"> Public administration</option>
          <option value="tipo49"> Augmented reality</option>
          <option value="tipo50"> Programming</option>
          <option value="tipo51"> Show business</option>
          <option value="tipo52"> Automation</option>
          <option value="tipo53"> Tech for all ages and peoples</option>
          <option value="tipo54"> Emerging countries</option>
          <option value="tipo55"> Business software</option>
          <option value="tipo57"> Manufacturing</option>
          <option value="tipo58"> Games</option>
          <option value="tipo59"> Music</option>
          <option value="tipo60"> Real estate</option>
          <option value="tipo61"> Investment</option>
          <option value="tipo62"> Educational technology</option>
          <option value="tipo63"> Innovation</option>
          <option value="tipo64"> Credit</option>
          <option value="tipo65"> Insurance</option>
          <option value="tipo66"> Agricultural technology</option>
          <option value="tipo67"> Aerospace</option>
          <option value="tipo68"> Hi-tech</option>
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
