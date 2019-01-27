'use strict';
const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const quickCart = document.getElementById('quick-cart');

const colorXHR = new XMLHttpRequest();
colorXHR.addEventListener('load', setColors);
colorXHR.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
colorXHR.send();

const sizeXHR = new XMLHttpRequest();
sizeXHR.addEventListener('load', setSizes);
sizeXHR.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
sizeXHR.send();

const cartStatus = new XMLHttpRequest();
cartStatus.addEventListener('load', setCartStatus);
cartStatus.open('GET', 'https://neto-api.herokuapp.com/cart');
cartStatus.send();


function setColors() {
	let content = '';
	JSON.parse(colorXHR.responseText).map((el) => {
		content += `<div data-value="${el.type}" class="swatch-element color ${el.type}`;
		if (el.isAvailable) {
			content += ' available">';
		} else {
			content += ' soldout">';
		}
		content += `<div class="tooltip">${el.title}</div><input quickbeam="color" id="swatch-1-${el.type}"
			type="radio" name="color" value="${el.type}"`;
		if (el.type == localStorage.checkedColor || el.type == 'blue') {
			content += ' checked';
		}
		if (!el.isAvailable) {
			content += ' disabled';
		}
		content += `><label for="swatch-1-${el.type}" style="border-color: ${el.type};"><span style="background-color: ${el.code}
			;"></span><img class="crossed-out"src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
			</label></div>`;
	});
	colorSwatch.innerHTML = content;
}

function setSizes() {
	let content = '';
	JSON.parse(sizeXHR.responseText).map((el) => {
		content += `<div data-value="${el.type}" class="swatch-element plain ${el.type} `;
		if (el.isAvailable) {
			content += 'available">';
		} else {
			content += 'soldout">';
		}
		content += `<input id="swatch-0-${el.type}" type="radio" name="size" value="${el.type}"`;
		if (el.type == localStorage.checkedSize || el.type == 'm') {
			content += ' checked';
		}
		if (!el.isAvailable) {
			content += ' disabled';
		}
		content += `><label for="swatch-0-${el.type}">${el.title} <img class="crossed-out"
			src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>`;
	});
	sizeSwatch.innerHTML = content;
}

function setCartStatus(event) {
	let content = '';
	JSON.parse(event.target.responseText).map((el) => {
		content += `
		<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${el.id}" style="opacity: 1;">
			<div class="quick-cart-product-wrap">
				<img src="${el.pic}" title="${el.title}">
				<span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
				<span class="s2"></span>
			</div>
			<span class="count hide fadeUp" id="quick-cart-product-count-${el.id}">${el.quantity}
			</span>
			<span class="quick-cart-product-remove remove" data-id="${el.id}">
			</span>
		</div>
		<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico`;
			if (el.quantity != '0') {
				content += ' open';
			}
			content += `"><span><strong class="quick-cart-text">Оформить заказ<br></strong>
		<span id="quick-cart-price">$${getTotalSum()}.00</span></span></a>`;

		function getTotalSum() {
			return el.price * el.quantity;
		}
	});
	quickCart.innerHTML = content;
}

colorSwatch.addEventListener('change', (event) => {
	if (event.target.type == 'radio') {
		localStorage.checkedColor = event.target.value;
	}
});

sizeSwatch.addEventListener('change', (event) => {
	if (event.target.type == 'radio') {
		localStorage.checkedSize = event.target.value;
	}
});

const orderDataForm = document.getElementById('AddToCartForm');
const orderData = new FormData(orderDataForm);
const addToCartBtn = document.getElementById('AddToCart');
orderData.append('productId', orderDataForm.dataset.productId);

const removeItemData = new FormData();
removeItemData.append('productId', orderDataForm.dataset.productId);

addToCartBtn.addEventListener('click', order);
quickCart.addEventListener('click', order);

function order(event) {
	event.preventDefault();
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', updateCart);
	if (event.target.classList.contains('remove')) {
		xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
		xhr.send(removeItemData);
	} else if (event.currentTarget.id == 'AddToCart') {
		xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
		xhr.send(orderData);
	}
}

function updateCart(event) {
	if (event.currentTarget.error) {
		new Error(event.currentTarget.message);
	}
	setCartStatus(event);
}