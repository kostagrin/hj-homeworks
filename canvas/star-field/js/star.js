'use strict';
const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');
const pi = Math.PI;

canv.width = 800;
canv.height = 400;

canv.addEventListener('click', updateCanv);

function updateCanv() {
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canv.width, canv.height);

	let stars = getRandInt(200, 400);

	for (let i = 0; i < stars; i++) {
		let x = getRandInt(0, canv.width);
		let y = getRandInt(0, canv.height);
		let starSize = getRandFloat(0, 1.1, 1);
		let starColor = getColor();
		let starBrightness = getRandFloat(0.8, 1);
		ctx.beginPath();
		ctx.fillStyle = starColor;
		ctx.strokeStyle = starColor;
		ctx.globalAlpha = starBrightness;
		ctx.arc(x, y, starSize / 2, 0, 2 * pi, false);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
}


function getRandInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandFloat(min, max, precision) {
	if (typeof (precision) == 'undefined') {
		precision = 2;
	}
	return parseFloat(Math.min(min + (Math.random() * (max - min)), max).toFixed(precision));
}

function getColor() {
	let a = '#ffffff';
	let b = '#ffe9c4';
	let c = '#d4fbff';
	let colorGen = getRandInt(1, 3);
	let color = '';
	switch (colorGen) {
		case (1):
			color = a;
			break;
		case (2):
			color = b;
			break;
		case (3):
			color = c;
	}
	return color;
}

window.addEventListener('load', updateCanv);