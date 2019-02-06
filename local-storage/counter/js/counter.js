'use strict';
const counterBox = document.getElementById('counter');
const btns = document.querySelector('.wrap-btns');

btns.addEventListener('click', count);


function count(event) {
	let counter = +localStorage.getItem('counterValue');
	switch (event.target.id) {
		case ('increment'):
			counter++;
			localStorage.counterValue = counter;
			break;
		case ('decrement'):
			if (localStorage.getItem('counterValue') == 0) {
				return;
			}
			counter--;
			localStorage.counterValue = counter;
			break;
		case ('reset'):
			counter = 0;
			localStorage.counterValue = counter;
	}
	displaySessionValue();
	return counter;
}

function initialiseLocalStorage() {
	if (!localStorage.counterValue) {
		localStorage.setItem('counterValue', 0);
	}
}


function displaySessionValue() {
	counterBox.innerHTML = localStorage.counterValue;
}

document.addEventListener('DOMContentLoaded', initialiseLocalStorage);
document.addEventListener('DOMContentLoaded', displaySessionValue);