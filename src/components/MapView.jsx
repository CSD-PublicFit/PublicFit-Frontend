import styled from "styled-components";
import { useState } from "react";
import photo from "../assets/map.png";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e6eaf5;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  color: #545454;
  font-feature-settings: "liga" off, "clig" off;
  font-family: "Gothic A1";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  margin-left: 40px;
  margin-top: 30px;
`;

const Image = styled.img`
  margin-left: 50px;
  margin-top: 30px;
  margin-right: 100px;
  margin-bottom: 80px;
`;

const MapView = () => {
  const [title, setTitle] = useState("현재 현황 위치"); // 나중에

  return (
    <Container>
      <div>
        <Title>현재 현황 위치:</Title>
      </div>
      <div>
        <Image src={photo} alt="설명 텍스트" width="700" height="500"></Image>
      </div>
    </Container>
  );
};

export default MapView;
