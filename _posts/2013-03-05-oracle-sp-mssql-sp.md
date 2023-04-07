---
layout: post
title: "오라클 프로시져를 MSSQL 프로시져로 변환시 유용한 정보"
description: "Oracle, MSSQL"
comments: true
tags:
    - Programming
---

오라클 프로시져 MSSQL 프로시져로 변환

* DECODE 는 CASE 문으로 대체

* SELECT A, B INTO A,B FROM DUALS 문은 SET @A=A; SET @B=B 형식으로 변경

* NUMBER 타입은 INT,DECIMAL,NUMERIC 형식으로 필요에 따라 변경

<pre>
<code>
﻿EXCEPTION WHEN NO_DATA_FOUND THEN
    rollback;
END; =>

IF @@ERROR <> 0 BEGIN
    IF @@ROWCOUNT = 0 BEGIN
        ROLLBACK
    END
END -- 이런식으로﻿
</code>
</pre>

* ADD_MONTH 는 DATEADD(M,날짜) 로 수정 가능 

​