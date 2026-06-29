---
layout: ../../layouts/MarkdownWorkLayout.astro
title: Nbs Cli
pubDate: 2026-6-29
description: Minecraft NoteBlock Studioで使用するNbsファイルを再生したり、midiから変換したり、wavなどに書き出すことができるコマンドラインツールです。
tags: ["minecraft \udb80\udf73", "rust \ue7a8"]
thumbnail: nbs_cli.png
github: nbs-cli 
---

Minecraft NoteBlock Studioで使用する.nbsファイルに関するいくつかの操作を提供するためのコマンドラインツールです。

別で開発しているnbs-rustと呼ばれるライブラリを使用し、オーディオの再生やmidiからNbsファイルへの変換など、いくつかの機能があります。
具体的には以下の機能があります。

- Nbsファイルの情報を表示(音楽名や説明、総ノートブロック数など)
- Nbsの再生(カスタム楽器の読み込みやマスターボリュームの設定などに対応。またmidiファイルを指定すると自動でNbsに変換してから再生する機能付き)
- midiファイルからNbsファイルへの変換
- Nbsファイルを.wavなどのオーディオファイルへの書き出し

