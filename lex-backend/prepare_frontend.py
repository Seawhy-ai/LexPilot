from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent / 'standalone'
app = root / 'law-app.js'
s = app.read_text(encoding='utf8')
s = re.sub(r'sk-[A-Za-z0-9]{20,}', '', s)
old = "if (!SETTINGS.apiKey) { showError('API配置错误，请先前往关于我们中完成配置'); return; }"
assert old in s
s = s.replace(old, '', 1)
assert s.count('fetch("https://api.deepseek.com/v1/chat/completions", {') == 2
s = s.replace('fetch("https://api.deepseek.com/v1/chat/completions", {', 'fetch("/api/lex/chat", {')
s = s.replace('headers: { "Content-Type": "application/json", Authorization: "Bearer " + SETTINGS.apiKey },', 'headers: { "Content-Type": "application/json" },')
s = s.replace('  if (!key) { cb("未配置 AI API Key。请到「AI 咨询」的设置中完成配置后重试。"); return; }', '')
s = s.replace('headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },', 'headers: { "Content-Type": "application/json" },')
assert 'api.deepseek.com/v1/chat/completions' not in s
app.write_text(s,encoding='utf8')
html = root / 'law.html'
s = re.sub(r'sk-[A-Za-z0-9]{20,}', '', html.read_text(encoding='utf8'))
anchor = '<script src="law-app.js?v=144"></script>'
assert anchor in s
s = s.replace(anchor, '<script src="law-app.js?v=lex-auth1"></script><script src="lex-auth.js?v=1"></script>',1)
# Hide the obsolete browser-side API credential editor, retaining DOM nodes used by legacy code.
s = s.replace('<input type="password" id="apiKeyInput"', '<input hidden disabled type="password" id="apiKeyInput"', 1)
html.write_text(s,encoding='utf8')
sw = root / 'sw.js'
s = sw.read_text(encoding='utf8').replace('lexpilot-v143','lexpilot-server-auth-v1').replace('law-app.js?v=143','law-app.js?v=lex-auth1')
sw.write_text(s,encoding='utf8')
print('Frontend updated; embedded credentials removed.')
