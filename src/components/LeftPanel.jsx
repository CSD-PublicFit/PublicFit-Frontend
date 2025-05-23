import React from "react";

export default function LeftPanel({imform_list}) {
  const handleBack = () => {
    history.back(); // 브라우저 뒤로 가기
  };

  return (
    <div className="left-panel">
      <button className="back-button" onClick={handleBack}>← 이전페이지</button>
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
  );
}
