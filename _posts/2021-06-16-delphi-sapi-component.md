---
layout: post
title: "[Delphi] SAPI 컴포넌트 등록 방법(TTS 구현)"
description: "Delphi, Sapi"
comments: true
tags:
    - Programming
---

### SAPI 컴포넌트 등록 방법(TTS 구현)

<pre>
<code>
Spvoice1.Speak(txtHangul.Text,0);
</code>
</pre>

예전에 아이들이 한글 공부하는 프로그램을 간단하게 만들었었는데요. 처음에는 구글을 이용해서 TTS 를 구현했습니다. 근데 구글의 방법이 막혀서 다른 방법으로 TTS를 구현했는데 그 방법을 소개합니다. 

바로 SAPI 컴포넌트를 사용하는 방법입니다. 

### 설치방법

1. 메뉴 - > Component -> Import Component 선택

2. Import a Type Library 선택 -> Next 버튼 클릭

3. "Microsoft Speech Object Library" 를 선택하고, 버전과 GUID를 확인한다. -> [Next] 클릭.

![SAPI](/assets/images/sapi1.png)

4. "Palette Page"에서 "ActiveX"를 선택하고 -> [Next] 버튼 클릭.

![SAPI](/assets/images/sapi2.png)

5. "Install to New Package"를 선택 후 -> [Next] 버튼 클릭.

![SAPI](/assets/images/sapi3.png)

6. Package 저장한 경로 설정하고 Description 입력하고 -> Finish 버튼 클릭

7. Unit "SpeechLib_TBL.pas" ~ 추가하겠다는 메세지가 나오면 -> OK 클릭

8. 컴파일 과정이 나오고 -> 아래의 이미지 처럼 install 메세지 나옴

![SAPI](/assets/images/sapi4.png)

9. 아래이미지 처럼 TSp 로 시작하는 컴포넌트 들이 있습니다. 

![SAPI](/assets/images/sapi5.png)

### TTS 구현 샘플 소스

TSpVoice 컴포넌트 폼에 올리고 

<pre>
<code>
Spvoice1.Speak("TTS 읽은 문장",0);
</code>
</pre>

