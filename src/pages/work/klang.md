---
layout: ../../layouts/MarkdownWorkLayout.astro
title: KLang
pubDate: 2025-10-15
description: pythonっぽいプログラミング言語です。制作途中だけどもう作る気ないよ
tags: ["java \ue738"]
thumbnail: klang.png
github: KLang
---

pythonっぽいプログラミング言語です。インデントベースの構造や、タプルなど結構pythonっぽいと私は思っています。
ランタイムなどをシングルトンで作っていた影響で途中からどんどん付け足していき、
作りづらい構造になっていったことで作り続ける気になれず、完成すること無く永久開発停止になりました。
パーサの処理は一応自作で、トークン配列からastを経ず直接実行するという独自の処理方法で実装しています。
一応コードは以下の様な形式です。

```py
module math

let PI = 3.1415926536
let E  = 2.7182818285

def min(n1, n2)
    return (n1 < n2 ? n1 : n2)

def max(n1, n2)
    return (n1 > n2 ? n1 : n2)

def clamp(num, min_num, max_num)
    return min(max(num,min_num),max_num)
```
