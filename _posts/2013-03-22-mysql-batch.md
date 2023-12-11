---
layout: post
title: "[MySQL] SQL 배치 작업 하기"
description: "MYSQL"
comments: true
tags:
    - Programming
---

### MySQL에서 SQL 배치 작업 하기

리눅스에서는 cron 이라는 좋은툴이 있으니 넘어가고

윈도우에서 MySQL 배치 작업을 하는 방법을 소개합니다.

MySQL윈도우 버전을 설치하면 MySQL Command Line Tool이 같이 설치됩니다.

이툴을 사용하여 배치작업을 할예정인데요.

배치작업을 위해 두개의 파일이 필요합니다. bat확장자를 가진 배치파일과 실행될 SQL 이저장된 파일

#1 우선 bat 파일을 하나 만듭니다. ex) MYSQL_BATCH.bat

그리고 다음과 같이 코딩합니다.

<br />

C:\PROGRA~1\MySQL\MYSQLS~1.1\bin\mysql.exe -u아이디 -p패스워드 < runsql.sql

(MySQL 설치위치는 설치환경에 따라 다를수 있습니다!)

bat 파일을 저장합니다.

#2 SQL 파일을 하나 만듭니다. ex) runsql.sql

runsql.sql 파일에 실행할 대상의 SQL 들을 정리해서 입력합니다.

#3 미리 작성한 sql문을 테스트 하고

#4 마지막으로 윈도우 제어판에가서 예약을 설정합니다.

이때 처음작성한 bat 파일을 원하는시간에 동작하도록 설정하면 사용자가 원하는 시간에 실행되는

배치작업이 완성됩니다.