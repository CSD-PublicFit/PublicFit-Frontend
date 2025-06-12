export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    // Node.js fetch는 req.body가 FormData가 아니라서 body를 직접 읽어야 함.
    // Next.js API Route는 기본적으로 body가 파싱된 상태이므로,
    // FormData는 직접 다룰 수 없고, raw body를 받아야 함.
    
    // 그래서, form-data 처리를 위해 middleware (예: busboy) 또는 raw body 처리 필요.
    // (아래는 간단한 fetch 요청 예시)
    
    const backendResponse = await fetch("http://3.36.169.185:8000/api/analysis/start", {
      method: "POST",
      headers: {
        // Content-Type 헤더는 빼고 전달해야 자동으로 처리됨
        // 예를 들어, req.headers['content-type']을 넘길 수도 있음.
        // "Content-Type": req.headers['content-type'], // 이렇게 하면 boundary 포함 전달 가능
      },
      body: req,  // 스트림 자체를 그대로 넘김 (가능한 경우)
    });

    const data = await backendResponse.json();
    res.status(backendResponse.status).json(data);
  } catch (error) {
    console.error("❌ Proxy error:", error);
    res.status(500).json({ error: "Proxy failed" });
  }
}