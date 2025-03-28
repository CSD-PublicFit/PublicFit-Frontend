import React, { useState } from "react";
import "../ReportPage.css";

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
      {/* 상단 타이틀 영역 */}
      <div className="header">
        <h1 className="title">Service Title</h1>
      </div>

      {/* 본문 좌우 패널 */}
      <div className="content">
        <div className="left-panel">
          <button className="back-button">← 이전페이지</button>
          <p className="description">
            다음의 데이터들로 <span className="highlight">분석 결과 레포트</span>를 생성합니다.
          </p>
          <ul className="data-list">
            <li>✅ 격자_100m_데이터_대전</li>
            <li>✅ 공공시설물: 어린이집</li>
            <li>✅ 사용된 변수명:
              <ul className="sub-list">
                <li>- 인구수_여</li>
                <li>- 버스정류장 수</li>
                <li>- 상가_업종, 상가_수</li>
                <li>- CCTV_수</li>
                <li>- 건축물_종류_아파트</li>
              </ul>
            </li>
            <li>✅ 예측 이미지:</li>
          </ul>
          <div className="map-placeholder">(지도 이미지 공간)</div>
        </div>

        <div className="right-panel">
          <p className="note">📄 본 레포트는 ChatGPT의 도움을 받아 작성됩니다.</p>
          <button className="report-button" onClick={handleGenerateReport} disabled={loading}>
            레포트 작성하기
          </button>
          {loading && (
            <div className="loading-box">
              작성중입니다 ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}