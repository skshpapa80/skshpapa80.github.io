---
layout: post
title: "MS SQL 서버 테이블 수정하기/자동증가값 초기화"
description: "MSSQL"
comments: true
tags:
    - Programming
---

요즘 MS SQL서버를 주로 만집니다. 회사에서 주로 쓰는DB라서 말이죠.. 그래서 MS SQL 서버 테이블 수정하는 법을 간단히 정리해봅니다.

* 테이블 필드 수정하기

<pre>
<code>
	alter table 테이블명
	alter column 필드명 수정할 필드 타입

	ex) alter table d_sale
	alter column title varchar(200) not null
</code>
</pre>

* 필드 삭제하기
<pre>
<code>
	alter table 테이블명 drop 필드명
	ex) alter table d_sale drop title
</code>
</pre>

* 필드 추가하기
<pre>
<code>
	alter table 테이블명 add 필드명 필드 타입
	ex) alter table d_sal add sale varchar(20) not null
</code>
</pre>

* 프로시져명 변경
<pre>
<code>
	alter 로 가능할줄 았앗는데.. 
	sp_rename 이란 프로시져를 이용해서 변경해야 하더군요..  
	ex) EXEC sp_rename 'd_sale.title' 'title1'
</code>
</pre>

* 필드 자동 증가값 초기화
<pre>
<code>
	테이블에 자동증가 로 설정된 값을 초기화 하는 방법

	DBCC CHECKIDENT([table_name], RESEED, 0)
</code>
</pre>
	