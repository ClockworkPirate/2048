Template.app.events({
  "click img.cal": function() {
    Meteor.call('register_vote', $(".name-field").val(), -1);
  },
  
  "click img.stanf": function() {
    Meteor.call('register_vote', $(".name-field").val(), 1);
  }
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

set_votes = function (votes) {
	$bar = $(".vote-bar");
	if (votes > 0)
	{
		$bar.removeClass("left");
		$bar.addClass("right");
	}
	else if (votes < 0)
	{
		$bar.removeClass("right");
		$bar.addClass("left");
	}
	else
	{
		$bar.removeClass("left");
		$bar.removeClass("right");
	}
	$bar.css("width: " + votes + ";");
	$bar.css("left:" + min(200 + votes, 200) + ";");

	$(".vote-container:after").css("content: " + votes + ";");
}