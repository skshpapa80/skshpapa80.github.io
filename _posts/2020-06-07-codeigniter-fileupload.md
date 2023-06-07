---
layout: post
title: "[PHP] 코드이그니터(CodeIgniter) - 파일업로드 구현"
description: "PHP, CodeIgniter"
comments: true
tags:
    - Programming
---

### 파일 업로드

이번에 PHP 프레임워크인 코드 이그니터(Codeigniter)를 사용하여 홈페이지를 만드는데 사용한 이미지 업로드용 코드 입니다. 

upload 라이브러리를 사용하고 app~ 와 같은 위치에 upload 폴더를 만드고 다음 코드를 사용한다음 ajax 로 호출하여 파일을 업로드 합니다. 

<pre>
<code>
function index()
{
    // Upload 설정
	$config['upload_path']          = './upload/';
	$config[\'allowed_types\']      = 'gif|jpg|png';
    $config['max_size']             = 100; 
    // 100k
    $config['max_width']            = 1024;
    $config['max_height']           = 768;
    
    $this->load->library('upload', $config);
    $data = array();
    if (! $this->upload->do_upload("service_image"))
    {
    	$error = array('error' => $this->upload->display_errors());
    }
    else
    {
    	//$data = array('upload_data' => $this->upload->data());
        $this->output->set_output("./upload/".$this->upload->data('file_name'));
    }
 }	
</code>
</pre>

jquery 를 이용한 파일 업로드 호출 코드

<pre>
<code>
function upload()
{
	var datas, xhr;
    datas = new FormData();
    datas.append( 'service_image', $( '#file' )[0].files[0] );
    $.ajax({
     	url: '/Upload',
        contentType: 'multipart/form-data',
        type: 'POST',
        data: datas,    
        mimeType: 'multipart/form-data',
        success: function (data) {
           // 업로드 성공시 파일 URL 리턴받음	
        },
        error : function (jqXHR, textStatus, errorThrown) {
        	alert('ERRORS: ' + textStatus);
        },
        cache: false,
        contentType: false,
        processData: false
    });		
}
</code>
</pre>

중복파일을 자동으로 이름이 변경되어 변경된 이름이 리턴값으러 넘어 옵니다. 

파일 업로드 구현하는 방법은 생각보다 어렵지 않네요!!!

PS. upload 폴더는 권한을 777로 해주세요!!!
