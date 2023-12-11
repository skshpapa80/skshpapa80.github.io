---
layout: post
title: "[C#] ini 파일 다루기"
description: "C#"
comments: true
tags:
    - Programming
---

### ini 파일 다루기 

![screenshot](/assets/img/2021/initest.png)

C# 에서 ini 파일을 읽고 저장하는 방법을 소개합니다. 


<pre>
<code>
        // 기본 선언해야될 내용 
        [DllImport("kernel32.dll")]
        private static extern int GetPrivateProfileString(    // GetIniValue 를 위해
            String section,
            String key,
            String def,
            StringBuilder retVal,
            int size,
            String filePath);


        [DllImport("kernel32.dll")]
        private static extern long WritePrivateProfileString(  // SetIniValue를 위해
            String section,
            String key,
            String val,
            String filePath);

        // INI 값 읽기
        public String GetIniValue(String Section, String Key, String iniPath)
        {
            StringBuilder temp = new StringBuilder(255);
            int i = GetPrivateProfileString(Section, Key, "", temp, 255, iniPath);
            return temp.ToString();
        }

        // INI 값 설정
        public void SetIniValue(String Section, String Key, String Value, String iniPath)
        {
            WritePrivateProfileString(Section, Key, Value, iniPath);
        }
		
</code>
</pre>

&#91;CONFIG&#92;
DATA=TEST_VALUE 
이런 ini 파일이 있으면 

<pre>
<code>
// 읽어오기
textBox1.Text = GetIniValue("CONFIG", "DATA", Application.StartupPath + @"TEST.ini");
// 저장하기
SetIniValue("CONFIG", "DATA", textBox1.Text, Application.StartupPath + @"TEST.ini");
</code>
</pre>

이렇게 사용하면 됩니다. 

Application.StartupPath 은 실행파일과 같은곳에 ini 파일이 있어야 합니다. 
