import styled from "styled-components";
import { useEffect } from "react";
import useStepStore from "../store/stepStore";

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

const InputContainer = styled.div`
  flex-direction: column;
  margin-left: 20px;
  margin-top: 15px;
`;

const InputBox = styled.input`
  padding: 5px 10px;
  border: 2px solid #6082f0;
  border-radius: 10px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #3b66f6;
    box-shadow: 0 0 5px rgba(96, 130, 240, 0.5);
  }
`;

const SelectBox = styled.select`
  padding: 5px 15px;
  border: 2px solid #6082f0;
  border-radius: 10px;
  font-size: 16px;
  background-color: white;
  outline: none;

  &:focus {
    border-color: #3b66f6;
    box-shadow: 0 0 5px rgba(96, 130, 240, 0.5);
  }
`;

const Step2 = (/*{
  facilityName,
  setFacilityName,
  selectedRange,
  setSelectedRange,
  selectedCity,
  setSelectedCity,
  setIsStepCompleted,
}*/) => {
  const { facilityName, setFacilityName, selectedRange, setSelectedRange, selectedCity, setSelectedCity, addStepCompleted, removeStepCompleted, } = useStepStore();

  useEffect(() => {
    const isValid =
      facilityName.trim() !== "" &&
      selectedRange !== "" &&
      selectedCity !== "";

    if (isValid) {
      console.log("✅ Step2 완료");
      addStepCompleted(2);
    } else {
      console.log("❌ Step2 미완료");
      removeStepCompleted(2);
    }
  }, [facilityName, selectedRange, selectedCity, addStepCompleted, removeStepCompleted]);

  /*
  useEffect(() => {
    const isValid =
      facilityName.trim() !== "" && selectedRange !== "" && selectedCity !== "";

    setIsStepCompleted((prev) => {
      const hasStep2 = prev.includes(2);

      if (isValid && !hasStep2) {
        console.log("✅ Step2 완료");
        return [...prev, 2];
      } else if (!isValid && hasStep2) {
        console.log("❌ Step2 미완료");
        return prev.filter((step) => step !== 2);
      }
      return prev;
    });
  }, [facilityName, selectedRange, selectedCity, setIsStepCompleted]);*/

  return (
    <>
      <TitleContainer>
        <h2 style={{ fontSize: "30px", fontWeight: "700" }}>Step 2.</h2>
        <NoticeTitle>입력한 데이터의 공공시설물 정보를 입력해주세요.</NoticeTitle>
      </TitleContainer>

      <InputContainer>
        <div style={{ marginBottom: "10px" }}>
          <label>공공시설물 이름 : </label>
          <InputBox
            type="text"
            placeholder="공공시설물 이름을 입력하세요."
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>공공시설물 범위 : </label>
          <SelectBox
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </SelectBox>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>공공시설물 지역 : </label>
          <SelectBox
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">지역 선택</option>
            <option value="서울특별시">서울특별시</option>
            <option value="부산광역시">부산광역시</option>
            <option value="대구광역시">대구광역시</option>
            <option value="인천광역시">인천광역시</option>
            <option value="광주광역시">광주광역시</option>
            <option value="대전광역시">대전광역시</option>
            <option value="울산광역시">울산광역시</option>
            <option value="세종특별자치시">세종특별자치시</option>
            <option value="경기도">경기도</option>
            <option value="강원특별자치도">강원특별자치도</option>
            <option value="충청북도">충청북도</option>
            <option value="충청남도">충청남도</option>
            <option value="전라북도">전라북도</option>
            <option value="전라남도">전라남도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
            <option value="제주특별자치도">제주특별자치도</option>
            {/* 등등 */}
          </SelectBox>
        </div>
      </InputContainer>
    </>
  );
};

export default Step2;
