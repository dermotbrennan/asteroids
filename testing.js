// testing
testing = false;
if (testing) {
  p = new Player();
  p.init();
  
  var data = [
    {expected: [0,1], x: 0, y: 0, heading: Math.PI/2, velocity: 1},
    {expected: [-1,0], x: 0, y: 0, heading: Math.PI, velocity: 1},
    {expected: [1,1], x: 0, y: 0, heading: Math.PI/4, velocity: 1},
    {expected: [4,3], x: 0, y: 0, heading: Math.PI/6, velocity: 5},
    {expected: [3,4], x: 0, y: 0, heading: Math.PI/3, velocity: 5},
    {expected: [-4,4], x: 0, y: 0, heading: 3*Math.PI/4, velocity: 5},
    {expected: [-4,4], x: 0, y: 0, heading: 3*Math.PI/4, velocity: 5},
    {expected: [-5,-2], x: 0, y: 0, heading: (9*Math.PI)/8, velocity: 5},
    {expected: [5,1], x: 0, y: 0, heading: 0.2617993877991494, velocity: 5}
  ];
  jQuery(data).each(function(i, row) {
    new_x_y = p.calc_vector_output(row.x, row.y, row.heading, row.velocity);
    console.log("new x y: " + new_x_y + "; expected: " + row.expected);
  });
  
  var data = [
    {expected: 5*Math.PI/8, velocity: 10, new_velocity: 10, heading: 0, rotation: 5*Math.PI/4},
    {expected: Math.PI/2, velocity: 10, new_velocity: 10, heading: 0, rotation: Math.PI},
    {expected: 1.0471975511965976, velocity: 20, new_velocity: 10, heading: 0, rotation: Math.PI}
  ]
  
  jQuery(data).each(function(i, row) {
    new_heading = p.calc_new_heading(row.velocity, row.heading, row.new_velocity, row.rotation);
    console.log("new heading: " + new_heading + "; expected: " + row.expected);
  });
  
  var data = [
    {expected: 0, force_a: 10, force_b: 10, angle: Math.PI},
    {expected: 14.142135623730951, force_a: 10, force_b: 10, angle: Math.PI/2},
    {expected: 20, force_a: 10, force_b: 10, angle: 0}
  ]
  
  jQuery(data).each(function(i, row) {
    new_force = p.sum_forces(row.force_a, row.force_b, row.angle);
    console.log("new force: " + new_force + "; expected: " + row.expected);
  });
  
  var data = [{expected: 2.617993877991494, angle1: -1.832595714594046, angle2: 0.7853981633974478}];
  jQuery(data).each(function(i, row) {
    angle = p.calc_angle(row.angle1, row.angle2);
    console.log("new angle: " + angle + "; expected: " + row.expected);
  });
}