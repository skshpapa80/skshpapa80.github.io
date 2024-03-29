---
layout: post
title: "2014년 처음 만드는 안드로이드 앱(웹앱)"
description: "first android app"
comments: true
tags:
    - Project
---

### First Android App

2014년 겨울에 프로젝트에 H회사 금형관리 시스템 개발에 투입되면서 안드로이드 파트를 맞게 되었습니다.
MOLD(금형) 관련 회사라 주로 금형 관리 프로그램들을 만드는데  안드로드이 앱이 필요하다고 해서 제가 안드로이드 파트를 작업하게 되었습니다.
근데 안드로이드 개발은 처음이라 어떻게 시작해야 할지 방향도 모르겠고 자료도 부족하여 고생을 좀 했습니다. 

안드로이드 홈페이지와 웹서핑에서 찾을 자료를 가지고 하나하나씩 설계된 데로 만들다 보니 이번에는 하이브리드 앱으로 가는 게 맞겠다는 생각이 들더군요.
그래서 하이브리드 앱으로 개발 방향을 잡았습니다. 

### 구현
제가 구현해야 할 부분은 다음과 같았습니다.

* 로그인 페이지
* 메인 페이지
* 금형 조회 페이지
* 금형 상세 조회 페이지 
* RFID TAG 페이지(RFID 리더기 블루투스 페어링 포함)
* 금형실사 페이지

블루투스 장비와 페어링 해서 통신하는 부분이 있지만 제일 어려웠습니다.  그 부분을 빼고 나머지는 하이브리드 앱으로 구현하면 쉽게 구현할수 있을꺼 같았습니다.
DB 처리 쪽은 JSP를 이용해서 만들고 Jquery Mobile로 UI를 디자인해서 만들었습니다. 블루투스 장비와 통신하는 부분은 제조사의 SDK를 이용해서 만들었고요.
이클립스랑 JAVA 문법에 익숙하지도 않고 안드로이드 특성도 이해하지 못해 많은 난항을 거처 약 두 달 반만에 완성을 하였습니다.

### 스크린샷 및 설명

<p align="center"><a href="/assets/images/androoid_1.png" id="open-image"><img src="/assets/images/androoid_1.png" width="300" alt="로그인 페이지"/></a></p>

JSP를 사용한 이유는 기존 웹계정에 올려야 하는데 그 웹 시스템이 Spring로 되어 있어서 JSP를 사용하게 되었습니다. 
그때에는 Spring를 할줄 몰랐거든요 그래서 JSP 로 만들었습니다. 

<p align="center"><a href="/assets/images/androoid_2.png" id="open-image"><img src="/assets/images/androoid_2.png" width="300" alt="금형 상세 조회(위치관리 포함)"/></a></p>

<p align="center"><a href="/assets/images/androoid_3.png" id="open-image"><img src="/assets/images/androoid_3.png" width="300" alt="금형 RFID 태그 등록 페이지"/></a></p>

금형 RFID 태그 등록 페이지 
이 페이지가 가장 어려웠습니다.
하이브리드 앱과 안드로이드 앱과 통신하여  블루투스로 페어링 된 RFID 리더기에서 값을 읽어서 웹페이지에 표시해야 하는 부분이 있었습니다.
다행이 하이브리드 앱과 안드로이드 앱과 통신하는 방법은 간단했습니다. 

### 안드로이드 앱 연동 소스

안드로이드 소스 코드
<pre>
    // 앱에서 자바스크립트 사용가능하도록
    webView.getSettings().setJavaScriptEnabled(true);
    // 웹앱과 통신할 코드
    class JsObject {
        @JavascriptInterface
        public String caljs(String arg) { 
            //기능을 수행할코드
            return “”;
        }
    }
    webView.addJavascriptInterface(new JsObject(), “android”);

웹페이지에서 호출 다음과 같습니다. 
window.android.caljs(“”); 
</pre>

### 마무리

만들면서 새로운것을 만드는 재미와 안드로이드에 대한 이해 하이브리드앱 작성법을 배웠네요!!! 
그리고 처음 만든거라 확실히 지금 보면 수준이 낮아보이네요 ㅠ.ㅠ
  
