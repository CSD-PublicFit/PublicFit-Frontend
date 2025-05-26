import styled from "styled-components";
import React, { useState } from "react";
import "../CSS/ReportPage.css";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import TopTitle from "../components/TopTitle"

import { useLocation } from "react-router-dom";

const TopLine = styled.hr`
  background-color: #545454;
  height: 4px;
  border: none;
`;

export default function ReportPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const location = useLocation();
  const { imageUrl, predictedLocation } = location.state || {};


  const handleGenerateReport = async () => {
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:3001/report/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) throw new Error("리포트 생성 실패");
  
      // PDF 응답을 blob으로 받기
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      
      setResult(pdfUrl);
  
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
        <LeftPanel imageUrl={imageUrl} predictedLocation={predictedLocation}/>
        {/*<LeftPanel/>*/}
        <RightPanel loading={loading} onGenerate={handleGenerateReport} result={result}/>
      </div>
    </div>
  );
}
