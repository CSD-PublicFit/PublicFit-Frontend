import styled from "styled-components";
import useStepStore from "../store/stepStore";

const prevActive = `${window.location.origin}/assets/ArrowLeftAct.png`;
const prevDisabled = `${window.location.origin}/assets/ArrowLeftDeact.png`;
const nextActive = `${window.location.origin}/assets/ArrowRightAct.png`;
const nextDisabled = `${window.location.origin}/assets/ArrowRightDeact.png`;


const Container = styled.div`
  justify-content: center;
  align-items: center;
`;

const StepPageWrapper = () => {

  const { currentStep, setCurrentStep, isStepCompleted} = useStepStore();

  const handleStepChange = (newStep) => {
    if (newStep >= 1 && newStep <= 4) {
      setCurrentStep(newStep);
    }
  };

  // 다음단계 활성화 여부
  const isNextAbled = () => {
    return Array.isArray(isStepCompleted) && isStepCompleted.includes(currentStep);
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
          onClick={currentStep === 1 ? undefined : () => handleStepChange(currentStep - 1)}
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
          onClick={
    currentStep === 4 || !isNextAbled()
      ? undefined
      : () => handleStepChange(currentStep + 1)
  }
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
