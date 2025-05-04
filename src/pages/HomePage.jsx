import styled from "styled-components";
import TopTitle from "../components/TopTitle";
import StepPage from "./StepPage";
import MapView from "../components/MapView";

const Container = styled.div`
  display: flex;
`;
const TopLine = styled.hr`
  background-color: #545454;
  height: 4px;
  border: none;
`;

const HomePage = () => {
  return (
    <div>
      <TopTitle></TopTitle>
      <TopLine></TopLine>
      <Container>
        <MapView></MapView>
        <StepPage></StepPage>
      </Container>
    </div>
  );
};

export default HomePage;
