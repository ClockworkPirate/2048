var game;


Meteor.startup(function () {
  game = new GameManager(4, ServerActuator);
  Moves.insert({id: 0});
});



var commandList = [];
var votes = 0;
var waiting = false;

Meteor.methods({
  
  register_move: function(name, direction) {
    commandList.push([name, direction]);
    //Moves.insert({name: name, direction: direction, id: counter});
  }
  
  register_vote: function(name, direction) {
    if (votes < 175 && votes > -175)
      votes += direction;
  }
});

Meteor.setInterval(function () {
  
  if(commandList.length > 0) {
    var m = commandList.shift();
    var newTile = game.move(m[1]);
    var lastId = Moves.findOne({}, {sort: {id: -1}}).id;
    Moves.insert({
      id: lastId + 1,
      name: m[0],
      direction: m[1],
      grid: game.grid,
      newTile: newTile,
      votes: votes
    });
    Moves.remove({
      id: {$lt: lastId - 10}
    });
    
  }
  if(!game.movesAvailable() && !waiting) {
    waiting = true;
    setTimeout(function(){
      commandList = [];
      game.restart();
      Moves.remove({});
      Moves.insert({
        id: 0,
        name: "Server",
        direction: -1,
        grid: game.grid,
        newTile: null
      });
      waiting = false;
    },3000);
  }

}, 500);