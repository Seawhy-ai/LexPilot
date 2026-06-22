/* ================================================================
   AI Chat — Frontend Logic
   ================================================================ */

// ---- state ----
const STATE = {
  conversations: [],   // { id, title, messages: [{role,content}] }
  activeId: null,
  streaming: false,
};

// ---- DOM refs ----
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  messages: $("#messages"),
  chatArea: $("#chatArea"),
  userInput: $("#userInput"),
  btnSend: $("#btnSend"),
  btnNewChat: $("#btnNewChat"),
  btnSidebar: $("#btnSidebar"),
  btnCloseSidebar: $("#btnCloseSidebar"),
  sidebar: $("#sidebar"),
  overlay: $("#overlay"),
  convList: $("#conversationList"),
  btnClearAll: $("#btnClearAll"),
  typing: $("#typingIndicator"),
};

// ---- conversation helpers ----
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadState() {
  try {
    const raw = localStorage.getItem("ai-chat-state");
    if (raw) {
      const parsed = JSON.parse(raw);
      STATE.conversations = parsed.conversations || [];
      STATE.activeId = parsed.activeId || null;
    }
  } catch { /* ignore */ }
}

function saveState() {
  try {
    localStorage.setItem("ai-chat-state", JSON.stringify({
      conversations: STATE.conversations,
      activeId: STATE.activeId,
    }));
  } catch { /* ignore */ }
}

function getActiveConv() {
  return STATE.conversations.find((c) => c.id === STATE.activeId) || null;
}

function createConversation() {
  const conv = {
    id: generateId(),
    title: "新对话",
    messages: [],
  };
  STATE.conversations.unshift(conv);
  STATE.activeId = conv.id;
  saveState();
  return conv;
}

function deleteConversation(id) {
  STATE.conversations = STATE.conversations.filter((c) => c.id !== id);
  if (STATE.activeId === id) {
    STATE.activeId = STATE.conversations.length > 0 ? STATE.conversations[0].id : null;
  }
  saveState();
}

function autoTitle(conv) {
  const firstUser = conv.messages.find((m) => m.role === "user");
  if (firstUser) {
    const t = firstUser.content.trim().replace(/\n/g, " ");
    conv.title = t.length > 24 ? t.slice(0, 24) + "…" : t;
  }
}

// ---- render ----
function renderMessages() {
  const conv = getActiveConv();
  dom.messages.innerHTML = "";

  if (!conv || conv.messages.length === 0) {
    dom.messages.innerHTML = `
      <div class="welcome">
        <div class="welcome-icon">🤖</div>
        <h2>DeepSeek V4 Flash</h2>
        <p class="welcome-desc">快速、智能的 AI 助手，随时随地为你解答</p>
        <div class="capability-row">
          <span class="capability-chip highlight">知识问答</span>
          <span class="capability-chip">代码开发</span>
          <span class="capability-chip">论文辅导</span>
          <span class="capability-chip">创意写作</span>
          <span class="capability-chip">翻译润色</span>
        </div>
        <div class="section-label">试试这些</div>
        <div class="quick-prompts">
          <button class="quick-btn" data-prompt="解释一下量子计算的基本原理">⚛️ 量子计算原理</button>
          <button class="quick-btn" data-prompt="帮我写一段 Python 快速排序代码，带详细注释">🐍 Python 快排</button>
          <button class="quick-btn" data-prompt="推荐3本好看的科幻小说，并说明推荐理由">📚 科幻小说推荐</button>
          <button class="quick-btn" data-prompt="帮我写一篇关于人工智能伦理的论文大纲">📝 论文大纲</button>
        </div>
      </div>`;
    bindQuickPrompts();
    return;
  }

  for (const msg of conv.messages) {
    appendMessageEl(msg.role, msg.content);
  }
}

function appendMessageEl(role, content) {
  const welcome = dom.messages.querySelector(".welcome");
  if (welcome) welcome.remove();

  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.innerHTML = `
    <div class="msg-avatar">${role === "user" ? "👤" : "🤖"}</div>
    <div class="msg-body">
      <div class="msg-role">${role === "user" ? "你" : "DeepSeek"}</div>
      <div class="msg-content">${renderMarkdown(content)}</div>
      <div class="msg-actions">
        <button class="btn-action" data-action="copy">📋 复制</button>
      </div>
    </div>`;
  dom.messages.appendChild(div);
  highlightCode(div);
  scrollToBottom();
}

