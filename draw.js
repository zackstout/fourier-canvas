
var circs = [];
var total_history = []; // yeah, history was a keyword.
var time = 0;
var w1, h1, w2, h2;

new p5(topSketch, 'top');
new p5(btmSketch, 'btm');

// NOTE: I don't think it's quite working -- doesn't seem sufficiently "swivelly" or jagged when the smallest circle has a large speed.
// Also now the second circle is never rotating?
// ====================================================================================

function topSketch(p) {
  p.setup = function() {
    w2 = 1000;
    h2 = 500;
    p.createCanvas(w2, h2);
    p.background('lightGrey');
    generateCircles(4, p);
  };

  p.draw = function() {
    p.background('lightGray');
    p.stroke('gray');
    p.line(10, h2/2, w2 - 10, h2/2);
    // Going from largest to smallest, inner to outer:
    for (var i=0; i < circs.length; i++) {
      var c = circs[i];
      c.pointer = c.findPointer();
      if (i > 0) {
        c.x = next_center.x;
        c.y = next_center.y;
      }
      next_center = c.pointer;

      if (i === circs.length - 1) {
        c.draw(true);
      } else {
        c.draw();
      }
      c.angle += 0.02 * c.v * (1 + i/2);

    }

    var final_y = circs.reduce(function(s, c) {
      return s + c.y;
    }, -h2/2);

    addToHistory(time, final_y);

    time ++;
  };
}


function addToHistory(t, fin_y) {
  if (t >= w1 - 10) {
    console.log('hiya!', total_history);
    total_history.shift(); // EVERY TIME! i think it's pop but it's shift.
    // total_history.forEach(c => {
    //   c.x -= 1;
    // });
  }
  total_history.push({
    x: t,
    y: fin_y
  });
}
// ====================================================================================

function btmSketch(p) {
  p.setup = function() {
    w1 = 1000;
    h1 = 400;
    p.createCanvas(w1, h1);
  };

  p.draw = function() {
    p.background('lightblue');
    p.stroke('black');
    p.line(10, h1/2, w1 - 10, h1/2);

    for (let i=0; i < total_history.length; i++) {
      const c = total_history[i];
      p.noStroke();
      p.fill('steelblue');
      p.ellipse(10 + i , h1/2 - c.y * 1.5, 4);
    }
    // total_history.forEach(function(c) {
    //   p.noStroke();
    //   p.fill('steelblue');
    //   p.ellipse(10 + c.x , h1/2 - c.y * 1.5, 4);
    // });
  };
}

// ====================================================================================

function generateCircles(n, p) {
  var size = 80;

  for (var i=0; i < n; i++) {
    if (i === 0) {
      center = {x: 500, y: 250};
    } else {
      center = prev_center;
    }
    var circ = new Circle(center.x, center.y, size, Math.random() * 4, p);
    circs.push(circ);
    prev_center = center;
    size *= 0.6;
  }
}

// ====================================================================================

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

  this.draw = function(bool=false) {
    // Yeah this is imperfect without pushing but....we'll just make a new canvas. We end up using reduce to get around this problem.
    p.translate(this.x, this.y);
    p.noFill();
    p.stroke('black');
    p.ellipse(0, 0, this.r * 2);

    p.stroke('tomato');
    p.line(0, 0, this.pointer.x, this.pointer.y);

    if (bool) {
      p.fill('tomato');
      p.stroke('green');
      var final_y = circs.reduce(function(s, c) {
        return s + c.y;
      }, -h2/2);
      p.line(this.pointer.x, this.pointer.y, this.pointer.x, -final_y);
    } else {
      p.fill('steelblue');

    }
    p.noStroke();
    p.ellipse(this.pointer.x, this.pointer.y, 5);
  };
}
