import styled from "styled-components";
import React, { useContext } from "react";
import { useNavigate} from "react-router-dom";

import { MapDataContext } from "../context/MapDataContext";
import useStepStore from "../store/stepStore";

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


const iconUrls = {
  1: `${window.location.origin}/assets/Loc1.png`,
  2: `${window.location.origin}/assets/Loc2.png`,
  3: `${window.location.origin}/assets/Loc3.png`,
  4: `${window.location.origin}/assets/Loc4.png`,
  5: `${window.location.origin}/assets/Loc5.png`,
};

const generateStaticMapUrl = (predictedLocations, regionData) => {
  const baseUrl = "https://maps.googleapis.com/maps/api/staticmap?";
  const size = "size=800x500";
  const maptype = "maptype=roadmap";

  const markers = predictedLocations
    .map((loc) => `markers=color:red%7C${loc.lat},${loc.lng}`)
    .join("&");

  const visible = `visible=${predictedLocations
    .map((loc) => `${loc.lat},${loc.lng}`)
    .join("|")}`;

  /*const markers = predictedLocations
    .map((loc) => {
      if (loc.rank >= 1 && loc.rank <= 5) {
        return `markers=icon:${encodeURIComponent(iconUrls[loc.rank])}%7C${loc.lat},${loc.lng}`;
      }
      return `markers=color:red%7C${loc.lat},${loc.lng}`;
    })
    .join("&");*/

  const key = `key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

  return `${baseUrl}${size}&${maptype}&${visible}&${markers}&${key}`;
};

const Step4 = (/*{
  facilityName,
  basicFileInfo,
  plusFileInfo,
}*/) => {
  const navigate = useNavigate();
  const { regionData, predictedLocation } = useContext(MapDataContext); // 위치 정보 가져오기
  const {facilityName, basicFileInfo, plusFileInfo} = useStepStore();

  const handleReportClick = () => {
    const imageUrl = generateStaticMapUrl(predictedLocation, regionData|| []);
    navigate("/report", {
      state: {
        imageUrl,
        predictedLocation,
        facilityName, 
        basicFileInfo, 
        plusFileInfo,  
      },
    });
  };


  return (
    <>
      <TitleContainer>
        <h2 style={{ fontSize: "30px", fontWeight: "700" }}>Step 4.</h2>
        <NoticeTitle>분석결과를 레포트로 만들어보세요.</NoticeTitle>
      </TitleContainer>
      <ReportButtonContainer>
        <ReportButton onClick={handleReportClick}>
          결과 레포트 확인 / 저장
        </ReportButton>
      </ReportButtonContainer>
    </>
  );
};

export default Step4;
