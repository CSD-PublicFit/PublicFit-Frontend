import { useState } from "react";
import { MapDataContext } from "./MapDataContext";

export const MapDataProvider = ({ children }) => {
  const [regionData, setRegionData] = useState(null);
  const [existingLocation, setExistingLocation] = useState(null);
  const [predictedLocation, setPredictedLocation] = useState(null);

  return (
    <MapDataContext.Provider
      value={{
        regionData,
        setRegionData,
        existingLocation,
        setExistingLocation,
        predictedLocation,
        setPredictedLocation,
      }}
    >
      {children}
    </MapDataContext.Provider>
  );
};
