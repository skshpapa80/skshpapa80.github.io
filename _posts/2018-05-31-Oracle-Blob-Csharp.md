---
layout: post
title: "[C#] 오라클 Blob 필드 쓰고 / 읽기"
description: "Oracle, C#"
comments: true
tags:
    - Programming
---

오라클에서 4000자가 넘어가는 텍스트나 파일을 DB에넣을때 blob 필드를 사용하는데요. 

최근에 필드에 4000자가 넘는 데이터를 입력할일이 생겨 C# 에서 blob 필드를 사용하는 코드를 작성하였습니다. 

그때 작성한 코드를 공개합니다.

### blob 필드 쓰기

<pre>
<code>
mdb_main.DBConn();
OracleCommand cmd = new OracleCommand('Insert into 테이블명(data) value(:BlobParameter)', mdb_main.mDBConn);

cmd.CommandType = CommandType.Text;
cmd.BindByName = true;
cmd.CommandText = Query;

// BLOB 파라미터작업
String tim = "대용량 텍스트";
byte[] bytes = System.Text.Encoding.Unicode.GetBytes(tim);
System.Buffer.BlockCopy(tim.ToCharArray(), 0, bytes, 0, bytes.Length);

OracleParameter blobParameter = cmd.Parameters.Add("BlobParameter", OracleDbType.Blob);
blobParameter.Value = bytes;

//Open connection and execute insert query.                
cmd.ExecuteNonQuery();
cmd.Dispose();
</code>
</pre>

### blob 필드 읽기

<pre>
<code>
OracleCommand cmd = new OracleCommand();
cmd.Connection = mdb_main.mDBConn;

cmd.CommandText = "BLOB 필드 SELECT 쿼리";
cmd.CommandType = CommandType.Text;

OracleDataReader dr = cmd.ExecuteReader();
dr.Read();
OracleBlob BLOB1 = dr.GetOracleBlob(0);

Byte[] byteArr = new Byte[BLOB1.Length];

int i = BLOB1.Read(byteArr, 0, System.Convert.ToInt32(BLOB1.Length));

// = (Byte[])(dr.GetOracleString(0)).Value;
string lookupValue = System.Text.Encoding.Unicode.GetString(byteArr);

</code>
</pre>
