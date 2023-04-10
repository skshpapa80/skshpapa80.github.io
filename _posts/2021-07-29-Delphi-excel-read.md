---
layout: post
title: "[Delphi] 엑셀 파일 읽기 - 스트링그리드"
description: "Delphi"
comments: true
tags:
    - Programming
---

### 엑셀 파일 읽기 - 스트링그리드

![excel-read](/assets/img/2021/excel-read.png)

엑셀 파일을 읽어서 스트링 그리드에 표시하는 소스 이며 

Excel.Automation 을 사용하는 예제입니다. 

uses 절에 System.win.ComObj 추가합니다. 

​

함수선언

<pre>
<code>
  TForm1 = class(TForm)
    Button1: TButton;
    StringGrid1: TStringGrid;
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
    procedure ExcelOpen(Filename : String);
  public
    { Public declarations }
  end;
 </code>
 </pre>
 
엑셀 읽어 오는 함수

<pre>
<code>
procedure TForm1.ExcelOpen(Filename: String);
var
    oXL, oWK, oSheet: Variant;
    //oXL -> 엑셀 오브젝트
    //oWK -> 엑셀 워크북 오브젝트
    //oSheet -> 엑셀 쉬트 오브젝트
    i, j : integer;
begin
    oXL := CreateOleObject('Excel.Application'); // 엑셀 생성

    oXL.Visible := False; // 안보이기
    oXL.DisplayAlerts := False; // 메세지 표시 안함
    oXL.WorkBooks.Open(Filename, 0, true); // 읽기 전용으로 읽기

    oWK := oXL.WorkBooks.Item[1];
    oSheet := oWK.ActiveSheet; // 선택된 쉬트 가져오기

    // 쉬트 번호로 가져오기
    //oSheet := oWK.WorkSheets.Item[1];

    // oSheet.UsedRange.Rows.count = 쉬트 줄수
    // oSheet.UsedRange.Columns.count = 쉬트 컬럼수
    StringGrid1.ColCount := StrToInt(oSheet.UsedRange.Columns.count);
    StringGrid1.RowCount := StrToInt(oSheet.UsedRange.Rows.count);

    for i := 1 to StrToInt(oSheet.UsedRange.Rows.count) do begin
        // 줄수 만큼 VarToStr(oSheet.Cells[i,1])
        // 셀을 읽어 오면 된다.
        for j := 1 to StrToInt(oSheet.UsedRange.Columns.count) do begin
            StringGrid1.Cells[ j-1, i-1] := VarToStr(oSheet.Cells[i,j]);
        end;
    end;

    // 엑셀 닫기
    oXL.WorkBooks.Close;
    oXL.Quit;
    oXL := unassigned;
end;
</code>
</pre>

파일 열기 

<pre>
<code>
procedure TForm1.Button1Click(Sender: TObject);
begin
    with TOpenDialog.Create(self) do begin
       if Execute then begin
            //위에 작성한 함수 호출
            ExcelOpen(FileName);
       end;
    end;
end;
</code>
</pre>

파일 열기 컴포넌트를 사용하지 않고 주로 이런식으로 코딩합니다. 
