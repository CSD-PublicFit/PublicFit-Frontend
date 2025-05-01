import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TopTitle from "../components/TopTitle";
import StepPage from "./StepPage";
import MapView from "../components/MapView";
import Button from "../components/Button";

const Container = styled.div`
  display: flex;
`;
const TopLine = styled.hr`
  background-color: #545454;
  height: 4px;
  border: none;
`;

const HomePage = () => {
  const navigate = useNavigate();

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
