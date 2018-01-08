<?php
require_once('vendor/autoload.php');

$stripe = array(
  "secret_key"      => $_ENV['secret_key'],
  "publishable_key" => $_ENV['publishable_key']
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>