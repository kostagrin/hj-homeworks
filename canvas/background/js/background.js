'use strict';
const canv = document.getElementById('wall');
const ctx = canv.getContext('2d');
canv.width = window.innerWidth;
canv.height = window.innerHeight;

let figures = [];


class Figure {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = getRandFloat(0.1, 0.6, 1);
    this.outline = 5 * this.size;
    this.nextPoint = getNextPointFunc();
  }
}

class Circle extends Figure {
  constructor(x, y) {
    super(x, y);
    this.radius = 12 * this.size;
  }
}

class Cross extends Figure {
  constructor(x, y) {
    super(x, y);
    this.side = 20 * this.size;
    this.angle = getRandInt(0, 360);
    this.rotationSpeed = getRandFloat(-0.2, 0.2, 1);
  }
}

function getRandFloat(min, max, precision) {
  if (typeof (precision) == 'undefined') {
    precision = 2;
  }
  return parseFloat(Math.min(min + (Math.random() * (max - min)), max).toFixed(precision));
}

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNextPointFunc() {
  let option = Math.floor(Math.random() * 10) % 2;
  switch (option) {
    case (0):
      return function nextPoint(x, y, time) {
        return {
          x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
          y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
        };
      }
      break;
    case (1):
      return function nextPoint(x, y, time) {
        return {
          x: x + Math.sin((x + (time / 10)) / 100) * 5,
          y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
        }
      }
  }
}


function createFigures(from, to) {
  for (let i = 0; i < getRandInt(from, to); i++) {
    figures.push(
      new Cross(getRandInt(0, canv.width), getRandInt(0, canv.height))
    );
  }
  for (let i = 0; i < getRandInt(from, to); i++) {
    figures.push(
      new Circle(getRandInt(0, canv.width), getRandInt(0, canv.height))
    );
  }
}


function drawCross(cross) {
  const rad = cross.angle * Math.PI / 180;

  let { x,  y } = cross.nextPoint(cross.x, cross.y, Date.now());

  ctx.translate(x, y);
  ctx.rotate(rad);

  ctx.lineWidth = cross.outline;
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(0 - cross.side, 0);
  ctx.lineTo(0 + cross.side, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0 - cross.side);
  ctx.lineTo(0, 0 + cross.side);
  ctx.stroke();

  ctx.rotate(-rad);
  ctx.translate(-x, -y);

  cross.angle += cross.rotationSpeed;
}


function drawCircle(circle) {
  let { x, y } = circle.nextPoint(circle.x, circle.y, Date.now());

  ctx.lineWidth = circle.outline;
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, circle.radius, 0, 2 * Math.PI, false);
  ctx.stroke();
}


function tick() {
  ctx.clearRect(0, 0, canv.width, canv.height);

  figures.forEach(figure => {
    if (figure instanceof Cross) {
      drawCross(figure);

    } else {
      drawCircle(figure);
    }
  });
}

createFigures(50, 200);
setInterval(tick, 1000 / 20);