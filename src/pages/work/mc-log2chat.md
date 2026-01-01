---
layout: ../../layouts/MarkdownWorkLayout.astro
title: MC Log2Chat
pubDate: 2025-10-10
description: Minecraftのログファイルを読み込み、チャット部分を抽出して見やすく表示するWebアプリケーションです。
featured: true
tags: ["python \ue73c", "typescript \ue8ca", "react \ue7ba", "shadcn/ui", "vite \ue8d7"]
thumbnail: mc_log2chat.png
github: MC-Log2Chat
site: https://knsn92.github.io/MC-Log2Chat
---

Minecraftのログファイルを読み込み、チャット部分を抽出して見やすく表示するWebアプリケーションです。昔作った[Minecraft Log Extractor](/work/minecraft-log-extractor)のより使いやすいバージョンとして開発しました。メッセージの種類毎の色分けや、検索が可能で、gzip圧縮されたログファイルにも対応しています。Pythonはメッセージの分類に利用するlangファイルのダウンロードとそこからアプリ上で使用するJSONファイルの生成に使用しています。
