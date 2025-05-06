import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Polygon,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { MapDataContext } from "../context/MapDataContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.5665, // 서울 위도
  lng: 126.978, // 서울 경도
};

const Container = styled.div`
  width: 100vw;
  background-color: #e6eaf5;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 10px;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
`;

const ViewButton = styled.button`
  padding: 4px 17px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 100px;
  cursor: pointer;
  background-color: #f0f0f0;
  color: ${({ $isSelected, $nameColor }) =>
    $isSelected ? $nameColor : "#A0A0A0"};
  border: ${({ $isSelected, $nameColor }) =>
    $isSelected
      ? `3px solid ${$nameColor || "#3B82F6"}`
      : "3px solid transparent"};

  &:hover {
    border: 3px solid ${({ $nameColor }) => $nameColor || "#3B82F6"};
  }
`;

const MapContainer = styled.div`
  width: 60vw;
  height: 80vh;
  position: relative;
  border: 3px solid #6082f0;
  margin-left: 30px;
  margin-bottom: 15px;
`;

const MapView = () => {
  const {
    regionData,
    setRegionData,
    existingLocation,
    setExistingLocation,
    predictedLocation,
    setPredictedLocation,
  } = useContext(MapDataContext);
  const [selectedMarker, setSelectedMarker] = useState(null); // ⭐️ 선택된 마커 저장
  const [viewMode, setViewMode] = useState("existing");
  const [map, setMap] = useState(null);

  // 컨텍스트 잘 전달되는지 확인용 (특히 리젼 데이터 이중배열로 잘 됐는지)
  console.log("Map context:", useContext(MapDataContext));

  useEffect(() => {
    // 페이지 진입 시 지도 데이터 초기화
    setRegionData([]);
    setExistingLocation([]);
    setPredictedLocation([]);
  }, []);

  useEffect(() => {
    if (map && regionData && regionData.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      regionData.flat().forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds);
    }
  }, [map, regionData]);

  return (
    <Container>
      <ButtonContainer
        $isVisible={
          regionData?.length > 0 ||
          existingLocation?.length > 0 ||
          predictedLocation?.length > 0
        }
      >
        <ViewButton
          $nameColor="#6082F0"
          $isSelected={viewMode === "existing"}
          onClick={() => setViewMode("existing")}
        >
          현황 보기
        </ViewButton>
        <ViewButton
          $nameColor="#6082F0"
          $isSelected={viewMode === "predicted"}
          onClick={() => setViewMode("predicted")}
        >
          우선지 추천 보기
        </ViewButton>
      </ButtonContainer>
      <MapContainer>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={(mapInstance) => setMap(mapInstance)}
          >
            {/* 마커, 폴리곤 등 지도 위 요소는 여기에 */}
            {/* regionData → Polygon */}
            {regionData &&
              regionData.map((region, index) => (
                <Polygon
                  key={index}
                  paths={region}
                  options={{
                    fillColor: "#FF0000",
                    fillOpacity: 0.1,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                  }}
                />
              ))}

            {viewMode === "existing" &&
              existingLocation &&
              existingLocation.map((loc, index) => (
                <Marker
                  key={`existing-${index}`}
                  position={{ lat: loc.lat, lng: loc.lng }}
                  onClick={() => setSelectedMarker(loc)}
                />
              ))}

            {viewMode === "predicted" &&
              predictedLocation &&
              predictedLocation.map((loc, index) => (
                <Marker
                  key={`predicted-${index}`}
                  position={{ lat: loc.lat, lng: loc.lng }}
                  onClick={() => setSelectedMarker(loc)}
                />
              ))}

            {/* InfoWindow */}
            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)} // 닫기 버튼
              >
                <div>
                  <p>
                    <strong>위도</strong>: {selectedMarker.lat}
                  </p>
                  <p>
                    <strong>경도</strong>: {selectedMarker.lng}
                  </p>
                  <p>
                    <strong>인구</strong>:{" "}
                    {selectedMarker.population.toLocaleString()}명
                  </p>
                  <p>
                    <strong>교통량</strong>:{" "}
                    {selectedMarker.traffic.toLocaleString()}대/일
                  </p>
                  <p>
                    <strong>집값</strong>:{" "}
                    {selectedMarker.housePrice.toLocaleString()}원
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </MapContainer>
    </Container>
  );
};

export default MapView;
