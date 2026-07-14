import fs from "fs";
import path from "path";

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
  const docsPath = path.join(process.cwd(), "docs");

const docFiles = fs
  .readdirSync(docsPath)
  .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const matchingDocs = docFiles.filter((file) => {
  const filePath = path.join(docsPath, file);
  const content = fs.readFileSync(filePath, "utf8").toLowerCase();

  return question
    .toLowerCase()
    .split(" ")
    .some((word) => content.includes(word));
});

const selectedDocs = matchingDocs.length > 0 ? matchingDocs : docFiles;

const docsContent = selectedDocs
  .map((file) => {
    const filePath = path.join(docsPath, file);
    return fs.readFileSync(filePath, "utf8");
  })
  .join("\n\n");

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
            content: `You are a helpful documentation assistant.

Answer questions ONLY using the documentation below.
If the answer is not found in the documentation, say:
"I couldn't find that information in the documentation."

Documentation:

${docsContent}`,
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log(data);

    return res.status(200).json({
      answer: data.choices[0].message.content,
      sources: selectedDocs,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      answer: "Something went wrong while contacting OpenAI.",
    });
  }
}