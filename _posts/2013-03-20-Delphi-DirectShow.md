---
layout: post
title: "[Delphi] DirectShow 강좌"
description: "DirectShow"
comments: true
tags:
    - Programming
---

### DirectShow 강좌 1

패널위에 동영상 플레이 시키기

Delphi Xe2 기준입니다.

-1 먼저 VCL Forms Application 을 생성합니다.
프로젝트를 저장하고 폼위에 Panel 컴포넌트를 올립니다.
Screen 으로 사용할 패널입니다.
Screen Panel의 Caption 을 지우고
Align 프로퍼티를 alClient 로 설정합니다.
그리고 Panel 을 하나 더 올립니다. 버튼올릴 패널입니다.
Caption 을 지우고 Align 프로퍼티를 alBotton으로 설정합니다.

-2 uses 절에 Winapi.DirectShow9, Winapi.ActiveX 를 추가합니다.

-3 private 절에 동영상 플레이어에서 사용할 기본 개체를 선언합니다.
FilterGraph: IGraphBuilder; //필터그래프의 인터페이스 중의 하나.
MediaControl: IMediaControl; // 미디어 제어 인터페이스 Play, Stop, Pause.
VideoWindow: IVideoWindow; // 영상 제어 인터페이스

-4 Form Create 이벤트에서
CoInitialize(nil); //COM을 초기화한다.

-5 Form Show 이벤트에서 필터그레프 및 인터페이스를 Create 한다.
<pre>
<code>
if Failed(CoCreateInstance(CLSID_FilterGraph, nil, CLSCTX_INPROC_SERVER, IID_IFilterGraph, FilterGraph)) then Exit;
// 미디어 콘트롤, 비디오 윈도우 인터페이스 선언
if Failed(FilterGraph.QueryInterface(IID_IMediaControl,MediaControl)) then Exit;
if Failed(FilterGraph.QueryInterface(IID_IVideoWindow,VideoWindow)) then Exit;
</code>
</pre>

-6 폼위에 버튼을 올린후 Click 이벤트에
변수선언을 한후
<pre>
<code>
var
  WFileName : Array[0..255] of WideChar;
  PFileName : PWideChar;
begin
  StringToWideChar('재생할 파일경로+파일명',WFileName,255);
  PFileName := @WFileName[0];
  
  // 동영상 파일을 Render 하기
  if FilterGraph.RenderFile(PFileName,nil) = S_OK then begin
    // 영상을 플레이할 패널 지정 Screen = Panel
	VideoWindow.put_Owner(Screen.Handle);
	VideoWindow.put_WindowStyle(WS_CHILD or WS_CLIPSIBLINGS or WS_CLIPCHILDREN);
	VideoWindow.SetWindowPosition(0,0,Screen.Width,Screen.Height);
	VideoWindow.put_MessageDrain(Screen.Handle);
	
	MediaControl.Run;
  end;
end;
</code>
</pre>
이제 Panel 위에 재생하려는 영상이 플레이 됩니다.

-7 Form Close 이벤트에
<pre>
<code>
// 중지
if Assigned(MediaControl) then MediaControl.Stop;

// 비디오 윈도우 해제
If Assigned(VideoWindow) then
Begin
  VideoWindow.put_Visible(false);
  VideoWindow.put_Owner(0);
End;

// DirectShow 인터페이스 해제
FilterGraph := nil;
MediaControl := nil;
VideoWindow := nil;

CoUninitialize; //COM을 셧다운시킨다.
</code>
</pre>
이렇게 코딩합니다.
간단하게 Panel 컴포넌트위에 영상을 플레이시키는 방법을 정리해봤습니다.

![화면1](/assets/images/DirectShow1.PNG)

-8 열기 버튼 클릭했을때 파일 선택창 나오도록 하기
<pre>
<code>
with TOpenDialog.Create(Self) do\
try
  Filter := 'Media Files(*.avi;*.mpg;*.wmv;*.mp4)|*.avi;*.mpg;*.wmv;*.mp4;|All Files(*.*)|*.*;';
  Title := 'Open Media Files..';
  
  if Execute then begin
    LoadMedia(FileName);
  end;
finally
  Free;
end;
</code>
</pre>

-9 미디어 불러오는 코드 프로시져로 변경
<pre>
<code>
procedure TfrmMain.LoadMedia(filename: String);
var
	WFileName : Array[0..255] of WideChar;
	PFileName : PWideChar;
