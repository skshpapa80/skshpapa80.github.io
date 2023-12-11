---
layout: post
title: "[C#] DES 암호화/복호화"
description: "C#"
comments: true
tags:
    - Programming
---

### DES 암호화/복호화

C# 에서 문자열을 DES알고림즘을 이용하여 암호화 하거나 복호하 하는
소스를 소개합니다.

<pre>
<code>
using System; 
using System.Collections.Generic; 
using System.Linq; 
using System.Web; 
using System.Security.Cryptography; 
using System.IO; 

/// &lt;summary&amp;&gt;; 
/// Summary description for Des 
/// &lt;/summary&amp;&gt;; 
public class Des 
{ 
    byte[] key = null; 
    protected Des() 
    { 
    } 

    public Des(byte[] desKey) 
    { 
		this.key = desKey; 
    } 

    public string Encrypt(string plain_text) 
    { 
		if (string.IsNullOrEmpty(plain_text)) 
        { 
			throw new ArgumentException("The string which needs to be encrypted can not be null."); 
		} 
        if (key.Length != 8) 
        { 
			throw (new Exception("Invalid key. Key length must be 8 byte.")); 
		} 
		DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider(); 
        MemoryStream memoryStream = new MemoryStream(); 
        CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateEncryptor(key, key), CryptoStreamMode.Write); 
        StreamWriter writer = new StreamWriter(cryptoStream); 
        writer.Write(plain_text); 
        writer.Flush(); 
        cryptoStream.FlushFinalBlock(); 
        writer.Flush(); 
        string cypher_text = Convert.ToBase64String(memoryStream.GetBuffer(), 0, (int)memoryStream.Length); 
        return cypher_text; 
	} 

    public string Decrypt(string cypher_text) 
    { 
		if (String.IsNullOrEmpty(cypher_text)) 
        { 
			throw new ArgumentNullException("The string which needs to be decrypted can not be null."); 
        } 

        if (key.Length != 8) 
        { 
			throw (new Exception("Invalid key. Key length must be 8 byte.")); 
        } 

        DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider(); 
        MemoryStream memoryStream = new MemoryStream(Convert.FromBase64String(cypher_text)); 
        CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateDecryptor(key, key), CryptoStreamMode.Read);
        StreamReader reader = new StreamReader(cryptoStream); 
        string plain_text = reader.ReadToEnd(); 
        return plain_text; 
		} 
	}
</code>
</pre>

### 사용법

// 암호화 키(8byte)&nbsp;
static byte[] desKey = ASCIIEncoding.ASCII.GetBytes("DES키");

Des des = new Des(desKey);

des.Encrypt("암호화할 문장");

des.Decrypt("암호풀 문장");
