---
layout: post
title: "[JQuery] ajax 호출하기"
description: "JQuery"
comments: true
tags:
    - Programming
---

### ajax call

웹개발을 하면서 가장 많이 사용하는부분이 자바스크립트이고 그중 JQuery 를 많이 사용하는데요.

Jquery 를 사용하여 ajax를 호출하여 데이터 처리하는데 많이 사용합니다.

버튼을 눌렀을 때 화면의 값을 읽어서 DB 처리 페이지로 넘겨 주로 처리하죠

<pre>
<code>
var form_data = { 
  MODE: "SAVE",
  DATA1: $("#DATA1").val()
};
// 폼 데이터 POST 로 넘길 값들

$.ajax({
    type: "POST",   // POST 방식으로 호출
    url: "URL",  // URL 정보
    data: form_data, 
    success: function (response) { 
        alert(response);  // response 에는 호출하고 나서 받아오는 값이 들어 있습니다.
        if(response == "OK")
        {
            alert("저장완료");
        }
         
        // 만약에  호출하고 JSON으로 데이터를 받으면
        var obj = $.parseJSON(response); 
        $.each(obj, function () {
             alert(this["VALUE"]);
        });
    }
 });
</code>
</pre>

경험상 페이지를 불러 오면서 호출하는 ajax 는

async: false, 옵션을 사용하는게 좋고

그냥 버튼이랑 이베트 호출할때에는 async: true; 로 사용하는게 좋더라구요. 
