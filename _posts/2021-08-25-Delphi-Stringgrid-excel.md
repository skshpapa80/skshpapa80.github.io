---
layout: post
title: "[Delphi] 스트링그리드 - 엑셀 파일 저장"
description: "Delphi"
comments: true
tags:
    - Programming
---

### 스트링그리드 - 엑셀 파일 저장

![stringgrid](/assets/images/stringgrid.png)

이번엔 스트링그리드의 내용을 엑셀파일로 저장하는 코드 입니다. 

위와 같은 화면의 예제 프로그램이며 저장 버튼을 구현합니다. 

<pre>
<code>
procedure TForm1.Button1Click(Sender: TObject);
begin
    with TSaveDialog.Create(self) do begin
        if Execute then begin
            // Excel 저장
            SaveXls(Filename);
        end;
    end;
end;
</code>
</pre>
엑셀 저장 함수 

이번에도 Excel.Automation 을 사용합니다. 

아래 소스에서 khGrid1 은 스트링 그리드 입니다. 

<pre>
<code>

function TForm1.SaveXls(SaveName: String): Boolean;
var
    oXL, wb, Range: OleVariant;
    arrData: Variant;
    i, j: Integer;
begin
    Result := False;
    if SaveName = '' then Exit;

    // Data Area Make
    arrData := VarArrayCreate([1, khGrid1.RowCount, 1, khGrid1.ColCount], varVariant);

    // Data Binding
    for i := 1 to khGrid1.RowCount do
        for j := 1 to khGrid1.ColCount do
            arrData[i, j] := khGrid1.Cells[j-1, i-1];

    // Initial Excel
    try
	    oXL := CreateOLEObject('Excel.Application');
    except
	    Exit;
    end;

    oXL.Visible := False;
	oXL.DisplayAlerts := False;

    // Workbook add
    wb := oXL.Workbooks.Add;

    // Workbook Range Setting
    Range := wb.WorkSheets[1].Range[wb.WorkSheets[1].Cells[1, 1],
                                 wb.WorkSheets[1].Cells[khGrid1.RowCount, khGrid1.ColCount]];

    // Workbook Value Insert
    Range.Value := arrData;

    // Complete
    oXL.Workbooks[1].SaveAs(SaveName);
    oXL.WorkBooks.Close;
    oXL.Quit;
    oXL := unassigned;
    Result := True;
end;
</code>
</pre>

저장후 엑셀파일로 열어 본 화면 

![excel](/assets/images/stringgrid_excel.png)

