"";
import React, { useState } from "react";
import { useTranslation } from "../../i18n/client";

const NftMint = (props) => {
  const { t } = useTranslation();
  const [val, setVal] = useState([]);
  const handleAdd = (e) => {
    e.preventDefault();
    const abc = [...val, []];
    setVal(abc);
  };
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
  };
  const handleDelete = (e, i) => {
    e.preventDefault();
    const deletVal = [...val];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };
  const [files, setFiles] = useState([]);

  // Funzione per gestire il caricamento dei file
  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
 

      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
   
  props.handleChange(event,props.nProdotto-1)
  };

  // Funzione per rimuovere un file
  const handleRemoveFile = (fileName,n) => {
 

      setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    
      
     
    
    
  };
  return (
    <div className="ins-input-box">
      <div>
        <h4>NFT photo</h4>
        <h3>This will be displayed on product.</h3>
      </div>

      <div class="file-upload">
        <input
          name="imageNftDef"
          // onChange={(e) => props.handleChangeNft(e, props.nProdotto - 1)}
          onChange={(e)=>handleFileUpload(e)}
          type="file"
          id="file4"
          multiple
          accept=".png,.jpg,.jpeg"
          class="file-input"
        />
        <label for="file4">
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
  );
};

const NftMintHeader = (props) => {
  const { t } = useTranslation();
  return (
    <div className="ins-progress">
      <div className="ins-circle ins-circle-done">
        <p>{t("infobase")}</p>
      </div>
      <div className="ins-line ins-line-done"></div>
      <div className="ins-circle ins-circle-done">
        <p>{t("survey")}</p>
      </div>
      <div className="ins-line ins-line-done"></div>
      <div className="ins-circle ins-circle-done">
        <p>{t("project")}</p>
      </div>
      <div className="ins-line ins-line-done"></div>
      <div className="ins-circle ins-circle-done">
        <p>{t("product")}</p>
      </div>
      <div className="ins-line ins-line-done"></div>
      <div className="ins-circle ins-circle-active">
        <p>NFTs Mint</p>
      </div>
      <div className="ins-line ins-line-pending"></div>
      <div className="ins-circle ins-circle-pending">
        <p>FAQ</p>
      </div>
    </div>
  );
};

export { NftMint, NftMintHeader };
