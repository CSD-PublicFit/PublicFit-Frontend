export const uploadFile = async ({
  facilityName,
  basicFileInfo,
  plusFileInfo,
  selectedRange,
}) => {
  const formData = new FormData();
  formData.append("facilityName", facilityName);
  formData.append("selectedRange", selectedRange);
  formData.append("basicFile", basicFileInfo);
  if (plusFileInfo) {
    formData.append("plusFile", plusFileInfo);
  }

  const response = await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("서버 응답 에러");
  }

  const data = await response.json();
  return data; // { existingLocations: [...], predictedLocations: [...] }
};
