---
layout: post
title: "[PHP] 코드이그니터(CodeIgniter) // index.php URL에서 없애기"
description: "PHP, CodeIgniter"
comments: true
tags:
    - Programming
---

### index.php URL 에서 없애기

And Add the following rules to .htaccess file,

.htaccess 파일 생성하여 루트폴더에 넣기

<pre>
<code>

RewriteEngine OnRewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php/$1 [L]

</code>
</pre>

Config.php 파일 수정

<pre>
<code>

Then find the following line in your application/config/config.php file

$config['index_page'] = 'index.php';

Set the variable empty as below.

$config['index_page'] = '';

That's it, it worked for me.

If it doesn't work further try to replace following variable with these parameters ('AUTO', 'PATH_INFO', 'QUERY_STRING', 'REQUEST_URI', and 'ORIG_PATH_INFO') one by one

$config['uri_protocol'] = 'AUTO';

</code>
</pre>
