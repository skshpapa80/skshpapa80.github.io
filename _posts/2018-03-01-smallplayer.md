---
layout: post
title: "SmallPlayer : 동영상 재생기"
date: 2018-03-01
tags: [프로그래밍]
excerpt: "Delphi DirectShow Movie Player"
---

<p align="center"><a data-fslightbox="gallery" href="/assets/images/smallplayer_01.png"><img src="/assets/images/smallplayer_01.png" alt="초기버전" width="400"/></a></p>초기버전<br />

자작 프로그램 을 소개합니다. SmallPlayer

예전에 곰플레이어, 다음 팟플레이어 등을 동영상 플레이어로 사용했는데 계속 업데이트되면서 광고가 생기더라고요 물론 무료 플레이어라서 어느 정도 광고가 붙는 건 이해하겠지만 약간 귀찮더라고요.

그래서 다른 플레이어를 알아보던 중 예전에 DirectShow 사용해서 만들어놓은 기초 소스가 있으니 조금 더 업그레이드해서 만들어서 쓰자는 생각이 들어 프로그램을 작성하게 되었습니다.

작업을 하다 보니 일이 커지는데 기존에 저는 주로 재생만 하다 보니 재생만 되면 될 거 같았었는데

생각보다 신경 써야 할게 많네요.

<p align="center"><a data-fslightbox="gallery" href="/assets/images/smallplayer_02.png"><img src="/assets/images/smallplayer_02.png" alt="smallplayer" width="400"/></a></p>테스트 버전 스크린샷 – 동영상은 지금 만나러 갑니다<br />

#### 설명

* DirectShow 기반의 미디어 플레이어이며 기능이 단순한 플레이어입니다.
* LAV 필터와, DirectVobSub(자막 필터)를 사용하여 단순하게 동영상 재생을 하는 플레이어이며.
* LAV 필터를 사용하니 따로 코덱을 설치하지 않아도 여러 동영상을 재생할 수 있고
* DirectVobSub를 이용하여 자막을 표시합니다.

우선 v0.1로 재생 기능만 있는데 틈틈이 업그레이드할 계획입니다.

<p align="center"><a data-fslightbox="gallery" href="/assets/images/smallplayer_03.png"><img src="/assets/images/smallplayer_03.png" alt="smallplayer" width="400"/></a></p>어느정도 완성한 버전 – 동영상은 지금 만나러 갑니다<br />

공개하기 부끄럽네요.

아직 구현하고 싶은 부분이 많아서 지금은 재생만 되기 때문에 제가 사용하는 데에는

문제가 없는데 구현해야 할 부분이 많은데 시간이 없네요.. 취미로 하는 거라서!!!!!

소스가 필요하신 분은 연락 주세요!!!!

앞으로 추가할기능

* 디자인 Windows10 기준으로 변경
* 전체화면 재생기능 추가
* 키 이벤트 스페이스:정지,재생, 화살표 +5초, -5초
* 숫자키 이벤트 : 1(화면 크기50%),2(화면크기100%),3(화면크기150%)
