# -*- coding: utf-8 -*-
"""用 deepseek-v4-pro 生成 6 张专业 SVG 示意图,再由 Chrome 无头渲染为高清 PNG。
用法:python gen_diagrams_v4.py
输出:docs/svg/*.svg + docs/img/*.png(覆盖旧 Pillow 版)
"""
import os, re, json, time, subprocess
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
SVG_OUT = os.path.join(HERE, 'svg')
PNG_OUT = os.path.join(HERE, 'img')
os.makedirs(SVG_OUT, exist_ok=True)
os.makedirs(PNG_OUT, exist_ok=True)

CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
API = 'https://api.deepseek.com/anthropic/v1/messages'
KEY = 'sk-09506d6ca13c409e8f422b264d7c7b13'

STYLE_RULES = """
【通用风格规则,必须严格遵守】
1. 白色画布,背景纯白。
2. 所有方框用圆角矩形(rx=12 左右),描边 2px,淡色填充 + 深色描边/强调色;可用深色渐变标题条或左侧色条增强层次。
3. 中文用 font-family="Microsoft YaHei",普通文字 14-16px 深灰 #374151,标题 18-22px 加粗深色或主题色。
4. 布局要求:元素之间留足空隙(≥20px),任何元素不得超出画布边界(四周留白 ≥24px),不得互相重叠;文字始终水平垂直居中于所在框内。
5. 所有箭头用细直折线(或弧线)连接框边缘,配清晰箭头 marker;箭头间距均匀,不交叉不压字;连线文字标签与线平行、不与框重叠。
6. 配色仅用以下色板:主蓝 #2563eb / 浅蓝 #eff6ff / 中蓝描边 #93c5fd;主绿 #16a34a / 浅绿 #f0fdf4 / 描边 #86efac;主橙 #d97706 / 浅橙 #fffbeb / 描边 #fcd34d;主灰 #6b7280 / 浅灰 #f3f4f6;强调红 #dc2626 / 浅红 #fef2f2;正文 #374151;标题 #1f2937。
7. 输出必须是【纯 SVG 文本】:以 <svg 开头、</svg> 结尾,带上正确的 xmlns、width、height、viewBox。不要输出任何解释文字、不要用 ``` 围栏。
"""


def gen_svg(name, w, h, content_spec):
    prompt = (f"请为《律衡——全民法律知识普惠智能体》设计说明书绘制一张专业、美观的示意图,保存为 SVG。\n"
              f"【图名】{name}\n【画布尺寸】width={w} height={h} viewBox=\"0 0 {w} {h}\"\n"
              f"{content_spec}\n" + STYLE_RULES)
    body = {
        'model': 'deepseek-v4-pro',
        'max_tokens': 24000,
        'messages': [{'role': 'user', 'content': prompt}],
    }
    req = urllib.request.Request(API, data=json.dumps(body).encode(),
                                 headers={'Authorization': 'Bearer ' + KEY,
                                          'Content-Type': 'application/json',
                                          'anthropic-version': '2023-06-01'})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=300) as resp:
                r = json.loads(resp.read())
            print('    stop_reason=%s usage=%s' % (r.get('stop_reason'),
                  json.dumps(r.get('usage', {}), ensure_ascii=False)))
            if r.get('stop_reason') == 'max_tokens':
                raise ValueError('truncated (max_tokens)')
            texts = [c['text'] for c in r.get('content', []) if c.get('type') == 'text']
            svg = '\n'.join(texts).strip()
            svg = re.sub(r'^```(?:svg)?\s*|\s*```$', '', svg, flags=re.S).strip()
            if not svg.startswith('<svg'):
                raise ValueError('not svg: ' + svg[:60])
            return svg
        except Exception as e:
            print('  retry %d: %s' % (attempt + 1, e))
            time.sleep(3)
    return None


def render_png(svg_file, png_file, w, h):
    url = 'file:///' + svg_file.replace('\\', '/')
    cmd = [CHROME, '--headless', '--disable-gpu', '--hide-scrollbars',
           '--force-device-scale-factor=2',
           '--screenshot=' + png_file.replace('/', '\\'),
           '--window-size=%d,%d' % (w, h), url]
    subprocess.run(cmd, capture_output=True, timeout=60)
    return os.path.exists(png_file)


