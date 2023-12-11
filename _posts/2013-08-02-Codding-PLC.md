---
layout: post
title: "코딩, PLC통신"
description: "코딩, PLC통신"
comments: true
tags:
    - Z-Diary
---

## 코딩

프로젝트를 진행하면서 새로운 기능이나 모듈을 추가 하기 위해서 코드를 구현할때
우선 신규 프로젝트를 하나 만들어 거기서 충분히 테스트를 한후 본 코드에 추가 하는 편이다.
이렇게 하다보면 프로젝트를 하나 진행하면서 최대 50~60개의 프로젝트도 만들어 본 경험이 있다.
그렇게 정리된 코드들이 나중에는 다 내 재산이 되겠지

## PLC통신

요즘 PLC 통신과 관련된 일을 하기 때문에 OPC 서버라던지,
MX Component,  Modbus 등 자료를 보고 있습니다.

Melsec 이랑 통신은 많이 해봐서 아는데 이번엔 처음 보는 PLC 라 엄청 삽질할뻔 했는데
그 PLC가 다른 PLC 랑 통신을 하기위해 프로토콜 변환기와
Melsec PLC 가 중간에 설치되어 있어서 그 Melsec 를 통해서 값을 가져오기로 변경했어요.

PLC란 무엇일까?

(P)rogrammable (L)ogical (C)ontroller는 (프)로그램가능한 (논)리적인 (제)어기입니다.
PLC는 간단히 설명하면, 들어온 입력에 맞추어 프로그램된 대로 출력을 내어 보내는 장치입니다.
입력/출력은 접점(Digital Input/Output), 아날로그(Analog Input/Output), 펄스카운터(Pulse Input/Output), 특수제어용모듈 이 있습니다.
CPU는 Central Processor Unit입니다. 즉 중앙처리장치입니다.
CPU Module은 ALU+Memory+통신Bus로 구성이 됩니다. ALU는 Arithmatic & Logic Unit 로 산술논리계산 장치 입니다
. Memory는 프로그램과 데이타(CPU 상태, i/o image, Timer, Counter, Coil, 각종자료)으로 구성됩니다.

## VB.NET

VB.NET 을 하다보면 코드 자동 완성기능이 너무 좋아 보인다 ^^

C#은 안되는거 같던데 어떻게 하는 방법이 없나???
