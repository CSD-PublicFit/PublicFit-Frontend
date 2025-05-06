import styled from "styled-components";

const Title = styled.h1`
  margin-bottom: 10px;
  margin-top: 20px;
  margin-left: 30px;
  color: #6082f0;
  font-size: 2rem;
`;
const TitleContainer = styled.div`
  background-color: #ffffff;
`;

const TopTitle = () => {
  return (
    <TitleContainer>
      <Title>Public Fit.</Title>
    </TitleContainer>
  );
};

export default TopTitle;
