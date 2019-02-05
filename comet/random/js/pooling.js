'use strict';
const longPoolingArr = document.querySelectorAll('.pooling div');

function getNumber() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
	xhr.send();
	xhr.addEventListener('load', onLoad);
	xhr.addEventListener('error', onError);

	function onLoad() {
		let card = JSON.parse(xhr.responseText);
		flipCard(card);
	}

	function onError() {
		console.error('Возникла ошибка');
	}
}


function flipCard(card) {
	longPoolingArr.forEach(el => {
		el.removeAttribute('class', 'flip-it');
	});
	longPoolingArr[card - 1].setAttribute('class', 'flip-it');
}


document.addEventListener('DOMContentLoaded', getNumber);
setInterval(getNumber, 5000);