function appendStreamingEl() {
  const welcome = dom.messages.querySelector(".welcome");
  if (welcome) welcome.remove();

  const div = document.createElement("div");
  div.className = "msg ai";
  div.id = "streamingMsg";
  div.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-body">
      <div class="msg-role">DeepSeek</div>
      <div class="thinking-block" id="streamingThinking" style="display:none">
        <div class="thinking-toggle" id="thinkingToggle">
          <span class="thinking-icon">💭</span> 思考中…
          <span class="thinking-arrow">▾</span>
        </div>
        <div class="thinking-content" id="streamingThinkingContent"></div>
      </div>
      <div class="msg-content" id="streamingContent"></div>
    </div>`;
  dom.messages.appendChild(div);
  scrollToBottom();
  return {
    thinking: $("#streamingThinking"),
    thinkingContent: $("#streamingThinkingContent"),
    content: $("#streamingContent"),
  };
}

function finalizeStreamingEl(fullContent, hasThinking) {
  const el = $("#streamingMsg");
  if (!el) return;
  el.removeAttribute("id");

  // Finalize thinking block
  const thinkingBlock = el.querySelector(".thinking-block");
  const thinkingContent = el.querySelector(".thinking-content");
  const thinkingToggle = el.querySelector("#thinkingToggle");
  if (thinkingToggle) thinkingToggle.removeAttribute("id");
  if (thinkingContent) thinkingContent.removeAttribute("id");

  if (hasThinking && thinkingBlock && thinkingToggle) {
    thinkingBlock.style.display = "block";
    thinkingToggle.innerHTML = '<span class="thinking-icon">💭</span> 思考过程 <span class="thinking-arrow">▸</span>';
    thinkingToggle.addEventListener("click", () => {
      const content = thinkingToggle.nextElementSibling;
      const arrow = thinkingToggle.querySelector(".thinking-arrow");
      if (content.style.display === "none") {
        content.style.display = "block";
        arrow.textContent = "▾";
      } else {
        content.style.display = "none";
        arrow.textContent = "▸";
      }
    });
    // collapse by default
    if (thinkingContent) thinkingContent.style.display = "none";
  } else if (thinkingBlock) {
    thinkingBlock.remove();
  }

  // Finalize main content
  const contentEl = el.querySelector(".msg-content");
  if (contentEl) {
    contentEl.removeAttribute("id");
    contentEl.innerHTML = renderMarkdown(fullContent);
    highlightCode(el);
  }

  // add actions
  const body = el.querySelector(".msg-body");
  if (body) {
    const actions = document.createElement("div");
    actions.className = "msg-actions";
    actions.innerHTML = '<button class="btn-action" data-action="copy">📋 复制</button>';
    body.appendChild(actions);
  }
}

function renderMarkdown(text) {
  if (typeof marked === "undefined") return escapeHtml(text);
  try {
    marked.setOptions({ breaks: true, gfm: true });
    return marked.parse(text);
  } catch {
    return escapeHtml(text);
  }
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function highlightCode(el) {
  if (typeof hljs === "undefined") return;
  el.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });
}

function renderSidebar() {
  dom.convList.innerHTML = "";
  if (STATE.conversations.length === 0) {
    dom.convList.innerHTML =
      '<div style="text-align:center;color:var(--text-dim);padding:24px;font-size:13px">暂无会话</div>';
    return;
  }
  for (const conv of STATE.conversations) {
    const item = document.createElement("div");
    item.className = `conv-item${conv.id === STATE.activeId ? " active" : ""}`;
    item.innerHTML = `
      <span class="conv-item-title">${escapeHtml(conv.title)}</span>
      <button class="conv-item-del" data-del="${conv.id}" aria-label="删除">✕</button>`;
    item.addEventListener("click", (e) => {
      if (e.target.closest("[data-del]")) return;
      switchConversation(conv.id);
    });
    item.querySelector(".conv-item-del").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteConversation(conv.id);
      renderSidebar();
      renderMessages();
      if (!STATE.activeId) createConversation();
      renderSidebar();
      renderMessages();
    });
    dom.convList.appendChild(item);
  }
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    dom.chatArea.scrollTop = dom.chatArea.scrollHeight;
  });
}

// ---- sidebar toggle ----
function openSidebar() {
  dom.sidebar.classList.add("open");
  dom.overlay.classList.add("open");
}
function closeSidebar() {
  dom.sidebar.classList.remove("open");
  dom.overlay.classList.remove("open");
}

// ---- switch conversation ----
function switchConversation(id) {
  STATE.activeId = id;
  saveState();
  renderMessages();
  renderSidebar();
  closeSidebar();
}

// ---- API call (SSE streaming) ----
async function sendMessage(userContent) {
  if (STATE.streaming) return;
  const conv = getActiveConv();
  if (!conv) return;

  STATE.streaming = true;
  dom.btnSend.disabled = true;
  dom.typing.style.display = "flex";
  scrollToBottom();

  // add user message
  conv.messages.push({ role: "user", content: userContent });
  appendMessageEl("user", userContent);
  autoTitle(conv);
  saveState();
  renderSidebar();

  // prepare for AI response
  const streamRefs = appendStreamingEl();
  dom.typing.style.display = "none";
  let fullContent = "";
  let fullThinking = "";
  let hasThinking = false;

  try {
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conv.messages }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      throw new Error(`服务器错误 (${resp.status}): ${err}`);
    }

    const reader = resp.body.getReader();
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
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            showError(parsed.error);
            break;
          }
          if (parsed.content) {
            if (parsed.reasoning) {
              // thinking/reasoning content
              hasThinking = true;
              fullThinking += parsed.content;
              if (streamRefs.thinking) streamRefs.thinking.style.display = "block";
              if (streamRefs.thinkingContent) streamRefs.thinkingContent.textContent = fullThinking;
            } else {
              // final answer content
              fullContent += parsed.content;
              if (streamRefs.content) streamRefs.content.textContent = fullContent;
            }
            scrollToBottom();
          }
        } catch { /* skip */ }
      }
    }

    // finalize
    conv.messages.push({ role: "assistant", content: fullContent || "(空响应)" });
    finalizeStreamingEl(fullContent || "(空响应)", hasThinking);
    saveState();
  } catch (err) {
    showError(err.message);
    // remove streaming element
    const el = $("#streamingMsg");
    if (el) el.remove();
  }

  STATE.streaming = false;
  dom.btnSend.disabled = false;
  dom.typing.style.display = "none";
  dom.userInput.focus();
}

function showError(msg) {
  const banner = document.createElement("div");
  banner.className = "error-banner";
  banner.textContent = `⚠️ ${msg}`;
  dom.messages.appendChild(banner);
  scrollToBottom();
}

// ---- event bindings ----
function bindQuickPrompts() {
  $$(".quick-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const prompt = btn.dataset.prompt;
      if (prompt) sendMessage(prompt);
    });
  });
}

dom.btnSend.addEventListener("click", () => {
  const text = dom.userInput.value.trim();
  if (!text || STATE.streaming) return;
  dom.userInput.value = "";
  dom.userInput.style.height = "auto";
  sendMessage(text);
});

dom.userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    const text = dom.userInput.value.trim();
    if (!text || STATE.streaming) return;
    dom.userInput.value = "";
    dom.userInput.style.height = "auto";
    sendMessage(text);
  }
});

// auto-resize textarea
dom.userInput.addEventListener("input", () => {
  dom.userInput.style.height = "auto";
  dom.userInput.style.height = Math.min(dom.userInput.scrollHeight, 120) + "px";
});

dom.btnNewChat.addEventListener("click", () => {
  createConversation();
  renderMessages();
  renderSidebar();
  dom.userInput.focus();
});

dom.btnSidebar.addEventListener("click", openSidebar);
dom.btnCloseSidebar.addEventListener("click", closeSidebar);
dom.overlay.addEventListener("click", closeSidebar);

dom.btnClearAll.addEventListener("click", () => {
  if (confirm("确定清空全部会话记录吗？")) {
    STATE.conversations = [];
    STATE.activeId = null;
    saveState();
    createConversation();
    renderMessages();
    renderSidebar();
  }
});

// message actions (copy)
dom.messages.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  if (btn.dataset.action === "copy") {
    const msgEl = btn.closest(".msg");
    const contentEl = msgEl?.querySelector(".msg-content");
    if (contentEl) {
      const text = contentEl.textContent;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "✅ 已复制";
        setTimeout(() => { btn.textContent = "📋 复制"; }, 1500);
      }).catch(() => {
        btn.textContent = "❌ 失败";
        setTimeout(() => { btn.textContent = "📋 复制"; }, 1500);
      });
    }
  }
});

// ---- init ----
function init() {
  loadState();
  if (STATE.conversations.length === 0) {
    createConversation();
  } else if (!STATE.activeId || !STATE.conversations.find((c) => c.id === STATE.activeId)) {
    STATE.activeId = STATE.conversations[0].id;
    saveState();
  }
  renderMessages();
  renderSidebar();
  bindQuickPrompts();
  dom.userInput.focus();
}

init();
