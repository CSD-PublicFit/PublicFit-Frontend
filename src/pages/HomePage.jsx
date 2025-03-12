import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>홈페이지</h1>
      <p>이곳은 초기 설정된 홈페이지입니다.</p>
      <button onClick={() => navigate("/report")}>Report 페이지로 이동</button>
    </div>
  );
};

export default HomePage;
