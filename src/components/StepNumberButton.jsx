import styled from "styled-components";
import useStepStore from "../store/stepStore";

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-left: 15px;
  margin-top: 10px;
`;

const NumberButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 2.5px 8px;
  font-size: 25px;
  font-weight: 600;
  border-radius: 50%;
  color: ${({ $isSelected, $isCompleted, $nameColor }) =>
    $isSelected || $isCompleted ? $nameColor : "#ADADAD"};
  border: ${({ $isSelected, $isCompleted, $nameColor }) =>
    $isSelected || $isCompleted
      ? `4px solid ${$nameColor}`
      : "4px solid #ADADAD"};
`;

const StepNumberButton = () => {
  // selectNumber 대신 currentStep을 바로 사용
  const steps = [1, 2, 3, 4];

  const { currentStep, isStepCompleted} = useStepStore();

  return (
    <ButtonContainer>
      {steps.map((step) => (
        <NumberButton
          key={step}
          $nameColor="#6082F0"
          $isSelected={currentStep === step}
          //$isCompleted={Array.isArray(isStepCompleted) && isStepCompleted.includes(step)}
          $isCompleted={isStepCompleted.includes(step)}
        >
          {step}
        </NumberButton>
      ))}
    </ButtonContainer>
  );
};

export default StepNumberButton;
