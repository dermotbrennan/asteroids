(function()
{
  Bullet = function() {
    return this;
  };
  extend(Bullet, MovingObj, {
    init: function(x, y, heading) {
      this.x = x;
      this.y = y;
      this.prevx = this.x;
      this.prevy = this.y;
      this.velocity = this.new_velocity = 4.0;
      this.inc_velocity = 0.0;
      this.max_velocity = 4.0;
      this.lifespan = 60;
      this.obj_radius = 2;
      this.init_heading = this.rotation = this.heading = heading;
    },
    
    render: function() {
      ctx.save();
      //console.log(this.x, this.y, this.obj_radius);
      ctx.fillStyle = "rgb(255,255,255)";  
      ctx.beginPath();  
      ctx.arc(this.x, this.y, this.obj_radius, 0, TWOPI, true);
      ctx.fill();
      //ctx.beginPath(); ctx.fillStyle = "rgb(255,0,0)";  ctx.arc(300,200,60,0,TWOPI, true);  ctx.fill();
      ctx.restore();
    }
  });
})();