DIAGRAMS = [
    # ---- 1. 总体架构图(四层) ----
    ('arch', 920, 560, """【内容】自上而下四层横向大条,每层一个圆角大框,内含「层名 + 说明」;层间用向下箭头连接。
层1 入口层:分享链接 · 网页嵌入 · 公众号菜单(浏览器直开,零安装)  [主蓝]
层2 平台层:FastGPT(开源):对话界面 · 工作流引擎 · 变量记忆  [主蓝]
层3 能力层:领域识别 → 要素引导 → 知识库检索 → AI 生成 → 分支指引  [主绿]
层4 数据层:法条库 · 案例库 · FAQ 库 · 渠道库 · 模板库  [主橙]
要求:四层横排居中对齐、等宽、间距均匀,每层说明分两行,左侧加竖色条或顶部渐变色条。"""),
    # ---- 2. 主干工作流(竖向 8 节点) ----
    ('workflow', 660, 900, """【内容】自上而下一个竖向 8 节点流程图,节点为圆角矩形,节点间用垂直箭头连接;节点内「节点名加粗 + 说明小字」。
1 用户提问:输入生活场景中的法律问题  [主蓝]
2 节点1 问题分类:识别领域(劳动/消费/婚姻/房产/借贷/交通/其他)  [主蓝]
3 节点2 要素引导:追问关键事实,写入对话变量  [主蓝]
4 节点3 知识库检索:按领域检索对应分库  [主蓝]
5 节点4 AI 对话:通俗解释 + 法条引用 + 操作建议  [主绿]
6 节点5 条件分支:按用户情形分流到具体维权路径  [主橙]
7 节点6 结果汇总:维权渠道/材料清单 + 免责声明 + 转介  [主绿]
8 节点7 结束:「换一个问题」/「拨打 12348」引导  [主灰]
要求:8 框纵向等间距,单列居中,箭头连接下框顶边,不得超出画布。"""),
    # ---- 3. 劳动纠纷分支(决策树) ----
    ('branch', 780, 620, """【内容】一个「劳动纠纷」决策分支图。
顶部:一个「劳动纠纷」(识别到劳动类问题)起始框,居中。[主蓝]
其下:一个判断框「已离职?」居中。
- 已离职(是)→ 左下方框「劳动仲裁指引」(时效 1 年 · 申请书 · 证据清单 · 属地仲裁委) [主蓝]
- 未离职(否)→ 右边判断框「在职?」
  - 是 → 右下「12333 劳动监察投诉」(保留工资流水 / 考勤记录 · 维权渠道指引) [主绿]
  - 特殊情形 → 左下第二层「工伤认定流程 / 经济补偿金 · 被迫离职提示」 [强调红]
要求:树状布局,分支箭头带「是/否/特殊情形」标签,标签用主题色、不与框重叠,整体平衡美观。"""),
    # ---- 4. 知识库分库结构 ----
    ('kb', 880, 460, """【内容】中央一个「律衡知识库」总框(主蓝),向下分叉连接到下方横向并排的 5 个分库框(等宽等距):
法条库(民法典 / 劳动法 / 消保法等,按「章-条」切分) [主蓝]
案例库(指导案例 / 公报案例,按「案情-裁判-要点」) [主蓝]
FAQ 库(30+ 高频生活场景,结论/依据/步骤/注意) [主绿]
渠道库(12348 / 12315 / 12333,按机构-地域组织) [主橙]
模板库(借条 / 合同要点等,按文书类型组织) [主橙]
要求:中央框在上,5 个分库框在下横向均匀排布,用折线或竖直箭头连接,整体对称。"""),
    # ---- 5. 部署拓扑 ----
    ('deploy', 920, 500, """【内容】一个私有化部署拓扑图,包含 5 个节点:
「公众浏览器」(浏览器直开) [主蓝]   上部左侧
「Nginx 反向代理」(公网入口) [主灰]  上部中间,标注 HTTPS 连接
「FastGPT 服务」(容器化 · 私有化部署) [主蓝]   中部
「向量数据库」(知识库检索) [主橙]    下部左侧
「大模型 API」(DeepSeek / GLM) [主绿]  下部右侧
连线:浏览器--HTTPS-->Nginx--><p>FastGPT</p>,FastGPT 分两路向下连接向量库与大模型 API。
要求:节点用圆角矩形,箭头线清晰不交叉,标注简洁。"""),
    # ---- 6. 学-练-赛 闭环 ----
    ('loop', 760, 380, """【内容】一个「学-练-赛 闭环」四阶段循环图,4 个节点均匀分布在圆环上(上/右/下/左),节点间用顺时针弧形箭头连接,圆心放「学-练-赛 闭环」大标题。
- 数据准备:场景清单 + 法条/FAQ [主蓝]  上方
- 知识库构建:4+1 分库搭建调优 [主蓝]   右方
- 工作流编排:主干 + 领域分支 [主绿]    下方
- 测试优化:测试集迭代 [主橙]          左方
要求:4 框大小一致、水平垂直居中于各自方向,弧形箭头用 <path> 圆弧带 marker 箭头,美观顺滑,不交叉。"""),
]


def main():
    for name, w, h, spec in DIAGRAMS:
        print('== %s ==' % name)
        svg = gen_svg(name, w, h, spec)
        if not svg:
            print('  FAILED')
            continue
        svg_path = os.path.join(SVG_OUT, name + '.svg')
        with open(svg_path, 'w', encoding='utf-8') as f:
            f.write(svg)
        print('  svg saved (%d chars)' % len(svg))
        png_path = os.path.join(PNG_OUT, name + '.png')
        ok = render_png(svg_path, png_path, w, h)
        print('  png rendered:', ok)
        time.sleep(2)
    print('done')


if __name__ == '__main__':
    main()
