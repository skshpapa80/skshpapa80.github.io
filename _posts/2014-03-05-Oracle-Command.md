---
layout: post
title: "오라클 명령어"
description: "oracle, 오라클"
comments: true
tags:
    - Programming
---

### 테이블 스페이스 확인

-- 생성되어 있는 테이블 스페이스 보기.
SELECT * FROM DBA_TABLESPACES;
-- 생성되어 있는 DBF 파일 보기.
SELECT * FROM DBA_DATA_FILES;
-- 생성되어 있는 TEMP DBF 파일 보기.
SELECT * FROM DBA_TEMP_FILES;

### 테이블 스페이스 생성

확장자 명은 DBF 또는 .DAT, .ORA를 사용할 수 있다. 
일반적으로는 DBF를 가장 많이 사용한다.

DBF '[테이블스페이스경로(예. /usr/lib/oracle/xe/oradata/XE/)]/[테이블스페이스명].dbf'
ex 10g 경우) => C:\oracle\product\10.2.0\oradata\[폴더]\[테이블스페이스명.dbf]
ex XE  경우) => C:\oraclexe\oradata\XE\[폴더]\[테이블스페이스명.dbf]

CREATE TABLESPACE TABLESPACENAME
DATAFILE 'E:\oracle\product\10.2.0\oradata\directoryname\sample.dbf'
SIZE 500M                                  -- 기본 용량
AUTOEXTEND ON                       -- 기본 용량을 자동으로 늘려줌
extent management local autoallocate;

### 테이블 스페이스 삭제

-- 옵션
NCLUDING CONTENTS AND DATAFILES : 모든 내용 삭제
CASCADE CONSTRAINTS : 종속된 제약 조건 삭제

-- 명령어
ALTER TABLESPACE TABLESPACENAME OFFLINE;
DROP TABLESPACE TABLESPACENAME
INCLUDING CONTENTS AND DATAFILES
CASCADE CONSTRAINTS;

### 유저 생성

권한 종류. CONNECT, RESOURCE, DBA 등.(127가지 정도 존재)

ex 권한 부여) => GRANT CREATE USER, ALTER USER, DROP USER TO scott

ex 권한 해제) => REVOKE CREATE USER, ALTER USER, DROP USER

CONNECT: 데이터베이스 접속 권한

RESOURCE : 테이블 생성 권한

-- 유저생성 
CREATE USER USERNAME IDENTIFIED BY "PASSWORD" -- PASSWORD
DEFAULT TABLESPACE TABLESPACENAME
TEMPORARY TABLESPACE TEMP;            -- 생략가능

-- 권한 부여
GRANT UNLIMITED TABLESPACE TO USERNAME;                        -- 혹은 TABLESPACENAME
GRANT CONNECT, RESOURCE, CREATE VIEW, DBA TO USERNAME; -- 혹은 TABLESPACENAME
COMMIT;

-- 만약 하나의 테이블스페이스에
-- 여러 유저가 할당을 받아 사용하게 될 경우 아래와 같이 할당 한다.

/*
-- 해당 테이블 스페이스의 50MB만 사용.
ALTER USER USERNAME QUOTA 50M ON TABLESPACENAME;
-- 사용공간 unlimited로 설정
ALTER USER USERNAME
QUOTA UNLIMITED ON TABLESPACENAME;
*/

### 유저 정보 확인

-- 등록된 계정 목록 보기
SELECT * FROM DBA_USERS;
-- 현재 접속 유저의 DEFAULT TABLE SPACE 보기.
SELECT DEFAULT_TABLESPACE FROM USER_USERS;
-- 현재 접속 유저에게 부여된 권환 보기.
SELECT * FROM USER_SYS_PRIVS;
-- 분할 저장(Segment)할 수 있는 테이블 스페이스 현재 할당량 조회.
SELECT * FROM USER_TS_QUOTAS;
