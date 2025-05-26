import styled from "styled-components";
import { useState, useRef } from "react";

const checkBlue = `${window.location.origin}/assets/CheckBlue.png`;
const warnRed = `${window.location.origin}/assets/WarnRed.png`;
const closeButton = `${window.location.origin}/assets/CloseButton.png`;

const FileButton = styled.button`
  width: 80px;
  height: 40px;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  border-radius: 5px;
  border: transparent;
  background-color: #6082f0;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const FileNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 400;
  background-color: #e6eaf5;
  border-radius: 100px;
  border: ${({ $status }) =>
    $status === "valid" ? "2px solid #6082f0" : "2px solid #F06062"};
  width: fit-content; /* ✅ 자식 내용 크기만큼 너비 설정 */
  padding: 2px 7px; /* ✅ 약간의 여백 주는 게 자연스러움 */
  margin-left: 20px;
  margin-bottom: 15px;
`;

const FileName = styled.p`
  color: ${({ $status }) => ($status === "valid" ? "#6082f0" : "#F06062")};
`;

const CloseButton = styled.button`
  width: 15px;
  height: 15px;
  background-image: url(${closeButton});
  background-color: transparent; /* ✅ 배경색 없애기 */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  padding: 0; /* ✅ 혹시 있을 여백 제거 */
  cursor: pointer;
`;

function FileUploader({
  category,
  fileInfo,
  setFileInfo,
  validationStatus,
  setValidationStatus,
}) {
  const fileInputRef = useRef(null);
  //const [fileInfo, setFileInfo] = useState("");
  const [error, setError] = useState("");
  //const [validationStatus, setValidationStatus] = useState("idle");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = ({ target }) => {
    try {
      const file = target.files[0];
      setFileInfo(file);
      setValidationStatus("checking"); // 검사 중 표시
      console.log("선택된 파일:", file);

      // 파일 크기 체크
      if (file.size === 0) {
        setError("파일이 비어 있습니다.");
        setValidationStatus("invalid");
        console.log("파일이 비어 있음");
        return;
      }

      // 파일 확장자 체크
      if (!file.name.endsWith(".csv")) {
        setError(".csv 파일만 업로드 가능합니다.");
        setValidationStatus("invalid");
        console.log(".csv 파일이 아님");
        return;
      }

      // 모든 검사를 통과하면 파일 정보를 성공적으로 받아들임
      const reader = new FileReader();
      console.log("파일 객체 생성");
      reader.readAsText(file, "utf-8"); 
      console.log("파일을 text로 읽기 시작");
      reader.onload = () => {
        const text = reader.result;
        console.log("파일 내용:", text);

        if (!text) {
          setError("파일 내용이 비어 있습니다.");
          setValidationStatus("invalid");
          return;
        }

        // 여기서 검사 실행
        const isValid = validateCsvContent(text); // true or false 반환하게 수정
        setValidationStatus(isValid ? "valid" : "invalid");
      };
    } catch (error) {
      setError("파일 처리 중 오류가 발생했습니다.");
    }
  };

  const validateCsvContent = (text) => {
    const rows = text.trim().split("\n");
    const headers = rows[0].split(",").map((h) => h.trim());

    // "위도", "경도", "순번" 컬럼이 모두 존재하는지 확인
    if (
      !headers.includes("위도") ||
      !headers.includes("경도") //||
      //!headers.includes("순번")
    ) {
      setError(
        "CSV 파일에 '위도', '경도' 컬럼이 모두 존재해야 합니다."
      );
      console.log(
        "CSV 파일에 '위도', '경도' 컬럼이 모두 존재해야 합니다."
      );
      return false;
    }

    setError(""); // 통과
    alert("CSV 파일이 정상입니다!");
    return true;
  };

  const handleFileDelete = () => {
    setFileInfo("");
    setValidationStatus("idle");
    setError("");
    // ✅ input의 value도 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    console.log("파일 삭제됨");
  };

  return (
    <>
      <FileButton onClick={handleButtonClick}>파일 선택</FileButton>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleUpload}
        style={{ display: "none" }}
      />
      {validationStatus === "checking" && (
        <p
          style={{
            fontSize: "15px",
            color: "#666666",
            marginLeft: "20px",
            marginBottom: "10px",
          }}
        >
          형식 확인 중...
        </p>
      )}
      {(validationStatus === "valid" || validationStatus === "invalid") && (
        <FileNameContainer $status={validationStatus}>
          <FileName $status={validationStatus}>{fileInfo.name}</FileName>
          {validationStatus === "valid" ? (
            <img src={checkBlue} width="15" height="15" alt="check" />
          ) : (
            <img src={warnRed} height="13" alt="check" />
          )}
          <CloseButton onClick={handleFileDelete}></CloseButton>
        </FileNameContainer>
      )}
    </>
  );
}

export default FileUploader;
