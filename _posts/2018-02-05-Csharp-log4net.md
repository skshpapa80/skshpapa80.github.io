---
layout: post
title: "[C#] log4net 사용법"
description: "log4net"
comments: true
tags:
    - Programming
---

### log4net 사용법

제가 C#으로 프로그램을 만들때 주로 사용하는 log 라이브러리인 log4net 의 사용법을 소개합니다. log4net은 유명한 자바 log 라이브러리인 log4j의 .NET 버전이죠 사용하기도 편하고 기능이 강력해서 잘 사용하고 있습니다. 무인으로 동작하는 프로그램을 개발하거나 사용자에게 에러메세지를 숨겨야 하는경우 log에 남겨 놓고 문제점을 확인할때 필수이죠.

### 사용법

우선 [https://logging.apache.org/log4net/](https://logging.apache.org/log4net/)
이곳에가서 다운로드 받아서 사용해도 되고 Nuget을 통해 설치한후 사용할수 있습니다. 기본설정

<pre>
<code>
Program.cs 에 추가할 내용
//using 추가
using log4net.Config;
//로그 설정파일 읽기
XmlConfigurator.Configure(new System.IO.FileInfo(&quot;log4net.xml&quot;));
</code>
</pre>

### log4net.xml 설정내용
저는 주로 파일로 log를 만들고 실행폴더에 /log 폴더에 yyyy-MM-dd-ERROR.log 파일명으로 날짜별로 log를 만듭니다.

<p><strong>&lt;log4net&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;appender name=&quot;Console&quot; type=&quot;log4net.Appender.ConsoleAppender&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;layout type=&quot;log4net.Layout.PatternLayout&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;!-- Pattern to output the caller&#39;s file name and line number --&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;conversionpattern value=&quot;%d [%t] %-5p %c - %m%n&quot;&gt; &lt;/conversionpattern&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/layout&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;/appender&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;appender name=&quot;RollingFile&quot; type=&quot;log4net.Appender.RollingFileAppender&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;file value=&quot;./log/&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;appendtofile value=&quot;true&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;datepattern value=&quot;yyyy-MM-dd_ERROR.LOG&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;rollingstyle value=&quot;Date&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;staticlogfilename value=&quot;false&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;layout type=&quot;log4net.Layout.PatternLayout&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;conversionpattern value=&quot;%d [%t] %-5p %c - %m%n&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/conversionpattern&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/layout&gt;&nbsp;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/staticlogfilename&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/rollingstyle&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/datepattern&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/appendtofile&gt;&nbsp;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/file&gt;&nbsp;<br />
&nbsp;&nbsp; &nbsp;&lt;/appender&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;root&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;level value=&quot;DEBUG&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;appender-ref ref=&quot;Console&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;appender-ref ref=&quot;RollingFile&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/appender-ref&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/appender-ref&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/level&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;/root&gt;<br />
&lt;/log4net&gt;</strong></p>


사용할 Form 에서

소스코드에 다음을 선언한후

<pre>
<code>
protected static readonly ILog logger =
                 LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
				 
				 
    try
	{
	}
	catch (Exception ex)
	{
		// ERROR
		logger.Error("에러위치 ERROR: " + ex.Message.ToString().Trim());
        // Debug
		logger.Debug("디버그 값 표시");
		// Info
		logger.Info("정보 표시");
	}
</code>
</pre>

이렇게 하면 log 폴더에 날짜별로 log가 쌓입니다.
