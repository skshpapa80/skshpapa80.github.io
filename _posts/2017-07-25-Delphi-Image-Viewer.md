---
layout: post
title: "[Delphi] 이미지 뷰어 만들기"
description: "Delphi"
comments: true
tags:
    - Project
---

### 자작 프로그램 - 이미지 뷰어 만들기

개발자라면 필요한것은 만들어 써야 한다는 생각을 가지고 있기 때문에
틈틈히 유틸리티 프로그램을 만들어서 사용합니다.

공부도 하고 이렇게 하나하나씩 만들다 보면 배우는게 많거든요.
그래서
이번에는 이미지 뷰어를 만들었는데요.

우선 디스플레이 하는 기능만 넣다보니 만드는데 얼마 안걸렸네요..

<p align="center"><a href="/assets/images/imageviewer.PNG" id="open-image"><img src="/assets/images/imageviewer.PNG" alt="프로그램스크린샷" width="500"/></a></p>

델파이(Delphi)로 만든 이미지 뷰어 입니다.
프로그램 왼쪽에 PC의 경로를 보여주는 트리뷰가 있고
트리뷰의 폴더를 선택하면 썸네일 리스트를 만들고
썸네일 리스트 하나의 이미지를 선택하면 하단에 디스플레이 하는 프로그램 입니다.

우선 필요한 기능만 넣다 보니 단순한데
가장 많이 사용하는기능은 사진을 확인하는 용도로
좀더 기능을 추가한후 github에 올릴 예정입니다.

사용한 컴포넌트는 ShellTreeView 랑 Graphic32 의 ImgView32 입니다.

### 2017-08-08 추가
github에 소스 올렸어요..

[https://github.com/skshpapa80/khImageViewer](https://github.com/skshpapa80/khImageViewer)
