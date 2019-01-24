'use strict';
//ПЕРВЫЙ ВАРИАНТ СО ВСПЛЫТИЕМ
const xhr = new XMLHttpRequest();
const form = document.getElementsByClassName('login-form')[0];

function logIn(event) {
	event.preventDefault();
	if (!event.target.classList.contains('button')) {
		return;
	}

	let currentForm = event.target.parentElement.parentElement;

	const formData = new FormData(currentForm);
	let requestObj = {};
	let path = event.target.parentElement.parentElement
		.getAttribute('class').split('-').slice(0, 2).join('');

	const outputMessage =
		event.target.parentElement.parentElement
		.querySelector('.error-message');

	for (let [key, value] of formData) {
		requestObj[key] = value;
	}

	xhr.addEventListener('load', onLoad);
	xhr.open('POST', `https://neto-api.herokuapp.com/${path}`);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(requestObj));

	function onLoad() {
		let response = JSON.parse(xhr.responseText);

		if (response.error) {
			outputMessage.value = response.message;
		} else {
			let word = '';
			switch (path) {
				case ('signup'):
					word = 'зарегистрирован';
					break;
				case ('signin'):
					word = 'авторизован';
			}
			outputMessage.value = `Пользователь ${response.name} успешно ${word}`;
		}
	}
}

form.addEventListener('click', logIn);

// ВТОРОЙ ВАРИАНТ С ПОВТОРЕНИЯМИ
//===============================
// const signUpForm = document.querySelector('.sign-up-htm');
// const signUpBtn = signUpForm.querySelector('.button');
// const signUpOutput = signUpForm.querySelector('.error-message');

// const signInForm = document.querySelector('.sign-in-htm');
// const signInBtn = signInForm.querySelector('.button');
// const signInOutput = signInForm.querySelector('.error-message');


// function signUp(event) {
// 	event.preventDefault();

// 	let signUpFormData = new FormData(signUpForm);	
// 	let requestObj = {};

// 	for (let [key, value] of signUpFormData) {
// 		requestObj[key] = value;
// 	}

// 	xhr.addEventListener('load', onLoad);
// 	xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
// 	xhr.setRequestHeader('Content-Type', 'application/json');
// 	xhr.send(JSON.stringify(requestObj));

// 	function onLoad() {
// 		let response = JSON.parse(xhr.responseText);
// 		if (response.error) {
// 			signUpOutput.value = response.message;
// 		} else {
// 			signUpOutput.value = `Пользователь ${response.name} успешно зарегистрирован`;
// 		}
// 	}
// }


// function signIn(event) {
// 	event.preventDefault();

// 	let signInFormData = new FormData(signInForm);	
// 	let requestObj = {};

// 	for (let [key, value] of signInFormData) {
// 		requestObj[key] = value;
// 	}

// 	xhr.addEventListener('load', onLoad);
// 	xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
// 	xhr.setRequestHeader('Content-Type', 'application/json');
// 	xhr.send(JSON.stringify(requestObj));

// 	function onLoad() {
// 		let response = JSON.parse(xhr.responseText);
// 		if (response.error) {
// 			signInOutput.value = response.message;
// 		} else {
// 			signInOutput.value = `Пользователь ${response.name} успешно авторизован`;
// 		}
// 	}
// }


// signUpBtn.addEventListener('click', signUp);
// signInBtn.addEventListener('click', signIn);