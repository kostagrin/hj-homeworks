'use strict';

function loadData(url) {
	const functionName = 'randName' + Math.floor(Math.random() * 10);
	return new Promise((resolve, reject) => {
		window[functionName] = resolve;
		const script = document.createElement('script');
		script.src = `${url}?jsonp=${functionName}`;
		document.body.appendChild(script);
	});
}


function getRecipeData(data) {
	document.querySelector('[data-pic]')
		.style = `background-image: url("${data.pic}")`;

	document.querySelector('[data-title]')
		.innerHTML = data.title;

	document.querySelector('[data-ingredients]')
		.innerHTML = data.ingredients.join(', ');

	loadData('https://neto-api.herokuapp.com/food/42/rating')
		.then(setRating);
	loadData('https://neto-api.herokuapp.com/food/42/consumers')
		.then(setList);
}


function setRating(data) {
	document.querySelector('[data-rating]')
		.innerHTML = Number.parseFloat(data.rating).toFixed(2);

	document.querySelector('[data-votes]')
		.innerHTML = `${data.votes} оценок`;

	document.querySelector('[data-star]')
		.style = `width: ${data.rating * 10}%`;

}

function setList(data) {
	let consumers = document.querySelector('[data-consumers]');
	let span = document.createElement('SPAN');

	data.consumers.forEach(el => {
		let img = document.createElement('IMG');
		img.src = el.pic;
		img.title = el.name;
		consumers.appendChild(img);
	});

	span.innerHTML = `(+${data.total})`;
	consumers.appendChild(span);
}


loadData('https://neto-api.herokuapp.com/food/42')
	.then(getRecipeData);