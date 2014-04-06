$(document).ready(function ()
{
	$("img.cal").click(function ()
	{
		Meteor.call('register_vote', $(".name-field").val(), -1);
	});

	$("img.stanf").click(function ()
	{
		Meteor.call('register_vote', $(".name-field").val(), 1);
	});
});

switch_to_cal = function () {
	$("img.stanf").fadeTo("slow", 0.5);
	$("img.cal").fadeTo("slow", 1.0);
	$("div.stanf").removeClass("stanf").addClass("cal");
}

switch_to_stanf = function () {
	$("img.cal").fadeTo("slow", 0.5);
	$("img.stanf").fadeTo("slow", 1.0);
	$("div.cal").removeClass("cal").addClass("stanf");
}