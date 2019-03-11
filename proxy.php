<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $_REQUEST['url']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$httpBody = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$httpHeader = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

curl_close($ch);

header(sprintf("Content-Type: %s", $httpHeader), $httpCode);
echo $httpBody;
