import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TitleContainer = styled.div`
  display: flex;
  gap: 13px;
`;

const NoticeTitle = styled.p`
  color: #666666;
  margin-top: 17px;
  font-size: 15px;
`;

const ReportButtonContainer = styled.div`
  justify-content: center;
  align-items: center;
  padding: 20px 85px;
`;

const ReportButton = styled.button`
  padding: 4px 17px;
  font-size: 17px;
  font-weight: 500;
  color: #008c25;
  cursor: pointer;
  border-radius: 10px;
  border: transparent;
  background-color: #e7f5e6;
  &:hover {
    border: 3px solid #008c25};
  }
`;

const Step4 = () => {
  const navigate = useNavigate();

  return (
    <>
      <TitleContainer>
        <h2 style={{ fontSize: "30px", fontWeight: "700" }}>Step 4.</h2>
        <NoticeTitle>분석결과를 레포트로 만들어보세요.</NoticeTitle>
      </TitleContainer>
      <ReportButtonContainer>
        <ReportButton onClick={() => navigate("/report")}>
          결과 레포트 확인 / 저장
        </ReportButton>
      </ReportButtonContainer>
    </>
  );
};

export default Step4;
