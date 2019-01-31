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


function setUpProfile(data) {
	document.querySelector('[data-name]').innerHTML = data['name'];
	document.querySelector('[data-description]').innerHTML = data['description'];
	document.querySelector('[data-pic]').src = data['pic'];
	document.querySelector('[data-position]').innerHTML = data['position'];

	loadData(`https://neto-api.herokuapp.com/profile/${data.id}/technologies`)
		.then(setUpTechnologies);
		document.querySelector('.content').style = 'display: initial';
}

function setUpTechnologies(data) {
	data.forEach(el => {
		const span = document.createElement('SPAN');
		span.setAttribute('class', `devicons devicons-${el}`);
		document.querySelector('[data-technologies]')
			.appendChild(span);
	});
}

loadData('https://neto-api.herokuapp.com/profile/me')
	.then(setUpProfile);