import styled from "styled-components";

import prevActive from "../assets/ArrowLeftAct.png";
import prevDisabled from "../assets/ArrowLeftDeact.png";
import nextActive from "../assets/ArrowRightAct.png";
import nextDisabled from "../assets/ArrowRightDeact.png";


const Container = styled.div`
  justify-content: center;
  align-items: center;
`;

const StepPageWrapper = ({ currentStep, setCurrentStep, isStepCompleted }) => {
  const handleStepChange = (newStep) => {
    if (newStep >= 1 && newStep <= 4) {
      setCurrentStep(newStep);
    }
  };

  // 다음단계 활성화 여부
  const isNextAbled = () => {
    return isStepCompleted.includes(currentStep);
  };

  return (
    <Container>
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "250px",
        }}
      >
        {/* 이전 버튼 */}
        <img
          src={currentStep === 1 ? prevDisabled : prevActive}
          onClick={() => handleStepChange(currentStep - 1)}
          style={{
            width: "35px",
            height: "35px",
            cursor: currentStep === 1 ? "not-allowed" : "pointer",
            opacity: currentStep === 1 ? 0.5 : 1,
          }}
          alt="이전"
        />

        {/* 다음 버튼 */}
        <img
          src={
            currentStep === 4 || !isNextAbled() ? nextDisabled : nextActive
          }
          onClick={() => handleStepChange(currentStep + 1)}
          style={{
            width: "35px",
            height: "35px",
            cursor:
              currentStep === 4 || !isNextAbled() ? "not-allowed" : "pointer",
            opacity: currentStep === 4 || !isNextAbled() ? 0.5 : 1,
          }}
          alt="다음"
        />
      </div>
    </Container>
  );
};

export default StepPageWrapper;
