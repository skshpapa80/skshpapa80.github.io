---
layout: post
title: "[Delphi] 파일 크기 표시하기"
description: "Delphi"
comments: true
tags:
    - Programming
---

간단히 만들어본 파일 크기 표시하는 함수 입니다.

<pre>
<code>
Function FileSizeFormat(Size: Double):String;
const
  sUnit: array[0..3] of string = ('KB', 'MB', 'GB', 'TB');
var
  nUnit: ShortInt;
  nDec : Integer;
  nTmp: Double;
begin
  nUnit := 0;
  nTmp := Round( Size / 1024);
  while (nTmp > 1024) do begin
    nTmp := nTmp / 1024;
    Inc(nUnit);
  end;
  nDec := Integer(Trunc((nTmp * 10) - Trunc(nTmp) * 10) > 0);
  Result := Format('%1.*n%s', [nDec,nTmp, sUnit[nUnit]]);
end;
</code>
</pre>

사용법은 FileSizeFormat(파일크기) 입니다.

PS : 드라이브 사이즈 표시하는 데 사용하셔도 됩니다^^