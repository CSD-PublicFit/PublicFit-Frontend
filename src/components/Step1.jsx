import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

import FileUploader from "./FileUploader";

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px; /* 버튼 간 간격 */
  margin-top: 15px;
  margin-left: 10px;
`;

const ToggleButton = styled.button`
  padding: 4px 17px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 100px;
  cursor: pointer;
  background-color: ${({ $bgColor }) => $bgColor || "#F0F0F0"};
  color: ${({ $isSelected, $nameColor }) =>
    $isSelected ? $nameColor : "#A0A0A0"};
  border: ${({ $isSelected, $nameColor }) =>
    $isSelected
      ? `3px solid ${$nameColor || "#3B82F6"}`
      : "3px solid transparent"};

  &:hover {
    border: 3px solid ${({ $nameColor }) => $nameColor || "#3B82F6"};
  }
`;

const ContextBox = styled.div`
  border: 3px solid #6082f0;
  border-radius: 20px;
  margin-top: 15px;
`;

const SemiTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Explain = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  margin-left: 20px;
  margin-bottom: 5px;
`;

const Step1 = ({
  selectedData,
  setSelectedData,
  basicFileInfo,
  setBasicFileInfo,
  basicFileStatus,
  setBasicFileStatus,
  plusFileInfo,
  setPlusFileInfo,
  plusFileStatus,
  setPlusFileStatus,
  setIsStepCompleted,
}) => {
  useEffect(() => {
    const isValid =
      basicFileStatus === "valid" &&
      (plusFileStatus === "idle" ||
        (plusFileInfo && plusFileStatus === "valid"));

    setIsStepCompleted((prev) => {
      const hasStep1 = prev.includes(1);

      if (isValid && !hasStep1) {
        console.log("✅ Step1 완료");
        return [...prev, 1]; // ✅ 조건 만족 → 추가
      } else if (!isValid && hasStep1) {
        console.log("Step1이 완료되지 않았습니다.");
        return prev.filter((step) => step !== 1); // ❌ 조건 불만족 → 제거
      }
      return prev; // 변화 없음
    });
  }, [basicFileStatus, plusFileInfo, plusFileStatus, setIsStepCompleted]);

  return (
    <>
      <TitleContainer>
        <h2 style={{ fontSize: "30px", fontWeight: "700" }}>Step 1.</h2>
        <NoticeTitle>분석할 공공시설물의 데이터를 넣어주세요.</NoticeTitle>
      </TitleContainer>
      <ButtonContainer>
        <ToggleButton
          $nameColor="#6082F0"
          $bgColor="#E6EAF5"
          $isSelected={selectedData === "basic"}
          onClick={() => setSelectedData("basic")}
        >
          기본 데이터
        </ToggleButton>
        <ToggleButton
          $nameColor="#6082F0"
          $bgColor="#E6EAF5"
          $isSelected={selectedData === "plus"}
          onClick={() => setSelectedData("plus")}
        >
          중요 변수 데이터
        </ToggleButton>
      </ButtonContainer>
      <ContextBox>
        <div style={{ display: selectedData === "basic" ? "block" : "none" }}>
          <SemiTitle>기본 데이터 파일 첨부(필수)</SemiTitle>
          <Explain>분석할 공공시설물의 데이터를 넣어주세요.</Explain>
          <Explain>.csv 파일만 허용합니다.</Explain>
          <FileUploader
            category={selectedData}
            fileInfo={basicFileInfo}
            setFileInfo={setBasicFileInfo}
            validationStatus={basicFileStatus}
            setValidationStatus={setBasicFileStatus}
          />
        </div>
        <div style={{ display: selectedData === "plus" ? "block" : "none" }}>
          <SemiTitle>중요 변수 데이터 파일 첨부(선택)</SemiTitle>
          <Explain>
            분석할 공공시설물과 관련된 중요 변수 데이터를 넣어주세요.
          </Explain>
          <Explain>.csv 파일만 허용합니다.</Explain>
          <FileUploader
            category={selectedData}
            fileInfo={plusFileInfo}
            setFileInfo={setPlusFileInfo}
            validationStatus={plusFileStatus}
            setValidationStatus={setPlusFileStatus}
          />
        </div>
      </ContextBox>
    </>
  );
};

export default Step1;
