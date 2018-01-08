<?php
require_once('vendor/autoload.php');

$stripe = array(
  "secret_key"      => getenv('secret_key'),
  "publishable_key" => getenv('publishable_key')
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>