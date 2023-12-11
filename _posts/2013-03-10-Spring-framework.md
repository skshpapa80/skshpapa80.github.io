---
layout: post
title: "Spring 기반의 표준 전자정부 프레임워크 설치"
description: "Spring Framework"
comments: true
tags:
    - Programming
---

Spring 기반의 표준 전자정부 프레임워크 설치 방법을 소개합니다.
<a href="http://www.egovframe.go.kr/" target="_blank">http://www.egovframe.go.kr</a>

우선 위사이트에서 가입후 다운로드 받아서 사용해도 되지만
저는 다운받아서 실행했을때 정상적으로 실행이 되지 않아서
직접 설치하는 방법을 사용했습니다.

가장 먼저 Eclipse IDE for Java EE Developers의 Helios Packages  패키지를 다운받아 실행한후
자동업데이트 주소를 입력하여 설치하면 됩니다.

<div align="left">
<table>
  <tbody>
    <tr>
      <th>소프트웨어</th>
      <th>버전</th>
      <th>자동설치/업데이트주소</th>
    </tr>
    <tr>
      <td>Eclipse</td>
      <td>3.6.2</td>
      <td><a title="http://www.eclipse.org/" href="http://www.eclipse.org/" target="_blank" rel="nofollow">http://www.eclipse.org/</a>에서 Downloads의 Eclipse IDE for Java EE Developers의 Helios Packages 다운로드</td>
    </tr>
    <tr>
      <td>Spring Core</td>
      <td>2.3.0</td>
      <td><a title="http://dist.springframework.org/release/IDE" href="http://dist.springframework.org/release/IDE" target="_blank" rel="nofollow">http://dist.springframework.org/release/IDE</a>에서 Spring Core 설치</td>
    </tr>
    <tr>
      <td>Maven(m2eclipse)</td>
      <td>0.12.1</td>
      <td><a title="http://m2eclipse.sonatype.org/sites/m2e" href="http://m2eclipse.sonatype.org/sites/m2e" target="_blank" rel="nofollow">http://m2eclipse.sonatype.org/sites/m2e</a></td>
    </tr>
    <tr>
      <td>eGovFrame</td>
      <td>2.0.0</td>
      <td><a title="http://www.egovframe.go.kr/update" href="http://www.egovframe.go.kr/update" target="_blank" rel="nofollow">http://www.egovframe.go.kr/update</a>에서 필요 기능 설치</td>
    </tr>
    <tr>
      <td>Subversive SVN Connector</td>
      <td>2.2.2</td>
      <td><a title="http://download.eclipse.org/releases/helios" href="http://download.eclipse.org/releases/helios" target="_blank" rel="nofollow">http://download.eclipse.org/releases/helios</a> Collaboration 항목에서 Subversive SVN Team provider(Incubation) 설치
      <a title="http://community.polarion.com/projects/subversive/download/eclipse/2.0/helios-site/" href="http://community.polarion.com/projects/subversive/download/eclipse/2.0/helios-site/" target="_blank" rel="nofollow">http://community.polarion.com/projects/subversive/download/eclipse/2.0/helios-site/</a>에서 subversive SVN Connectors 설치</td>
    </tr>
    <tr>
      <td>PMD</td>
      <td>3.2.6</td>
      <td><a title="http://pmd.sourceforge.net/eclipse" href="http://pmd.sourceforge.net/eclipse" target="_blank" rel="nofollow">http://pmd.sourceforge.net/eclipse</a>에서 PMD for Eclipse 3 설치</td>
    </tr>
    <tr>
      <td>FindBugs</td>
      <td>1.3.9</td>
      <td><a title="http://findbugs.cs.umd.edu/eclipse" href="http://findbugs.cs.umd.edu/eclipse" target="_blank" rel="nofollow">http://findbugs.cs.umd.edu/eclipse</a></td>
    </tr>
    <tr>
      <td>JUnit</td>
      <td>4.8.1</td>
      <td>Eclipse 3.6.2버전에 JUnit 4.8.1 버전이 내장되어 있으므로 별도 설치 필요 없음</td>
    </tr>
    <tr>
      <td>Properties Editor</td>
      <td>4.8.1</td>
      <td><a title="http://propedit.sourceforge.jp/eclipse/updates/" href="http://propedit.sourceforge.jp/eclipse/updates/" target="_blank" rel="nofollow">http://propedit.sourceforge.jp/eclipse/updates/</a></td>
    </tr>
    <tr>
      <td>EclEmma</td>
      <td></td>
      <td><a title="http://update.eclemma.org/" href="http://update.eclemma.org/" target="_blank" rel="nofollow">http://update.eclemma.org/</a></td>
    </tr>
  </tbody>
</table>
</div>
