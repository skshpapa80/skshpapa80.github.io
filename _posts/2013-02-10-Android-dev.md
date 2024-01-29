---
layout: post
title: "윈도우용 안드로이드 개발 환경 설정"
description: "Android"
comments: true
tags:
    - Programming
---

안드로이드 개발 환경설치하기 <br />
전 윈도우 개발자니까 우선 윈도우에서 설치하는 법을 정리해보겠습니다.

1. JAVA SDK 설치 <br />
다운로드 : [http://www.oracle.com/technetwork/java/javase/downloads/index.html\](http://www.oracle.com/technetwork/java/javase/downloads/index.html) <br />
SDK 최신버전을 설치합니다. 전 JDK 7을 설치했습니다. <br />
그리고 시스템 변수 에서 Path 에다가 SDK 설치경로를 추가해줍니다. <br />
C:\Program Files\Java\jdk1.7.0 이경로를 추가해주세요.

2. 이클립트 다운로드 <br />
다운로드 : [http://www.eclipse.org/downloads/\](http://www.eclipse.org/downloads/) <br />
이클립스 IDE 자바 디벨로퍼나 클레식을 받아서 압축을 푸시면 됩니다. <br />
보통 C:\\Android 에 만들더군요 ^^

3. ADT(Android Develoment Tools) 플러그인 설치 <br />
이클립스 를 실행시킨후 Help 메뉴에서 Install New Software 선택한후 <br />
ADT / [https://dl-ssl.google.com/android/eclipse/\](https://dl-ssl.google.com/android/eclipse/) 주소를 추가 한후 <br />
전체 설치를 합니다.

4. 안드로이드 SDK 설치 <br />
다운로드 : [http://developer.android.com/sdk/index.html](http://developer.android.com/sdk/index.html) <br />
위 페이지에서 SDK 를 다운받은후 C:\\Android 에 풉니다. <br />
이클립스 Window 메뉴에서 Preferences 를 선택 <br />
안드로이드 SDK 경로를 압축푼 경로로 맞춰 줍니다. 

이클립트 Window 메뉴에서 Android SDK and AVD Manager에서 <br />
Available packages 를 선택하여 필요한 API 와 SDK를 선택해서 Install 합니다. <br />
여기서 시간이 오래걸리니 네트워크가 빠른곳에서 하시길 바랍니다.

5. 예뮬에이터 설정 <br />
이클립트 Window 메뉴에서 Android SDK and AVD Manager 에서 <br />
Vitual Device 를 선택한후 ADD를 합니다. <br />
내폰에 맞게 설정을 한후 저장하면 예뮬레이터가 하나 생기고 <br />
Lunch 하면 예뮬레이터가 실행됩니다.
