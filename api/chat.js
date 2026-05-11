const API_URLS = [
  process.env.SILICONFLOW_API_URL,
  "https://api.siliconflow.cn/v1/chat/completions",
  "https://api.siliconflow.com/v1/chat/completions",
].filter(Boolean);

const API_KEY = process.env.SILICONFLOW_API_KEY;
const MODEL = process.env.SILICONFLOW_MODEL || "Qwen/Qwen2.5-72B-Instruct";

const SYSTEM_PROMPT = [
  "You are Pathwise, a professional Future Career Planning Advisor embedded in a career exploration website.",
  "Reply in polished, coherent English. Keep the answer concise enough for a small floating chat box.",
  "Do not override the website workflow. Help the student reflect, clarify options, understand STEM relevance, and ask better questions.",
  "Avoid repetition, filler words, malformed tokens, broken sentences, and mixed-language noise.",
  "If the user asks for medical, legal, or financial decisions, give general educational guidance and recommend consulting a qualified professional.",
].join(" ");

function buildUserPrompt(messages, context) {
  const transcript = messages
    .map((m) => `${m.role === "assistant" ? "Assistant" : "Student"}: ${m.content}`)
    .join("\n");

  return [
    `Current website context: ${JSON.stringify(context || {})}`,
    "Conversation:",
    transcript,
    "Write the next assistant reply. Use clean natural language and do not repeat words mechanically.",
  ].join("\n\n");
}

function looksMalformed(text) {
  const value = String(text || "").trim();
  if (value.length < 2) return true;
  const repeatedOn = (value.match(/\bon\b/gi) || []).length;
  const repeatedD = (value.match(/\bD\b|D{3,}/g) || []).length;
  const words = value.split(/\s+/).filter(Boolean);
  const uniqueRatio = new Set(words.map((word) => word.toLowerCase())).size / Math.max(words.length, 1);
  return repeatedOn > 18 || repeatedD > 8 || (words.length > 80 && uniqueRatio < 0.24);
}

async function fetchWithTimeout(url, options, timeoutMs = 22000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function requestSiliconFlow(userPrompt, retry = false) {
  const payload = {
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: retry
          ? `${userPrompt}\n\nThe previous generation was malformed. Regenerate once in clear, stable, non-repetitive English.`
          : userPrompt,
      },
    ],
    stream: false,
    max_tokens: 520,
    temperature: retry ? 0.2 : 0.35,
    top_p: 0.8,
    frequency_penalty: 0.2,
  };

  let lastError = null;
  for (const url of API_URLS) {
    try {
      const response = await fetchWithTimeout(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        lastError = new Error(data.error?.message || data.message || `SiliconFlow API failed at ${url}`);
        continue;
      }
      return (data.choices?.[0]?.message?.content || data.choices?.[0]?.text || "").trim();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("SiliconFlow API request failed.");
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (!API_KEY) {
    res.status(500).json({ error: "SILICONFLOW_API_KEY is not configured on the server." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
    const userPrompt = buildUserPrompt(messages, body.context || {});

    let reply = await requestSiliconFlow(userPrompt);
    if (looksMalformed(reply)) reply = await requestSiliconFlow(userPrompt, true);
    if (looksMalformed(reply)) {
      reply =
        "I’m sorry, the model returned an unstable response. Please ask once more, and I will keep the guidance concise and structured.";
    }

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.name === "AbortError" ? "AI request timed out. Please try again." : error.message || "AI chat is temporarily unavailable." });
  }
};
