import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          gap: "20px",
        }}
      >
        <button
          onClick={() => handleStepChange(currentStep - 1)}
          disabled={currentStep === 1}
          style={{
            fontSize: "20px",
            padding: "10px 20px",
            cursor: currentStep === 1 ? "not-allowed" : "pointer",
            opacity: currentStep === 1 ? 0.5 : 1,
          }}
        >
          ← 이전
        </button>
        <button
          onClick={() => handleStepChange(currentStep + 1)}
          disabled={currentStep === 4 || !isNextAbled()}
          style={{
            fontSize: "20px",
            padding: "10px 20px",
            cursor:
              currentStep === 4 || !isNextAbled() ? "not-allowed" : "pointer",
            opacity: currentStep === 4 || !isNextAbled() ? 0.5 : 1,
          }}
        >
          다음 →
        </button>
      </div>
    </Container>
  );
};

export default StepPageWrapper;
