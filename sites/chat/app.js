const STATE = { conversations: [], activeId: null, streaming: false };
const $ = (sel) => document.querySelector(sel);
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

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function loadState() { try { const raw = localStorage.getItem("ai-chat-state"); if (raw) { const parsed = JSON.parse(raw); STATE.conversations = parsed.conversations || []; STATE.activeId = parsed.activeId || null; } } catch {} }
function saveState() { try { localStorage.setItem("ai-chat-state", JSON.stringify({ conversations: STATE.conversations, activeId: STATE.activeId })); } catch {} }
function getActiveConv() { return STATE.conversations.find((c) => c.id === STATE.activeId) || null; }
function createConversation() { const conv = { id: generateId(), title: "新对话", messages: [] }; STATE.conversations.unshift(conv); STATE.activeId = conv.id; saveState(); return conv; }
function deleteConversation(id) { STATE.conversations = STATE.conversations.filter((c) => c.id !== id); if (STATE.activeId === id) STATE.activeId = STATE.conversations.length > 0 ? STATE.conversations[0].id : null; saveState(); }
function autoTitle(conv) { const firstUser = conv.messages.find((m) => m.role === "user"); if (firstUser) { const t = firstUser.content.trim().replace(/\n/g, " "); conv.title = t.length > 24 ? t.slice(0, 24) + "…" : t; } }
function renderMarkdown(text) { return marked.parse(String(text || "")); }
function highlightCode(root) { if (window.hljs) { root.querySelectorAll("pre code").forEach((block) => window.hljs.highlightElement(block)); } }
function scrollToBottom() { dom.chatArea.scrollTop = dom.chatArea.scrollHeight; }
function renderConversationList() { const convs = STATE.conversations; dom.convList.innerHTML = ""; if (convs.length === 0) { dom.convList.innerHTML = '<div class="empty-state">暂无会话</div>'; return; } for (const conv of convs) { const item = document.createElement("button"); item.className = "conversation-item" + (conv.id === STATE.activeId ? " active" : ""); item.innerHTML = `<span>${conv.title}</span><span class="delete-conv">×</span>`; item.addEventListener("click", (e) => { if (e.target.classList.contains("delete-conv")) { deleteConversation(conv.id); renderConversationList(); renderMessages(); return; } STATE.activeId = conv.id; renderConversationList(); renderMessages(); }); dom.convList.appendChild(item); } }
function renderMessages() { const conv = getActiveConv(); dom.messages.innerHTML = ""; if (!conv || conv.messages.length === 0) { dom.messages.innerHTML = ` <div class="welcome"> <div class="welcome-icon">🤖</div> <h2>DeepSeek V4 Flash</h2> <p class="welcome-desc">快速、智能的 AI 助手，随时随地为你解答</p> </div>`; return; } for (const msg of conv.messages) appendMessageEl(msg.role, msg.content); }
function appendMessageEl(role, content) { const div = document.createElement("div"); div.className = `msg ${role}`; div.innerHTML = ` <div class="msg-avatar">${role === "user" ? "👤" : "🤖"}</div> <div class="msg-body"> <div class="msg-role">${role === "user" ? "你" : "DeepSeek"}</div> <div class="msg-content">${renderMarkdown(content)}</div> </div>`; dom.messages.appendChild(div); highlightCode(div); scrollToBottom(); }
function appendStreamingEl() { const div = document.createElement("div"); div.className = "msg ai"; div.id = "streamingMsg"; div.innerHTML = ` <div class="msg-avatar">🤖</div> <div class="msg-body"> <div class="msg-role">DeepSeek</div> <div class="msg-content" id="streamingContent"></div> </div>`; dom.messages.appendChild(div); return { content: $("#streamingContent") }; }
function finalizeStreamingEl(fullContent) { const el = $("#streamingMsg"); if (!el) return; el.removeAttribute("id"); const contentEl = el.querySelector(".msg-content"); if (contentEl) { contentEl.innerHTML = renderMarkdown(fullContent); highlightCode(el); } }
function ensureConversation() { if (!STATE.activeId || !STATE.conversations.some((c) => c.id === STATE.activeId)) { createConversation(); } }
async function sendMessage() { const text = dom.userInput.value.trim(); if (!text || STATE.streaming) return; ensureConversation(); const conv = getActiveConv(); if (!conv) return; conv.messages.push({ role: "user", content: text }); autoTitle(conv); renderMessages(); renderConversationList(); dom.userInput.value = ""; dom.userInput.style.height = "auto"; STATE.streaming = true; const streamingEl = appendStreamingEl(); let answer = ""; try { const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: conv.messages.map((m) => ({ role: m.role, content: m.content })) }) }); if (!res.ok || !res.body) throw new Error("请求失败"); const reader = res.body.getReader(); const decoder = new TextDecoder(); let buffer = ""; while (true) { const { value, done } = await reader.read(); if (done) break; buffer += decoder.decode(value, { stream: true }); const lines = buffer.split("\n"); buffer = lines.pop() || ""; for (const line of lines) { const s = line.trim(); if (!s.startsWith("data:")) continue; const chunk = s.slice(5).trim(); if (!chunk || chunk === "[DONE]") continue; try { const parsed = JSON.parse(chunk); const content = parsed.content || ""; if (content) { answer += content; if (streamingEl.content) streamingEl.content.innerHTML = renderMarkdown(answer); highlightCode(dom.messages); scrollToBottom(); } } catch {} } } conv.messages.push({ role: "assistant", content: answer || "抱歉，未返回内容。" }); saveState(); finalizeStreamingEl(answer || "抱歉，未返回内容。"); } catch (error) { const err = error.message || "请求失败"; if (streamingEl.content) streamingEl.content.textContent = err; conv.messages.push({ role: "assistant", content: err }); finalState(); } finally { STATE.streaming = false; saveState(); renderConversationList(); }
}
function finalState() { renderMessages(); }
dom.btnSend.addEventListener("click", sendMessage);
dom.userInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
dom.btnNewChat.addEventListener("click", () => { createConversation(); renderMessages(); renderConversationList(); });
dom.btnSidebar.addEventListener("click", () => { dom.sidebar.classList.add("open"); dom.overlay.classList.add("show"); });
dom.btnCloseSidebar.addEventListener("click", () => { dom.sidebar.classList.remove("open"); dom.overlay.classList.remove("show"); });
dom.overlay.addEventListener("click", () => { dom.sidebar.classList.remove("open"); dom.overlay.classList.remove("show"); });
dom.btnClearAll.addEventListener("click", () => { STATE.conversations = []; STATE.activeId = null; saveState(); renderMessages(); renderConversationList(); });
dom.userInput.addEventListener("input", () => { dom.userInput.style.height = "auto"; dom.userInput.style.height = Math.min(dom.userInput.scrollHeight, 160) + "px"; });
loadState(); if (STATE.conversations.length === 0) { createConversation(); } renderConversationList(); renderMessages();
