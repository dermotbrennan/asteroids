(function()
{
  Star = function(x,y) {
    this.x = x;
    this.y = y;
    return this;
  };
  Star.prototype = {
    START_VELOCITY: 0.1,
    END_VELOCITY: 1,
    MAX_Z: 8,
    MIN_SIZE: 0.5,
    MAX_SIZE: 1,
    init: function() {
      this.x = (Math.random() * WIDTH)%(WIDTH * 0.5) + (WIDTH * 0.25);
      this.y = (Math.random() * HEIGHT)%(HEIGHT * 0.5) + (HEIGHT* 0.25);
      this.prevx = this.x;
      this.prevy = this.y;
  
      a = new Vector(this.x, this.y);
      b = new Vector(CENTER_X, CENTER_Y);
      distance = a.distance(b);
  
      xdist = this.x - CENTER_X;
      ydist = this.y - CENTER_Y;
      this.x_distance_ratio = xdist / distance;
      this.y_distance_ratio = ydist / distance;
      this.velocity = this.START_VELOCITY;
      this.size = this.MIN_SIZE;
    },
    update: function() {
      //console.log("update!");
      this.prevx = this.x;
      this.prevy = this.y;
      if (this.velocity < this.END_VELOCITY) {
        this.velocity += 0.04;
      }
      if (this.size < this.MAX_SIZE) {
        this.size += 0.02;
      }
      this.x += this.velocity * this.x_distance_ratio;
      this.y += this.velocity * this.y_distance_ratio;
    },
    render: function() {
      //console.log("render!");
      ctx.save();
      ctx.beginPath();  
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.arc(this.x, this.y, this.size, 0, TWOPI, true);
      ctx.fill();
      ctx.restore();
    }
  };
})();