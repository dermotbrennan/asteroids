Level = function(num_asteroids, min_asteroid_velocity) {
  this.num_asteroids = num_asteroids;
  this.min_asteroid_velocity = min_asteroid_velocity;
  this.level_intro_duration = 3000; // milliseconds
  
  return this;
};

Level.prototype = {
  init: function(num) {
    this.num = num;
    if (num == 0) this.level_intro_duration = 1;
    this.level_init_at = Date.now();
  },
  inIntro: function() {
    return (Date.now() < (this.level_init_at + this.level_intro_duration));
  },
  secsUntilStart: function() {
    return (Math.ceil(((this.level_init_at + this.level_intro_duration) - Date.now())/1000));
  },
  renderIntro: function() {
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Starting level " + (this.num+1) + " in... " + this.secsUntilStart(), CENTER_X, CENTER_Y-20);
  }
};