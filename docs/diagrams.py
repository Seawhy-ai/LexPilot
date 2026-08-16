# -*- coding: utf-8 -*-
"""用 Pillow 生成《智能体设计说明书》所需的示意图(PNG,中文黑体)。
运行:python diagrams.py   → 输出到 docs/img/*.png
"""
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'img')
os.makedirs(OUT, exist_ok=True)

FONT = r"C:/Windows/Fonts/msyh.ttc"
FONT_B = r"C:/Windows/Fonts/msyhbd.ttc"

# 配色
BLUE = (37, 99, 235)
BLUE_L = (219, 234, 254)
BLUE_LL = (239, 246, 255)
GREEN = (22, 163, 74)
GREEN_L = (220, 252, 231)
ORANGE = (217, 119, 6)
ORANGE_L = (254, 243, 199)
GRAY = (107, 114, 128)
GRAY_L = (243, 244, 246)
DARK = (31, 41, 55)
WHITE = (255, 255, 255)
RED = (220, 38, 38)


def font(sz, bold=False):
    return ImageFont.truetype(FONT_B if bold else FONT, sz)


def text_w(draw, s, f):
    return draw.textlength(s, font=f)


def wrap(draw, s, f, maxw):
    """按像素宽度折行,支持 \n 作为强制换行。"""
    lines, cur = [], ''
    for ch in s:
        if ch == '\n':
            if cur:
                lines.append(cur)
                cur = ''
            continue
        if text_w(draw, cur + ch, f) <= maxw or not cur:
            cur += ch
        else:
            lines.append(cur)
            cur = ch
    if cur:
        lines.append(cur)
    return lines


def draw_center(draw, xy, s, f, fill=DARK):
    x0, y0, x1, y1 = xy
    tw = text_w(draw, s, f)
    draw.text(((x0 + x1) / 2 - tw / 2, (y0 + y1) / 2 - f.size / 2), s, font=f, fill=fill)


def v_arrow(draw, cx, y0, y1, color=BLUE, w=3):
    draw.line([(cx, y0), (cx, y1)], fill=color, width=w)
    # 箭头
    draw.polygon([(cx - 7, y1 - 10), (cx + 7, y1 - 10), (cx, y1 + 6)], fill=color)


def h_arrow(draw, x0, y, x1, color=BLUE, w=3):
    draw.line([(x0, y), (x1, y)], fill=color, width=w)
    draw.polygon([(x1 - 10, y - 7), (x1 - 10, y + 7), (x1 + 6, y)], fill=color)


# ============ 1. 总体架构图 ============
def arch():
    W, H = 920, 560
    img = Image.new('RGB', (W, H), WHITE)
    d = ImageDraw.Draw(img)
    layers = [
        ('入口层', '分享链接 · 网页嵌入 · 公众号菜单(浏览器直开,零安装)', BLUE),
        ('平台层', 'FastGPT(开源):对话界面 · 工作流引擎 · 变量记忆', BLUE),
        ('能力层', '领域识别 → 要素引导 → 知识库检索 → AI 生成 → 分支指引', GREEN),
        ('数据层', '法条库 · 案例库 · FAQ 库 · 渠道库 · 模板库', ORANGE),
    ]
    box_w, box_h, gap = 760, 96, 26
    x0 = (W - box_w) // 2
    y = 30
    for name, desc, color in layers:
        if color == BLUE:
            lw, ll = BLUE_L, BLUE_LL
        elif color == GREEN:
            lw, ll = GREEN_L, GREEN_L
        else:
            lw, ll = ORANGE_L, ORANGE_L
        d.rounded_rectangle([x0, y, x0 + box_w, y + box_h], radius=14, fill=ll, outline=lw, width=2)
        # 左侧色条
        d.rounded_rectangle([x0, y, x0 + 12, y + box_h], radius=6, fill=color)
        # 层名
        d.text((x0 + 28, y + 14), name, font=font(20, True), fill=color)
        # 描述折行
        fdesc = font(16)
        lines = wrap(d, desc, fdesc, box_w - 56)
        ty = y + 48
        for ln in lines:
            d.text((x0 + 28, ty), ln, font=fdesc, fill=DARK)
            ty += 24
        y += box_h + gap
    cx = W // 2
    cur = 30 + box_h
    for k in range(3):
        yy = cur + 26
        v_arrow(d, cx, cur, yy)
        cur = yy
    img.save(os.path.join(OUT, 'arch.png'))


