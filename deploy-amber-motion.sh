#!/bin/bash
set -euo pipefail
site=/var/www/seawhy-lex
test -f "$site/law.html" || { echo '网站目录不匹配，已停止'; exit 1; }
stage=$(mktemp -d /tmp/lex-motion.XXXXXX)
base=https://raw.githubusercontent.com/Seawhy-ai/LexPilot/feature/independent-accounts-ai/standalone
echo '下载并校验动画，暂不改动网站'
curl -fL --retry 3 --retry-delay 2 --connect-timeout 20 --max-time 180 "$base/images/skins/amber-scale-motion.gif" -o "$stage/amber-scale-motion.gif"
curl -fL --retry 3 --retry-delay 2 --connect-timeout 20 --max-time 60 "$base/skin-motion.js" -o "$stage/skin-motion.js"
(cd "$stage"; echo '3e4dfa6e7db7fb96d60752c753c128314b6a9533298459c9ce296ae3fc48c294  amber-scale-motion.gif' | sha256sum -c -; echo '2e0cdc070eafdcbd21780c74d4db06c3737ebad033bea575fa6e6534f0a048c2  skin-motion.js' | sha256sum -c -)
node --check "$stage/skin-motion.js"
backup=$(mktemp -d /var/backups/lex-motion.XXXXXX)
cp -a "$site/law.html" "$backup/"
for file in sw.js skin-motion.js images/skins/amber-scale-motion.gif; do
  if test -f "$site/$file"; then cp --parents -a "$site/$file" "$backup/"; fi
done
grep -q 'skin-theme.js' "$site/law.html" || { echo '缺少皮肤模块，已停止'; exit 1; }
install -m 644 "$stage/amber-scale-motion.gif" "$site/images/skins/amber-scale-motion.gif"
install -m 644 "$stage/skin-motion.js" "$site/skin-motion.js"
cp "$site/law.html" "$stage/law.html"
if ! grep -q 'src="skin-motion.js?v=1"' "$stage/law.html"; then
  sed -i '/<script src="skin-theme.js/a <script src="skin-motion.js?v=1"></script>' "$stage/law.html"
fi
install -m 644 "$stage/law.html" "$site/law.html.motion-new"
mv "$site/law.html.motion-new" "$site/law.html"
if test -f "$site/sw.js"; then sed -i 's/^var CACHE = .*/var CACHE = "lexpilot-skins-motion-v12";/' "$site/sw.js"; fi
echo "更新完成，备份位于：$backup"
echo '关闭网站标签再重新打开，进入烛衡天律查看动画。账号和数据库未改动。'
