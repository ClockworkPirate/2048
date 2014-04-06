game = null;
var kbd;
var lastMoveId = 0;

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  // game = new GameManager(4, HTMLActuator);
  kbd = new KeyboardInputManager;
  kbd.on("move", processKey.bind(kbd));
  

  Meteor.setInterval(checkUpdates, 100);
});

processKey = function(direction) {
  makeMove("Name", direction);
}

Template.list.moves = function() {
  return Moves.find({}, {sort: {id: -1}});
}

makeMove = function(name, direction) {
  console.log("makeMove");
  Meteor.call('register_move', name, direction);
  //Moves.insert({name: name, direction: direction, id: 0});
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
  }
}