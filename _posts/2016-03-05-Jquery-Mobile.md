---
layout: post
title: "jquery mobile 삽질기.."
description: "jquery, mobild"
comments: true
tags:
    - Programming
---

### jquery mobile 삽질기..

하이브리드 앱을 개발하면서 jquery mobile 을 사용하였습니다.
테스트가 거의 끝나가서 CSS 파일이랑 JS 파일을 정리하면서
버튼 위치나 필요 없는 CSS 파일도 정리했습니다.

그런데 갑자기
정상작동하던 페이지들에서 에러를 토해내기 시작했습니다.
왜 이럴까 하고 고민도 하고
이런저런 테스트 토 해보고 했는데 모르겠더군요

그러다 마지막에 메뉴 페이지에 jquery mobile.js 파일을 링크를 걸었다는
사실을 발견 a href로 링크 걸린 부분이 jquey mobile.js를 걸면 Ajax 방식으로 동작하네요.

정상적으로 링크 걸어서 테스트하면 되는데 메뉴 페이지에서 클릭하면 안 됨

>해결 방법은 a href 태그에 data-ajax=“false” 추가해주면 해결됩니다.

이걸 몰라서 괜히 안되는 페이지만 계속 쳐다보고 있었네요!!!
