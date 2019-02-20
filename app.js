const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
var https = require("https");
var request = require('request');
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/subscribe", (req, res) => {

	var mailChimpData = {
		"email_address": req.body.email,
		"status" : "subscribed",
		"merge_fields" : {
			"FNAME" : req.body.fname,
			"LNAME" : req.body.lname
		}
	};

	var options = {
	  url: 'https://us20.api.mailchimp.com/3.0/lists/117f4216fc/members',
   	  method: 'POST',
	  body: JSON.stringify(mailChimpData),
	  auth: {
        'user': 'anystring',
        'pass': 'cf080326c095ca71c364e8c07724668e-us20'
    	}
	};

	function callback(error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.send(true);
	    } else {
	    	res.send(false);
	    }
	}

	request(options, callback);

});
	

module.exports = require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

