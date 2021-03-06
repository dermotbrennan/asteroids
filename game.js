Game = function() {
  this.levels = [
    (new Level(5, 0.25)), (new Level(7, 0.4)),
    (new Level(10, 0.5)), (new Level(12, 0.6))
  ];
  
  this.current_level_num = 0;
  this.delayBetweenRestarts = 1500
  
  this.player = new Player();
  this.player.init();
  this.paused = false;
  
  this.isGameStarted = false;
  this.isGameOver = false;
  this.isGameFinished = false;
  
  this.drawIntro();
  
  return this;
};

Game.prototype = {
  reset: function() {
    this.current_level_num = 0;
    this.player = new Player();
    this.player.init();
  },
  drawIntro: function() {
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("ASTEROIDS", CENTER_X, CENTER_Y-20);
    ctx.font = "bold 16px Arial";
    ctx.fillText("Press space to start", CENTER_X, CENTER_Y+20);
  },
  detectPlayerCollision: function() {
    collisionOccurred = false;
    i = 0;
    while (i < this.asteroids.length && !collisionOccurred) {
      collisionOccurred = detectCollision(this.player, this.asteroids[i]);
      i++;
    }
    return collisionOccurred;
  },
  writePausedText: function() {
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Paused", CENTER_X, CENTER_Y-20);
  },
  gameOver: function() {
    this.isGameOver = true;
    this.gameEndedAt = (new Date()).getTime();
    resetBox();
    this.writeGameOverText();
  },
  writeGameOverText: function() {
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", CENTER_X, CENTER_Y-20);
    this.printFinalScore();
  },
  gameFinished: function() {
    this.isGameFinished = true;
    this.gameEndedAt = (new Date()).getTime();
    resetBox();
    this.writeGameFinishedText();
  },
  writeGameFinishedText: function() {
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("You WIN!!!", CENTER_X, CENTER_Y-20);
    this.printFinalScore();
  },  
  isGameActive: function() {
    return (!this.isGameFinished && this.isGameStarted && !this.isGameOver);
  },
  renderHud: function() {
    ctx.fillStyle = "rgb(200,200,0)";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Level " + (this.current_level_num+1) + " :: Score " + this.player.score + 
      " :: Asteroids left " + this.asteroids.length, 
      CENTER_X, 20);
  },
  printRestartText: function() {
    ctx.font = "normal 19px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Press space to restart", CENTER_X, CENTER_Y+60);
  },
  printFinalScore: function() {
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Your Score: " + this.player.score, CENTER_X, CENTER_Y+20);
  },
  gameJustEnded: function() {
    return ((new Date()).getTime() < this.gameEndedAt+this.delayBetweenRestarts);
  },
  gameReadyToRestart: function() {
    return (this.gameEndedAt && this.gameEndedAt > 0 && !this.gameJustEnded());
  },
  startLevel: function(level_num) {
    this.current_level_num = level_num;
    this.current_level = this.levels[this.current_level_num];
    this.asteroids = [];
    
    for (var i = 0; i < this.current_level.num_asteroids; i++) {
      a = new Asteroid();
      a.init(this.current_level.min_asteroid_velocity);
      this.asteroids[i] = a;
    }
    this.current_level.init(this.current_level_num);
    
    this.player.resetPosition();
    this.player.bullets = [];
    
    this.paused = false;
    this.isGameStarted = true;
    this.isGameOver = false;
    this.isGameFinished = false;
  },
  tick: function() {
    if (this.paused) return false;
    if (!this.isGameActive()) {
      if (this.gameReadyToRestart()) this.printRestartText();
      return false;
    } else {   
      resetBox();
            
      if (this.current_level && this.current_level.inIntro()) {
        this.current_level.renderIntro();
        return false;
      }
      
      updateStarfield();

      // move and render the player
      this.player.update();
      this.player.render();
       
      // figure out what the bullets are doing
      game = this;
      jQuery(this.player.bullets).each(function(i, bullet) {
        if (typeof(bullet) != 'undefined') {
          if (bullet.lifespan == 0) {
            game.player.bullets.remove(i);
          } else {
            bullet.lifespan--;
            game.player.bullets[i] = bullet;
          }
          bullet.update();
          bullet.render();
        }
      });

      // update/render asteroids
      jQuery(this.asteroids).each(function(i, asteroid) {
        if (typeof(asteroid) != 'undefined') {
          asteroid.update();
          asteroid.render();
        }
      });
      
      
      // bullet - asteroid collisions
      b_i = 0;
      while (this.player.bullets.length > 0 && b_i < this.player.bullets.length && this.asteroids.length > 0) {
        bullet = this.player.bullets[b_i];
        collisionOccured = false;
        a_i = 0;
        while(a_i < this.asteroids.length && !collisionOccured) { 
          asteroid = this.asteroids[a_i];
          if (detectCollision(asteroid, bullet)) {
            collisionOccured = true;
            this.asteroids.remove(a_i);
            this.player.bullets.remove(b_i);
            this.player.scoreInc();
          }
          a_i++;
        }
        b_i++;
      }
      
      this.renderHud();      
      
      if (this.detectPlayerCollision()) {
        this.gameOver();
      }
      
      if (this.asteroids.length == 0) {
        if (this.current_level_num < this.levels.length) {
          this.startLevel(this.current_level_num+1);
        } else {
          this.gameFinished();
        }
      }
      
      return true;
    }
  }, 
  onKeyHandler: function(keyCode) {
    if (this.isGameActive() || this.gameJustEnded()) {
      //log("game is active");
      if (this.player.onKeyHandler(keyCode)) this.tick();
    } else {
      switch (keyCode)
      {
        case KEY.SPACE:
        {
          if (this.isGameFinished || this.isGameOver)  {
            this.reset();
          }
          this.startLevel(this.current_level_num);
          break;
        }
      }
    }
    
  }
}
  