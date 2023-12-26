---
layout: post
title: "[PHP] 코드이그니터(CodeIgniter) - RSS읽기"
description: "PHP, CodeIgniter"
comments: true
tags:
    - Programming
---

### RSS 읽어오기

PHP 프레임워크인 코드이그니터(Codeigniter)에서 RSS정보를 읽어 오는 Controlor 소스입니다. 

curl을 사용하여 웹주속의 정보를 읽어오고 xml 데이터를 파싱하여 처리하는 소스를 소개합니다.

<p align="center"><a href="/assets/images/rss.png" id="open-image"><img src="/assets/images/rss.png" alt="예전 블로그의 RSS 내용" width="400"/></a></p>

Curl, SimpleXmlElement, XML 처리코드

<pre>
<code>
<p>$this-&gt;load-&gt;helper(&#39;html&#39;);<br />
$this-&gt;load-&gt;helper(&#39;text&#39;);</p>

<p>$feed = array();<br />
$channel_data = array();</p>

<p>$ch = curl_init();<br />
curl_setopt($ch, CURLOPT_HEADER, 0);<br />
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);<br />
curl_setopt($ch, CURLOPT_URL, &quot;RSS주소&quot;);<br />
// USER AGENT 가 없으면 못읽는 사이트가 있다<br />
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER[&#39;HTTP_USER_AGENT&#39;]);<br />
$xmldata = curl_exec($ch);<br />
curl_close($ch);</p>

<p>// 내용을 못읽은 경우 해결<br />
$xmldata = str_replace(&quot;&lt;content:encoded&gt;&quot;,&quot;&lt;contentEncoded&gt;&quot;,$xmldata);<br />
$xmldata = str_replace(&quot;&lt;/content:encoded&gt;&quot;,&quot;&lt;/contentEncoded&gt;&quot;,$xmldata);</p>

<p>$xml = new SimpleXmlElement($xmldata);</p>

<p>if ($xml-&gt;channel)<br />
{<br />
&nbsp;&nbsp; &nbsp;$channel_data[&#39;title&#39;] = $xml-&gt;channel-&gt;title;<br />
&nbsp; &nbsp; $channel_data[&#39;description&#39;] = $xml-&gt;channel-&gt;description;<br />
&nbsp; &nbsp;&nbsp;<br />
&nbsp; &nbsp; foreach ($xml-&gt;channel-&gt;item as $item)<br />
&nbsp; &nbsp; {<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;$data = array();<br />
&nbsp; &nbsp; &nbsp; &nbsp; $data[&#39;id&#39;] = (string)$item-&gt;id;<br />
&nbsp; &nbsp; &nbsp; &nbsp; $data[&#39;title&#39;] = (string)$item-&gt;title;<br />
&nbsp; &nbsp; &nbsp; &nbsp; $data[&#39;description&#39;] = (string)$item-&gt;contentEncoded;<br />
&nbsp; &nbsp; &nbsp; &nbsp; if($data[&#39;description&#39;] == &quot;&quot;)<br />
&nbsp; &nbsp; &nbsp; &nbsp; {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;$data[&#39;description&#39;] = (string)$item-&gt;description;<br />
&nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; $data[&#39;pubDate&#39;] = (string)$item-&gt;pubDate;<br />
&nbsp; &nbsp; &nbsp; &nbsp; $data[&#39;link&#39;] = (string)$item-&gt;link;<br />
&nbsp; &nbsp; &nbsp; &nbsp; $dc = $item-&gt;children(&#39;http://purl.org/dc/elements/1.1/&#39;);<br />
&nbsp; &nbsp; &nbsp; &nbsp; $data[&#39;author&#39;] = (string)$dc-&gt;creator;<br />
&nbsp; &nbsp; &nbsp; &nbsp; $feed[] = $data;<br />
&nbsp; &nbsp; }<br />
&nbsp;}<br />
&nbsp;else<br />
&nbsp;{<br />
&nbsp;&nbsp;&nbsp; &nbsp;$channel_data[&#39;title&#39;] = $xml-&gt;title;<br />
&nbsp; &nbsp; $channel_data[&#39;description&#39;] = $xml-&gt;subtitle;<br />
&nbsp; &nbsp;&nbsp;<br />
&nbsp; &nbsp; foreach ($xml-&gt;entry as $item)<br />
&nbsp; &nbsp; {<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;$data = array();<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;$data[&#39;id&#39;] = (string)$item-&gt;id;<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;$data[&#39;title&#39;] = (string)$item-&gt;title;<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;$data[&#39;description&#39;] = (string)$item-&gt;contentEncoded;<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;if($data[&#39;description&#39;] == &quot;&quot;)<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;{<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;$data[&#39;description&#39;] = (string)$item-&gt;description;<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;}<br />
&nbsp; &nbsp; &nbsp; &nbsp; $data[&#39;pubDate&#39;] = (string)$item-&gt;pubDate;<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;$data[&#39;link&#39;] = (string)$item-&gt;link[&#39;href&#39;];<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;$dc = $item-&gt;children(&#39;http://purl.org/dc/elements/1.1/&#39;);<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;$data[&#39;author&#39;] = (string)$dc-&gt;creator;<br />
&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;$feed[] = $data;<br />
&nbsp; &nbsp; }<br />
}&nbsp;&nbsp; &nbsp;</p>

				
</code>
</pre>

코드이그니어터4 에서는 

위코드중 아래 소스를 수정해야 합니다. 

<pre>
<code>
$xml = new SimpleXmlElement($xmldata); // 이코드 안되네요 
$xml = simplexml_load_string($xmldata);
</code>
</pre>

### View 소스

Controlor 에서 읽은 데이터를 표시하는 코드

<pre>
<code>
<p>&lt;?php&nbsp;<br />
&nbsp;&nbsp; &nbsp;if(isset($feed)) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;for($x=0;$x&lt;=5;$x++) {&nbsp;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;$pubDate = date(&quot;Y-m-d&quot;, strtotime($feed[$x][&#39;pubDate&#39;]));<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;$title = character_limiter($feed[$x][&#39;title&#39;], 15);&nbsp;<br />
?&gt;&nbsp;<br />
&nbsp;&nbsp; &nbsp;&lt;p&gt;&lt;a href=&quot;&lt;?php echo $feed[$x][&#39;link&#39;];?&gt;&quot;&gt;<br />
&nbsp; &nbsp; &lt;?php echo $pubDate;?&gt; &lt;?php echo $title?&gt;&lt;/a&gt;&lt;/p&gt;<br />
&lt;?php<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}&nbsp;<br />
&nbsp; &nbsp; } ?&gt;</p>

</code>
</pre>

예전에 홈페이지 만들때 사용하던 코드 입니다. 
