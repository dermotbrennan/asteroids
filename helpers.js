
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


/**
 * Utility to set up the prototype, constructor and superclass properties to
 * support an inheritance strategy that can chain constructors and methods.
 * Static members will not be inherited.
 * 
 * @method extend
 * @static
 * @param {Function} subc   the object to modify
 * @param {Function} superc the object to inherit
 * @param {Object} overrides  additional properties/methods to add to the
 *                            subclass prototype.  These will override the
 *                            matching items obtained from the superclass.
 */
function extend(subc, superc, overrides)
{
   var F = function() {}, i;
   F.prototype = superc.prototype;
   subc.prototype = new F();
   subc.prototype.constructor = subc;
   subc.superclass = superc.prototype;
   if (superc.prototype.constructor == Object.prototype.constructor)
   {
      superc.prototype.constructor = superc;
   }
   
   if (overrides)
   {
      for (i in overrides)
      {
         if (overrides.hasOwnProperty(i))
         {
            subc.prototype[i] = overrides[i];
         }
      }
   }
}

function drawTriangle(x, y, sideLength) {
  ctx.fillStyle = "rgb(255,0,0)";
  ctx.beginPath();  
  halfLength = sideLength << 1
  ctx.moveTo(x - halfLength, y + halfLength); 
  ctx.lineTo(x, y - sideLength);  
  ctx.lineTo(x + halfLength, y + halfLength);  
  ctx.closePath();  
  ctx.fill(); 
}

function isNull(obj) {
  return (typeof(obj) == 'undefined');
}