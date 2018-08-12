
var circs = [];
var counter = 0;

function generateCircles(n, p) {
  var size = 80;

  for (var i=0; i < n; i++) {
    if (i === 0) {
      center = {x: 500, y: 200};
    } else {
      center = prev_center;
    }
    var circ = new Circle(center.x, center.y, size, Math.random() * 4, p);
    circs.push(circ);
    prev_center = center;
    size *= 0.6;
  }
}

new p5(topSketch, 'top');
new p5(btmSketch, 'btm');

function btmSketch(p) {
  p.setup = function() {
    p.createCanvas(1000, 400);
    p.background('lightblue');
    p.line(10, 200, 990, 200);
  };

  p.draw = function() {
    p.background('lightblue');
  };
}

function topSketch(p) {
  p.setup = function() {
    p.createCanvas(1000, 1000);
    p.background('lightGrey');
    generateCircles(4, p);
  };

  p.draw = function() {
    counter ++;
    p.background('lightGray');
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

  };
}


//
// function setup() {
//   createCanvas(1000, 1000);
//   background('lightGrey');
//   generateCircles(4);
// }
//
// function draw() {
//   counter ++;
//   background('lightGray');
//   // Going from largest to smallest, inner to outer:
//   for (var i=0; i < circs.length; i++) {
//     var c = circs[i];
//     c.pointer = c.findPointer();
//     if (i > 0) {
//       c.x = next_center.x;
//       c.y = next_center.y;
//     }
//     next_center = c.pointer;
//     c.draw();
//     c.angle += 0.02 * c.v;
//   }
//
//   // time axis:
//   stroke('black');
//   line(10, 800, 990, 800);
//
//   if (counter % 8 == 0) {
//     // console.log(circs[circs.length - 1].y);
//
//
//   }
//
//
// }

// Takes center, radius and velocity:
function Circle(x, y, r, v, p) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.v = v;
  this.angle = 0;
  this.pointer = {};

  this.findPointer = function() {
    return {
      x: p.cos(this.angle) * this.r,
      y: p.sin(this.angle) * this.r
    };
  };

  this.draw = function() {
    // push();
    // Yeah this is imperfect without pushing but....we'll just make a new canvas.
    p.translate(this.x, this.y);
    p.noFill();
    p.stroke('black');
    p.ellipse(0, 0, this.r * 2);
    // stroke();

    p.stroke('tomato');
    p.line(0, 0, this.pointer.x, this.pointer.y);

    p.fill('steelblue');
    p.noStroke();
    p.ellipse(this.pointer.x, this.pointer.y, 5);
    // pop();
  };
}
