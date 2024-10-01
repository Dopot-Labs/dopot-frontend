"";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NftMint } from "./NftMint";
import { useTranslation } from "../../i18n/client";
import Link from "next/link";

const Prodotto = (props) => {
  const { t } = useTranslation();
  const [numeroProdotti, setnumeroProdotti] = useState(1);

  function toggleNumeroProdotti(event) {
    setnumeroProdotti(event.target.value);
    const fevent = {
      target: { name: "numeroProdotti", value: event.target.value },
    };
    props.handleChange(fevent);
  }

  return (
    <>
      <h1>Information about the products they offer</h1>
      <h3 style={{ color: "#646A69" }}>
        Update your photo and personal details here.
      </h3>
      {/* <div className="ins-btn-box">
        {[1, 2, 3, 4].map((value) => (
          <button
            key={value}
            value={value}
            onClick={toggleNumeroProdotti}
            className={
              numeroProdotti === value
                ? "grd-btn dopot-btn-lg"
                : "purple-border-btn dopot-btn-lg"
            }
            type="button"
          >
            {value}
          </button>
        ))}
      </div> */}
      <div className="ins-input-box">
        <Tabs>
          <TabList>
            {(() => {
              const tabs = [];
              for (let i = 0; i < 3; i++) {
                tabs.push(<Tab key={i}>Product {i + 1}</Tab>);
              }
              return tabs;
            })()}
          </TabList>
          {(() => {
            const tabPanels = [];
            for (let i = 0; i < 3; i++) {
              tabPanels.push(
                <TabPanel key={i} index={i} keepMounted>
                  <SchedaProdotto
                    nProdotto={i + 1}
                    inputs={props.inputs}
                    handleChange={props.handleChange}
                    handleChangeNft={props.handleChangeNft}
                    setState={props.incrementStep}
                  />
                </TabPanel>
              );
            }
            return tabPanels;
          })()}
        </Tabs>
      </div>
      
            
              <div className="add-btn-box">
              <a onClick={(e)=>props.setState(e,-1)}>Back</a>
              <a onClick={(e)=>props.setState(e,+1)}>Save</a>
            </div>
            
          
      
    </>
  );
};

const SchedaProdotto = (props) => {
  const { t, i18n } = useTranslation();
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [files3, setFiles3] = useState([]);

  const handleFileUpload = (event,n) => {
    const selectedFiles = Array.from(event.target.files);
    if (n === 1){

      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }else if( n===2){
      
      setFiles2((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  else if( n===3){
      
    setFiles3((prevFiles) => [...prevFiles, ...selectedFiles]);
  }
  props.handleChange(event)
  };

  // Funzione per rimuovere un file
  const handleRemoveFile = (fileName,n) => {
    if (n === 1){

      setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    }else if( n===2){
      
      setFiles2((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    }
    else if( n===3){
      
      setFiles3((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    }
    
  };
  return (
    <>
      <div className="ins-input-box">
        <h4>Product name n {props.nProdotto}</h4>
        <input
          name={"name" + props.nProdotto}
          value={props.inputs["name" + props.nProdotto]}
          onChange={props.handleChange}
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="ins-input-box">
        <h4>Description</h4>
        <textarea
          name={"description" + props.nProdotto}
          value={props.inputs["description" + props.nProdotto]}
          onChange={props.handleChange}
          type="text"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>Technical specifications </h4>
        <input
          name={"specs" + props.nProdotto}
          value={props.inputs["specs" + props.nProdotto]}
          onChange={props.handleChange}
          type="text"
          placeholder="Type here"
        />
      </div>
      <div className="ins-input-box">
        <h4>Price</h4>
        <input
          name={"price" + props.nProdotto}
          value={props.inputs["price" + props.nProdotto]}
          onChange={props.handleChange}
          type="number"
          onWheel={(e) => e.target.blur()}
          placeholder="How much"
        />
      </div>
      <div className="ins-input-box">
        <div>
          <h4>Supply</h4>
          <h3>how many copies will be available</h3>
        </div>
        <input
          name={"supply" + props.nProdotto}
          value={props.inputs["supply" + props.nProdotto]}
          onChange={props.handleChange}
          type="number"
          onWheel={(e) => e.target.blur()}
          placeholder="How many?"
        />
      </div>

      <div className="ins-input-box">
        <div>
          <h4>Product photo</h4>
          <h3>This will be displayed on main page.</h3>
        </div>
        <div class="file-upload">
          <input
            name={"fotoProdotto" + props.nProdotto}
            value={props.inputs["fotoProdotto" + props.nProdotto]}
            onChange={(e)=>handleFileUpload(e,props.nProdotto)}
            type="file"
            id="file3"
            multiple
            accept=".png,.jpg,.jpeg"
            class="file-input"
          />
          <label for="file3">
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
      {
        <NftMint
          nProdotto={props.nProdotto}
          inputs={props.inputs}
          handleChangeNft={props.handleChangeNft}
        ></NftMint>
      }
    </>
  );
};

function convertToVariable(str) {
  return eval("var " + str + " = " + "null");
}

const ProdottoHeader = (props) => {
  const { t } = useTranslation();
  return (
    <div className="ins-progress">
      <div className="ins-circle ins-circle-active">
        <img src="/assets/img/info1-complete.svg" alt="" />
        <p>Basic Info</p>
      </div>
      <div className="ins-line ins-line-complete"></div>
      <div className="ins-circle ins-circle-pending">
        <img src="/assets/img/info2-complete.svg" alt="" />
        <p>Survey</p>
      </div>
      <div className="ins-line ins-line-complete"></div>
      <div className="ins-circle ins-circle-pending">
        <img src="/assets/img/info3-complete.svg" alt="" />
        <p>Project</p>
      </div>
      <div className="ins-line ins-line-complete"></div>
      <div className="ins-circle ins-circle-pending">
        <img src="/assets/img/info4-pend.svg" alt="" />
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
  );
};

export { Prodotto, ProdottoHeader };
