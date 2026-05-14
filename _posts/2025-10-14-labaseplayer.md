---
layout: post
title: "LZBasePlayer – DirectShow,Lazarus 를 이용해 개발된 동영상 재생기"
date: 2025-10-14
tags: [개발]
excerpt: "개발툴 Lazarus 를 사용해서 DirectShow 동영상 재생기를 만들었습니다."
---

### LZBasePlayer

<p align="center"><a href="/assets/images/LZBasePlayer_20250313-1024x623-1.png" id="open-image"><img src="/assets/images/LZBasePlayer_20250313-1024x623-1.png" alt="LZBasePlayer" width="400"/></a></p> 영상은 2019 KCON 뉴욕 아이즈원

Lazarus 기반에서 작성되었으며 DirectShow을 사용하여 동영상을 재생시키는 간단한 소스입니다. 다만 기본 DirectShow로는 MP4 동영상 등은 재생이 기본적으로 되지 않습니다. 코덱이 필요한데 이를 많이 사용하는 Lav Filter를 사용해서 영상을 재생하도록 구성해 보았습니다. 

3월에 블로그에 작업중이라고 올렸고 

소스는 한참 전에 github 에 올렸지만 바쁘다 보니 이제서야 포스팅 하게 되었네요.

#### 사용법 

* LAV Filter 사용하여 Mp4 등 지원되지 않는 파일 재생되도록 수정 Lav Filter 을 인터넷에서 다운 받아서 다운 받은 폴더의 경로를 setting.ini 에 설정하면 영상을 재생하기 위해서 Lav Filter를 불러 와서 소스필터에 연결해서 동영상 재생 
* 자막(.smi)은 VSFilter 사용해서 표시되도록 인터넷에서 VSFIlter 을 다운로드해 사용해야 함 Lav Filter 폴더에 같이 두었음

<p align="center"><a href="/assets/images/화면-캡처-2025-11-02-210824.png" id="open-image"><img src="/assets/images/화면-캡처-2025-11-02-210824.png" alt="LZBasePlayer" width="400"/></a></p> 
자막은 저렇게 표시 – 영상은 파이널판타지 7 어드벤트칠드런

#### github 주소

[https://github.com/skshpapa80/LZBasePlayer](https://github.com/skshpapa80/LZBasePlayer)

#### 관련 포스트

* SmallPlayer 개발이야기 : 
* DirectShow 강좌 : 
