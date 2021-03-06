---
layout: post
title: "[Delphi] 웹프로그래밍 #1 - IIS 설정"
description: "Delphi"
comments: true
tags:
    - Programming
---

### 웹프로그래밍 01

IIS 에서 ISAPI 설정하는법 먼저 IIS(인터넷 정보 서비스) 관라자 를 열어서 프로그램을 사용할수 있게 설정해야 합니다. 그렇지 않으면 브라우저는 오류 페이지를 보여주거나 dll 파일을 다운로드 합니다.

MIME 형실 설정

<p align="center"><a href="/assets/images/IIS_1.PNG" id="open-image"><img src="/assets/images/IIS_1.PNG" alt="IIS1" width="400"/></a></p>

".dll" 를 선택하고 마우스 오른쪽 버튼을 눌러 [편집] 모드로 들어간다.

<p align="center"><a href="/assets/images/IIS_2.PNG" id="open-image"><img src="/assets/images/IIS_2.PNG" alt="IIS2" width="400"/></a></p>

기존에 설정되어 있던 "application/octet-stream"을 "text/xml"로 변경하고 "확인"을 누르자.

​<b>처리기 매핑 설정</b>

<p align="center"><a href="/assets/images/IIS_3.PNG" id="open-image"><img src="/assets/images/IIS_3.PNG" alt="IIS3" width="400"/></a></p>

"ISAPI-dll"이 "사용 안함"으로 되어있다.

"ISAPI-dll"를 선택하고 마우스 오른쪽 버튼 클릭하여 "기능 사용 권한 편집"을 선택.

** ISAPI-dll 이 안보인다면 Windows 기능 추가 에서 IIS 항목의 ISAPI 기능에 체크하면 됨

<p align="center"><a href="/assets/images/IIS_4.PNG" id="open-image"><img src="/assets/images/IIS_4.PNG" alt="IIS4" width="400"/></a></p>

"실행"에 선택하고 "확인"을 누른다.

"ISAPI-dll"라인이 "사용"으로 변경되었음을 확인한다.

<p align="center"><a href="/assets/images/IIS_5.PNG" id="open-image"><img src="/assets/images/IIS_5.PNG" alt="IIS5" width="400"/></a></p>

ISAPI 및 CGI 제한 설정

IIS 관리자에서 좌측 트리의 최상단을 클릭하면 “ISAPI 및 CGI 제한”이 나오는데 더블 클릭한다.

<p align="center"><a href="/assets/images/IIS_6.PNG" id="open-image"><img src="/assets/images/IIS_6.PNG" alt="IIS6" width="400"/></a></p>

"ISAPI 및 CGI 제한" 목록에서 마우스 오른쪽 버튼을 눌러 "기능 설정 편집"을 클릭.

<p align="center"><a href="/assets/images/IIS_7.PNG" id="open-image"><img src="/assets/images/IIS_7.PNG" alt="IIS7" width="400"/></a></p>

"지정하지 않은 ISAPI 모듈 허용"을 선택하고 "확인"을 누른다.

<p align="center"><a href="/assets/images/IIS_8.PNG" id="open-image"><img src="/assets/images/IIS_8.PNG" alt="IIS8" width="400"/></a></p>

윈도우가 64bit 라서 IIS 가 64비트 일경우 

dll 파일이 32비트 애플리케이션로 빌드하면 실행이 안됩니다. 

그때 아래와 같이 설정합니다. 

<p align="center"><a href="/assets/images/IIS_9.PNG" id="open-image"><img src="/assets/images/IIS_9.PNG" alt="IIS9" width="400"/></a></p>

설정 완료 

실제 Delphi 로 코딩을 한 후 실행은 다음 포스트에서!
