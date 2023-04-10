---
layout: post
title: "PSP 개발자료 - 키 입력 받는 소스"
description: "PSP"
comments: true
tags:
    - Programming
---

### PSP 개발자료 - 키 입력 받는 소스

예전에 PSP 개발을 함참할때 만들었던 소스를 찾아서 포스팅합니다. 

이걸 지금 사용하는 분들이 있을지 모르겠네요!!!

​

pspinput.cpp 소스
<pre>
<code>
//////////////////////////////////////////////////////////////////////////////////////////
//   PSP Input Lib 
//   By 선경선향아빠
//////////////////////////////////////////////////////////////////////////////////////////
#include &lt;pspctrl.h&gt;

static unsigned long psp_key_pressed = 0;       //list of buttons pressed in current loop 
static unsigned long psp_key_pressed_old = 0;   //list of buttons pressed in previous loop 
static unsigned long psp_key_down = 0;          //list of buttons with key-down event 
static unsigned long psp_key_up = 0;            //list of buttons with key-up event 

int SetKeyStatus() 
{ 
   unsigned long k; 
   SceCtrlData ctl; 
   sceCtrlReadBufferPositive(&ctl,1);    

   psp_key_pressed = ctl.Buttons; 
   psp_key_down = 0; 
   psp_key_up = 0; 

   for(k = 0x0001 ; k <= 0x8000 ; k <<= 1) 
   { 
      if((psp_key_pressed_old & k) && !(psp_key_pressed & k))    
         psp_key_up |= k; 
      if(!(psp_key_pressed_old & k) && (psp_key_pressed & k))    
         psp_key_down |= k; 
   } 
   psp_key_pressed_old = psp_key_pressed;    
   return 0; 
} 

unsigned long GetKeyUp(int type) 
{ 
   if (type == 0) 
      SetKeyStatus(); 
   return psp_key_up; 
} 

unsigned long GetKeyDown(int type) 
{ 
   if (type == 0) 
      SetKeyStatus(); 
   return psp_key_down; 
} 

unsigned long GetKeyPressed(int type) 
{ 
   if (type == 0) 
      SetKeyStatus(); 
   return psp_key_pressed; 
} 

void KeyInit()
{
	sceCtrlSetSamplingCycle(0);
	sceCtrlSetSamplingMode(PSP_CTRL_MODE_ANALOG);
}
</code>
</pre>

pspinput.h 소스파일

<pre>
<code>
#ifndef _PSP_INPUT_INCLUDED
#define _PSP_INPUT_INCLUDED

int SetKeyStatus();
unsigned long GetKeyUp(int type);
unsigned long GetKeyDown(int type);
unsigned long GetKeyPressed(int type);
void KeyInit();

#endif // _PSP_INPUT_INCLUDED
</code>
</pre>

사용법

<pre>
<code>
KeyInit(); // Key 입력 받기 설정

unsigned long key;
key = GetKeyDown(0);
if (key & PSP_CTRL_UP) {
    //십자키 위
}
if (key & PSP_CTRL_DOWN) {
    //십자키 아래
}
</code>
</pre>
