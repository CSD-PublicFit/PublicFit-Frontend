export default async function handler(req, res) {
  const { method, body } = req;

  try {
    const response = await fetch("http://3.36.169.185:8000/api/analysis/start", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
}