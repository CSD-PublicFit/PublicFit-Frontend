import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const NumberButton = styled.button`
  width: 50px;
  height: 50px;
  padding: 4px 10px;
  font-size: 30px;
  font-weight: 600;
  border-radius: 50%;
  cursor: pointer;
  color: ${({ isSelected, isCompleted, nameColor }) =>
    isSelected || isCompleted ? nameColor : "#ADADAD"};
  border: ${({ isSelected, isCompleted, nameColor }) =>
    isSelected || isCompleted ? `4px solid ${nameColor}` : "4px solid #ADADAD"};

  &:hover {
    border: 4px solid ${({ nameColor }) => nameColor || "#3B82F6"};
  }
`;

const StepNumberButton = ({ currentStep, isStepCompleted, setCurrentStep }) => {
  // selectNumber 대신 currentStep을 바로 사용
  const steps = [1, 2, 3, 4];

  return (
    <ButtonContainer>
      {steps.map((step) => (
        <NumberButton
          key={step}
          nameColor="#6082F0"
          isSelected={currentStep === step}
          isCompleted={isStepCompleted.includes(step)}
          onClick={() => setCurrentStep(step)}
        >
          {isStepCompleted.includes(step) ? "✓" : step}
        </NumberButton>
      ))}
    </ButtonContainer>
  );
};

export default StepNumberButton;
