#!/bin/bash
set -euo pipefail
site=/var/www/seawhy-lex
backend=/opt/seawhy-lex/lex-backend/server.mjs
db=/var/lib/seawhy-lex/users.sqlite
test -f "$site/law.html" && test -f "$backend" && test -f "$db" || { echo '部署路径不匹配，已停止'; exit 1; }
stage=$(mktemp -d /tmp/lex-firm-v2.XXXXXX)
base=https://raw.githubusercontent.com/Seawhy-ai/LexPilot/feature/independent-accounts-ai
curl -fL --retry 3 --connect-timeout 20 --max-time 90 "$base/firm-v2-manifest.json" -o "$stage/manifest.json"
node -e 'const m=require(process.argv[1]);for(const f of m.files){if(!/^(standalone\/[a-z0-9.-]+|lex-backend\/server.mjs)$/.test(f.path)||!/^[a-f0-9]{64}$/.test(f.sha256))throw Error("清单格式错误");console.log(f.path)}' "$stage/manifest.json" > "$stage/files"
while IFS= read -r file; do
  mkdir -p "$stage/$(dirname "$file")"
  curl -fL --retry 3 --retry-delay 2 --connect-timeout 20 --max-time 90 "$base/$file" -o "$stage/$file"
done < "$stage/files"
node -e 'const fs=require("fs"),crypto=require("crypto"),dir=process.argv[1],m=require(dir+"/manifest.json");for(const f of m.files){const hash=crypto.createHash("sha256").update(fs.readFileSync(dir+"/"+f.path)).digest("hex");if(hash!==f.sha256)throw Error("下载校验失败："+f.path)}' "$stage"
node --check "$stage/standalone/firm-engine.js"
node --check "$stage/standalone/firm-v2.js"
node --check "$stage/lex-backend/server.mjs"
grep -q 'skin-theme.js' "$site/law.html"
test -f "$site/images/firm/firm-levels.png" && test -f "$site/images/firm/firm-team-cases.png" || { echo '缺少律所美术文件，已停止'; exit 1; }
backup=$(mktemp -d /var/backups/lex-firm-v2.XXXXXX)
cp -a "$backend" "$backup/server.mjs"
for file in law.html sw.js firm-engine.js firm-v2.js firm-v2.css; do
  if test -f "$site/$file"; then cp -a "$site/$file" "$backup/$file"; fi
done
node --input-type=module -e 'import {DatabaseSync} from "node:sqlite";const db=new DatabaseSync(process.argv[1]);db.exec("VACUUM INTO " + "\x27" + process.argv[2].replaceAll("\x27","\x27\x27") + "\x27");db.close()' "$db" "$backup/users.sqlite"
echo "数据库及现有文件已备份：$backup"
rollback(){
  echo '更新未通过，正在恢复原文件'
  cp -a "$backup/server.mjs" "$backend"
  for file in law.html sw.js firm-engine.js firm-v2.js firm-v2.css; do
    if test -f "$backup/$file"; then cp -a "$backup/$file" "$site/$file"; fi
  done
  systemctl restart seawhy-lex || true
  echo "原文件已恢复，备份保留在 $backup"
}
trap rollback ERR
# Backend first; old pages remain compatible while health is checked.
install -m 644 "$stage/lex-backend/server.mjs" "$backend.new"
mv "$backend.new" "$backend"
systemctl restart seawhy-lex
healthy=0
for attempt in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS --max-time 5 https://lex.lvheng.me/api/lex/health > "$stage/health.json" && node -e 'if(!require(process.argv[1]).ok)process.exit(1)' "$stage/health.json"; then healthy=1; break; fi
  sleep 2
done
test "$healthy" = 1
for file in firm-engine.js firm-v2.js firm-v2.css; do install -m 644 "$stage/standalone/$file" "$site/$file"; done
cp "$site/law.html" "$stage/law.html"
node -e 'const fs=require("fs"),p=process.argv[1];let html=fs.readFileSync(p,"utf8");if(!html.includes("firm-v2.css?v=1"))html=html.replace("</head>",`<link rel="stylesheet" href="firm-v2.css?v=1" />\n</head>`);if(!html.includes("firm-engine.js?v=1"))html=html.replace("</body>",`<script src="firm-engine.js?v=1"></script>\n<script src="firm-v2.js?v=1"></script>\n</body>`);if(!html.includes("firm-engine.js?v=1")||!html.includes("firm-v2.css?v=1"))throw Error("页面接入失败");fs.writeFileSync(p,html)' "$stage/law.html"
install -m 644 "$stage/law.html" "$site/law.html.new"
mv "$site/law.html.new" "$site/law.html"
if test -f "$site/sw.js"; then sed -i 's/^var CACHE = .*/var CACHE = "lexpilot-firm-v2-13";/' "$site/sw.js"; fi
trap - ERR
echo "律所新版部署完成。备份：$backup"
echo '重新打开网站进入我的律所；旧进度首次打开时自动迁移并同步。'
