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
	var url = "/Counter/add/" + $("#counter").val();
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
	var url = "/Counter/sub/" + $("#counter").val();
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
// clear button
$("#clear" ).click(function() {
	var url = "/Counter/clear";
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
