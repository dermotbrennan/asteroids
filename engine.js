
// some constants
var KEY = { SHIFT:16, CTRL:17, ESC:27, RIGHT:39, UP:38, LEFT:37, DOWN:40, SPACE:32,
            A:65, E:69, L:76, P:80, R:82, Z:90 };
var RAD = Math.PI/180.0;
var TWOPI = Math.PI*2;

var canvas;
var ctx;
var CENTER_X;
var CENTER_Y; 
var WIDTH = 600;
var HEIGHT = 600;
var MAX_STARS = 15;
var stars = [];
var game;

function resetBox() { 
  // reset the box
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function updateStarfield() {
  while (stars.length < MAX_STARS) {
    s = new Star();
    s.init();
    stars.push(s);
  }
    
  // update locations of stars
  var i =0;
  while(i < stars.length) {
    var s = stars[i];
    //console.log(s);
    if (s.prevx > WIDTH || s.prevx < 0 || s.prevy > HEIGHT || s.prevy < 0) {
      s.init();
    } else {
      s.update();
    }
    s.render();
    i++;
  }
}

$(document).ready(function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  
  CENTER_X = canvas.width>> 1;
  CENTER_Y = canvas.height>> 1;
  
  game = new Game();
    
  $(document).keydown(function(e) {
    //console.log("test" + e.which);
    switch (e.which)
    {
      case KEY.P:
      {	
        game.paused = !game.paused;
        if (game.paused) game.writePausedText();
        break;
      }
      default: 
      {
        game.onKeyHandler(e.which);
      }
    }
    //$('canvas').after("<p>"+player.heading+"</p>");
  });
  
  g_interval = setInterval("game.tick();", 10);
});
