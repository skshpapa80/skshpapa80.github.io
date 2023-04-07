---
layout: post
title: "PSP 개발환경 - PSPToolKit"
description: "psp toolkit"
comments: true
tags:
    - Programming
---

### 윈도우즈 PSP 개발환경 - PSPToolKit

제가 예전에 PSP 를 가지고 즐겁게 게임생활을 하다가 다른사람이 만들어 놓은 Homebrew를 보고 PSP 개발을 하고 싶어서 PSP 개발에 도전했습니다.
지금까지 윈도우즈 환경에서 PSP 홈브류 개발할때 cygwin 에서 psptoolchain 을 컴파일해서 사용했었는데 프리컴파일된 PSP 개발툴이 있네요. 여기저기 보다가 찾았습니다.

psptoolchain 컴파일하는 시간 장난아니게 길어서 PSP 개발이 힘들어지곤 했는데 이제 편하게 개발할수 있겠네요.

많이 사용하는 라이브러리도(SDL,freetype 등) 모두 포함되어 있으니 설치한후 바로 코딩만 하면 되겠습니다.

^^ 세상 좋아졌네요 ㅋㅋ

### psptoolkit의 특징

- 윈도우 커맨드라인에서 바로 실행 가능
- 일반적으로 사용되는 IDE들을 쉽게 이식 가능 (code::blocks, netbeans, eclipse, Visual Studio, etc.)
- mSys, Cygwin 이 없이 사용 가능함
- 라이브러리의 최신 버전을 사용하므로 속도가 빠름

### 사용법

설치디렉토리의 StartCmd.bat 를 실행하면 설치경로의 PATH 가 추가되면서 커맨드 창이 뜨는데 여기서 소스 디렉토리로 이동후 MAKE 하시면 되겠습니다. ^^

### 다운로드

psptoolkit 홈페이지 [http://code.google.com/p/psptoolkit/](http://code.google.com/p/psptoolkit/)

Precompiled PSP Toochain with latest updates and libraries
위페이지에 접속하신후 download 에서 PSPToolKit StarterPack Version 1.0 받으시면 됩니다.

