(function()
{
  Asteroid = function() {
    return this;
  };
  extend(Asteroid, MovingObj, {
    init: function() {
      this.x = (Math.random() * (WIDTH * 0.75)) + (WIDTH * 0.25);
      this.y = (Math.random() * (HEIGHT * 0.75)) + (HEIGHT* 0.25);
      this.prevx = this.x;
      this.prevy = this.y;
      this.init_heading = this.rotation = this.heading = (Math.random()*TWOPI);
      this.velocity = this.new_velocity = 0.25;
      this.inc_velocity = 0.0;
      this.max_velocity = 4.0;
      this.obj_radius = 20 + Math.random()*20;
    },
    
    render: function() {
      ctx.save();
      //console.log(this.x, this.y, this.obj_radius);
      ctx.strokeStyle = "rgb(255,255,255)";  
      ctx.beginPath();  
      ctx.arc(this.x, this.y, this.obj_radius, 0, TWOPI, true);
      ctx.closePath();  
      ctx.stroke();
      ctx.restore();
    }
  });
})();