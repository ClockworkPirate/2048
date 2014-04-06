
var okayMessage = "Use your <strong>arrow keys</strong> to move the tiles.";
var waitMessage = "Please wait...";



switchToPlayMode = function() {
  $(".welcome .name").html(myName);
  $(".welcome .message").html(okayMessage);
  $(".prompt-box").removeClass("edit");
  kbd = new KeyboardInputManager;
  kbd.on("move", processKey.bind(kbd, myName));
}


Template.app.rendered = function() {
  if(typeof(Storage) != "undefined") {
    myName = localStorage.getItem("name");
    if(myName == null || myName.length == 0) {
      myName = null;
    }
    else {
      switchToPlayMode();
    }
  }

  // Fix placement of Stanford logo button in IE
  if ($(".ie-test").length)
  {
    $(".stanf.logo.vote-button").addClass("iefix");
    $("h1.title").addClass("iefix");
  }
}



Template.app.events({
  "click .vote-button.cal": function() {
    Meteor.call('register_vote', $(".name-field").val(), -1);
  },
  
  "click .vote-button.stanf": function() {
    Meteor.call('register_vote', $(".name-field").val(), 1);
  },

  "click .welcome .name": function() {
    if(typeof(Storage) != "undefined") {
      localStorage.removeItem("name");
      document.location.reload(true);
    }
  },

  "keydown .name-field": function(event){
    if(event.keyCode == 13) {
      myName = $(".name-field").val();
      if(myName.length == 0) {
        myName = null;
      }
      else {
        if(typeof(Storage) != "undefined") {
          localStorage.setItem("name", myName);
        }
        switchToPlayMode();
      }
    }
  }
});





switch_to_cal = function () {
	$("img.stanf").fadeTo("slow", 0.5);
	$("img.cal").fadeTo("slow", 1.0);
	$(".wrapper.stanf").removeClass("stanf").addClass("cal");
}

switch_to_stanf = function () {
	$("img.cal").fadeTo("slow", 0.5);
	$("img.stanf").fadeTo("slow", 1.0);
	$(".wrapper.cal").removeClass("cal").addClass("stanf");
}