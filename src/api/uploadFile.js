export const uploadFile = async ({
  facilityName,
  basicFileInfo,
  plusFileInfo,
  selectedRange,
  selectedCity,
}) => {
  const formData = new FormData();
  formData.append("facilityName", facilityName);
  formData.append("basicFileInfo", basicFileInfo);
  if (plusFileInfo) {
    formData.append("plusFileInfo", plusFileInfo);
  }
  formData.append("selectedRange", selectedRange);
  formData.append("selectedCity", selectedCity);

  //http://3.36.169.185/api/analysis/start
  const response = await fetch("https://e30c-110-8-123-249.ngrok-free.app/api/analysis/start", {
    method: "POST",
    body: formData,
  });
  console.log("응답이 이상함!!!!!!!!");

  /*if (!response.ok) {
    console.log("⭐api 함수 자체에서 응답 안옴");
    throw new Error("서버 응답 에러");
  }*/
  if (!response.ok) {
    console.log("응답이 이상함!!!!!!!!");
    const errorText = await response.text();
    console.error("❌ 서버 에러 응답:", errorText); // ✅ 이 로그가 중요해
    throw new Error(`서버 응답 오류: ${response.status}`);
  }

  const data = await response.json();
  return data; // { existingLocations: [...], predictedLocations: [...] }
};
