---
layout: post
title: "[C#] 제가 주로 사용하는 오라클 DB 처리 클래스(소스)"
description: "Oracle, C#"
comments: true
tags:
    - Programming
---

### 오라클(Oracle) DB 처리 클래스

제가 주로 사용하는 데이터베이스는 MSSQL, ORACLE 입니다.
MSSQL 는 Delphi, C# 으로 프로그램을 만들면서 사용했었고. Oracle 는 최근에 자주 사용하게 된 데이터베이스 입니다.

C#에서 ASP.NET, 윈도우 프로그램을 만들때 DB 접속이 필요하면 이 오라클 Helper 클래스를 사용합니다. 
using Oracle.DataAccess.Client; 이걸 소스에 추가해야합니다.

ODAC 을 설치하면 되는데 오라클 클라이언트도 필요하죠..
나중에 오라클 클라이언트 없이 접속하는 방법도 포스팅 하겠습니다.

<pre>
<code>
public class DBHelper_ORACLE
{
  private OracleConnection mDBConn = null;
  private OracleCommand mCmd = null;
  private OracleTransaction mTrans = null;  // 트랜젝션
  
  private String ErrMsg = null;
  private string _connstr = string.Empty;
  
  #region DB연결
  public DBHelper_ORACLE(string __connstr)
  {
    this._connstr = __connstr;
  }
  
  public bool DBConn()
  {
    try
    {
      mDBConn = new OracleConnection(_connstr);
      mDBConn.Open();
    }
    catch (Exception e)
    {
      ErrMsg = e.Message;  
      throw e;
    }
    return true;
  }
  #endregion
    
  #region DB연결체크
  public bool IsOpenDB()
  {
    return ((mDBConn.State != ConnectionState.Closed) ? true : false);
  }    
  #endregion
    
  #region DB연결끈기
  public void DBClose()
  {
    if (mDBConn == null)
    {
      return;
    }
    
    try
    {
      if (mDBConn.State.ToString() == &quot;Open&quot;)
      {
        mDBConn.Close();
      }
    }
    catch (Exception e)
    {
      ErrMsg = e.Message;
      throw e;
    }
  }
  #endregion
  
  #region 쿼리실행
  public bool ExecuteQuery(string Query)
  {
    int rtn = -1;
  
    mCmd = new OracleCommand(Query, mDBConn);
    rtn = mCmd.ExecuteNonQuery();
  
    return rtn &lt; 0 ? false : true;
  }        
  #endregion
  
  #region 쿼리실행 데이터셋리턴
  public DataSet ExecuteDataSet(string Query)
  {
    DataSet mDataSet = new DataSet();
    
    mCmd = new OracleCommand(Query, mDBConn);
    mDataSet.Load(mCmd.ExecuteReader(), LoadOption.OverwriteChanges, &quot;&quot;);           
    
    return mDataSet;
  }

  public DataSet ExecuteDataSet(string sp_name, String parameters)
  {
    DataSet mDataSet = new DataSet();
  
    mCmd = new OracleCommand();
    mCmd.Connection = mDBConn;
    mCmd.CommandType = CommandType.StoredProcedure;
    mCmd.CommandText = sp_name;
  
    mCmd.Parameters.Clear();
  
    Dictionary dic = new Dictionary();
    string[] items = parameters.TrimEnd(&#39;;&#39;).Split(&#39;;&#39;);
    foreach (string item in items)
    {
        string[] keyValue = item.Split(&#39;=&#39;);
        dic.Add(keyValue[0], keyValue[1]);
    }
  
    foreach (KeyValuePair pair in dic)
    {
        mCmd.Parameters.Add(pair.Key, OracleDbType.Varchar2, pair.Value, ParameterDirection.Input);
    }
    
    // 조회 리턴받을 REF커서
    mCmd.Parameters.Add(&quot;v_OUT_DATA&quot;, OracleDbType.RefCursor).Direction = ParameterDirection.Output;
  
    mDataSet.Load(mCmd.ExecuteReader(), LoadOption.OverwriteChanges, &quot;&quot;);
  
    return mDataSet;
  }
  
  public String ExecuteQuerySPR(string sp_name, String parameters)
  {
    int rtn = -1;
  
    mCmd = new OracleCommand();
    mCmd.Connection = mDBConn;
    mCmd.CommandType = CommandType.StoredProcedure;
    mCmd.CommandText = sp_name;  
    
    mCmd.Parameters.Clear();
  
    Dictionary dic = new Dictionary();
    string[] items = parameters.TrimEnd(&#39;;&#39;).Split(&#39;;&#39;);
    foreach (string item in items)
    {
        string[] keyValue = item.Split(&#39;=&#39;);
        dic.Add(keyValue[0], keyValue[1]);
    }
    
    foreach (KeyValuePair pair in dic)
    {
        mCmd.Parameters.Add(pair.Key, OracleDbType.Varchar2, pair.Value, ParameterDirection.Input);
    }
    
    mCmd.Parameters.Add(&quot;v_RESULT&quot;, OracleDbType.Int32).Direction = ParameterDirection.Output;
    mCmd.Parameters.Add(&quot;v_ERRMSG&quot;, OracleDbType.Varchar2).Direction = ParameterDirection.Output;
  
    rtn = mCmd.ExecuteNonQuery();
    
    return mCmd.Parameters[&quot;v_ERSULT&quot;].Value.ToString() + &quot;/&quot; + mCmd.Parameters[&quot;v_ERRMSG&quot;].Value.ToString();
  }
  #endregion

  #region 쿼리 실행
  public bool ExecuteQuery(string sp_name, String parameters)
  {
    int rtn = -1;
    
    mCmd = new OracleCommand();
    mCmd.Connection = mDBConn;
    mCmd.CommandType = CommandType.StoredProcedure;
    mCmd.CommandText = sp_name;
    
    mCmd.Parameters.Clear();
  
    Dictionary dic = new Dictionary();
    string[] items = parameters.TrimEnd(&#39;;&#39;).Split(&#39;;&#39;);
    foreach (string item in items)
    {
        string[] keyValue = item.Split(&#39;=&#39;);
        dic.Add(keyValue[0], keyValue[1]);
    }
  
    foreach (KeyValuePair pair in dic)
    {
        mCmd.Parameters.Add(pair.Key, OracleDbType.Varchar2, pair.Value, ParameterDirection.Input);
    }
    
    rtn = mCmd.ExecuteNonQuery();
    
    return rtn &lt; 0 ? false : true;
  }
  #endregion
  
  public void TransBegin()
  {
    if(mDBConn.State == ConnectionState.Open)   
    mTrans = mDBConn.BeginTransaction();  
  }
  
  public void TransCommit()
  {
    if(mTrans != null) 
    mTrans.Commit();  
  }
  
  public void TransRollBack()
  {
    if (mTrans != null)
    mTrans.Rollback();  
  }
  
  public String GetError()
  {
    return ErrMsg;
  }
}
</code>
</pre>
    
### 클래스 사용법
    
접속 객체 생성후 접속 그리고 SP 날리거나 쿼리문 직접 날리기

<pre>
<code>
public static DBHelper_ORACLE mdb_main; // 객체생성 
mdb_main = new DBHelper_ORACLE(&quot;TNS 정보&quot;);
mdb_main.DBConn();

String tmp = &quot;&quot;;

foreach (KeyValuePair pair in parameters)
{
  tmp = tmp + pair.Key + &quot;=&quot; + pair.Value + &quot;;&quot;;
}

mdb_main.ExecuteDataSet(&quot;SP명&quot;, tmp);
</code>
</pre>
