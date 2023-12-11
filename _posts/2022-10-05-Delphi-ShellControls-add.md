---
layout: post
title: "[Delphi] ShellContols 컴포넌트 등록법"
description: "Delphi"
comments: true
tags:
    - Programming
---

### ShellContols 컴포넌트 등록법

Delphi 설치시 컴포넌트 팔레트에 기본적으로 등록이 되지 않아서 
등록하는 방법을 소개합니다. 

Delphi 메뉴 Component -> Install Component

Vcl.Shell.ShellCtrls.pas 소스를 선택합니다. 
소스 경로는 

C:\Program Files (x86)\Embarcadero\Studio\21.0\source\vcl 폴더에 있습니다. 설치 버전에 따라 조금씩 다릅니다. 

그리고 

install new package 옵션을 선택하고 

Next 를 클릭합니다. 

저장할 경로 ShellControls.dpk 를 생성해서 지정하고

Description 에는 ShellControls 라고 입력합니다. 

그리고 Finish 

VCL 추가하겠다는 메세지는 확인을 눌러주고 

Vcl.Shell.ShellConsts.pas 소스를 하나더 추가해줍니다. 

그리고 

Vcl.Shell.ShellCtrls.pas 소스를 열어서 

interface 섹션 가장 마지막에 

procedure Register;

추가합니다. 

그리고 implementation 섹션에 

<pre>
<code>
procedure Register;
begin
  RegisterComponents('Shell Controls', [TShellListView]);
  RegisterComponents('Shell Controls', [TShellTreeView]);
  RegisterComponents('Shell Controls', [TShellChangeNotifier]);
end;
</code>
</pre>

추가해줍니다. 

그리고 Install 해주면 Shell Controls 가 등록됩니다. 





