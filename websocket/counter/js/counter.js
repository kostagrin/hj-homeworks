'use strict';
const wsc = new WebSocket('wss://neto-api.herokuapp.com/counter');
const counter = document.querySelector('.counter');
const errors = document.querySelector('.errors');

wsc.addEventListener('open', () => {
	wsc.addEventListener('message', showMessage);

});

function showMessage(event) {
	let message = JSON.parse(event.data);
	counter.innerHTML = message.connections;
	errors.value = message.errors;
}

window.addEventListener('beforeunload', () => {
	wsc.close(1000);
});