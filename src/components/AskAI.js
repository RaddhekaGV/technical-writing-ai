import React, { useState } from "react";

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setQuestion("");

    try {
      const res = await fetch(/api/ask, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.text }),
      });
      const data = await res.json();

      const botMsg = {
        role: "bot",
        text: data.answer,
        sources: data.sources || [],
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error: Could not reach the AI server. Is api_server.py running?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") askQuestion();
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {open && (
        <div
          style={{
            width: "320px",
            height: "420px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
            overflow: "hidden",
          }}
        >
          <div style={{ background: "#2e8555", color: "white", padding: "12px", fontWeight: "bold" }}>
            Ask AI — Help Site Assistant
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "10px", fontSize: "14px" }}>
            {messages.length === 0 && (
              <p style={{ color: "#888" }}>Ask me anything about this Help site!</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.role === "user" ? "right" : "left",
                  margin: "8px 0",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: m.role === "user" ? "#2e8555" : "#f1f1f1",
                    color: m.role === "user" ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    maxWidth: "85%",
                  }}
                >
                  {m.text}
                  {m.sources && m.sources.length > 0 && (
                    <div style={{ fontSize: "11px", marginTop: "4px", opacity: 0.7 }}>
                      Source: {m.sources.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && <p style={{ color: "#888" }}>Thinking...</p>}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              style={{ flex: 1, border: "none", padding: "10px", outline: "none" }}
            />
            <button
              onClick={askQuestion}
              style={{
                background: "#2e8555",
                color: "white",
                border: "none",
                padding: "0 16px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "#2e8555",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "56px",
          height: "56px",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}