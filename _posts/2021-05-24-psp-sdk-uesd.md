---
layout: post
title: "PSP SDK 사용법"
description: "PSP, SDK"
comments: true
tags:
    - Programming
---

### 리모콘 사용하기

PSP 게임기는 발매당시 리모콘기능이 있는 이어폰이 있엇습니다. 그 리모콘을 키를 눌렀을때 동작하게 하는 SDK 입니다. 

상단이 #include &lt;psphprm.h&gt; 추가해야 합니다. 

<pre>
<code>
u32 psp_remotes;
sceHprmPeekCurrentKey(&psp_remotes);
// 리모콘 처리
if (psp_remotes & PSP_HPRM_PLAYPAUSE) {
  // 재생/일시정지 버튼 처리
}
else if(psp_remotes & PSP_HPRM_BACK) {
  // 백버튼 처리
}
else if(psp_remotes & PSP_HPRM_FORWARD) {
  // 포워드 버튼 처리
}
else if(psp_remotes & PSP_HPRM_VOL_UP) {
  // 볼륩 업 버튼 처리
}
else if(psp_remotes & PSP_HPRM_VOL_DOWN) {
  // 볼륨 다운 버튼 처리
}
else if(psp_remotes & PSP_HPRM_HOLD) {
  // 홀드 처리
}
</code>
</pre>

바로 make 하면 에러가 나는데 makefile 에 

LIBS = -lpsphprm -lpsphprm_driver  추가해줘야 합니다. 

​
### 현제 시간/날짜 표시 하기

정의 및 필수 내용 

<pre>
<code>
#include &lt;psprtc.h&gt;

pspTime cur_time; // 사용할 변수 선언 
sceRtcGetCurrentClockLocalTime(&cur_time); // 현제 시간 가져오기 

cur_time->hour = 시 
cur_time->minutes = 분 
cur_time->seconds = 초 
cur_time->year = 년 
cur_time->month = 월 
cur_time->day = 일 
</code>
</pre>

시간 표시하기

sprintf(dest,"%02d : %02d : %02d",cur_time->hour,cur_time->minutes ,cur_time->seconds); 

날짜 표시하기

sprintf(dest,"%02d년 %02d월 %02d일",cur_time->year,cur_time->month ,cur_time->day);

Makefile 에 Libs 에 -lpsprtc 을 추가하세요

​
### PSP 파워체크하기

PSP 파워 관련된 API 를 사용한 코드 

#include &lt;psppower.h&gt;
이파일을 포함한다음에 다음 함수를 사용할수 있습니다.

<pre>
<code>
int scePowerIsBatteryExist(void); // 밧데리가 연결되어 있는지 체크
int scePowerIsPowerOnline(void); // 파워 케이블이 연결되어 있는지 체크
int scePowerIsBatteryCharging(void); // 충전중 체크
int scePowerIsLowBattery(void); // 로우 밧데리 체크
int scePowerGetBatteryLifePercent(void); // 밧데리 남음값 퍼센트
</code>
</pre>


### PSP 슬립모드와 파워끄기

PSPSDK 보면 psppower.h 에 다음과 같은 함수가 정의되어 있습니다.

int scePowerRequestStandby(void);
int scePowerRequestSuspend(void);
int scePowerRequestStandby(void); 함수가 PSP 의 파워를 끄는 함수이고..

int scePowerRequestSuspend(void); 함수가 PSP를 슬립모드로 들어가게 합니다.

둘다 성공하면 0을 반환합니다.

​

### PSP CPU/RAM/BUS 클럭지정하기

psppower.h 함수에 보면

int scePowerSetClockFrequency ( int cpufreq, int ramfreq, int busfreq )  
라는 함수가 있습니다.

PSP 의 CPU 클럭과 RAM 클럭 BUS 클럭을 지정하는 함수 입니다.

범위는 아래와 같습니다.

cpufreq  - cpu frequency, valid from 1-333  
ramfreq  - ram frequency, valid from 1-333  
busfreq  - bus frequency, valid from 1-166  
홈브류 제작시 빠른 처리를 원하면

scePowerSetClockFrequency (333,333,166) 등으로 CPU 클럭을 높여

빠른 처리결과를 얻어 낼수 있습니다.

​
### 개발환경 링크

[https://skshpapa80.github.io/2013/03/07/psp-toolkit/](https://skshpapa80.github.io/2013/03/07/psp-toolkit/)
