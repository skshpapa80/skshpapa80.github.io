---
layout: post
title: "Sheet2DB - 엑셀 DB 업로드 프로그램"
description: "Delphi, MSSQL, Excel"
comments: true
tags:
    - Project
---

### [자작] Sheet2DB

프로젝트를 진행하다보면 엑셀 데이터를 DB Table 로 입력해야 되는 경우가 많이 생깁니다.

엑셀 데이터를 DB Table 구조에 맞춰서 입력하기가 때로는 노가다처럼 느껴져서 만들게 되었습니다.

<p align="center"><a href="/assets/images/sheetdb_1.png" id="open-image"><img src="/assets/images/sheetdb_1.png" alt="Sheet2db" width="300"/></a></p>

엑셀 선택하는 페이지

<p align="center"><a href="/assets/images/sheetdb_2.png" id="open-image"><img src="/assets/images/sheetdb_2.png" alt="Sheet2db" width="300"/></a></p>

엑셀 선택후

<p align="center"><a href="/assets/images/sheetdb_3.png" id="open-image"><img src="/assets/images/sheetdb_3.png" alt="Sheet2db" width="300"/></a></p>

DB 접속 정보 입력

DB 접속 정보를 입력한후 DB연결/테이블 리스트 버튼을 누르면 다음페이지로 넘어 갑니다.

<p align="center"><a href="/assets/images/sheetdb_4.png" id="open-image"><img src="/assets/images/sheetdb_4.png" alt="Sheet2db" width="300"/></a></p>

테이블 리스트에서 사용할 테이블을 선택하고

테이블 컬럼명 버튼을 누르면 테이블 컬럼 정보가 나오고

엑셀 컬럼 정보랑 연결/취소 버튼을 이용해서 매칭 시킨후

<p align="center"><a href="/assets/images/sheetdb_5.png" id="open-image"><img src="/assets/images/sheetdb_5.png" alt="Sheet2db" width="300"/></a></p>

다음페이지에서

DB작업 버튼을 클릭하면

DB 에 Insert 됩니다.

테이블 정보와 엑셀 컬럼 정보를 활용하여 Insert 구문을 자동으로 만들어서

<p align="center"><a href="/assets/images/sheetdb_6.png" id="open-image"><img src="/assets/images/sheetdb_6.png" alt="Sheet2db" width="300"/></a></p>

처리결과를 확인합니다.

### 프로그램 정보

- Delphi 10.3 커뮤니티 에디션으로 작업
- 엑셀 읽어 오는 부분은 Excel.Application OLE 를 사용했습니다.
- 그리드는 기본그리드인 스트링 그리드
- 현재는 MSSQL 만 됩니다. 오라클 추가한 후 공개할 예정입니다.
  그전에 필요하신분은 따로 연락 주세요!!!
  
PS . 2022-04-28 소스 github 에 올렸어요 

[https://github.com/skshpapa80/Sheet2DB](https://github.com/skshpapa80/Sheet2DB)

