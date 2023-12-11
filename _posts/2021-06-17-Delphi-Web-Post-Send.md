---
layout: post
title: "[Delphi] 웹으로 파일 전송(POST) 하는 프로그램"
description: "Delphi"
comments: true
tags:
    - Programming
---

## 웹으로 파일 전송(POST) 하는 프로그램

예전에 홈페이지나 블로그에 파일을 전송하는 

프로그램을 만든적 있었는데 

그때 소스를 정리해서 올립니다. 

​

### 폴더 선택

폴더 선택 다이얼로그 가 나와서 PC의 폴더를 

선택하는 코드(SelectDirectory 사용)

<pre>
<code>
const
    SELDIRHELP = 1000;
var
    Dir: String;
    OSVersionInfo: TOSVersionInfo;
begin
    // 폴더 선택
    // 작업 경로 설정
    Dir := CurPath;
    OSVersionInfo.dwOSVersionInfoSize := sizeof(TOSVersionInfo);
    GetVersionEx(OSVersionInfo);
    if OSVersionInfo.dwPlatformId = VER_PLATFORM_WIN32_NT then begin
        if SelectDirectory('폴더 찾아보기','',Dir) then begin
            if Dir[Length(Dir)] <> '\' then
                Dir := Dir + '\';
            CurPath := Dir;
            LoadFileList(CurPath);
        end;
    end
    else begin
        if SelectDirectory(Dir,[sdAllowCreate, sdPerformCreate, sdPrompt],SELDIRHELP) then begin
            if Dir[Length(Dir)] <> '\' then
                Dir := Dir + '\';
            CurPath := Dir;
            LoadFileList(CurPath);
        end;
    end;
</code>	
</pre>

### 선택된 폴더에서 파일 읽어 오기

폴더내의 파일 목록을 일어오기 위해

TSearchRec 사용
<pre>
<code>
procedure TfrmMain.LoadFileList(Path: String);
var
    SearchRec: TSearchRec;
    ListItem: TListItem;
begin
    if Path = '' then Exit;

    FileList.Clear;
    // 여기에서는 이미지라 *.jpg, *.* 하면 모든 파일을 가져옴
    if FindFirst(Path + '*.jpg',faAnyFile,SearchRec) = 0 then begin
        repeat
            FileList.Add(SearchRec.Name);
        Until (FindNext(SearchRec) <> 0);
        FindClose(SearchRec);
    end;
end;
</code>
</pre>

# 웹페이지로 POST 전송하기

idHTTP를 사용하여 파일 목록의 파일들은 한번에 전송

<pre>
<code>
var
    i : integer;
    DataStream : TidMultiPartFormDataStream;
    rs: TMemoryStream;
begin
    // 업로드
   
    ProgressBar1.Min := 0;
    ProgressBar1.Position := 0;
    ProgressBar1.Max := FileList.Count;

    for i := 0 to FileList.Count - 1 do begin
    //for i := 0 to 9 do begin

        try
            DataStream := TIdMultiPartFormDataStream.Create;
            rs := TMemoryStream.Create;

            IdHTTP1.Request.UserAgent := 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.3) Gecko/20100401';
            idHTTP1.Request.ContentType := DataStream.RequestContentType;
            DataStream.AddFormField('title',ExtractFileName(FileList.Strings[i]));
            DataStream.AddFormField('tag','태그정보');

            // Post 로 apple_logid 와 apple_passwd 값을 전송합니다.
            DataStream.AddFile('image_file',CurPath + FileList.Strings[i],'application/octet-stream');

            // upfile 변수에 'e:\downlogo.bmp' 파일 을 추가 합니다..
            DataStream.Position := 0;
            try
              IdHTTP1.Post('파일을 받은 웹 URL',DataStream,rs);
            finally
              //ShowMessage(PChar(rs.Memory));
            end;
        finally
           DataStream.Free;
           rs.Free;
        end;

        ProgressBar1.Position := ProgressBar1.Position + 1;
        Application.ProcessMessages;
        Sleep(1000);
    end;
    ShowMessage('전송 완료');
</code>
</pre>
