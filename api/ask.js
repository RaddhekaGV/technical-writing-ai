export default async function handler(req, res) {
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

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful documentation assistant. Answer clearly and concisely.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      answer: data.choices[0].message.content,
      sources: ["OpenAI"],
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      answer: "Something went wrong while contacting OpenAI.",
    });
  }
}