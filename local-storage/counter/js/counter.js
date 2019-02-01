'use strict';

const counterBox = document.getElementById('counter');
const btns = document.querySelector('.wrap-btns');
const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');

btns.addEventListener('click', count);

let counter = 0;

function count(event) {
	switch (event.target) {
		case (increment):
			counter++;
			break;
		case (decrement):
			if (localStorage.getItem('counterValue') == 0) {
				return;
			}
			counter--;
			break;
		case (reset):
			counter = 0;
			localStorage.clear();
			location.reload();
	}
	saveSession();
	displaySessionValue();
}


function saveSession() {
	localStorage.setItem('counterValue', counter);
}

function displaySessionValue() {
	counterBox.innerHTML = localStorage.counterValue;
}

document.addEventListener('DOMContentLoaded', saveSession);
document.addEventListener('DOMContentLoaded', displaySessionValue);