(function() {
  Vector = function(x,y) {
    this.x = x;
    this.y = y;
    
    return this;
  }
  
  Vector.prototype = {
    x: 0,
    y: 0,
    clone: function()
    {
       return new Vector(this.x, this.y);
    },
    
    set: function(v)
    {
       this.x = v.x;
       this.y = v.y;
       return this;
    },
    
    add: function(v)
    {
       this.x += v.x;
       this.y += v.y;
       return this;
    },
    
    sub: function(v)
    {
       this.x -= v.x;
       this.y -= v.y;
       return this;
    },
    
    dot: function(v)
    {
       return this.x * v.x + this.y * v.y;
    },
    
    length: function()
    {
       return Math.sqrt(this.x * this.x + this.y * this.y); 
    },
    
    distance: function(v)
    {
       var xx = this.x - v.x;
       var yy = this.y - v.y;
       return Math.sqrt(xx * xx + yy * yy); 
    },
    
    theta: function()
    {
       return Math.atan2(this.y, this.x);
    },
    
    thetaTo: function(vec)
    {
       // calc angle between the two vectors
       var v = this.clone().norm();
       var w = vec.clone().norm();
       return Math.acos(v.dot(w));
    },
    
    thetaTo2: function(vec)
    {
       return Math.atan2(vec.y, vec.x) - Math.atan2(this.y, this.x);
    },
    
    norm: function()
    {
       var len = this.length();
       this.x /= len;
       this.y /= len;
       return this;
    },
    
    rotate: function(a)
    {
      var ca = Math.cos(a);
      var sa = Math.sin(a);
      with (this)
      {
        var rx = x*ca - y*sa;
        var ry = x*sa + y*ca;
        x = rx;
        y = ry;
      }
      return this;
    },
    
    invert: function()
    {
       this.x = -this.x;
       this.y = -this.y;
       return this;
    },
    
    scale: function(s)
    {
       this.x *= s; 
       this.y *= s;
       return this;
    }
  }
})();