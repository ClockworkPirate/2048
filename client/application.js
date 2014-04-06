game = null;
var kbd;
var lastMoveId = 0;
var cooldown = false;
var votes;


processKey = function(direction) {
  makeMove("Name", direction);
}

makeMove = function(name, direction) {
  if(!cooldown) {
    Meteor.call('register_move', name, direction);
    //Moves.insert({name: name, direction: direction, id: 0});
    cooldown = true;
    setTimeout(function(){
      cooldown = false
    }, 2000);
  }
}


checkUpdates = function () {
  var m = Moves.findOne({}, {sort: {id: -1}});
  if(m != null && m.id != lastMoveId) {
    if(game == null) {
      game = new GameManager(4, HTMLActuator);
    }
    if(m.grid != null) {
      if(lastMoveId + 1 == m.id) {
        game.moveAndAdd(m.direction, m.newTile);
        if(!game.equals(m.grid)) {
          //game.setTo(m.grid);
          document.location.reload(true);
        }
      }
      else {
        game.setTo(m.grid);
      }
    }
    lastMoveId = m.id;
    votes = m.votes;
    if (votes > 100) {
      switch_to_cal();
    }
    else if (votes < 100) {
      switch_to_stanf();
    }
  }
}
// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  // game = new GameManager(4, HTMLActuator);
  kbd = new KeyboardInputManager;
  kbd.on("move", processKey.bind(kbd));
  

  Meteor.setInterval(checkUpdates, 100);
});