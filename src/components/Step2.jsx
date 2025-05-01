import styled from "styled-components";
import { useEffect } from "react";

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

const Step2 = ({
  facilityName,
  setFacilityName,
  selectedRange,
  setSelectedRange,
  selectedCity,
  setSelectedCity,
  setIsStepCompleted,
}) => {
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
  }, [facilityName, selectedRange, selectedCity, setIsStepCompleted]);

  return (
    <>
      <TitleContainer>
        <h2 style={{ fontSize: "30px", fontWeight: "700" }}>Step 2.</h2>
        <NoticeTitle>분석할 공공시설물의 정보를 입력해주세요.</NoticeTitle>
      </TitleContainer>

      <div>
        <label>공공시설물 이름</label>
        <input
          type="text"
          value={facilityName}
          onChange={(e) => setFacilityName(e.target.value)}
        />
      </div>

      <div>
        <label>범위</label>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
        >
          <option value="100m">100m</option>
          <option value="250m">250m</option>
          <option value="500m">500m</option>
          <option value="1km">1km</option>
        </select>
      </div>

      <div>
        <label>지역</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">지역 선택</option>
          <option value="서울특별시">서울특별시</option>
          <option value="부산광역시">부산광역시</option>
          {/* 등등 */}
        </select>
      </div>
    </>
  );
};

export default Step2;
