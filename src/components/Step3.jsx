import styled from "styled-components";
import { useState, useRef } from "react";

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
  border: 3px solid #6082f0;
  border-radius: 20px;
`;

const AnalyzeButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 17px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  border-radius: 5px;
  border: transparent;
  background-color: #6082f0;
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
}) => {
  return (
    <>
      <TitleContainer>
        <h2 style={{ fontSize: "30px", fontWeight: "700" }}>Step 3.</h2>
        <NoticeTitle>{facilityName}에 대한 분석을 시작합니다.</NoticeTitle>
      </TitleContainer>

      <ContextBox>
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
        <AnalyzeButton onClick={console.log("분석을 시작합니다.")}>
          분석 시작
        </AnalyzeButton>
      </ContextBox>
    </>
  );
};

export default Step3;
