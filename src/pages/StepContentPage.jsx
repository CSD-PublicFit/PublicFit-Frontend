import styled from "styled-components";
import { useState, useRef } from "react";

import FileUploader from "../components/FileUploader";

import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";

const ContentBox = styled.div`
  margin-top: 30px;
  margin-left: 15px;
`;

const StepContentPage = ({
  currentStep,
  isStepCompleted,
  setIsStepCompleted,
  navigate,
}) => {
  // Step1
  const [selectedData, setSelectedData] = useState("basic"); // 데이터 종류에 따른 화면 전환에 필요
  const [basicFileInfo, setBasicFileInfo] = useState(null); // 기본 데이터 파일
  const [plusFileInfo, setPlusFileInfo] = useState(null); // 중요 변수 데이터 파일
  const [basicFileStatus, setBasicFileStatus] = useState("idle"); // 기본 데이터 파일 상태
  const [plusFileStatus, setPlusFileStatus] = useState("idle"); // 중요 변수 데이터 파일 상태

  // Step2
  const [facilityName, setFacilityName] = useState(""); // 분석할 공공시설물 이름
  const [selectedRange, setSelectedRange] = useState("100"); // 공공시설물 상권 범위
  const [selectedCity, setSelectedCity] = useState(""); // 예측하고 싶은 시

  return (
    <ContentBox>
      {currentStep === 1 && (
        <Step1
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          basicFileInfo={basicFileInfo}
          setBasicFileInfo={setBasicFileInfo}
          basicFileStatus={basicFileStatus}
          setBasicFileStatus={setBasicFileStatus}
          plusFileInfo={plusFileInfo}
          setPlusFileInfo={setPlusFileInfo}
          plusFileStatus={plusFileStatus}
          setPlusFileStatus={setPlusFileStatus}
          setIsStepCompleted={setIsStepCompleted}
        />
      )}
      {currentStep === 2 && (
        <Step2
          facilityName={facilityName}
          setFacilityName={setFacilityName}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          setIsStepCompleted={setIsStepCompleted}
        />
      )}
      {currentStep === 3 && (
        <Step3
          facilityName={facilityName}
          basicFileInfo={basicFileInfo}
          plusFileInfo={plusFileInfo}
          selectedRange={selectedRange}
          selectedCity={selectedCity}
          isStepCompleted={isStepCompleted}
          setIsStepCompleted={setIsStepCompleted}
        />
      )}
      {currentStep === 4 && (
      <Step4 
      facilityName={facilityName}
      basicFileInfo={basicFileInfo}
      plusFileInfo={plusFileInfo}
      />)}
    </ContentBox>
  );
};

export default StepContentPage;
