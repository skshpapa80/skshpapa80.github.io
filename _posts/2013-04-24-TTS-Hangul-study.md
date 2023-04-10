---
layout: post
title: "TTS 프로그램 한글공부"
description: "tts"
comments: true
tags:
    - Programming
---


### TTS 프로그램 한글공부

2010년 아이들이 한글을 배우기 시작할때 프로그래머인 아빠가 뭐 해줄께 없을까 고민하다가 만들게 된 프로그램 이 있습니다. 

예전에 아이들 한글 공부 하는데 도움이 될까 해서 간단한 TTS 프로그램을 하나 만들었었는데 구글 번역을 idHTTP로 호출하여 간단히 TTS를 구현했는데 동작하지 않더라구요. 

저처럼 쓰는 사람이 많아서 그런지 막았더라구요.

처음에 만들었을때 “안녕하세요” 라고 입력한후 실행시키면 아름다운(?) 여성의 목소리로 “안녕하세요” 라고 들립니다. 

목소리 선택은 어떻게 하는지 아직도 모르겠네요!

<pre>
<code>
var
  Stream : TMemoryStream;
begin
  // 구글 TTS 사용
  Stream := TMemoryStream.Create;
  try
    // idHTTP를 사용할때 UserAgent를 입력해야 하더군요
    IdHTTP1.Request.UserAgent := 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.3) Gecko/20100401';
    // URL 주소를 보면아시겠지만 한글을 쓸꺼라 ko 입니다.
    // 리턴받는 스트림이 mp3형태입니다. 
    IdHTTP1.Get(TIdURI.URLEncode('http://translate.google.com/translate_tts?tl=ko&q=' + txtHangul.Text), Stream);
  finally
    MediaPlayer1.Close;
    // 파일을 임시로 저장하고 
    Stream.SaveToFile(ExtractFilePath(Application.ExeName) + 'temp.mp3');
    // 미디어 플레이어 컴포넌트로 재생
    MediaPlayer1.FileName := ExtractFilePath(Application.ExeName) + 'temp.mp3';
    MediaPlayer1.Open;
    MediaPlayer1.Play;
  end;
end;
</code>
</pre>

PS : 현재 구글에서 막아서 동작을 안하는 코드입니다.

![프로그램스크린샷](/assets/images/hangule-study.png)

idHTTP 로 작성한 버전이 최근에 테스트 해보니 동작을 안하더라구요. 

그래서 잊고 있었는데 이번에 델파이 스타터 버전을 깔고 나서 다른 방법을 이용하여 구현하였습니다.

 구현방법이랑 소스는 추후에 정리해서 올리도록 하지요!!!

​