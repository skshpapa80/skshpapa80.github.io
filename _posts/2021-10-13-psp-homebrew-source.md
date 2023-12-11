---
layout: post
title: "PSP Homebrew - 한글출력, 이미지처리, 키입력 소스"
description: "PSP, Homebrew"
comments: true
tags:
    - Programming
---

### PSP Homebrew #1

![airplane](/assets/img/2021/airplane.png)

예전에 PSP 개발환경 포스트를 작성한적 있습니다. 그래서 예전에 작업했던 파일을 찾아서 샘플(?) 하나 정리해서 올립니다.

### Homebrew 설명

- 한글출력하는 부분
- 갤러그 이미지 그림 표시하는 부분
- 방향키 처리하는 부분이 구현되어 있습니다.

### 개발환경

* 개발환경을 다운받고 pspdev 폴더에 압축을 풀고
* pspdev 폴더로 이동한후 StartCmd.bat 실행한 후 소스 폴더로 이동(CD CMD) 그리고 make 명령어를 실행하면 빌드 됩니다.
* make 가 성공하면 EBOOT.PBP 파일이 생기는데
* PPSSPP -&gt; memstick 폴더 -&gt; PSP -&gt; GAME -&gt; 폴더를 하나 생성한 후 EBOOT.PBP 파일을 복사해 넣고
* PPSSPP를 실행하면 홈브류 에서 보입니다.

​소스 재빌드 하고 실행하는데 정말 편하네요 PPSSPP 가 짱인듯

예전에 테스트 할때 빌드한후 PSP에 옴겨서 실행해보고 안되면 다시 해보고 이걸 수도 없이 반복햇는데요!!!

이제는 그럴필요 없는듯 ㅠ.ㅠ

소스는 C로 작성되어 있습니다.

airplane.h 파일이 이미지를 코드로 변환해 놓은 파일입니다.

### 소스링크

[https://github.com/skshpapa80/psp_homebrew/tree/main/airplane](https://github.com/skshpapa80/psp_homebrew/tree/main/airplane)

