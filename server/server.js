var game;
var commandList = [];
var votes = 0;
var readyForMove = true;

var moveInterval = 300;
var newgameInterval = 3000;
var processInterval = 20;


Meteor.startup(function () {
  game = new GameManager(4, ServerActuator);
  Updates.insert({id: 0, wins: 0, losses: 0});
  if(Scores.findOne({}) == null) {
    Scores.insert({wins: 0, losses: 0});
  }
});




Meteor.methods({
  
  register_move: function(name, direction) {
    commandList.push({name: name, direction: direction});
  },
  
  register_vote: function(name, direction) {
    if((votes < 35 && direction > 0) || (votes > -35 && direction < 0)) {
      votes += direction;
    }
  }
});

Meteor.setInterval(function () {
  
  if(commandList.length > 0) {
    var m = commandList.shift();
    var newTile = null;
    if(readyForMove) {
      newTile = game.move(m.direction);
    }
    
    
    pushUpdate({
      name: m.name,
      direction: m.direction,
      validMove: readyForMove,
      grid: game.grid,
      newTile: newTile,
      votes: votes
    });
    

    if(readyForMove) {
      readyForMove = false;
      if(game.isGameTerminated()) {
        if(game.over) {
          Scores.update({}, {$inc: {losses: 1}});
        }
        else if(game.won) {
          Scores.update({}, {$inc: {wins: 1}});
        }
        setTimeout(function(){
          commandList = [];
          game.restart();
          pushUpdate({
            name: "NEW GAME",
            direction: -1,
            validMove: true,
            grid: game.grid,
            newTile: null,
            votes: votes
          });
          readyForMove = true;
        }, newgameInterval);
      }
      else {
        setTimeout(function() {
          readyForMove = true;
        }, moveInterval);
      }
    }
    
  }

}, processInterval);

pushUpdate = function(obj, lostOrWon) {
  var u = Updates.findOne({}, {sort: {id: -1}});
  obj.id = u.id + 1;
  Updates.insert(obj);
  Updates.remove({
    id: {$lt: u.id - 10}
  });
}