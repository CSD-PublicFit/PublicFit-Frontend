import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import "../CSS/ReportPage.css";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import TopTitle from "../components/TopTitle"

import { Navigate, useLocation } from "react-router-dom";
import { MapDataContext } from "../context/MapDataContext";

const TopLine = styled.hr`
  background-color: #545454;
  height: 4px;
  border: none;
`;

const b64ToBlob = (b64Data, contentType='application/pdf', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
const createReportURL = (selection_id = 0) => {
  const URL = `${import.meta.env.VITE_API_URL}/api/report/generate?selection_id=${selection_id}`;
  console.log("Request URL:", URL);
  return URL;
};

export default function ReportPage({selection_id}) {
  const location = useLocation();
  // location.state가 없으면 바로 redirect (렌더링 자체를 하지 않음)
  if (!location.state) {
    return <Navigate to="/" replace />;
  }
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [inform_list, setInformList] = useState(null);
  
  const { imageUrl, facilityName, basicFileInfo, plusFileInfo } = location.state || {};
  const {selectionId} = useContext(MapDataContext);

  const handleGenerateReport = async () => {
    setLoading(true);
  
    try {
      const response = await fetch(createReportURL(selectionId), {
        method: "POST",
        headers: {
          'ngrok-skip-browser-warning' : '69420',
        }
      });

      const result = await response.json();
      console.log("Report Info:", result["report_info"]);
      const pdfUrl=result["report_pdf"];
      setResult(URL.createObjectURL(b64ToBlob(pdfUrl)));
      setInformList(result["report_info"]);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("리포트 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="report-page">
      <TopTitle />
      <TopLine />
      <div className="content">
        {/*<LeftPanel />*/}
        <LeftPanel imageUrl={imageUrl} facilityName={facilityName} basicFileInfo={basicFileInfo} plusFileInfo={plusFileInfo}/>
        {/*<LeftPanel/>*/}
        <RightPanel loading={loading} onGenerate={handleGenerateReport} result={result}/>
      </div>
    </div>
  );
}
