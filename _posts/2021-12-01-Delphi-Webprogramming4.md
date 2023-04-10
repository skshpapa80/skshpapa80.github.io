---
layout: post
title: "[Delphi] 웹프로그래밍 #4 - 게시판 만들기"
description: "Delphi"
comments: true
tags:
    - Programming
---



### 웹프로그래밍 04 - 게시판 만들기

새로운 프로젝트를 생성합니다. 

[WEB 코딩 3](https://skshpapa80.github.io/2021/10/19/Delphi-Webprogramming3/)

ISAPI 프로젝트를 만들고 저장을 DelphiBoard 로 합니다. 

![WEB1](/assets/img/2021/web_board1.PNG)

이번엔 게시판은 DB 연결을 해야 하니 MSSQL 을 사용하기 위해 ADOConn, ADOQuery1 컴포넌트도 올려줌니다. 

![WEB2](/assets/img/2021/web_board2.PNG)

이번에 사용할 액션은 우선 3개 List(기본), Read(읽기), Write(쓰기) 입니다. 

### HEAD 와 FOOT 만들기

웹의 HEAD 부분을 코딩합니다. 

<p>function TWebModule1.Head: String;<br />
var<br />
&nbsp; &nbsp; view_html : String;<br />
begin<br />
&nbsp; &nbsp; view_html := &#39;&lt;html&gt;&#39;+ sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;head&gt;&#39;+ sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;title&gt;Delphi board&lt;/title&gt;&#39;+ sLineBreak;</p>

<p>&nbsp; &nbsp; view_html := view_html + &#39;&lt;link href=&quot;https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot; integrity=&quot;sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3&quot; crossorigin=&quot;anonymous&quot;&gt;&#39;+ sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;/head&gt;&#39;+ sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;body&gt;&#39;+ sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;div class=&quot;container&quot;&gt;&#39;+ sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;h2&gt;Delphi Board&lt;/h2&gt;&#39;+ sLineBreak;</p>

<p>&nbsp; &nbsp; Result := view_html;<br />
end;</p>

웹의 FOOT 부분을 코딩합니다. 

<p>function TWebModule1.Foot: String;<br />
var<br />
&nbsp; &nbsp; view_html : String;<br />
begin<br />
&nbsp; &nbsp; view_html := &#39;&lt;/div&gt;&#39;+ sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;/body&gt;&#39;+ sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;/html&gt;</p>
<p>end;</p>

### 리스트(List) 액션

<pre>
<code>
procedure TWebModule1.WebModule1ListAction(Sender: TObject;
  Request: TWebRequest; Response: TWebResponse; var Handled: Boolean);
var
    Curpage : Integer;
begin
    // 게시판 리스트Action
    Curpage := Request.QueryFields.Values['PAGE'];

    // HTML 출력
    Response.Content := Head + List(Curpage) + Foot;
end;
</code>
</pre>

실제 DB를 처리하는 함수는 List  

<p>function TWebModule1.List(Page: Integer): String;<br />
var<br />
&nbsp; &nbsp; list_html : String;<br />
begin<br />
&nbsp; &nbsp; // DB Open<br />
&nbsp; &nbsp; ADOConn.ConnectionString := &#39;DB접속 문자열&#39;;<br />
&nbsp; &nbsp; ADOConn.Open;</p>

<p>&nbsp; &nbsp; ADOQuery1.Close;<br />
&nbsp; &nbsp; ADOQuery1.SQL.Clear;<br />
&nbsp; &nbsp; ADOQuery1.SQL.Text := &#39;SELECT * FROM BOARD&#39;; // 나중에 PAGE 쿼리로 변경 예정<br />
&nbsp; &nbsp; ADOQuery1.Open;</p>

<p>&nbsp; &nbsp; list_html := &#39;&lt;table class=&quot;table&quot;&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; list_html := list_html + &#39;&lt;tr&gt;&lt;td&gt;번호&lt;/td&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; list_html := list_html + &#39;&lt;td&gt;제목&lt;/td&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; list_html := list_html + &#39;&lt;td&gt;작성자&lt;/td&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; list_html := list_html + &#39;&lt;td&gt;작성일&lt;/td&gt;&lt;/tr&gt;&#39; + sLineBreak;</p>

<p>&nbsp; &nbsp; // 쿼리된 정보 뿌리기<br />
&nbsp; &nbsp; while not ADOQuery1.Eof do begin</p>

<p>&nbsp; &nbsp; &nbsp; &nbsp; list_html := list_html + &#39;&lt;tr&gt;&lt;td&gt;&#39; + ADOQuery1.fieldbyname(&#39;SEQ&#39;).AsString + &#39;&lt;/td&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; &nbsp; &nbsp; list_html := list_html + &#39;&lt;td&gt;&lt;a href=&quot;DelphiBoard.dll/read?SEQ=&#39; + ADOQuery1.fieldbyname(&#39;SEQ&#39;).AsString + &#39;&quot;&gt;&#39;;<br />
&nbsp; &nbsp; &nbsp; &nbsp; list_html := list_html + ADOQuery1.fieldbyname(&#39;TITLE&#39;).AsString + &#39;&lt;/a&gt;&lt;/td&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; &nbsp; &nbsp; list_html := list_html + &#39;&lt;td&gt;&#39; + ADOQuery1.fieldbyname(&#39;WRITER&#39;).AsString + &#39;&lt;/td&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; &nbsp; &nbsp; list_html := list_html + &#39;&lt;td&gt;&#39; + ADOQuery1.fieldbyname(&#39;REGDATE&#39;).AsString + &#39;&lt;/td&gt;&lt;/tr&gt;&#39; + sLineBreak;</p>

<p>&nbsp; &nbsp; &nbsp; &nbsp; ADOQuery1.Next;<br />
&nbsp; &nbsp; end;<br />
&nbsp; &nbsp; list_html := list_html + &#39;&lt;/table&gt;&#39; + sLineBreak;</p>

<p>&nbsp; &nbsp; ADOConn.Close;</p>

<p>&nbsp; &nbsp; Result := list_html;<br />
end;<br />
&nbsp;</p>

### 읽기(Read) 액션

기본 구조는 List 와 같은데 SEQ 게시물 번호를 받습니다. 

<pre>
<code>
procedure TWebModule1.WebModule1ReadAction(Sender: TObject;
  Request: TWebRequest; Response: TWebResponse; var Handled: Boolean);
var
    Curpage : Integer;
    SEQ : String;
begin
    // 게시판 읽기 Action
    SEQ := Request.QueryFields.Values['SEQ'];

    // HTML 출력
    Response.Content := Head + Read(SEQ, Curpage) + Foot;
end;
</code>
</pre>

실제 DB를 처리하는 함수는 Read 

<p>function TWebModule1.Read(SEQ : String; Page: Integer): String;<br />
var<br />
&nbsp; &nbsp; view_html : String;<br />
begin<br />
&nbsp; &nbsp; // DB Open<br />
&nbsp; &nbsp; ADOConn.ConnectionString := &#39;Provider=SQLNCLI11.1;Persist Security Info=False;User ID=sa;Initial Catalog=TEST_DB;Data Source=localhost;Password=1234&#39;;<br />
&nbsp; &nbsp; ADOConn.Open;</p>

<p>&nbsp; &nbsp; ADOQuery1.Close;<br />
&nbsp; &nbsp; ADOQuery1.SQL.Clear;<br />
&nbsp; &nbsp; ADOQuery1.SQL.Text := &#39;SELECT * FROM BOARD WHERE SEQ = &#39;&#39;&#39; + SEQ + &#39;&#39;&#39;&#39;;<br />
&nbsp; &nbsp; ADOQuery1.Open;</p>

<p>&nbsp; &nbsp; view_html := &#39;&lt;table class=&quot;table&quot;&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;tr&gt;&lt;td&gt;TITLE&lt;/td&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;td colspan=&quot;3&quot;&gt;&#39; + ADOQuery1.fieldbyname(&#39;TITLE&#39;).AsString + &#39;&lt;/td&gt;&lt;/tr&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;tr&gt;&lt;td&gt;WRITE&lt;/td&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;td&gt;&#39; + ADOQuery1.fieldbyname(&#39;TITLE&#39;).AsString + &#39;&lt;/td&gt;&lt;/tr&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;td&gt;REGDATE&lt;/td&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;td&gt;&#39; + ADOQuery1.fieldbyname(&#39;REGDATE&#39;).AsString + &#39;&lt;/td&gt;&lt;/tr&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;tr&gt;&lt;td&gt;CONTENT&lt;/td&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;td colspan=&quot;3&quot;&gt;&#39; + ADOQuery1.fieldbyname(&#39;CONTENTS&#39;).AsString + &#39;&lt;/td&gt;&lt;/tr&gt;&#39; + sLineBreak;<br />
&nbsp; &nbsp; view_html := view_html + &#39;&lt;/table&gt;&#39; + sLineBreak;</p>

<p>&nbsp; &nbsp; ADOConn.Close;</p>

<p>&nbsp; &nbsp; Result := view_html;<br />
end;</p>

### 스크린샷

![WEB3](/assets/img/2021/web_board3.PNG)

제목 링크를 클릭하면 Read 로 이동

![WEB4](/assets/img/2021/web_board4.PNG)

만들다 보니 좀 코딩이 깔끔하지 않네요 

시간을 내서 좀더 다듬어서 Github 에 올리겠습니다. 
