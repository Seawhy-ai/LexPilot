# -*- coding: utf-8 -*-
"""程序化校验 v4pro 生成的 SVG/PNG:XML 合法性、元素越界、文字溢出、PNG 尺寸与密度。"""
import os, re, sys
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))
SVG_OUT = os.path.join(HERE, 'svg')
PNG_OUT = os.path.join(HERE, 'img')

CJK = re.compile(r'[⺀-鿿豈-﫿぀-ヿ]')


def est_text_width(text, font_size):
    """估算渲染宽度:中文字符≈1em,ASCII≈0.55em。"""
    cjk = len(CJK.findall(text))
    asc = len(text) - cjk
    return (cjk * 1.0 + asc * 0.55) * font_size


def parse_font(elem):
    fs = 14.0
    st = elem.get('style', '') or ''
    m = re.search(r'font-size:\s*([\d.]+)px', st)
    if m:
        fs = float(m.group(1))
    for a in ('font-size',):
        v = elem.get(a)
        if v:
            m = re.match(r'([\d.]+)', v)
            if m:
                fs = float(m.group(1))
    return fs


def check_svg(path, name, W, H):
    problems = []
    try:
        root = ET.parse(path).getroot()
    except Exception as e:
        return ['XML ERROR: %s' % e]
    # 收集所有矩形(含 rx)作为容器
    rects = []
    for r in root.iter():
        tag = r.tag.rsplit('}', 1)[-1]
        if tag == 'rect':
            try:
                x = float(r.get('x', 0)); y = float(r.get('y', 0))
                w = float(r.get('width')); h = float(r.get('height'))
                rects.append((x, y, x + w, y + h, r))
            except Exception:
                pass
    # 越界检查(所有 shape)
    for el in root.iter():
        tag = el.tag.rsplit('}', 1)[-1]
        if tag == 'svg':
            continue
        if tag in ('rect', 'ellipse', 'circle'):
            try:
                x = float(el.get('x', 0)); y = float(el.get('y', 0))
                w = float(el.get('width', 0)); h = float(el.get('height', 0))
                if x < -1 or y < -1 or x + w > W + 1 or y + h > H + 1:
                    problems.append('OUT-OF-BOUNDS <%s> at (%.0f,%.0f) %sx%s' % (tag, x, y, w, h))
            except Exception:
                pass
        elif tag == 'text':
            try:
                x = float(el.get('x', 0)); y = float(el.get('y', 0))
                anchor = el.get('text-anchor', 'start')
                fs = parse_font(el)
                txt = ''.join(el.itertext())
                w = est_text_width(txt, fs)
                # 按锚点换算实际左右边界
                if anchor == 'middle':
                    left, right = x - w / 2, x + w / 2
                elif anchor == 'end':
                    left, right = x - w, x
                else:
                    left, right = x, x + w
                if left < -1 or right > W + 2 or y < -1 or y > H + 2:
                    problems.append('TEXT-OUT-OF-BOUNDS "%s" (~%.0fpx) at x=%.0f' % (txt[:12], w, x))
                # 文字宽度超过所在容器宽度(用锚点中心定位容器)
                cx = x
                for rx, ry, rx2, ry2, r in rects:
                    if rx <= cx <= rx2 and ry <= y <= ry2:
                        if w > (rx2 - rx) * 1.06:
                            problems.append('TEXT-OVERFLOW "%s" (%.0fpx > box %.0fpx)' % (txt[:12], w, rx2 - rx))
                        break
            except Exception:
                pass
    return problems


def check_png(path, W, H):
    from PIL import Image
    img = Image.open(path)
    if img.size != (W * 2, H * 2):
        return 'BAD SIZE %s (expected %s)' % (img.size, (W * 2, H * 2))
    g = img.convert('L')
    px = g.getdata()
    nonwhite = sum(1 for p in px if p < 245)
    density = nonwhite * 100.0 / len(px)
    if density < 5 or density > 90:
        return 'ODD DENSITY %.1f%%' % density
    return 'OK density=%.1f%%' % density


def main():
    sizes = {'arch': (920, 560), 'workflow': (660, 900), 'branch': (780, 620),
             'kb': (880, 460), 'deploy': (920, 500), 'loop': (760, 380)}
    all_ok = True
    for name, (W, H) in sizes.items():
        svg = os.path.join(SVG_OUT, name + '.svg')
        png = os.path.join(PNG_OUT, name + '.png')
        print('== %s ==' % name)
        if not os.path.exists(svg):
            print('  NO SVG'); all_ok = False; continue
        probs = check_svg(svg, name, W, H)
        if probs:
            all_ok = False
            for p in probs:
                print('  [svg] ' + p)
        else:
            print('  [svg] OK (valid, in-bounds, no overflow)')
        if os.path.exists(png):
            r = check_png(png, W, H)
            print('  [png] ' + r)
            if not r.startswith('OK'):
                all_ok = False
        else:
            print('  [png] MISSING'); all_ok = False
    print('\nRESULT:', 'ALL PASS' if all_ok else 'NEEDS FIX')


if __name__ == '__main__':
    main()
