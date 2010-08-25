(function()
{
  Asteroid = function() {
    return this;
  };
  extend(Asteroid, MovingObj, {
    init: function(min_asteroid_velocity) {
      this.x = ((WIDTH * 0.75) + (Math.random() * (WIDTH * 0.5)))%WIDTH;	 
      this.y = ((HEIGHT * 0.75) + (Math.random() * (HEIGHT * 0.5)))%HEIGHT;
      this.prevx = this.x;
      this.prevy = this.y;
      this.init_heading = this.rotation = this.heading = (Math.random()*TWOPI);
      this.velocity = this.new_velocity = Math.random()*0.5 + min_asteroid_velocity;
      this.inc_velocity = 0.0;
      this.max_velocity = 4.0;
      this.obj_radius = 20 + Math.random()*20;
    },
    
    render: function() {
      ctx.save();
      //console.log(this.x, this.y, this.obj_radius);
      ctx.strokeStyle = "rgb(255,255,255)";  
      ctx.fillStyle = "rgb(0,0,0)"; 
      ctx.beginPath();  
      ctx.arc(this.x, this.y, this.obj_radius, 0, TWOPI, true);
      ctx.closePath();  
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  });
})();