(function()
{
  MovingObj = function() {
    return this;
  };
  MovingObj.prototype = {
    calc_vector_output: function(x, y, heading, vel) {
      
      x_dist = Math.cos(heading) * vel;
      x += x_dist
    
      y_dist = Math.sin(heading) * vel;
      y += y_dist;
      
      return [x, y];
    },
    sum_forces: function(force_a, force_b, angle) {
      //console.log(force_a + " " + force_b + " " + angle);
      return Math.sqrt(Math.pow(force_a,2)+Math.pow(force_b,2) + (2*force_a*force_b*Math.cos(angle)));
    },
    calc_new_heading: function(velocity, heading, new_velocity, rotation) {
      return ((velocity*heading+new_velocity*rotation)/(velocity+new_velocity) % TWOPI);
    },
    calc_angle: function(angle1, angle2) {
      angle1 = angle1 % TWOPI;
      angle2 = angle2 % TWOPI;
      angle = Math.sqrt(Math.pow(angle1 - angle2, 2));
      return angle = angle % TWOPI;
    },
    update: function() {
      momentum = this.calc_vector_output(this.x, this.y, this.heading, this.velocity);
      mom_x = momentum[0];
      mom_y = momentum[1];
      //console.log( "" + this.velocity + " "+this.x+ " " + this.y + " " + mom_x + " " + mom_y);
      
      if (this.new_velocity > 0) { 
        force = this.calc_vector_output(this.x, this.y, this.rotation, this.new_velocity);
        force_x = force[0];
        force_y = force[1];
        //console.log(""+force_x + " " + force_y);
      
        this.x = Math.round(parseFloat(mom_x + force_x)/2);
        this.y = Math.round(parseFloat(mom_y + force_y)/2);
      } else {
        this.x = mom_x;
        this.y = mom_y;
      }
      
      if (this.new_velocity > 0) {
        old_heading = this.heading; 
        this.rotation = this.rotation % TWOPI;
        angle = this.calc_angle(this.heading, this.rotation);
        
        this.heading = this.calc_new_heading(this.velocity, this.heading, this.new_velocity, this.rotation);        
        this.heading = this.heading % TWOPI;
        //console.log("curr:" + this.velocity + " new:" + this.new_velocity + " inc:" + 
        //  this.inc_velocity + " old heading:" + old_heading + " rotation:" + this.rotation + 
        //  "new heading: " + this.heading + " angle diff:" + angle);
        
        this.velocity = this.sum_forces(this.velocity, this.new_velocity, angle);
        //console.log("sum of forces: " + this.velocity);
        
        // limit velocity
        if (this.velocity > this.max_velocity) {
          this.velocity = this.max_velocity;
        }
        
        //console.log(this.velocity + " " + this.inc_velocity);
        this.new_velocity = 0;
      }
      
      // check for position out of bounds
      max_x_reset_dimension = WIDTH + this.obj_radius;
      max_y_reset_dimension = HEIGHT + this.obj_radius;
      //console.log('x:'+this.x + 'y:'+this.y);
      this.x = (this.x + max_x_reset_dimension) % max_x_reset_dimension;
      this.y = (this.y + max_y_reset_dimension) % max_y_reset_dimension;
    }
  };
})();