begin
	StringToWideChar(filename,WFileName,255);
	PFileName := @WFileName[0];
  
	// 동영상 파일을 Render 하기
	if FilterGraph.RenderFile(PFileName,nil) = S_OK then begin
  
		// 영상을 플레이할 패널 지정 Screen = Panel
		VideoWindow.put_Owner(Screen.Handle);
		VideoWindow.put_WindowStyle(WS_CHILD or WS_CLIPSIBLINGS or WS_CLIPCHILDREN);
		VideoWindow.SetWindowPosition(0,0,Screen.Width,Screen.Height);
		VideoWindow.put_MessageDrain(Screen.Handle);
	  
		MediaControl.Run;
		// 재생/일시정지 버튼 상태
		btnPlayPause.Caption := '일시정지';
	end;
end;
</code>
</pre>

-10 재생/일시정지 토클 버튼 추가
화면에 버튼 컴포넌트를 추가한후 OnClick 이벤트에
<pre>
<code>
if btnPlayPause.Caption = '일시정지' then begin
	MediaControl.Pause;
	btnPlayPause.Caption := '재생';
end
else begin
	MediaControl.Run;
	btnPlayPause.Caption := '일시정지'
end;
</code>
</pre>

-11 영상을 재생한후 프로그램을 크기를 바꾸보면 처음 재생했던 패널 크기로만 영상이 재생되는걸 알수 있습니다.
패널 OnResize 이벤트에
<pre>
<code>
if Assigned(VideoWindow) then
	VideoWindow.SetWindowPosition(0, 0, screen.Width, screen.Height);
</code>
</pre>
위와 같이 코딩을 하면 패널 크기가 바뀔때마다 화면 크기를 변경해 줍니다.

![화면2](/assets/img/2013/DirectShow2.PNG)

우선 위 화면 같이 트랙바와 라벨컴포넌트를 이용해
타임라인 재어와 재생시간 표시를 해보겠습니다.

-12 트랙바 컨트롤을 화면에 추가합니다.
강좌 9에서 만든 LoadMedia 함수에 총재생시간을 구해서 트랙바의 MAX 값과 Min 값을 세팅해줍니다.

//총 재생 시간 구하기
<pre>
<code>
MediaPosition.get_Duration(MediaLength);
TrackBar1.Max := trunc(MediaLength);
TrackBar1.Min := 0;
</code>
</pre>

-13 트랙바 OnChange 이벤트에 아래와 같이 코딩해줍니다.
<pre>
<code>
If Assigned(MediaPosition) then Begin
	// LockTrack 은 Boolean 형의 전역변수임
	if not LockTrack then begin
		// 미디어의 위치를 트랙바위치로 지정
		MediaPosition.put_CurrentPosition(TrackBar1.Position);
	end;
End;
</code>
</pre>

-14 타이머 컴포넌트를 하나 추가하고
OnTimer 이벤트에
<pre>
<code>
var
	CurPos : Double;
begin
	If Assigned(MediaPosition) then Begin
		MediaPosition.get_CurrentPosition(CurPos);
		Label1.Caption := Format('%s', [SecondToTimeStr(CurPos)]);
		
		LockTrack := true;
		TrackBar1.Position := trunc(CurPos);
		LockTrack := false;
	End;
end;
</code>
</pre>

LockTrack 전역변수를 사용하는 이유는 타이머 이벤트에서 트랙바 포지션을 바꿀때
OnChange 이벤트를 타지 않게 하기 위해서\

-15 SecontToTimeStr 함수 만들기
<pre>
<code>
function TfrmMain.SecondToTimeStr(Sec: Double): string;
var
	H, M, S: Integer;
begin
	H := Trunc(Sec) div 3600;
	M := (Trunc(Sec) - H * 3600) div 60;
	S := Trunc(Sec) - H * 3600 - M * 60;
	Result := Format('%d:%d:%d', [H, M, S]);
end;
// 현재 값을 받아서 시:분:초 로 표시
</code>
</pre>

이상입니다. 실제 구현한 소스코드는 아래 github 에 공개해 놓았습니다. 기초적인 소스니 필요하신분을 이용하시길 바래요!!!
** 그리고 동영상 플레이어 강좌지만 파일 열기에서 mp3를 선택하면 mp3가 플레이 됩니다. ㅎㅎ

[https://github.com/skshpapa80/BasePlayer](https://github.com/skshpapa80/BasePlayer)

