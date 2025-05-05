import React, { useState } from "react";
import "../CSS/ReportPage.css";
import ReportHeader from "../components/ReportHeader";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

export default function ReportPage() {
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="report-page">
      <ReportHeader />
      <div className="content">
        <LeftPanel />
        <RightPanel loading={loading} onGenerate={handleGenerateReport} />
      </div>
    </div>
  );
}
