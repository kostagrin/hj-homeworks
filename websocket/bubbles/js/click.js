'use strict';
const wsc = new WebSocket('wss://neto-api.herokuapp.com/mouse');
const canvas = document.querySelector('canvas');

wsc.addEventListener('open', () => {
	showBubbles(wsc);
});

canvas.addEventListener('click', event => {
	wsc.send(JSON.stringify({
		x: event.x,
		y: event.y
	}));
});