# ============ 2. 主干工作流图 ============
def workflow():
    W, H = 660, 860
    img = Image.new('RGB', (W, H), WHITE)
    d = ImageDraw.Draw(img)
    nodes = [
        ('用户提问', '输入生活场景中的法律问题', BLUE),
        ('节点1 问题分类', '识别领域:劳动/消费/婚姻/房产/借贷/交通/其他', BLUE),
        ('节点2 要素引导', '追问关键事实,写入对话变量', BLUE),
        ('节点3 知识库检索', '按领域检索对应分库', BLUE),
        ('节点4 AI 对话', '通俗解释 + 法条引用 + 操作建议', GREEN),
        ('节点5 条件分支', '按用户情形分流到具体维权路径', ORANGE),
        ('节点6 结果汇总', '维权渠道/材料清单 + 免责声明 + 转介', GREEN),
        ('节点7 结束', '「换一个问题」/「拨打 12348」引导', GRAY),
    ]
    box_w, box_h = 520, 78
    x0 = (W - box_w) // 2
    y = 20
    positions = []
    for name, desc, color in nodes:
        if color == BLUE:
            lw, ll = BLUE_L, BLUE_LL
        elif color == GREEN:
            lw, ll = GREEN_L, GREEN_L
        elif color == ORANGE:
            lw, ll = ORANGE_L, ORANGE_L
        else:
            lw, ll = GRAY_L, GRAY_L
        d.rounded_rectangle([x0, y, x0 + box_w, y + box_h], radius=12, fill=ll, outline=lw, width=2)
        d.rectangle([x0 + 4, y + 8, x0 + 8, y + box_h - 8], fill=color)
        d.text((x0 + 22, y + 10), name, font=font(18, True), fill=DARK)
        fdesc = font(14)
        lines = wrap(d, desc, fdesc, box_w - 44)
        ty = y + 40
        for ln in lines:
            d.text((x0 + 22, ty), ln, font=fdesc, fill=GRAY)
            ty += 20
        positions.append((x0, y, x0 + box_w, y + box_h))
        y += box_h + 34
    cx = W // 2
    for k in range(len(nodes) - 1):
        y0b = positions[k][3]
        y1b = positions[k + 1][1]
        v_arrow(d, cx, y0b + 2, y1b - 8)
    img.save(os.path.join(OUT, 'workflow.png'))


