import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StepNumberButton from "../components/StepNumberButton";
import StepContentPage from "./StepContentPage";
import StepPageWrapper from "../components/StepPageWrapper";

const Container = styled.div`
  width: 50vw;
  background-color: #f1f5f8;
  justify-content: center;
  align-items: center;
`;

const SelectText = styled.p`
  font-size: 25px;
  font-weight: 500;
  margin-left: 15px;
`;

const StepPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 현재 스텝
  const [isStepCompleted, setIsStepCompleted] = useState([]); // 완료된 스텝 번호들

  return (
    <Container>
      <SelectText>다음을 선택해주세요.</SelectText>
      <StepNumberButton
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        isStepCompleted={isStepCompleted}
      />
      <StepContentPage
        currentStep={currentStep}
        isStepCompleted={isStepCompleted}
        setIsStepCompleted={setIsStepCompleted}
        navigate={navigate}
      />
      <StepPageWrapper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        isStepCompleted={isStepCompleted}
      />
    </Container>
  );
};

export default StepPage;
