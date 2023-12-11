---
layout: post
title: "[C#] XML Data 웹페이지 Post 전송 소스"
description: "XML, POST, C#"
comments: true
tags:
    - Programming
---

### XML Data 웹페이지 Post 전송 소스

간단하게 C# 을 사용하여 웹페이지 POST 형태로 XML 데이터를 전송하는 소스를 소개합니다. 

JSON 도 많이사용하지만 익숙해서 그런지 XML 을 더 자주사용하네요

<pre>
<code>
// 전송할 XML Data
StringBuilder XmlString = new StringBuilder();
XmlString.Append("<data>");
XmlString.Append("<name>xml_data</name>");
XmlString.Append("<value>TEST1233455</value>");
XmlString.Append("</data>");
</code>
</pre>

아래 코드가 실제 데이터를 전송하는 부분

XML을 사용해서 base64 인코딩 하였습니다. 

<pre>
<code>
// XML 데이터는 기본적으로 웹서비스에서 받지 않음으로 
// base64 encode 로 XML 값을 인코딩하여 보냄
byte[] byteArray = Encoding.UTF8.GetBytes(XmlString.ToString());
string tmpString = Convert.ToBase64String(byteArray);
 
String postData = "Message=" + tmpString;
 
byte[] byteArray1 = Encoding.UTF8.GetBytes(postData);

// 실제 전송하는 코드
HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://localhost:7912/MessageRecv.aspx");
request.Method = "POST";
request.ContentType = "application/x-www-form-urlencoded; charset=UTF-8";
request.ContentLength = byteArray1.Length;

// 전송할 값을 스트림에 씀
Stream dataStream = request.GetRequestStream();
dataStream.Write(byteArray1, 0, byteArray1.Length);
dataStream.Close();
 
// 전송하고 받은 결과 
HttpWebResponse response = (HttpWebResponse)request.GetResponse();
if (response.StatusCode == HttpStatusCode.OK)
{
    StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("UTF-8"));
    ret = sr.ReadToEnd();
    sr.Close();
    response.Close(); 
}
</code>
</pre>

이코드를 사용해서 리턴값도 받습니다. 

다음에는 이코드를 받는 소스코드를 포스팅해야 겠네요!!!
