import styled from "styled-components";

const Title = styled.h1`
  margin-bottom: 15px;
  margin-top: 30px;
  margin-left: 40px;
  color: #6082f0;
  font-size: 3rem;
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
