#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
瘦身 fcitx5 chinese-addons 插件:只保留拼音输入法,裁掉 table 系(五笔/仓颉等)。

用法:
  python scripts/slim_fcitx_plugin.py chinese-addons.zip chinese-addons-slim.zip [--keep-jieba]

原理:
  官方 fcitx5-plugins@js 的 chinese-addons.zip 是 installPlugin() 可直接吃的 ZIP,
  zip 根部即 /usr 树,内含 lib/fcitx5/*.so、share/fcitx5/addon|inputmethod/*.conf、
  lib/libime/zh_CN.lm(拼音语言模型,大头)、share/libime/*.dict、share/opencc、
  plugin/chinese-addons.json 描述符。本脚本按真实结构删除:

  [必删 - table 系]
    lib/fcitx5/libtable.so
    share/fcitx5/addon/table.conf
    share/fcitx5/inputmethod/{cangjie,db,erbi,qxm,wanfeng,wbpy,wbx,zrm}.conf
    share/libime/{cj,db,erbi,qxm,wanfeng,wbpy,wbx,zrm}.main.dict
  保留 pinyin 需要的:sc.dict、extb.dict、pinyin.conf、shuangpin.conf、libpinyin.so。

  [可选删 - opencc jieba 分词 + 云拼音,默认删;--keep-jieba 保留]
    share/opencc/jieba_dict/**、share/opencc/*_jieba.json
    lib/fcitx5/libcloudpinyin.so、share/fcitx5/addon/cloudpinyin.conf
  (opencc 的 .ocd2 与普通转换 json 保留,s2t 简繁转换不受影响)

  重写描述符 input_methods 只留 pinyin,files 清单同步为保留文件,重新打包(全 DEFLATED)。
"""
import argparse
import json
import zipfile

TABLE_SO = "lib/fcitx5/libtable.so"
TABLE_ADDON_CONF = "share/fcitx5/addon/table.conf"
CLOUD_SO = "lib/fcitx5/libcloudpinyin.so"
CLOUD_ADDON_CONF = "share/fcitx5/addon/cloudpinyin.conf"
KEEP_IM_CONFS = {"pinyin.conf", "shuangpin.conf"}
TABLE_IM_NAMES = {"cangjie", "db", "erbi", "qxm", "wanfeng", "wbpy", "wbx", "zrm"}


def should_remove(name: str, keep_jieba: bool) -> bool:
    # table 引擎本体 / 配置
    if name == TABLE_SO or name == TABLE_ADDON_CONF:
        return True
    # table 输入法配置
    if name.startswith("share/fcitx5/inputmethod/"):
        base = name.rsplit("/", 1)[-1]
        if base.endswith(".conf") and base[:-5] in TABLE_IM_NAMES:
            return True
    # table 词典(*.main.dict),保留 sc.dict / extb.dict(拼音需要)
    if name.startswith("share/libime/") and name.endswith(".main.dict"):
        return True
    if not keep_jieba:
        # opencc jieba 分词数据 + 云拼音(依赖 jieba 分词)
        if name.startswith("share/opencc/jieba_dict/"):
            return True
        if name.startswith("share/opencc/") and name.endswith("_jieba.json"):
            return True
        if name == CLOUD_SO or name == CLOUD_ADDON_CONF:
            return True
    return False


def main(src: str, dst: str, keep_jieba: bool) -> int:
    removed, kept = [], []
    with zipfile.ZipFile(src, "r") as zin:
        for info in zin.infolist():
            if should_remove(info.filename, keep_jieba):
                removed.append(info.filename)
            else:
                kept.append(info)

    desc_name = "plugin/chinese-addons.json"
    if not any(i.filename == desc_name for i in kept):
        print(f"[错误] 找不到 {desc_name},可能不是合法的 chinese-addons 插件")
        return 1

    with zipfile.ZipFile(src, "r") as zin:
        desc = json.loads(zin.read(desc_name).decode("utf-8"))
        data = {i.filename: zin.read(i.filename) for i in kept}

    ims = desc.get("input_methods") or []
    keep_ims = [im for im in ims if im == "pinyin"]
    if "pinyin" not in keep_ims:
        keep_ims = ["pinyin"]
    desc["input_methods"] = keep_ims

    # files 清单只含文件,不含目录条目(与官方描述符一致,目录条目会使 C++ 加载报 ErrnoError)
    files = sorted(i.filename for i in kept
                   if not i.filename.startswith("plugin/") and not i.filename.endswith("/"))
    if "files" in desc:
        desc["files"] = files

    # 注意:打包必须保持原 zip 条目顺序 —— distributeFiles 用 FS.writeFile 落盘时
    # 不会自动创建父目录,依赖前面的目录条目(如 plugin/)先被 mkdirTree。
    # 若把描述符写到最前,writeFile(plugin/chinese-addons.json) 会因目录缺失抛 ENOENT。
    new_desc = json.dumps(desc, ensure_ascii=False, indent=2).encode("utf-8")

    with zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as zout:
        for info in kept:
            name = info.filename
            buf = new_desc if name == desc_name else data[name]
            zi = zipfile.ZipInfo(name, (2020, 1, 1, 0, 0, 0))
            zi.compress_type = zipfile.ZIP_DEFLATED
            zout.writestr(zi, buf)

    with zipfile.ZipFile(src, "r") as zin:
        raw = sum(i.file_size for i in zin.infolist())
    with zipfile.ZipFile(dst, "r") as zout:
        slim = sum(i.file_size for i in zout.infolist())
        slim_c = sum(i.compress_size for i in zout.infolist())
    with zipfile.ZipFile(src, "r") as zin:
        raw_c = sum(i.compress_size for i in zin.infolist())

    print(f"删除 {len(removed)} 个文件({len(kept)+len(removed)} 条):")
    for r in removed[:60]:
        print("  -", r)
    if len(removed) > 60:
        print(f"  ... 等共 {len(removed)} 个")
    print(f"\n保留输入法: {keep_ims} | 保留文件: {len(files)} 个")
    print(f"原包压缩: {raw_c/1048576:.1f} MB / 瘦身包压缩: {slim_c/1048576:.1f} MB"
          f" (省 {max(0, raw_c-slim_c)/1048576:.1f} MB)")
    print(f"解压体积: {raw/1048576:.1f} MB -> {slim/1048576:.1f} MB")
    return 0


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--keep-jieba", action="store_true",
                    help="保留 opencc jieba 分词与云拼音(体积更大,功能更全)")
    a = ap.parse_args()
    sys_exit = __import__("sys").exit
    sys_exit(main(a.src, a.dst, a.keep_jieba))
