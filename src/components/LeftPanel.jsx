import { List } from "@react-pdf/renderer";
import { useContext } from "react";
import styled from "styled-components";
import { MapDataContext } from "../context/MapDataContext";

const checkGreen = `${window.location.origin}/assets/CheckGreen.png`;

const Container = styled.div`
  width: 35%;
  padding: 20px 50px;
  background-color: #E6EAF5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const BackButton = styled.button`
  background: none;
    border: none;
    color: #999;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: left;
    cursor: pointer;
`
const Description = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
`
const Highlight = styled.span`
  font-weight: 700;
  color: #000;
`
const MainList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 20px;
  font-size: 16px;
  color: #222;
`
const ListContainer = styled.div`
  display: flex;
  gap: 10px;
`
const CheckIcon = styled.img`
  width: 20px;
  height: 20px;
`
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

export default function LeftPanel({imageUrl, inform_list, facilityName, basicFileInfo, plusFileInfo}) {
  const handleBack = () => {
    history.back(); // 브라우저 뒤로 가기
  };

  const { importantVariables, regionData, predictedLocation } = useContext(MapDataContext); // 위치 정보 가져오기

  // 확인용 콘솔 로그
  //console.log("📍 imageUrl:", imageUrl);
  //console.log("📍 predictedLocation:", predictedLocation);
  //console.log("📍 inform_list:", inform_list);
  //console.log("📍 facilityName:", facilityName)
  //console.log("📍 basicFileInfo:", basicFileInfo.name)
  //console.log("📍 plusFileInfo:", plusFileInfo && plusFileInfo.name ? (plusFileInfo.name): ("파일 정보 없음"));
  //console.log("📍 importantVariables:", importantVariables);

  
  return (
    <Container>
      <BackButton onClick={handleBack}>← 이전페이지</BackButton>
      <Description>
        다음의 데이터들로 <Highlight>분석 결과 레포트</Highlight>를 생성합니다.
      </Description>
      <MainList>
        <ListContainer>
          <CheckIcon src={checkGreen} alt="Check" className="check-icon" />
          <li><Highlight>사용된 파일</Highlight> : {basicFileInfo.name} {plusFileInfo && (<>, {plusFileInfo.name}</>)}</li>
        </ListContainer>
        <ListContainer>
          <CheckIcon src={checkGreen} alt="Check" className="check-icon" />
          <li><Highlight>공공시설물명</Highlight> : {facilityName}</li>
        </ListContainer>
        <ListContainer>
          <CheckIcon src={checkGreen} alt="Check" className="check-icon" />
          <li>
            사용된 변수명:
            {importantVariables && importantVariables.length > 0 && (
              <ul className="sub-list">
                {importantVariables.slice(0, 5).map((variable, index) => (
                  <li key={index}>{variable}</li>
                ))}
                {importantVariables.length > 5 && (
                  <li>외 {importantVariables.length - 5}개 더 있음</li>
                )}
              </ul>
            )}
            </ul>
          </li>
        </ListContainer>
        <ListContainer>
          <CheckIcon src={checkGreen} alt="Check" className="check-icon" />
          <li><Highlight>예측 이미지</Highlight> :</li>
        </ListContainer>
          {/* 지도 이미지 출력 */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="예측 위치 지도"
              style={{ width: "110%", borderRadius: "10px", marginBottom: "10px" }}
            />
          )}
      </MainList>
    </Container>
  );
}
