(function () {
  const CHAT_STORE = "pathwise-ai-chat-history";
  const DATA_STORE = "pathwise-future-scan-en-v2";

  function loadJson(key, fallback) {
    try {
      return JSON.parse(sessionStorage.getItem(key) || localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  }

  function saveHistory(history) {
    sessionStorage.setItem(CHAT_STORE, JSON.stringify(history.slice(-12)));
  }

  function appContext() {
    const scan = loadJson(DATA_STORE, {});
    const stage = document.body.dataset.stage || "opening";
    return {
      stage,
      finalCareer: scan.finalCareer || "",
      hollandCode: scan.code || "",
      interests: scan.interests || "",
      values: scan.values || [],
      city: scan.city || "",
      waveCards: scan.waveCards || [],
      stemPlan: scan.stemPlan || "",
    };
  }

  function esc(text) {
    return String(text || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function renderMessages(box, history) {
    box.innerHTML = history
      .map((msg) => `<div class="ai-msg ai-msg--${msg.role}">${esc(msg.content)}</div>`)
      .join("");
    box.scrollTop = box.scrollHeight;
  }

  const root = document.createElement("aside");
  root.className = "ai-widget";
  root.innerHTML = `
    <button class="ai-fab" type="button" aria-label="Open Pathwise AI">AI</button>
    <section class="ai-panel" aria-label="Pathwise AI chat">
      <header>
        <div><b>Pathwise AI</b><span>Ask anytime during the journey</span></div>
        <button class="ai-close" type="button" aria-label="Close">×</button>
      </header>
      <div class="ai-messages"></div>
      <form class="ai-form">
        <textarea name="message" rows="2" placeholder="Ask Pathwise a question..." required></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  `;
  document.body.appendChild(root);

  const fab = root.querySelector(".ai-fab");
  const panel = root.querySelector(".ai-panel");
  const close = root.querySelector(".ai-close");
  const form = root.querySelector(".ai-form");
  const messagesBox = root.querySelector(".ai-messages");
  let history = loadJson(CHAT_STORE, []);
  if (!history.length) {
    history = [{ role: "assistant", content: "Hi, I’m Pathwise AI. Ask me anything about your career exploration." }];
  }
  renderMessages(messagesBox, history);

  fab.addEventListener("click", () => root.classList.add("is-open"));
  close.addEventListener("click", () => root.classList.remove("is-open"));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const textarea = form.elements.message;
    const text = textarea.value.trim();
    if (!text) return;
    textarea.value = "";
    history.push({ role: "user", content: text });
    history.push({ role: "assistant", content: "Thinking..." });
    renderMessages(messagesBox, history);
    form.querySelector("button").disabled = true;

    try {
      if (location.protocol === "file:") {
        throw new Error("AI chat needs the Node backend. Run `npm start` and open http://localhost:3000.");
      }
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 30000);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: history.filter((m) => m.content !== "Thinking...").slice(-10),
          context: appContext(),
        }),
      });
      clearTimeout(timer);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "AI request failed.");
      history[history.length - 1] = { role: "assistant", content: data.reply || "I could not generate a reply." };
    } catch (error) {
      history[history.length - 1] = {
        role: "assistant",
        content:
          error.name === "AbortError"
            ? "The AI request timed out. Please try again in a moment."
            : error.message || "AI chat is temporarily unavailable.",
      };
    } finally {
      saveHistory(history);
      renderMessages(messagesBox, history);
      form.querySelector("button").disabled = false;
    }
  });
})();
