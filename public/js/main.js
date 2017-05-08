var cmdnum = 0; //command counter
var counter = 0;

function logger(msg) {
	if ( cmdnum == 0 || cmdnum > 10 ) {
		cmdnum = 0;
	// clear status cotent
		$("#status").text("");
	}
	cmdnum++;
	$("#status").append(cmdnum + ", " + msg + "<br/>");

}
function updatelabel() {
	var url = "/Counter/show";
	logger("request url " + url);
	$.getJSON(url, function(data) {
		counter = data.counter;
		$("#showlabel").text(data.counter);
		logger(JSON.stringify(data));
	});
	$("#showlabel").text(counter);
}
//auto load counter
$().ready(function() {
	updatelabel();
});
//show button events
$("#show" ).click(function() {
	updatelabel();
	$("#counter").val("");
});
// add button
$("#add" ).click(function() {
	var addNumber = parseInt($("#counter").val());
	if (!Boolean(addNumber)) {
		bootbox.alert("'" + $("#counter").val() + "' is not a valid number");
		return false;
	}
	bootbox.alert("counter increases " + addNumber);
	var url = "/Counter/add/" + addNumber;
	logger("request url " + url);
	$.ajax({
		url: url,
		type: 'PUT',
	}).done(function(data) {
		updatelabel();
		logger("added");
	}
	);
	//reset input field
	$("#counter").val("");
});
// sub button
$("#sub" ).click(function() {
	var subNumber = parseInt($("#counter").val());
	if (!Boolean(subNumber)) {
		bootbox.alert("'" + $("#counter").val() + "' is not a valid number");
		return false;
	}
	bootbox.alert("counter reduces " + subNumber);
	var url = "/Counter/sub/" + subNumber;
	logger("request url " + url);
	$.ajax({
		url: url,
		type: 'PUT',
	}).done(function(data) {
		updatelabel();
		logger("substracted");
	}
	);
	//reset input field
	$("#counter").val("");
});
// clear button
$("#clear" ).click(function() {
	confirms('Are you sure to clear counters?',clearCounter);
});
//clear counter function
function clearCounter(result) {
	if (result == true) {
		var url = "/Counter/clear";
		logger("request url " + url);
		$.ajax({
			url: url,
			type: 'PUT',
		}).done(function(data) {
			updatelabel();
			logger("cleared");
		}
		);
		//reset input field
		$("#counter").val("");
	}
}
//show confirm dialog
function confirms(msg,action) {
	bootbox.confirm({ 
		  size: "small",
		  message: msg,
		  callback: action
	});
}
