---
layout: post
title: "[C#] 엑셀 시트명 읽어 오기"
description: "excel, C#"
comments: true
tags:
    - Programming
---

### C# 에서 엑셀에 저장된 시트명 읽어 오기

엑셀 파일을 C#에서 다루는 방법을 간단히 알아봅시다.

우선 참조에 Microsoft.Office.Interop.Excel; 

을 추가하고 코드 상단에 

using Excel  = Microsoft.Office.Interop.Excel; 

를 추가 합니다. 엑셀을 읽기 위해서  필요합니다.

<pre>
<code>
Excel.Application xlApp; // 엑셀 오브젝트를 선언하고

Excel.Worksheet  xlSheet; // 엑셀 시트 변수를 선언합니다.

xlApp = new Excel.ApplicationClass(); // 엑셀  오브젝트를 생성합니다.

xlApp.Visible = false; // 화면에서 안보이기

xlApp.DisplayAlerts =  false; // 에러메세지 안보이기

xlApp.Workbooks.Open(openFileDialog1.FileName, 0, false,  5, "", "", false, Excel.XlPlatform.xlWindows, "", true, false, 0, true, false, false); 

//엑셀 파일 열기 옵션은 MSDN을  참조해주세요.

for (row = 1; row &lt;= xlApp.Sheets.Count;row++)

{

  // 루프를 돌면서  엑셀 시트를 바인딩합니다.

  xlSheet = (Excel.Worksheet) xlApp.Sheets.get_Item(row);

  cbo_SheetList.Items.Add(xlSheet.Name);   // 시트 명을 콤보박스에 집어  넣기<

}

xlApp.Quit();  // 엑셀 오브젝트를 종료합니다.
</code>
</pre>

