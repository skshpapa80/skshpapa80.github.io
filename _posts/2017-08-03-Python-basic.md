---
layout: post
title: "[Python] 기초 소스"
description: "Python"
comments: true
tags:
    - Programming
---

### 1 프로그램의 기초 Hello 찍기

<pre>
<code>
#Hello Print
hello = "Hello"
print(hello)

a = 'Python'
print(a*2) # 실행결과 PythonPython
</code>
</pre>

### 2 줄바꿈 없이 출력

<pre>
<code>
# print hello world
print("hello", end='') #줄바꿈 없이 출력 
print(" world")
</code>
</pre>

### 3 if 문 공부 

<pre>
<code>
#if 문 공부 
a = 3
if a > 1:
    print('a > 1')
</code>
</pre>

### 4 출력문 기초 

<pre>
<code>
print("=" * 50)
print("My Program")
print("=" * 50)
</code>
</pre>

### 5 원면적 계산

반지름을 입력하면 원면적을 계산해주는 프로그램

<pre>
<code>
import math

print "-- 원 면적 계산 프로그램 --"
r = input(" 반지름 입력 : ")

cal = math.pi*r*r;    #r*r==r**2
print "반지름 : ",r,", 원면적 : ",cal
</code>
</pre>

### 6 삼각함수 구하기

상수를 입력하면 삼각함수를 구해주는 프로그램

<pre>
<code>
import math
print "-- 삼가함수 구하기 --"
degree = input(" 상수 입력 : ")
rad = math.pi * degree /180.0

print " sin : ",math.sin(rad)
print " cos : ",math.cos(rad)
print " tan : ",math.tan(rad)
<code>
</pre>



파이썬 공부하면서 만들었던 소스들