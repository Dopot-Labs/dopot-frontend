/* eslint-disable jsx-a11y/anchor-is-valid */
"";
import React, { useState, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useTranslation } from "../i18n/client";
import { getFileFromIPFS } from "@/utils/firebase/ipfs-db";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const TabDocumenti = (props) => {
  const { t } = useTranslation();
  const [numPages, setNumPages] = useState(null);
  const [showPdfs, setShowPdfs] = useState(
    Array(props.progetto.documentazioneListFiles.length).fill(false)
  );
  const [pdfBlobs, setPdfBlobs] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const documentazioneListFiles = useMemo(
    () => props.progetto.documentazioneListFiles,
    [props.progetto.documentazioneListFiles]
  );

  useEffect(() => {
    const fetchPdfs = async () => {
      try{

        const blobs = await Promise.all(
          documentazioneListFiles.map(async (data) => {
        
            const response = await  getFileFromIPFS(data);
            
            return URL.createObjectURL(response);
            
          })
        );
        setPdfBlobs(blobs);
      } catch (error) {
        console.error('Error fetching files from IPFS:', error);
      }
    };

    fetchPdfs();
  }, [documentazioneListFiles]);




  const handleClick = (index) => {
    const newIsVisible = [...showPdfs];
    newIsVisible[index] = !newIsVisible[index];
    setShowPdfs(newIsVisible);
  };

  return (
    <div className="pc-content-grid-left">
      <h1>Documents</h1>

      {pdfBlobs.map((blob, i) => (
        <div
          key={"document" + i}
          style={{
            textAlign: "center",
            border: " 4px solid #ED6154",
            padding: "1rem",
            backgroundColor: "#ED6154",
            borderRadius: "0.5rem",
            outline: 0,
            margin: "3rem auto",
          }}
        >
          <h3>
            <button
              style={{
                backgroundColor: "#ED6154",
                color: "white",
                margin: "1rem",
              }}
              onClick={() => handleClick(i)}
            >
              Documents {i + 1}
            </button>
          </h3>
          {showPdfs[i] && blob && (
            <Document file={blob} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  scale={1}
                />
              ))}
            </Document>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabDocumenti;
