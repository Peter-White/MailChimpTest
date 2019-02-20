$(document).ready(function(){
	$(".mailchimp").submit(function(e) {
		e.preventDefault();

		var $email = $("[name='email']");
		var $fname = $("[name='fname']");
		var $lname = $("[name='lname']");

		var data ={
			"email" : $email.val(),
			"fname" : $fname.val(),
			"lname" : $lname.val()
		};

		$.ajax({
			type: 'POST',
			data: data,
			url: 'subscribe',
			dataType : 'json',
			success: function(data) {
				console.log("succ");
				console.log(JSON.stringify(data));
			}
		});
	});
});