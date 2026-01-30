---
layout: ../../layouts/MarkdownWorkLayout.astro
title: Ugorge
pubDate: 2025-10-15
description: mao氏作成のUgoCraftと言うmodをForge環境下で動作できるように橋渡しを行う役割として開発したmodです。
tags: ["java \ue738", "minecraft \udb80\udf73", "minecraft-forge", "ASM"]
featured: true
thumbnail: ugorge.png
github: Ugorge
---

mao氏作成のUgoCraftと言うmodをForge環境下で動作できるように橋渡しを行う役割として開発したmodです。
外部からUgoCraftのJarファイルを読み込み、コードの書き換えを行う為にASMと呼ばれるライブラリで動的に行っています。

具体的には、UgoCraftのjarファイルはそのままだと難読化されたminecraftクラス名を参照してしまうため、それをforge環境の難読化解除された対応するクラスに置き換えたり、
一部forge環境で動かない部分のコードをパッチを施した処理やUgorge側が用意した定数に置き換えるなどの処理を行います。
また、UgoCraftのレンダーをforgeのレジストリに登録する処理を作ったり、UgoCraftのネットワーク処理をminecraftコードに埋め込む為のcoremodとしての機能も搭載しました。

難読化されたUgoCraftのソースを前に、かなり四苦八苦しましたが、初めてminecraftが起動してくれた時の高揚感は今でも覚えています。
