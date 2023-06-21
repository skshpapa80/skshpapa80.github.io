---
layout: post
title: "[Delphi] 웹프로그래밍 #2 - 코딩"
description: "Delphi"
comments: true
tags:
    - Programming
---

### 웹프로그래밍 02

이제 본격적으로 ISAPI 웹프로그램을 만들어 봅시다. 

Delphi 로 웹프로그래밍을 하는 이유는 Delphi로 만들어진 코드나 로직을 다른 언어로 개발하기 힘들때 사용합니다. 

델파이를 실행 후 File-New-Other 를 선택합니다. 

<p align="center"><a href="/assets/images/WEB_1.PNG" id="open-image"><img src="/assets/images/WEB_1.PNG" alt="WEB1" width="500"/></a></p>

"Web-Web Server Application"을 선택하고 "OK" 클릭

<p align="center"><a href="/assets/images/WEB_2.PNG" id="open-image"><img src="/assets/images/WEB_2.PNG" alt="WEB2" width="500"/></a></p>

우선 IIS, Windows 용으로 만들어 볼꺼예요

"Next" 클릭

<p align="center"><a href="/assets/images/WEB_3.PNG" id="open-image"><img src="/assets/images/WEB_3.PNG" alt="WEB3" width="500"/></a></p>

"ISAPI dynamic link library"를 선택하고 "Finish" 클릭.

델파이가 기본 페이지를 생성합니다.

"Project1"과 "WebModuleUnit1"

<p align="center"><a href="/assets/images/WEB_4.PNG" id="open-image"><img src="/assets/images/WEB_4.PNG" alt="WEB4" width="500"/></a></p>

생성된 프로젝트를 저장을 합니다. test.dll 로 만드려구요 

<p align="center"><a href="/assets/images/WEB_5.PNG" id="open-image"><img src="/assets/images/WEB_5.PNG" alt="WEB5" width="500"/></a></p>

WebModuleUnit1.pas 파일을 선택한후 더블클릭하면 

<p align="center"><a href="/assets/images/WEB_6.PNG" id="open-image"><img src="/assets/images/WEB_6.PNG" alt="WEB6" width="500"/></a></p>

"WebModuleDefaultHandlerAction()" procedure 에 원하는 HTML 을 코딩후 

빌드한다음에 

[IIS 설정](https://skshpapa80.github.io/2021/10/06/Delphi-Webprogramming1/)

IIS 설정에서 만든 폴더에 test.dll 을 복사한후 

http://localhost/TEST/test.dll 실행하면 

“WebModuleDefaultHandlerAction()” 코딩한 HTML 이 보입니다. 

여기 까지가 기초 코딩 입니다. 

다음 포스트에서 Delphi 웹 프로그래밍에서 사용할수 있는 여러 기능들을 소개하겠습니다. 
