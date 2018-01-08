<?php
require_once('vendor/autoload.php');

$stripe = array(
  "secret_key"      => "sk_test_qmxkI1oTkCQlkgQWsawlPe5G",
  "publishable_key" => "pk_test_yKxRubb8GeiTIElfdIItxUak"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>