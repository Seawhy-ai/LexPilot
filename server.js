require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
const DEEPSEEK_BASE = "https://api.deepseek.com";

// ----- middleware -----
app.use(express.json({ limit: "1mb" }));
// Bypass localtunnel verification page
app.use((_req, res, next) => {
  res.setHeader("Bypass-Tunnel-Reminder", "true");
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/standalone", express.static(path.join(__dirname, "standalone")));

// ----- health -----
app.get("/api/health", (_req, res) => res.json({ ok: true, model: DEEPSEEK_MODEL }));

// ----- protected image proxy -----
const WH_DIR = path.join(__dirname, "standalone", "images", "wh");
const VALID_TOKENS = new Set(); // tokens granted after 030325 verification
const WH_TOKEN_SECRET = "seawhy-wh-" + Date.now().toString(36);

// Generate token (called by frontend after invite code 030325)
app.post("/api/wh-auth", (req, res) => {
  const { code } = req.body || {};
  if (code === "030325") {
    const token = require("crypto").randomBytes(16).toString("hex");
    VALID_TOKENS.add(token);
    return res.json({ ok: true, token });
  }
  return res.status(403).json({ ok: false, error: "invalid code" });
});

// Serve wh images (token required)
app.get("/api/wh-img", (req, res) => {
  const { f, t } = req.query;
  if (!t || !VALID_TOKENS.has(t)) {
    return res.status(403).json({ error: "unauthorized" });
  }
  if (!f || f.includes("..") || f.includes("/")) {
    return res.status(400).json({ error: "bad filename" });
  }
  const filePath = path.join(WH_DIR, f);
  if (!filePath.startsWith(WH_DIR)) {
    return res.status(400).json({ error: "bad path" });
  }
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).json({ error: "not found" });
  });
});

// ----- streaming chat -----
app.post("/api/chat", async (req, res) => {
  if (!DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: "DEEPSEEK_API_KEY not set on server." });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required." });
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  try {
    const upstream = await fetch(`${DEEPSEEK_BASE}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!upstream.ok) {
      const err = await upstream.text();
      res.write(`data: ${JSON.stringify({ error: `API error ${upstream.status}: ${err}` })}\n\n`);
      res.end();
      return;
    }

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buf += decoder.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() || "";

      for (const line of lines) {
        const s = line.trim();
        if (!s.startsWith("data:")) continue;
        const data = s.slice(5).trim();
        if (data === "[DONE]") {
          res.write("data: [DONE]\n\n");
          continue;
        }
        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices?.[0]?.delta;
          if (!delta) continue;
          const text = delta.content || delta.reasoning_content || "";
          if (text) {
            const isReasoning = !!delta.reasoning_content;
            res.write(`data: ${JSON.stringify({ content: text, reasoning: isReasoning })}\n\n`);
          }
        } catch { /* skip malformed chunks */ }
      }
    }
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
  }

  res.end();
});

// ----- SPA fallback -----
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`AI Chat: http://localhost:${PORT}  |  Model: ${DEEPSEEK_MODEL}`);
  if (!DEEPSEEK_API_KEY) console.warn("WARNING: DEEPSEEK_API_KEY not set");
});
