---
layout: post
title: "[Delphi] 크롬 창 열기"
description: "Delphi"
comments: true
tags:
    - Programming
---

### 크롬 창 열기 

크롬을 CMD로 열수있는 방법을 이용하여 Delphi 에서 크롬을 여는 방법을 소개합니다. 

<pre>
<code>
var
    ExecuteResult: integer;
begin
	// 크롬 실행경로를 지정해서 ShellExecute 로 실행합니다. 
    // 파라미터로 
    // --new-window 새창으로
    // --incognito 시크릿 모드
    // Open 할 URL 
    ExecuteResult := ShellExecute(0, nil, PWideChar('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'), '--new-window  --incognito https://blog.naver.com/skshpapa80/', nil, SW_SHOWNORMAL);

    if ExecuteResult <= 32 then ShowMessage('Error: ' + IntToStr(ExecuteResult));
end;
</code>
</pre>
Uses 절에 Winapi.ShellApi 추가해줘야 합니다. ShellExecute 를 사용하려면요 

​

추가로 IE 열기

우선 uses 절에 ComObj 를 추가해야 합니다. 
<pre>
<code>
Procedure OpenExplorer(aURL : String); 
var 
    IE : Variant;
begin
    if aURL = '' then Exit;
    // IE 새로열기
    IE := CreateOleObject('Internetexplorer.Application');
    // 기존의 열린 IE 찾기
    // IE := GetActiveOleObject('Internetexplorer.Application');
    // Visible = True 보여줌; False 안보여줌
    IE.Visible := true;
 
    // 스타일 조절
    IE.ToolBar := false; 
    IE.Resizable := false;
    IE.TheaterMode := true;
    IE.Left := 100; 
    IE.Top := 100;
    IE.Width := 500;
    IE.Height := 500;
 
    IE.Navigate(aURL); 
    IE := Unassigned;
end;
</code>
</pre>

이렇게 사용하면 됩니다. 

OpenExplorer('https://blog.naver.com/skshpapa80');
