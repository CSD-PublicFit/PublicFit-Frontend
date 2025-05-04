import styled from "styled-components";
import { useContext, useState } from "react";

import { mockAnalysisResult } from "../mock/GangWan";
import { MapDataContext } from "../context/MapDataContext";
import { regionCoordinates } from "../mock/change";
import { uploadFile } from "../api/uploadFile";

const TitleContainer = styled.div`
  display: flex;
  gap: 13px;
`;

const NoticeTitle = styled.p`
  color: #666666;
  display: block;
  margin-top: 17px;
  font-size: 15px;
`;

const ContextBox = styled.div`
  border: 3px solid
    ${({ $isCompleted }) => ($isCompleted ? "#008C25" : "#6082f0")};
  border-radius: 20px;
`;

const AnalyzeButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 17px;
  font-weight: 500;
  color: #ffffff;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border-radius: 5px;
  border: transparent;
  background-color: ${({ $isCompleted }) =>
    $isCompleted ? "#008C25" : "#6082f0"};
`;

const FileNameContainer = styled.div`
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 400;
  color: #6082f0;
  background-color: #e6eaf5;
  border-radius: 100px;
  border: 2px solid #6082f0;
  width: fit-content; /* ✅ 자식 내용 크기만큼 너비 설정 */
  padding: 2px 7px; /* ✅ 약간의 여백 주는 게 자연스러움 */
`;

const FlexContainer = styled.div`
  display: flex;
`;

const Step3 = ({
  facilityName,
  basicFileInfo,
  plusFileInfo,
  selectedRange,
  isStepCompleted,
  setIsStepCompleted,
}) => {
  const step3Completed = isStepCompleted.includes(3);
  const { setRegionData, setExistingLocation, setPredictedLocation } =
    useContext(MapDataContext);

  const handleUploadFile = async () => {
    try {
      /*const result = await uploadFile({
        facilityName: facilityName,
        basicFileInfo: basicFileInfo,
        plusFileInfo: plusFileInfo, 
        selectedRange: selectedRange,
      });  -> api 연결용 */
      const { regionCoordinates, existingLocations, predictedLocations } =
        mockAnalysisResult; // 목업데이터
      setRegionData(regionCoordinates);
      setExistingLocation(existingLocations);
      setPredictedLocation(predictedLocations);
      console.log("데이터를 컨텍스트에 다 할당함");

      // ✅ API 성공 시 step 3 완료 표시 및 설정
      setIsStepCompleted((prev) => {
        const hasStep3 = prev.includes(3);
        if (!hasStep3) {
          console.log("✅ Step3 완료");
          return [...prev, 3];
        }
        return prev;
      });
    } catch (error) {
      console.error("분석 실패:", error);
      alert("분석에 실패했습니다.");
    }
  };

  return (
    <>
      <TitleContainer>
        <h2 style={{ fontSize: "30px", fontWeight: "700" }}>Step 3.</h2>
        <NoticeTitle>{facilityName}에 대한 분석을 시작합니다.</NoticeTitle>
      </TitleContainer>

      <ContextBox $isCompleted={step3Completed}>
        <FlexContainer>
          <p>기본 데이터 :</p>
          <FileNameContainer>{basicFileInfo.name}</FileNameContainer>
        </FlexContainer>
        <FlexContainer>
          <p>중요 변수 데이터 : </p>
          {plusFileInfo ? (
            <FileNameContainer>{plusFileInfo.name}</FileNameContainer>
          ) : (
            <p>없음</p>
          )}
        </FlexContainer>
        <p>분석 상권 범위 : {selectedRange}</p>
        <hr></hr>
        <AnalyzeButton
          $isCompleted={step3Completed}
          disabled={step3Completed}
          onClick={handleUploadFile}
        >
          {step3Completed ? "분석 완료" : "분석 시작"}
        </AnalyzeButton>
      </ContextBox>
    </>
  );
};

export default Step3;
