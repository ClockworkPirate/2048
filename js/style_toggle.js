$(document).ready(function ()
{
	$("img.cal").click(function ()
	{
		switch_to_cal();
	});

	$("img.stanf").click(function ()
	{
		switch_to_stanf();
	});
});

switch_to_cal = function () {
	$("img.stanf").fadeTo("slow", 0.5);
	$("img.cal").fadeTo("slow", 1.0);
	$("body.stanf").removeClass("stanf").addClass("cal");
}

switch_to_stanf = function () {
	$("img.cal").fadeTo("slow", 0.5);
	$("img.stanf").fadeTo("slow", 1.0);
	$("body.cal").removeClass("cal").addClass("stanf");
}