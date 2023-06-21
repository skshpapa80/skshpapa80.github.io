---
layout: post
title: "[Delphi] 웹프로그래밍 #3 - 코딩 심화"
description: "Delphi"
comments: true
tags:
    - Programming
---

### 웹프로그래밍 03

[WEB 코딩 2](https://skshpapa80.github.io/2021/10/06/Delphi-Webprogramming2/)

지난번 강좌는 실행까지 부분이고 실제 코딩을 해보겠습니다. 

Projects 창에서 WebModuleUnit1.pas 를 더블클릭하면 

아래창이 나오고 마우스 오른쪽 버튼을 클릭하면 아래 팝업이 나옵니다. 

<p align="center"><a href="/assets/images/web_001.PNG" id="open-image"><img src="/assets/images/web_001.PNG" alt="WEB1" width="500"/></a></p>

Action Editor 창이 열리면

<p align="center"><a href="/assets/images/web_002.PNG" id="open-image"><img src="/assets/images/web_002.PNG" alt="WEB2" width="500"/></a></p>

여기에서 Path를 추가할수 있습니다. Path 란 

http://localhost/TEST/test.dll/list?page=1

list 같이 Path 를 추가하여 여러개의 하위서비스를 추가할수 있습니다. 

기본은 "/" 라서 아무것도 없으면 기본이 처리됩니다. 

<p align="center"><a href="/assets/images/web_003.PNG" id="open-image"><img src="/assets/images/web_003.PNG" alt="WEB3" width="500"/></a></p>

Object Inspector 창에서 

Events 탭에서 OnAction 이벤트를 추가하여 아래처러 코딩하면 

<p>procedure TWebModule1.WebModule1WebActionItem1Action(Sender: TObject;<br />
&nbsp; Request: TWebRequest; Response: TWebResponse; var Handled: Boolean);<br />
begin<br />
&nbsp; &nbsp; Response.Content :=<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;&lt;html&gt;&#39; +<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;&lt;head&gt;&lt;title&gt;Web Server Application&lt;/title&gt;&lt;/head&gt;&#39; +<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;&lt;body&gt;List Page&lt;/body&gt;&#39; +<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;&lt;/html&gt;
end;</p>

http://localhost/TEST/test.dll/list 로 접속하면 

다음과 같은 결과를 얻을수 있습니다. 

<p align="center"><a href="/assets/images/web_004.PNG" id="open-image"><img src="/assets/images/web_004.PNG" alt="WEB4" width="500"/></a></p>

OnAction 에는 Request, Response 라는 객체가 선언되어 있는데요. 

Request 값을 받아올때 

Response 는 HTML 을 html을 출력할때 사용합니다. 

GET 방식으로 page 값 받기  

<p><br />
procedure TWebModule1.WebModule1WebActionItem1Action(Sender: TObject;<br />
&nbsp; Request: TWebRequest; Response: TWebResponse; var Handled: Boolean);<br />
var<br />
&nbsp; &nbsp; page : String;<br />
begin<br />
&nbsp; &nbsp; // GET 방식의 값 읽어 오기<br />
&nbsp; &nbsp; page := Request.QueryFields.Values[&#39;page&#39;];</p>

<p>&nbsp; &nbsp; Response.Content :=<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;&lt;html&gt;&#39; +<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;&lt;head&gt;&lt;title&gt;Web Server Application&lt;/title&gt;&lt;/head&gt;&#39; +<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;&lt;body&gt;List Page : &#39; + page + &#39;&lt;/body&gt;&#39; +<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;&lt;/html&gt;+<br />
end;</p>


http://localhost/TEST/test.dll/list?page=5 -- page 값에 5를 넣음

실행 결과

<p align="center"><a href="/assets/images/web_005.PNG" id="open-image"><img src="/assets/images/web_005.PNG" alt="WEB5" width="500"/></a></p>

/info Action 추가하고 

<p>procedure TWebModule1.WebModule1WebActionItem2Action(Sender: TObject;<br />
&nbsp; Request: TWebRequest; Response: TWebResponse; var Handled: Boolean);<br />
begin<br />
&nbsp; &nbsp; Response.Content := &#39;&lt;h3&gt;Status&lt;/h3&gt;&#39;#13 +<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;Method: &#39; + Request.Method + &#39;&lt;br&gt;&#39;#13 +<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;ProtocolVersion: &#39; + Request.ProtocolVersion + &#39;&lt;br&gt;&#39;#13 +<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;URL: &#39; + Request.URL + &#39;&lt;br&gt;&#39;#13 +<br />
&nbsp; &nbsp; &nbsp; &nbsp; &#39;Query: &#39; + Request.Query + &#39;&lt;br&gt;&#39;#13;+<br />
end;</p>

실행결과

<p align="center"><a href="/assets/images/web_006.PNG" id="open-image"><img src="/assets/images/web_006.PNG" alt="WEB6" width="500"/></a></p>
