game = null;
var kbd;
var lastMoveId = 0;
var cooldown = false;
myName = null;

var cooldownTime = 500;
var updateInterval = 10;



processKey = function(name, direction) {
  makeMove(name, direction);
}

makeMove = function(name, direction) {
  if(!cooldown) {
    Meteor.call('register_move', name, direction);
    //Moves.insert({name: name, direction: direction, id: 0});
    cooldown = true;
    setTimeout(function(){
      cooldown = false;
    }, cooldownTime);
  }
}


checkUpdates = function () {
  var u = Updates.findOne({}, {sort: {id: -1}});
  if(u != null && u.id != lastMoveId) {
    if(game == null) {
      game = new GameManager(4, HTMLActuator);
    }
    if(u.grid != null) {
      if(lastMoveId + 1 == u.id) {
        if(u.validMove && u.direction >= 0) {
          game.moveAndAdd(u.direction, u.newTile);
        }
        if(!game.equals(u.grid)) {
          //game.setTo(u.grid);
          document.location.reload(true);
        }
      }
      else {
        game.setTo(u.grid);
      }
    }
    lastMoveId = u.id;
    
    var votes = u.votes;
    set_votes(votes);
    if (votes > 20) {
      switch_to_stanf();
    }
    else if (votes < -20) {
      switch_to_cal();
    }
    
    $(".wins-container").html(u.wins);
    $(".losses-container").html(u.losses);
    console.log("Wins: " + u.wins);
  }
}
// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  Meteor.setInterval(checkUpdates, updateInterval);
});


Template.scores.scores = function() {
  console.log(Scores.find({}));
  return Scores.find({});
}

Template.commands.commands = function() {
  return Updates.find({}, {sort: {id: -1}});
}



set_votes = function (votes) {
  votes *= 5;
	$bar = $(".vote-bar");
	if (votes > 0)
	{
		$bar.removeClass("left");
		$bar.addClass("right");
	  $bar.width(votes);
	  $bar.css("left", 250);
	}
	else if (votes < 0)
	{
		$bar.removeClass("right");
		$bar.addClass("left");
	  $bar.width(-votes);
    $bar.css("left", 250 + votes);
	}
	else
	{
		$bar.removeClass("left");
		$bar.removeClass("right");
	}

	$(".vote-container:after").css("content: " + votes + ";");
}