'use strict';
const wsc = new WebSocket('wss://neto-api.herokuapp.com/draw');

wsc.addEventListener('open', event => {
	editor.addEventListener('update', updateCanv);
});

function updateCanv(event) {
	event.canvas.toBlob(blob => wsc.send(blob));
}