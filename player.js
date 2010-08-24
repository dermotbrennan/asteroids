(function()
{
  Player = function() {
    return this;
  };
  extend(Player, MovingObj, {
    init: function() {
      this.resetPosition();
      this.velocity = this.new_velocity = 0.0;
      this.inc_velocity = 1.0;
      this.max_velocity = 7.0;
      this.obj_radius = 10;
      this.score = 0;
      this.bullets = [];
    },
    
    resetPosition: function() {
      this.x = CENTER_X;
      this.y = CENTER_Y;
      this.prevx = this.x;
      this.prevy = this.y;
      this.velocity = this.new_velocity = 0.0;
      this.init_heading = this.rotation = this.heading = 0.0;
    },
    
    scoreInc: function() {
      this.score += 150;
    },
    
    render: function() {
      //console.log("render!");
      ctx.save();
      
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.beginPath();
      ctx.fillStyle = "rgb(0,0,0)";  
      ctx.arc(this.x, this.y, this.obj_radius, 0, TWOPI, true);
      ctx.closePath();
      ctx.fill();      
      
      ctx.beginPath();
      ctx.fillStyle = "rgb(255,255,255)";      
      ctx.moveTo(10, 0);      
      ctx.lineTo(-7, -6);      
      ctx.lineTo(-3, 0);      
      ctx.lineTo(-7, 6);      
      ctx.fill();
      
      ctx.restore();
    },
    
    onKeyHandler: function(keyCode) {
      player_moved = false;
      switch (keyCode)
      {
        case KEY.LEFT:
        {
          this.rotation -= 15*RAD;
          player_moved = true;
          break;
        }
        case KEY.RIGHT:
        {
          this.rotation += 15*RAD;
          player_moved = true;
          break;
        }
        case KEY.UP:
        {	
          this.new_velocity = this.inc_velocity;
          if (this.new_velocity > this.max_velocity) {
            this.new_velocity = this.max_velocity;
          }
          player_moved = true;
          break;
        }
        case KEY.SPACE:
        {	
          b = new Bullet()
          b.init(this.x, this.y, this.rotation);
          this.bullets.push(b);
          player_moved = true;
          break;
        }
      }
      return player_moved;
    }
  });
})();