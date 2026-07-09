export default async function handler(req, res) {
  // Allow requests from your website
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({
      error: "Question is required",
    });
  }

  // Temporary response until OpenAI is connected
  return res.status(200).json({
    answer:
      "✅ Your AI backend is working! Next we'll connect it to OpenAI so I can answer documentation questions.",
    sources: ["Technical Writing AI"],
  });
}