<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $_REQUEST['url']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_TIMEOUT,10);

$httpBody = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$httpHeader = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

curl_close($ch);

if(empty($httpBody) || $httpCode == 0){
    $httpBody = '{"erro": "Falha ao conectar! Timeout 10s"}';
    $httpCode = 500;
    $httpHeader = 'application/json; charset=utf-8';
}

header(sprintf("Content-Type: %s", $httpHeader));
header("HTTP/1.1 $httpCode OK"); // Para funcionar com PHP < 5.4

echo $httpBody;
