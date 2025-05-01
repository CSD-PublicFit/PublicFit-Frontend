import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StepNumberButton from "../components/StepNumberButton";
import StepContentPage from "./StepContentPage";
import StepPageWrapper from "../components/StepPageWrapper";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f1f5f8;
  justify-content: center;
  align-items: center;
`;

const SelectText = styled.p`
  font-size: 35px;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px; /* 버튼 간 간격 */
`;

const ToggleButton = styled.button`
  padding: 4px 17px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 100px;
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor || "#F0F0F0"};
  color: ${({ isSelected, nameColor }) => (isSelected ? nameColor : "#A0A0A0")};
  border: ${({ isSelected, nameColor }) =>
    isSelected
      ? `3px solid ${nameColor || "#3B82F6"}`
      : "3px solid transparent"};

  &:hover {
    border: 3px solid ${({ nameColor }) => nameColor || "#3B82F6"};
  }
`;

const NumberButton = styled.button`
  width: 50px;
  height: 50px;
  padding: 4px 10px;
  font-size: 30px;
  font-weight: 600;
  border-radius: 50%;
  cursor: pointer;
  color: ${({ isSelected, nameColor }) => (isSelected ? nameColor : "#ADADAD")};
  border: ${({ isSelected, nameColor }) =>
    isSelected ? `4px solid ${nameColor}` : "4px solid #ADADAD"};

  &:hover {
    border: 4px solid ${({ nameColor }) => nameColor || "#3B82F6"};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 15px;
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
