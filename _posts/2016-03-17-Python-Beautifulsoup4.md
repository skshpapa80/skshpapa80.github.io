---
layout: post
title: "[Python] BeautifulSoup4 사용하기"
description: "Python"
comments: true
tags:
    - Programming
---

### BeautifulSoup4 사용하기

파이썬으로 html 파싱하기 위해서 주로 사용하는 라이브러리가

BeautifulSoup4 입니다.

[http://www.crummy.com/software/BeautifulSoup/](http://www.crummy.com/software/BeautifulSoup/)

여기에서 다운받으면 되구요

다운받은 폴더에서 setup.py 를 실행하시면 사용하실수 있습니다.

소스에서는 이렇게 사용하시면 됩니다.

<pre>
<code>
from bs4 import BeautifulSoup&nbsp;

html = urlopen(url) 
soup = BeautifulSoup(html, 'html.parser')

for tr in soup.find_all('tr', {'class' : 'tb'}): 
	articles = tr.find('td', {'class' : 't_subject'})
</code>	
</pre>
