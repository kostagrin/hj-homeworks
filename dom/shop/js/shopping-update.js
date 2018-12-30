'use strict';
const addBtn = document.getElementsByClassName('add');
const cart = document.getElementById('cart-count');
let counter = 0;
let totalPrice = 0;

function updateCash(event) {
	let price = +event.currentTarget.dataset.price;

	counter++;
	cart.innerHTML = counter;     
	totalPrice += price;

	document.getElementById('cart-total-price').innerHTML = getPriceFormatted(totalPrice);
}

for (let btn of addBtn) {
	btn.addEventListener('click', updateCash);
}