
var circs = [];

function setup() {
  createCanvas(1000, 600);
  background('lightGrey');
  var circ1 = new Circle(300, 300, 120, 2);
  var center2 = circ1.findPointer();
  var circ2 = new Circle(center2.x, center2.y, 80, 3);
  circs.push(circ1, circ2);
}

function draw() {
  background('lightGray');
  // Going from largest to smallest, inner to outer:
  for (var i=0; i < circs.length; i++) {
    var c = circs[i];
    c.pointer = c.findPointer();
    if (i > 0) {
      c.x = next_center.x;
      c.y = next_center.y;
    }
    next_center = c.pointer;
    c.draw();
    c.angle += 0.02 * c.v;
  }

}

// Takes center, radius and velocity:
function Circle(x, y, r, v) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.v = v;
  this.angle = 0;
  this.pointer = {};

  this.findPointer = function() {
    return {
      x: cos(this.angle) * this.r,
      y: sin(this.angle) * this.r
    };
  };

  this.draw = function() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke('black');
    ellipse(0, 0, this.r * 2);
    // stroke();

    stroke('tomato');
    line(0, 0, this.pointer.x, this.pointer.y);

    fill('steelblue');
    noStroke();
    ellipse(this.pointer.x, this.pointer.y, 5);
  };




}
