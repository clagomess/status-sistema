<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $_REQUEST['url']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_TIMEOUT,1);

$httpBody = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$httpHeader = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

curl_close($ch);

if(empty($httpBody) || $httpCode == 0){
    $httpBody = '{"erro": "Falha ao conectar! Timeout 3s"}';
    $httpCode = 500;
    $httpHeader = 'application/json; charset=utf-8';
}

header(sprintf("Content-Type: %s", $httpHeader));
http_response_code($httpCode);
echo $httpBody;
