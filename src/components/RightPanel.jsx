import React, { useState } from "react";
import {Document, Page, pdfjs} from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

export default function RightPanel({ loading, onGenerate, result }) {
  const [numPages, setNumPages] = useState(null);

  const handleLoadSuccess = ({numPages}) => {
    setNumPages(numPages);
  };

  const handleDownload = () => {

  };
  
  return (
    <div className="right-panel">
      <p className="note">📄 본 레포트는 ChatGPT의 도움을 받아 작성됩니다.</p>
      <button className="report-button" onClick={onGenerate} disabled={loading || result} 
      style={{
          backgroundColor: result ? "#4ade80" : "#E6EAF5",
          color: result ? "white" : "#5B7EF0"}}
          >
        {result ? "레포트 작성완료" : "레포트 작성하기"}
      </button>
      {loading && (
        <div className="loading-box">
          작성중입니다...
        </div>
      )}

      {result && (   
        <div className="pdf-viewer-container">
          <div className="generate-complete-message">
            작성이 완료되었습니다!
          </div>
          <div className="pdf-viewer">
            <Document file={result} onLoadSuccess={handleLoadSuccess}>
              {Array.from(new Array(numPages), (_, index) => (
                <Page key={index + 1} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
          <div className="pdf-save-container">
              <button className="pdf-save-button" onClick={handleDownload}>
                pdf로 저장
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
