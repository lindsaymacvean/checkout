<?php
  require_once('./config.php');

  $token  = json_decode($_POST['stripeToken']);
  $args = json_decode($_POST['stripeArgs']);
  $quantity = json_decode($_POST['quantity']);

  // print_r($quantity);
  // print_r($token->id);
  // print_r($token->email);
  // print_r($args->shipping_name);
  // print_r($args->shipping_address_country);
  // print_r($args->shipping_address_country_code);
  // print_r($args->shipping_address_zip);
  // print_r($args->shipping_address_line1);
  // print_r($args->shipping_address_city);

  $id = $token->id;
  $email  = $token->email;
  $shipping_name = $args->shipping_name;
  $shipping_address_line1 = $args->shipping_address_line1;
  $shipping_address_city = $args->shipping_address_city;
  $shipping_address_zip = $args->shipping_address_zip;
  $shipping_address_country = $args->shipping_address_country;
  $amount = 699 * $quantity;
  $status = false;

  try {
	  $customer = \Stripe\Customer::create(array(
	      'email' => $email,
	      'source'  => $id
	  ));

	  $charge = \Stripe\Charge::create(array(
	      'customer' => $customer->id,
	      'amount'   => $amount,
	      'description' => 'Floral Tights',
	      'currency' => 'Eur'
	  ));
		
		$status = true;

	} catch(\Stripe\Error\Card $e) {
		// Since it's a decline, \Stripe\Error\Card will be caught
	  $body = $e->getJsonBody();
	  $err  = $body['error'];
	  $status = false;
	}

	header("HTTP/1.1 301 Moved Permanently"); 
	header("Location: checkout.html?status=".urlencode($status)."id=".urlencode($charge->id)."&amount=".urlencode($amount).($err?"err=".http_build_query($err.toString):"")); 

	$to = "lindsaymacvean@gmail.com";
	if(!$err) {
		$subject = "Order:".$charge->id;
		$body = "Name: ".$shipping_name."\n";
		$body += "Line 1: ".$shipping_address_line1."\n";
		$body += "City: ".$shipping_address_city."\n";
		$body += "Post Code: ".$shipping_address_zip."\n";
		$body += "Country: ".$shipping_address_country."\n";
		$body += "Quantity: ".$quantity."\n";
		$body += "Order Total: ".$amount."\n";
		$headers = "From: .".$email."\r\n". "X-Mailer: php";
	} else {
		$subject = "Order: Fail";
		$body = "Details: ".print_r($err)."\n";
	}

	mail($to, $subject, $body, $headers);

	exit();
?>