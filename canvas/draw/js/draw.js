'use strict';
const canv = document.getElementById('draw');
const ctx = canv.getContext('2d');

let curves = [];
let drawing = false;
let hueUp = true;
let raiseLine = true;
let repaintCanv = false;
let hue = 0;
let brushRadius = 100;


canv.addEventListener('dblclick', clearCanv);
canv.addEventListener("mousedown", startNewCurve);
canv.addEventListener("mousemove", drawCurve);
canv.addEventListener("mouseup", stopDrawing);
canv.addEventListener("mouseleave", stopDrawing);


function pointer(x, y, hue, brushRadius) {
	let curve = {
		x: x,
		y: y,
		hue: hue,
		brushRadius: brushRadius
	}
	return curve;
}


function changeCanvasSize() {
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
	clearCanv();
}

function clearCanv() {
	curves = [];
	repaintCanv = true;
}

function startNewCurve(event) {
	const curve = [];
	drawing = true;
	hueUp = !event.shiftKey;

	curve.push(pointer(event.offsetX, event.offsetY, hue, brushRadius));
	curves.push(curve);
	repaintCanv = true;
}

function drawCurve(event) {
	if (drawing) {
		curves[curves.length - 1]
			.push(pointer(event.offsetX, event.offsetY, hue, brushRadius));
		repaintCanv = true;
	}
}

function circle(point) {
	const pointCoords = [point.x, point.y];
	ctx.beginPath();
	ctx.arc(...pointCoords, point.brushRadius / 2, 0, 2 * Math.PI);
	ctx.fillStyle = `hsl(${point.hue}, 100%, 50%)`;
	ctx.fill();
}

function smoothCurve(points) {
	for (let i = 0; i < points.length - 1; i++) {
		let pointFrom = points[i];
		let pointTo = points[i + 1];

		ctx.beginPath();
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';

		ctx.lineWidth = pointFrom.brushRadius;
		ctx.strokeStyle = `hsl(${pointFrom.hue}, 100%, 50%)`;
		ctx.lineTo(pointFrom.x, pointFrom.y);
		ctx.stroke();

		ctx.lineWidth = pointTo.brushRadius;
		ctx.strokeStyle = `hsl(${pointTo.hue}, 100%, 50%)`;
		ctx.lineTo(pointTo.x, pointTo.y);
		ctx.stroke();

		ctx.closePath();
	}
}

function repaint() {
	ctx.clearRect(0, 0, canv.width, canv.height);

	curves.forEach(curve => {
		circle(curve[0]);
		smoothCurve(curve);
	});
}

function tick() {
	if (repaintCanv) {
		repaint();
		repaintCanv = false;

		hueUp ? hue++ : hue--;
		raiseLine ? brushRadius++ : brushRadius--;

		if (hue > 359) {
			hue = 0;
		}

		if (brushRadius >= 100) {
			raiseLine = false;
		} else if (brushRadius <= 5) {
			raiseLine = true;
		}
	}
	
	window.requestAnimationFrame(tick);
}


function stopDrawing() {
	drawing = false;
}

tick();
window.addEventListener('load', changeCanvasSize);
window.addEventListener('resize', changeCanvasSize);