---
layout: post
title: "HTML5 로컬 스토리지"
description: "HTML5, WEB"
comments: true
tags:
    - Programming
---

### HTML5 로컬 스토리지

이번 웹 작업을 하면서 세션을 사용하기에는 데이터량이 많고 만료시간이 없어 오랫동안 데이터를 보관할 수 있는 로컬 스토리지를 사용해보기로 하였습니다.

사용법은 생각보다 간단하네요 Key, Value 쌍으로 데이터가 저장되고 Key 값을 이용해 값을 불러올 수 있네요.

로컬 스토리지에 데이터를 저장하는 방법은 자바스크립트에서

<pre>
<code>
// 로컬 스토리지에 값 저장
localStorage.setItem('A', 'AAA');
localStorage.setItem('B', 'BBB');
</code>
</pre>

이런 식으로 저장하면 됩니다.

불러올 때는
<pre>
<code>
var A = localStorage.getItem('A');
</code>
</pre>

그리고 로컬 스토리지에 여러 가지 메서드가 있는데
<pre>
<code>
localStorage.removeItem(키); // 해당 키를 지운다.
localStorage.clear(); // 모두 지운다.
localStorage.length; // 저장된 키의 개수
localStorage.key(값); // 값으로 키를 찾는다.
</code>
</pre>
그리고 로컬 스토리지를 사용한 라이브러리가 있어 소개합니다.

[https://github.com/addyosmani/basket.js](https://github.com/addyosmani/basket.js)
