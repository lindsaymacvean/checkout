// Count Down Timer

$(document).ready(function() {
	var labels = ['Days', 'Hours', 'Minutes', 'Seconds'],
	  endDate = (new Date().getFullYear()) + '/01/07',
	  template = _.template($('#main-example-template').html()),
	  currDate = '00:00:00:00',
	  nextDate = '00:00:00:00',
	  parser = /([0-9]{2})/gi,
	  $example = $('#main-example');
	// Parse countdown string to an object
	function strfobj(str) {
	  var parsed = str.match(parser),
	    obj = {};
	  labels.forEach(function(label, i) {
	    obj[label] = parsed[i]
	  });
	  return obj;
	}
	// Return the time components that diffs
	function diff(obj1, obj2) {
	  var diff = [];
	  labels.forEach(function(key) {
	    if (obj1[key] !== obj2[key]) {
	      diff.push(key);
	    }
	  });
	  return diff;
	}
	// Build the layout
	var initData = strfobj(currDate);
	labels.forEach(function(label, i) {
	  $example.append(template({
	    curr: initData[label],
	    next: initData[label],
	    label: label
	  }));
	});
	// Starts the countdown
	$example.countdown(endDate, function(event) {
	  var newDate = event.strftime('%d:%H:%M:%S'),
	    data;
	  if (newDate !== nextDate) {
	    currDate = nextDate;
	    nextDate = newDate;
	    // Setup the data
	    data = {
	      'curr': strfobj(currDate),
	      'next': strfobj(nextDate)
	    };
	    // Apply the new values to each node that changed
	    diff(data.curr, data.next).forEach(function(label) {
	      var selector = '.%s'.replace(/%s/, label),
	          $node = $example.find(selector);
	      // Update the node
	      $node.removeClass('flip');
	      $node.find('.curr').text(data.curr[label]);
	      $node.find('.next').text(data.next[label]);
	      // Wait for a repaint to then flip
	      _.delay(function($node) {
	        $node.addClass('flip');
	      }, 50, $node);
	    });
	  }
	});
});

// Checkout
var handler = StripeCheckout.configure({
  key: 'pk_test_yKxRubb8GeiTIElfdIItxUak',
  image: 'https://longbackclothing.com/sexylegs/img/logo-128x128.png',
  locale: 'auto',
  token: function(token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    console.log(token);
  }
});

document.getElementById('purchaseButton').addEventListener('click', function(e) {
  // Open Checkout with further options:
  handler.open({
    name: 'Bennett Innovations',
    description: '2 widgets',
    currency: 'gbp',
    amount: 2000,
    shippingAddress: true
  });
  e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  handler.close();
});