<?php

$data = readfile('product.json');
header('Content-Type: application/json');
echo $data;

?>