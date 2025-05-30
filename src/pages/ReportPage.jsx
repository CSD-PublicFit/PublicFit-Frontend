import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const navigate = useNavigate(); // 네비게이션 훅 사용

  return (
    <div>
      <h1>리포트 페이지</h1>
      <p>이곳은 리포트 페이지입니다.</p>
      {/* 뒤로 가기 버튼 추가 */}
      <button onClick={() => navigate("/")}>뒤로 가기</button>
    </div>
  );
};

export default ReportPage;
