import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  Polygon,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";


import { MapDataContext } from "../context/MapDataContext";

const locIcon1 = `${window.location.origin}/assets/Loc1.png`;
const locIcon2 = `${window.location.origin}/assets/Loc2.png`;
const locIcon3 = `${window.location.origin}/assets/Loc3.png`;
const locIcon4 = `${window.location.origin}/assets/Loc4.png`;
const locIcon5 = `${window.location.origin}/assets/Loc5.png`;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.5665, // 서울 위도
  lng: 126.978, // 서울 경도
};

const mapOptions = {
  streetViewControl: false, // 로드뷰 버튼 제거
};

// 순위에 따른 마커 아이콘 매핑 객체
const rankIcons = {
  1: locIcon1,
  2: locIcon2,
  3: locIcon3,
  4: locIcon4,
  5: locIcon5,
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
    importantVariables,
    setImportantVariables,
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script", // 고유 ID 설정 (중복 방지)
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // 필요시 라이브러리 추가
    language: "ko", // ✅ 한글로 설정
  });


  useEffect(() => {
  if (isLoaded && map && regionData && regionData.length > 0) {
    const bounds = new window.google.maps.LatLngBounds();
    regionData.flat().forEach((coord) => bounds.extend(coord));
    map.fitBounds(bounds);
  }
}, [isLoaded, map, regionData]);

  useEffect(() => {
  if (predictedLocation && predictedLocation.length > 0) {
    setViewMode("predicted");
  }
}, [predictedLocation]);

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
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={(mapInstance) => setMap(mapInstance)}
            options={mapOptions}
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
                  onClick={() => setSelectedMarker({ ...loc, type: "existing" })}
                />
              ))}

            {viewMode === "predicted" &&
                predictedLocation &&
                predictedLocation.map((loc, index) => (
                  <Marker
                    key={`predicted-${index}`}
                    position={{ lat: loc.lat, lng: loc.lng }}
                    onClick={() => setSelectedMarker({ ...loc, type: "predicted" })}
                    icon={
                      loc.rank <= 5
                        ? {
                            url: rankIcons[loc.rank],
                            scaledSize: new window.google.maps.Size(40, 40), // 크기 조절
                          }
                        : undefined // 나머지는 기본 마커
                    }
                  />
            ))}
            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <p><strong>위도</strong>: {selectedMarker.lat}</p>
                  <p><strong>경도</strong>: {selectedMarker.lng}</p>

                  {selectedMarker.type === "existing" && (
                    <>
                      <p><strong>시설명</strong>: {selectedMarker.name}</p>
                      <p><strong>주소</strong>: {selectedMarker.address}</p>
                    </>
                  )}

                  {selectedMarker.type === "predicted" && (
                    <>
                      <p>
                        <strong>설치매력도</strong>:{" "}
                        {selectedMarker.attractiveness_score.toLocaleString()}
                      </p>
                      <p>
                        <strong>설치추천순위</strong>: {selectedMarker.rank}위
                      </p>
                      {/*<p>
                        <strong>중요변수</strong>:{" "}
                        {selectedMarker.importantVariance.join(", ")}
                      </p>*/}
                    </>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>)}
      </MapContainer>
    </Container>
  );
};

export default MapView;
