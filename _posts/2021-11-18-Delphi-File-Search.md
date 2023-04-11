---
layout: post
title: "[Delphi] 파일검색 - File Search"
description: "Delphi"
comments: true
tags:
    - Programming
---

### 파일 검색 - File Search

![FileSearch](/assets/images/filesearch1.png)

Delphi 에서 파일 검색하는 방법을 소개합니다. 

예전에는 SearchRec를 사용했는데 지금은 TDirectory 를 사용한다고 합니다. 

<pre>
<code>
procedure TForm1.Button1Click(Sender: TObject);
var
    S: String;
    Path : String;
    Mask : String;
begin
    Path := 'D:\Download'; // 검색할 폴더
    Mask := '*.jpg';       // 찾을 확장자

    // 하위폴더까지 검색합니다.
    for S in TDirectory.GetFiles(Path, Mask, TSearchOption.soAllDirectories) do
        ListBox1.Items.Add(S);
end;
</code>
</pre>
아쉽게도 '*.bat;*.exe' 이런식으로 다중검색은 안됩니다.

다중 검색이 필요하시면 TSearchRec를 사용하세요!

​
<pre>
<code>
procedure TfrmMain.LoadFileList(Path: String);
var
    SearchRec: TSearchRec;
    ListItem: TListItem;
begin
    if Path = '' then Exit;

    lsvFileList.Items.BeginUpdate;
    lsvFileList.Items.Clear;
    // jpg 파일 리스트 구하기
    if FindFirst(Path + '*.jpg',faAnyFile,SearchRec) = 0 then begin
	    repeat
            ListItem := lsvFileList.Items.Add;
            ListItem.Caption := SearchRec.Name;
            // 파일 사이즈 표시 
            ListItem.SubItems.Add(FileSizeFormat(SearchRec.Size));
        Until (FindNext(SearchRec) <> 0);
	    FindClose(SearchRec);
    end;
    lsvFileList.Items.EndUpdate;
end;
</code>
</pre>
