import React from "react";

/*
inform_list 
"facility_name": "공공자전거",
"file_name": "Daejeon_Bicycle_Data.csv",
"region": "대전광역시",
"target_area": "100m",
"important_variables": [
      "인구밀도",
      "교통량",
      "상권지수",
      "대중교통_접근성",
      "소득수준"
    ]
  */

export default function LeftPanel({imageUrl, predictedLocation, inform_list}) {
  const handleBack = () => {
    history.back(); // 브라우저 뒤로 가기
  };

  // 확인용 콘솔 로그
  console.log("📍 imageUrl:", imageUrl);
  console.log("📍 predictedLocation:", predictedLocation);

  return (
    <div className="left-panel">
      <button className="back-button" onClick={handleBack}>← 이전페이지</button>
      {/* 지도 이미지 확인용 출력 */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="예측 위치 지도"
          style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
        />
      )}
      
      {inform_list && (
        <>
        <p className="description">
            다음의 데이터들로 <span className="highlight">분석 결과 레포트</span>를 생성합니다.
          </p>
          <ul className="data-list">
            <li>✅ {inform_list.file_name}</li>
            <li>✅ 공공시설물: {inform_list.facility_name}</li>
            <li>✅ 사용된 변수명:
              <ul className="sub-list">
                {inform_list.important_variables.map((variable, index) => (
                  <li key={index}> {variable}</li>
                ))}
              </ul>
            </li>
            <li>✅ 예측 이미지:</li>
          </ul>
          </>
      )}
    </div>
  );
}
