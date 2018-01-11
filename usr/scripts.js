// Count Down Timer

$(document).ready(function() {
	var labels = ['Days', 'Hours', 'Minutes', 'Seconds'],
	  endDate = (new Date().getFullYear()) + '/01/18',
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
  key: 'pk_live_enPcg3R1bsEdqmtJeH5mFyWL',
  image: 'https://longbackclothing.com/sexylegs/img/logo/logo-128x128.png',
  locale: 'auto',
  token: function(token, args) {
    $("#stripeToken").val(JSON.stringify(token));
    $("#stripeArgs").val(JSON.stringify(args));
    // Quantity is a (non-json) int value passed from the form
    $("#checkout").submit();
  }
});

$('#purchaseButton').click(function(e) {
  // Open Checkout with further options:
  handler.open({
    name: 'Floral Tights',
    description: $("#quantity").val() + ' tights',
    //currency: 'gbp',
    currency: 'eur',
    amount: 699 * $("#quantity").val(),
    //Buy button on second screen
    panelLabel: 'Pay',
    allowRememberMe: false,
    billingAddress: true,
    shippingAddress: true
  });
  e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  handler.close();
});