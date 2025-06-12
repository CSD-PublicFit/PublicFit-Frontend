export default async function handler(req, res) {
  const { method, query } = req;

  const { selection_id } = query;

  try {
    const backendUrl = `http://3.36.169.185:8000/api/report/generate?selection_id=${selection_id}`;

    const response = await fetch(backendUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Proxy report error:", err);
    res.status(500).json({ error: "Proxy report failed" });
  }
}