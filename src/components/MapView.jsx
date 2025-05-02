import styled from "styled-components";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
};

const center = {
  lat: 37.5665, // 서울 위도
  lng: 126.978, // 서울 경도
};

const MapView = () => {
  return (
    <>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {/* 마커, 폴리곤 등 지도 위 요소는 여기에 */}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapView;
