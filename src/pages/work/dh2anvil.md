---
layout: ../../layouts/MarkdownWorkLayout.astro
title: dh2anvil
pubDate: 2025-10-10
description: MinecraftのDistant Horizons modのLodデータをAnvil形式に変換するコマンドラインツールです。
featured: true
tags: ["minecraft \udb80\udf73", "rust \ue7a8", "serde"]
thumbnail: dh2anvil.png
github: DH2Anvil
---

Minecraft上にLevel of detailを導入するDistant Horizons modのキャッシュデータをAnvil形式に変換するコマンドラインツールです。保存されているデータの都合上ブロックとバイオームの復元のみ可能です。rayonによる並列処理を導入したことでシングルスレッドだった当初と比べて文字通り爆速化し、私にとって、並列処理の力を実感できたプロジェクトとなりました。
