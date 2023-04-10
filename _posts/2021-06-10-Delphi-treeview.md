---
layout: post
title: "[Delphi] TreeView에 Data 사용법"
description: "Delphi"
comments: true
tags:
    - Programming
---

Delphi Treeview 를 사용할때 트리뷰 아이템에 값을 같이 저장해서 사용하는 방법을 소개합니다. 

​

1. 일반적은 Data 사용법 (Data에는 Integer값만이 입력된다.)

<pre>
<code>
{Make Node.Data contain the integer value 1234}
Node.Data := pointer(1234);

{Get the integer value}  
iValue := integer(Node.Data);
</code>
</pre>

2. Class 사용법 (매우 유연하고 융통성있게 쓰인다)

가장 많이 사용하는 방법입니다. 

<pre>
<code>
type
  // 데이터를 저장할 클래스를 정의합니다. 
  TNodeData = class
     sText : string;
  end;
  
  // Root 값 넣을때
  with treeview1.Items.AddFirst(  nil,  'Root'  ) do
  begin
      Selected := true;

      {Create the data class}
      Data := TNodeData.Create;
      {Set the nodes date time}
      TNodeData(Data).sText := FormatDateTime(  'hh:nn:ss',  now  );
  end;
  
  // Child 값 넣을때
  with treeview1.Items.AddChild(  tv_eg1.Selected,  sText  ) do
  begin
      {Create the data class}
      Data := TNodeData.Create;
      {Set the nodes date time}
      TNodeData(Data).sText := FormatDateTime(  'hh:nn:ss',  now  );       
  end;
  
  // 값을 가져올때
  ShowMessage(TNodeData(treeview1.Selected.Data).sText);
  
  // 삭제할때
  TNodeData(treeview1.Selected.Data).Free;
  treeview1.Selected.Delete;
</code>
</pre>

TreeView 사용법중 Data 를 이용하는 방법 입니다. 
