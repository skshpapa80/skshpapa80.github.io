---
layout: post
title: "[소스] DirectShow 동영상 재생기 자막 기능 추가"
description: "Delphi"
comments: true
tags:
    - Programming
---

![bseplayer](/assets/images/baseplayer.PNG)

### DirectShow 동영상 재생기

Delphi 로 작성되었으며 DirectShow 프로그래밍 강좌를 하면서

만들게된 간단한 동영상 재생기 소스 입니다.

기존 소스는 자막 기능을 지원하지 않아 일드나 미드를 볼 수 없는데

이번 버전으로는 볼 수 있겠네요!

자막 기능은 인터넷에서 구한 소스를 이용했습니다.

추가된 자막 소스 : uSAMI.pas

보통의 동영상 플레이어 처럼 재생을 선택한 파일의 자막(.smi) 을 찾아

자동으로 불러와 panel 컴포넌트에 표시하는 소스가 포함되어 있습니다.

트래바를 이동할경우 동영상의 위치를 찾아가면서 자막도 위치를 변경합니다.

다음에는 자막을 화면 위에 뿌려봐야겠네요^^

자막을 화면에 뿌리려면 overlaly 를 구현해야 겠네요

그리고 소스는 github에 올렸어요!

앞으로 수정되는데로 바로바로 커밋해볼께요 !!!

[https://github.com/skshpapa80/BasePlayer](https://github.com/skshpapa80/BasePlayer)
