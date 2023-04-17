---
layout: post
title: "[C#] 인터넷 연결 체크 함수"
description: "C#"
comments: true
tags:
    - Programming
---

인터넷이 연결됐는지 간단하게 체크하는 코드 .NET 2.0 이상 포함된 함수

<pre>
<code>
	if (System.Net.NetworkInformation.NetworkInterface.GetIsNetworkAvailable())
	{
    	return true;
	}
	else
    {
		return false;
    }
</code>
</pre>
