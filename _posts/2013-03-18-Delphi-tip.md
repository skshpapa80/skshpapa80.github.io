---
layout: post
title: "[Delphi] 중복실행 방지"
description: "Delphi"
comments: true
tags:
    - Programming
---

### 중복 실행방지란?

이미 프로그램이 실행되어 있을대 다시 프로그램을 실행됐을때 나중에 실행된 프로그램이 실행되지 않도록 하는것임

Delphi 에서 중복실행 방지를 하려면 프로그램 시작 포인트에서 내 프로세스가 있는지 확인한후

내 프로세스가 있으면 내 프로그램이 시작 안되도록 한다. 코딩은 프로그램 메인 프로젝트 파일에 입력한다. (*.dpr)

<pre>
<code>
var
  Mutex : THandle; // 뮤텍스 핸들을 하나 선언한후.
begin
  // 중복 실행 체크
  Mutex := CreateMutex(nil, True, 'noDuplicate');
  // noDuplicate 명이 달라야 다른프로그램으로 인식합니다. ^^
  if (Mutex = 0) or (GetLastError <> 0) then begin
    MessageBox(0, '프로그램이 이미 실행중입니다.', '확인', mb_IconInformation);
    Exit;
  end;
  Application.Initialize;
  Application.Title := '사진관리 프로그램';
  Application.CreateForm(TFmMain, FmMain);
  Application.Run;
  // 프로그램 종료시 핸들 닫기
  if (Mutex <> 0) then CloseHandle(Mutex);
end;
</code>
</pre>

주의 할점은 CreateMutex(nil, True, 'noDuplicate'); 에서 noDuplicate 명을 다르게 해야 다른프로그램으로 인식합니다.

계속 이코드를 복사해서 사용하면 다른 프로그램이 실행이 안됩니다.
