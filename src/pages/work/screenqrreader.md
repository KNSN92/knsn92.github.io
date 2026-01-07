---
layout: ../../layouts/MarkdownWorkLayout.astro
title: ScreenQRReader
pubDate: 2026-1-7
description: 画面上のQRコードを読み取る事が出来るアプリケーションです。
tags: ["rust \ue7a8", "tauri \ue8bb", "zbar"]
thumbnail: screen_qr_reader.png
github: ScreenQRReader-Python
---

画面上のQRコードを読み取る事が出来るアプリケーションです。読み取ったQRコードがURLの場合は自動でブラウザを開く設定やグローバルなショートカットキーを設定できる機能もあります。

前pythonで書いていたのをtauriで書き直したやつで、zbarという高性能なQRコード読み取りライブラリによって精度が上がりました。


python製と比べてより沢山の機能を追加する予定ですが、いつになるかは未定です。


[python製の方](/work/screenqrreaderpy)
