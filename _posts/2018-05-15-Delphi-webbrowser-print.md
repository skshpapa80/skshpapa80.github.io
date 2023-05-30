---
layout: post
title: "[Delphi] 웹브라우져 컨트롤을 이용하여 출력하기"
description: "Delphi, Print"
comments: true
tags:
    - Programming
---

### 웹브라우져 컨트롤을 이용하여 출력하기

델파이로 프로그램 작업을 하다가
출력물이 필요해서 웹브라우져 컨트롤을 이용한 출력 프로그램을 만들었습니다.
델파이 스타터 버전에는 퀵리포트나 패스트 리포트가 없어서
HTML 을 디자인 하고 웹브라우져 컨트롤로 표시한후 출력하면 되겠다는 생각에

만들어 보게 되었습니다.

<p align="center"><a href="/assets/images/delphi-print1.png" id="open-image"><img src="/assets/images/delphi-print1.png" alt="출력할 데이터 화면" width="400"/></a></p>

### 출력 데이터 생성
 
 <pre>
 <code>
 var
	htmltext, errmsg: String;
	Fp: TextFile;
	IOError : integer;
begin
	htmltext := '&lt;meta http-equiv=\"Content-Type\" content=\"text/html; charset=euc-kr\"&gt;' + #10#13;

	htmltext := htmltext + '&lt;table border=\"1\"&gt;';
	htmltext := htmltext + '&lt;tr&gt;&lt;td&gt;성명&lt;/td&gt;&lt;td&gt;' + Edit1.Text + '&lt;/td&gt;&lt;/tr&gt;';
	htmltext := htmltext + '&lt;tr&gt;&lt;td&gt;생년월일&lt;/td&gt;&lt;td&gt;' + Edit2.Text + '&lt;/td&gt;&lt;/tr&gt;';
	htmltext := htmltext + '&lt;tr&gt;&lt;td&gt;연락처&lt;/td&gt;&lt;td&gt;' + Edit3.Text + '&lt;/td&gt;&lt;/tr&gt;';
	htmltext := htmltext + '&lt;/table&gt;';

	AssignFile(fp, 'C:\\TEMP\\tmp.html');
	{$I-}
	ReWrite(Fp);
	{$I+}

	IOError := IOResult;
	if IOError &lt;&gt; 0 then begin
		errmsg := '파일 쓰기 실패. IOResult = ' + IntToStr(IOError);
		exit;
	end;

	Writeln(Fp, htmltext);
	CloseFile(Fp);

	frmPrint := TfrmPrint.Create(Application);
	frmPrint.ShowModal;
	frmPrint.Free;
end;

</code>
</pre>

### 출력물 폼 디자인

<p align="center"><a href="/assets/images/delphi-print2.png" id="open-image"><img src="/assets/images/delphi-print2.png" alt="출력 미리보기 화면" width="400"/></a></p>

<pre>
<code>
//form show 이벤트에서 tmp.html 불러오기

WebBrowser1.Navigate('C:\\TEMP\\tmp.html');


// 출력버튼
var
	vIn, vOut: OleVariant;
begin
	// 출력
	WebBrowser1.ControlInterface.ExecWB(OLECMDID_PRINT, OLECMDEXECOPT_PROMPTUSER, vIn, vOut);
end;


var
	vIn, vOut: OleVariant;
begin
	// 프린터 설정
	WebBrowser1.ControlInterface.ExecWB(OLECMDID_PAGESETUP, OLECMDEXECOPT_PROMPTUSER, vIn, vOut);
end;
</code>
</pre>

HTML 파일로 저장하고 웹브라우져 컨트롤에서 읽어 오면

출력컴포넌트 없이 출력물 작성이 가능합니다.
