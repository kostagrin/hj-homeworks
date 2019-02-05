'use strict';
const wsc = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
const webSocketArr = document.querySelectorAll('.websocket div');

wsc.addEventListener('message', getNumber);
wsc.addEventListener('error', err => {
	console.error(`Возникла ошибка: ${err.data}`);
});
wsc.addEventListener('close', event => {
  console.log(`Код закрытия соединения = ${event.code}`);
});

function getNumber(event) {
	let card = event.data;
	flipCard(card);
	console.log(event.data);
}

function flipCard(card) {
	webSocketArr.forEach(el => {
		el.removeAttribute('class', 'flip-it');
	});
	webSocketArr[card - 1].setAttribute('class', 'flip-it');
}