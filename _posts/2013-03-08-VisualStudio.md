---
layout: post
title: "비쥬얼 스튜디오 가이드라인 설정하기"
description: "VisualStudio"
comments: true
tags:
    - Programming
---

출처 : [http://dev.chromium.org/developers/how-tos/visualstudio-tricks](http://dev.chromium.org/developers/how-tos/visualstudio-tricks)

레지스트리에 다음 문자열을 추가하면 가이드라인이 생긴다.

ex)가이드 라인을 80열에 주고 싶다.

VS 2005
[HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\8.0\Text Editor]
"Guides"="RGB(128,0,0) 80"

VS2008
[HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\9.0\Text Editor]
"Guides\"="RGB(128,0,0) 80"

VS2010
[HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\10.0\Text Editor]
"Guides"=\"RGB(128,0,0) 80"

VS2012
[HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\12.0\Text Editor]
"Guides"="RGB(128,0,0) 80"

를 추가하면 된다.