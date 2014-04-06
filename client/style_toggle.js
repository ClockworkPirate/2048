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
  votes *= 5;
	$bar = $(".vote-bar");
	if (votes > 0)
	{
		$bar.removeClass("left");
		$bar.addClass("right");
	  $bar.width(votes);
	  $bar.css("left", 200);
	}
	else if (votes < 0)
	{
		$bar.removeClass("right");
		$bar.addClass("left");
	  $bar.width(-votes);
    $bar.css("left", 200 + votes);
	}
	else
	{
		$bar.removeClass("left");
		$bar.removeClass("right");
	}

	$(".vote-container:after").css("content: " + votes + ";");
}