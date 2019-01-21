'use strict';
function updateCart(event) {
	if (!event.target.classList.contains('add-to-cart')) return;
	event.preventDefault();
	addToCart(event.target.dataset);
}
list.addEventListener('click', updateCart);