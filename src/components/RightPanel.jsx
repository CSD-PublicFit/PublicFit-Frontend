import React from "react";

export default function RightPanel({ loading, onGenerate }) {
  return (
    <div className="right-panel">
      <p className="note">📄 본 레포트는 ChatGPT의 도움을 받아 작성됩니다.</p>
      <button className="report-button" onClick={onGenerate} disabled={loading}>
        레포트 작성하기
      </button>
      {loading && (
        <div className="loading-box">
          작성중입니다 ...
        </div>
      )}
    </div>
  );
}
