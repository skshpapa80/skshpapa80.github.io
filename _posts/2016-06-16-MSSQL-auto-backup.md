---
layout: post
title: "MSSQL 자동백업방법"
description: "MSSQL"
comments: true
tags:
    - Programming
---

### MSSQL 자동백업방법

우선 원하는 Script 으로 SQL 파일 생성을 만들 어줍니다. (예:BACKUP.SQL)

<pre>
<code>
declare @dir nvarchar(100)
declare @backupname nvarchar(100)
// 백업받을 폴더 지정
set @dir = N'Z:\\Backup_SQL\\서버_backup_' + convert(nvarchar(20), getDate(), 112) + N\'\'.bak\'\'

set @backupname = N'서버_backup_' + convert(nvarchar(20), getDate(), 112)

BACKUP DATABASE [DB이름] TO DISK = @dir WITH NOFORMAT, NOINIT, NAME = @backupname, SKIP, NOREWIND, NOUNLOAD, STATS = 10

GO

</code>
</pre>

그리고 백업을 수행할 배치파일을 만들어 줍니다. (예:BACKUP.BAT)&nbsp;

sqlcmd -S 서버이름 -i "Z:\\Backup_SQL\\BACKUP.SQL"

마지막으로 윈도우즈 예약으로 지정된 시간에 BACKUP.BAT 스크립트를 실행하도록 합니다

