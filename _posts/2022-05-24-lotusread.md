---
layout: post
title: "Lotus 123 파일 읽는 프로그램"
date: 2022-05-22
tags: [프로젝트]
excerpt: "Lotus 123,Excel"
---

### Lotus 123 파일 읽는 프로그램

<p align="center"><a data-fslightbox="gallery" href="/assets/images/SE-173df64f-c1e8-474f-9777-e431d1df33eb.png"><img src="/assets/images/SE-173df64f-c1e8-474f-9777-e431d1df33eb.png" alt="Lotus Read" width="400"/></a></p>

2006년에 작업했던 프로그램 입니다.

지인의 부탁으로 작업한 프로그램인데 소스 정리하다가 나왔네요. <br />
예전에 Lotus 123이라는 오래된 Spreadsheet프로그램이 있었는데 Excel이 나오기 전에는 많이 사용했습니다. 지인의 회사에서 Lotus 123 구동하는 PC 가 고장이 나면서 기존 파일을 읽어 오지 못해서 난처했었죠. 

그러다 Lotus 123 파일을 읽어서 Excel 변환하는 프로그램을 만들었습니다. <br />
우연히 Lotus 123을 읽어오는 Delphi Component가 저에게 있어서 그 Component 를 사용해서 읽은 후 Excel 저장합니다.

Delphi 7 버전으로 만들었네요.

#### 기능
* Lotus 123 파일 읽어오기 (파일에 여러시트가 있을경우 Tab을 생성하면서 열기)
* Excel저장, 전체저장(전체 탭 Excel파일로 저장)
* Excel 이 설치된 PC 에서만 동작합니다. 엑셀 저장은 Excel Automation 사용하거든요