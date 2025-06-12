import { useState } from "react";
import { MapDataContext } from "./MapDataContext";

export const MapDataProvider = ({ children }) => {
  const [importantVariables, setImportantVariables] = useState(null);
  const [regionData, setRegionData] = useState(null);
  const [existingLocation, setExistingLocation] = useState(null);
  const [predictedLocation, setPredictedLocation] = useState(null);
  const [selectionId, setSelectionId] = useState(null);

  return (
    <MapDataContext.Provider
      value={{
        importantVariables,
        setImportantVariables,
        regionData,
        setRegionData,
        existingLocation,
        setExistingLocation,
        predictedLocation,
        setPredictedLocation,
        selectionId,
        setSelectionId
      }}
    >
      {children}
    </MapDataContext.Provider>
  );
};
