<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $_REQUEST['url']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch,CURLOPT_TIMEOUT,10);

$start = microtime(true);
$httpBody = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$httpHeader = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

$time_elapsed_ms = ceil((microtime(true) - $start) * 1000);

if(empty($httpBody) || $httpCode == 0){
    $httpBody = sprintf('{"ping": %s, "content": {"erro": "Falha ao conectar! Timeout 10s"}', $time_elapsed_ms);
    $httpCode = 500;
    $httpHeader = 'application/json; charset=utf-8';
}

header(sprintf("Content-Type: %s", $httpHeader));
header("HTTP/1.1 $httpCode OK"); // Para funcionar com PHP < 5.4

echo sprintf('{"ping": %s, "content": %s}', $time_elapsed_ms, $httpBody);
