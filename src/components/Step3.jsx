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
  margin-top: 20px;
  margin-right: 20px;
  padding: 20px 5px;
`;

const AnalyzeButton = styled.button`
  width: 80px;
  height: 40px;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border-radius: 5px;
  border: transparent;
  background-color: ${({ $isCompleted }) =>
    $isCompleted ? "#008C25" : "#6082f0"};
  margin-left: 15px;
  margin-top: 10px;
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
  margin-left: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Explain = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  margin-left: 20px;
  margin-bottom: 5px;
`;

const Step3 = ({
  facilityName,
  basicFileInfo,
  plusFileInfo,
  selectedRange,
  selectedCity, //api 연결때 쓰여용
  isStepCompleted,
  setIsStepCompleted,
}) => {
  const step3Completed = isStepCompleted.includes(3);
  const {
    setImportantVariables,
    setRegionData,
    setExistingLocation,
    setPredictedLocation,
  } = useContext(MapDataContext);
  const [isLoading, setIsLoading] = useState(false);
  console.log(selectedRange);

  /*const handleUploadFile = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const result = await uploadFile({
        facilityName: facilityName,
        basicFileInfo: basicFileInfo,
        plusFileInfo: plusFileInfo,
        selectedRange: selectedRange,
        selectedCity: selectedCity,
      }); 
      //-> api 연결용
      const { regionCoordinates, existingLocations, predictedLocations } =
        mockAnalysisResult; 
        // 목업데이터

      // result 구조 안에 실제 데이터가 들어 있는 위치
      const analysisResult = result?.data?.analysis_result;
      console.log("⭐응답은 옴");

      if (analysisResult) {
        const {
          importantVariables,
          regionCoordinates,
          existingLocations,
          predictedLocations,
        } = analysisResult;

        setImportantVariables(importantVariables);
        setRegionData(regionCoordinates);
        setExistingLocation(existingLocations);
        setPredictedLocation(predictedLocations);

        console.log("⭐데이터를 컨텍스트에 다 할당함");
      } else {
        console.error("분석 결과가 없습니다.");
      }

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
    }finally {
    setIsLoading(false); // 로딩 종료
  }
  };*/
  const handleUploadFile = async() => {
    setIsLoading(true); // 로딩 시작
  try {
    // 👉 2초 딜레이 (2000ms)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 목업 사용이든 실제 API든 동일하게
    const {
      regionCoordinates,
      existingLocations,
      predictedLocations,
      importantVariables = [],
    } = mockAnalysisResult;

    setImportantVariables(importantVariables);
    setRegionData(regionCoordinates);
    setExistingLocation(existingLocations);
    setPredictedLocation(predictedLocations);

    setIsStepCompleted((prev) => (prev.includes(3) ? prev : [...prev, 3]));
  } catch (error) {
    console.error("분석 실패:", error);
    alert("분석에 실패했습니다.");
  } finally {
    setIsLoading(false); // 로딩 종료
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
          <Explain>기본 데이터 :</Explain>
          <FileNameContainer>{basicFileInfo.name}</FileNameContainer>
        </FlexContainer>
        <FlexContainer>
          <Explain>중요 변수 데이터 : </Explain>
          {plusFileInfo ? (
            <FileNameContainer>{plusFileInfo.name}</FileNameContainer>
          ) : (
            <Explain>없음</Explain>
          )}
        </FlexContainer>
        <Explain>분석 상권 범위 : {selectedRange}</Explain>
        <hr
          style={{
            height: "1.7px",
            backgroundColor: "#666666",
            marginTop: "15px",
          }}
        ></hr>
        {/*<AnalyzeButton
          $isCompleted={step3Completed}
          disabled={step3Completed}
          onClick={handleUploadFile}
        >
          {step3Completed ? "분석 완료" : "분석 시작"}
        </AnalyzeButton>*/}
        <AnalyzeButton
          $isCompleted={step3Completed}
          disabled={step3Completed || isLoading}
          onClick={handleUploadFile}
        >
          {isLoading ? "분석 중..." : step3Completed ? "분석 완료" : "분석 시작"}
        </AnalyzeButton>
      </ContextBox>
    </>
  );
};

export default Step3;