# ============ 3. 劳动纠纷分支流程 ============
def branch():
    W, H = 760, 640
    img = Image.new('RGB', (W, H), WHITE)
    d = ImageDraw.Draw(img)

    def box(cx, cy, w, h, t, sub, color, bold=True):
        lw, ll = {BLUE: (BLUE_L, BLUE_LL), GREEN: (GREEN_L, GREEN_L),
                  ORANGE: (ORANGE_L, ORANGE_L), RED: (RED, (254, 226, 226)),
                  GRAY: (GRAY_L, GRAY_L)}[color]
        x0, y0 = cx - w // 2, cy - h // 2
        d.rounded_rectangle([x0, y0, x0 + w, y0 + h], radius=12, fill=ll, outline=lw, width=2)
        draw_center(d, [x0, y0, x0 + w, y0 + h - 26], t, font(17, bold), DARK)
        fsub = font(13)
        for i, ln in enumerate(wrap(d, sub, fsub, w - 24)):
            tw = text_w(d, ln, fsub)
            d.text((cx - tw / 2, y0 + h - 22 + i * 20), ln, font=fsub, fill=GRAY)
        return (x0, y0, x0 + w, y0 + h)

    start = box(W // 2, 40, 260, 56, '劳动纠纷', '识别到劳动类问题', BLUE)
    q1 = box(W // 2, 170, 300, 64, '已离职?', '是否已结束劳动关系', ORANGE)
    box(170, 330, 300, 84, '劳动仲裁指引', '时效 1 年 · 申请书 · 证据清单\n属地仲裁委', BLUE)
    q2 = box(560, 330, 300, 64, '在职?', '', ORANGE)
    box(170, 500, 300, 84, '特殊情形', '工伤认定流程 / 经济补偿金\n被迫离职提示', RED)
    box(560, 500, 300, 84, '12333 劳动监察投诉', '保留工资流水 / 考勤记录\n维权渠道指引', GREEN)
    # 连线
    def line2(p1, p2, text=None):
        d.line([p1, p2], fill=GRAY, width=3)
        # 箭头
        dx, dy = p2[0] - p1[0], p2[1] - p1[1]
        import math
        ang = math.atan2(dy, dx)
        a1, a2 = ang + 2.7, ang - 2.7
        for a in (a1, a2):
            d.line([p2, (p2[0] + 12 * math.cos(a), p2[1] + 12 * math.sin(a))], fill=GRAY, width=3)
        if text:
            tw = text_w(d, text, font(13))
            d.text(((p1[0] + p2[0]) / 2 - tw / 2, (p1[1] + p2[1]) / 2 - 30), text, font=font(13), fill=BLUE)

    cx = W // 2
    line2((cx, start[3]), (cx, q1[1]), '识别成功')
    # 已离职 → 左
    line2((q1[0], (q1[1] + q1[3]) // 2), (box(170, 330, 300, 84, '', '', BLUE)[2], 330), '是 → 仲裁')
    line2((q1[2], (q1[1] + q1[3]) // 2), (q2[0], 330), '否')
    # 在职 → 右
    line2((q2[2], (q2[1] + q2[3]) // 2), (box(560, 500, 300, 84, '', '', GREEN)[2], 500), '是 → 监察投诉')
    line2((q2[0], (q2[1] + q2[3]) // 2), (170, 500), '特殊 → 工伤/补偿')
    img.save(os.path.join(OUT, 'branch.png'))


# ============ 4. 知识库结构图 ============
def kb():
    W, H = 880, 460
    img = Image.new('RGB', (W, H), WHITE)
    d = ImageDraw.Draw(img)
    cx = W // 2
    d.rounded_rectangle([cx - 170, 30, cx + 170, 110], radius=14, fill=BLUE_L, outline=BLUE, width=2)
    draw_center(d, [cx - 170, 30, cx + 170, 110], '律衡知识库', font(22, True), BLUE)
    v_arrow(d, cx, 110, 170)
    subs = [
        ('法条库', '民法典 / 劳动法 / 消保法等\n按「章-条」切分', BLUE),
        ('案例库', '指导案例 / 公报案例\n按「案情-裁判-要点」', BLUE),
        ('FAQ 库', '30+ 高频生活场景\n结论/依据/步骤/注意', GREEN),
        ('渠道库', '12348 / 12315 / 12333\n按机构-地域组织', ORANGE),
        ('模板库', '借条 / 合同要点等\n按文书类型组织', ORANGE),
    ]
    n = len(subs)
    gap = 30
    bw = (W - gap * (n + 1)) // n
    bh = 200
    y = 190
    for i, (name, desc, color) in enumerate(subs):
        x0 = gap + i * (bw + gap)
        lw, ll = (BLUE_L, BLUE_LL) if color == BLUE else ((GREEN_L, GREEN_L) if color == GREEN else (ORANGE_L, ORANGE_L))
        d.rounded_rectangle([x0, y, x0 + bw, y + bh], radius=12, fill=ll, outline=lw, width=2)
        draw_center(d, [x0, y, x0 + bw, y + 50], name, font(18, True), color)
        d.line([(x0 + 12, y + 56), (x0 + bw - 12, y + 56)], fill=lw, width=2)
        fdesc = font(13)
        lines = wrap(d, desc, fdesc, bw - 20)
        ty = y + 68
        for ln in lines:
            tw = text_w(d, ln, fdesc)
            d.text((x0 + (bw - tw) / 2, ty), ln, font=fdesc, fill=GRAY)
            ty += 20
    img.save(os.path.join(OUT, 'kb.png'))


# ============ 5. 部署拓扑 ============
def deploy():
    W, H = 920, 520
    img = Image.new('RGB', (W, H), WHITE)
    d = ImageDraw.Draw(img)
    boxes = {
        'browser': (150, 90, 240, 70, '公众浏览器', '浏览器直开', BLUE),
        'proxy': (480, 90, 240, 70, 'Nginx 反向代理', '公网入口', GRAY),
        'fastgpt': (290, 260, 300, 70, 'FastGPT 服务', '容器化 · 私有化部署', BLUE),
        'vec': (130, 400, 240, 70, '向量数据库', '知识库检索', ORANGE),
        'model': (540, 400, 240, 70, '大模型 API', 'DeepSeek / GLM', GREEN),
    }
    for k, (x, y, w, h, t, s, color) in boxes.items():
        lw, ll = (BLUE_L, BLUE_LL) if color == BLUE else ((GREEN_L, GREEN_L) if color == GREEN else ((ORANGE_L, ORANGE_L) if color == ORANGE else (GRAY_L, GRAY_L)))
        d.rounded_rectangle([x, y, x + w, y + h], radius=12, fill=ll, outline=lw, width=2)
        draw_center(d, [x, y, x + w, y + h - 20], t, font(18, True), DARK)
        tw = text_w(d, s, font(13))
        d.text((x + (w - tw) / 2, y + h - 18), s, font=font(13), fill=GRAY)
    # 浏览器 → 代理
    h_arrow(d, 390, 125, 480, GRAY)
    d.text((400, 100), 'HTTPS', font=font(13), fill=BLUE)
    # 代理 → FastGPT(竖线)
    v_arrow(d, 600, 160, 260, GRAY)
    # FastGPT 底部 → 汇合点 → 分叉
    v_arrow(d, 440, 330, 385, GRAY)
    h_arrow(d, 440, 385, 250, GRAY)
    h_arrow(d, 440, 385, 660, GRAY)
    v_arrow(d, 250, 385, 400, GRAY)
    v_arrow(d, 660, 385, 400, GRAY)
    img.save(os.path.join(OUT, 'deploy.png'))


# ============ 6. 学练赛闭环 ============
def loop():
    W, H = 760, 360
    img = Image.new('RGB', (W, H), WHITE)
    d = ImageDraw.Draw(img)
    phases = [
        ('数据准备', '场景清单 + 法条/FAQ', BLUE),
        ('知识库构建', '4+1 分库搭建调优', BLUE),
        ('工作流编排', '主干 + 领域分支', GREEN),
        ('测试优化', '测试集迭代', ORANGE),
    ]
    n = len(phases)
    rx, ry, rw, rh = W // 2, H // 2, 270, 210
    for i, (name, desc, color) in enumerate(phases):
        ang = -90 + i * 90
        import math
        a = math.radians(ang)
        cx = rx + rw * math.cos(a)
        cy = ry + rh * math.sin(a)
        bw, bh = 190, 78
        x0, y0 = cx - bw / 2, cy - bh / 2
        lw, ll = (BLUE_L, BLUE_LL) if color == BLUE else ((GREEN_L, GREEN_L) if color == GREEN else (ORANGE_L, ORANGE_L))
        d.rounded_rectangle([x0, y0, x0 + bw, y0 + bh], radius=12, fill=ll, outline=lw, width=2)
        draw_center(d, [x0, y0, x0 + bw, y0 + bh - 22], name, font(17, True), DARK)
        tw = text_w(d, desc, font(12))
        d.text((cx - tw / 2, y0 + bh - 18), desc, font=font(12), fill=GRAY)
    # 顺时针箭头
    for i in range(n):
        import math
        a1 = math.radians(-90 + i * 90 + 35)
        a2 = math.radians(-90 + (i + 1) * 90 - 35)
        p1 = (rx + rw * math.cos(a1), ry + rh * math.sin(a1))
        p2 = (rx + rw * math.cos(a2), ry + rh * math.sin(a2))
        # 曲线太复杂,画直线箭头
        h_arrow(d, p1[0], p1[1], p2[0], BLUE, 2)
    d.text((W // 2 - 60, H // 2 - 14), '学-练-赛 闭环', font=font(18, True), fill=BLUE)
    img.save(os.path.join(OUT, 'loop.png'))


for fn in (arch, workflow, branch, kb, deploy, loop):
    fn()
    print('done:', fn.__name__)
print('all diagrams saved to', OUT)
