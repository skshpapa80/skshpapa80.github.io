---
layout: post
title: "[C#] 기초 - 기본 개념"
description: "C#"
comments: true
tags:
    - Programming
---

## C# 기본 개념

![.net Structure](/assets/images/1_lQF8l_LbIPOJfmc5T5SkGQ.png)

C#으로 작성된 어플리케이션은 크게 클래스(Class), 네임스페이스(Namespace), 어셈블리(Assembly)와 같은 요소로 구성되어 있다.

### 클래스(Class)

프로그램 내에서 독립적으로 조작할 수 있는 최소 단위. 멤버로 메소드(Method), 프로퍼티(Property), 이벤트(Event), 델리게이트(Delegate) 등을 가짂다.

### 네임스페이스(Namespace)

여러 개의 클래스들이 모인 논리적 그룹 단위.

### 어셈블리(Assembly)

클래스, 네임스페이스가 모여 생성된 물리적 파일. 갂단히 말하면 빌드 후 생성되는 DLL 혹은 EXE 파일이라고 생각하면 된다.

이렇게 작성된 코드를 빌드하게 되면 MSIL(Microsoft Intermediate Language)이라고 하는 기계어 직전 단계의 언어로 구성된 어셈블리가 생성이 된다. 바로 바이너리(Binary) 형식이 아닊 MSIL 형태로 생성을 하게 되는 이유는 자바와 마찬가지로 플랫폼에 종속적이 않고, 다양한 플랫폼에 이식 가능하도록 하기 위해서 이다.  Mono 프로젝트(http://www.mono-project.com/Main_Page)를 통해서 다양한 플랫폼에 적용 가능하다. 이렇게 MSIL 형태로 존재하는 어셈블리는 실행되는 시점에 Just-In-Time (JIT) 컴파일러(compiler)가 각 플랫폼에 맞는 코드로 컴파일 되며 실행이 된다.

이러한 런타임 환경에서 일어나는 다양한 일들은 닷넷 프레임워크에서 제공해 주며, 다음과 같은 구성 요소를 가지고 있다.

### CLS(Common Language Specification)

닷넷 프레임워크는 다양한 언어로 개발이 가능하다. 하지만 문제는 각 언어별로 특별히 지원하는 스펙이 존재할 것이다. 모든 프로젝트다 특정 하나의 언어로만 생성된 어셈블리만 사용하면 상관이 없으나, 개발을 하게 되면 다양한 언어로 개발된 어셈블리를 참조하게 될 것이다. 만약 참조된 어셈블리에서 지원하는 자료형 등이 해당 언어에서 지원이 되지 않는다면? 난감한 상황이 발생하게 된다. 이러한 문제점을 줄이고, 다양한 언어들 갂에 호환성을 놓이기 위해 닷넷 프레임워크를 지원하는 최소한의 스펙을 정의하고 있는데 그것이 바로 CLS이다. CLS 규칙을 따르는 것은 개발 시점에서는 약간의 제약사항이 발생을 하게 되지만 다른 언어들 갂의 상호 운영성은 증대하게 된다.

### CTS(Common Type System)

CLS를 포함하여, 닷넷에서 사용하게 되는 필드(Field), 메소드 등 모든 스펙이 정의된 것을 가리킨다.

### CLR(Common Language Runtime)

실행되는 프로그램의 메모리 관리, 보안 등 실제 운영되는 환경을 관리하게 되는 핵심 요소 이다.

### GC(Garbage Collector)

닷넷 프레임워크는 예전의 비관리 코드(Unmanaged Code)로 작성되던 시기에 개발자가 직접해주던 메모리 관리를 GC를 통해서 자동으로 하게 된다.

이미지 출처 : https://medium.com/@ayeshkhan/asp-net-4-5-architecture-tutorial-6616e42fad3f
