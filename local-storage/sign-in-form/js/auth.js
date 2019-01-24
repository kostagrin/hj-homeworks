'use strict';
const signUpForm = document.querySelector('.sign-up-htm');
const signUpBtn = signUpForm.querySelector('.button');
const signUpOutput = signUpForm.querySelector('.error-message');


const signInForm = document.querySelector('.sign-in-htm');
const signInBtn = signInForm.querySelector('.button');
const signInOutput = signInForm.querySelector('.error-message');

const xhr = new XMLHttpRequest();


function signUp(event) {
	event.preventDefault();

	let signUpFormData = new FormData(signUpForm);	
	let requestObj = {};

	for (let [key, value] of signUpFormData) {
		requestObj[key] = value;
	}
		
	xhr.addEventListener('load', onLoad);
	xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(requestObj));

	function onLoad() {
		let response = JSON.parse(xhr.responseText);
		if (response.error) {
			signUpOutput.value = response.message;
		} else {
			signUpOutput.value = `Пользователь ${response.name} успешно зарегистрирован`;
		}
	}
}


function signIn(event) {
	event.preventDefault();

	let signInFormData = new FormData(signInForm);	
	let requestObj = {};

	for (let [key, value] of signInFormData) {
		requestObj[key] = value;
	}
		
	xhr.addEventListener('load', onLoad);
	xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(requestObj));

	function onLoad() {
		let response = JSON.parse(xhr.responseText);
		if (response.error) {
			signInOutput.value = response.message;
		} else {
			signInOutput.value = `Пользователь ${response.name} успешно авторизован`;
		}
	}
}


signUpBtn.addEventListener('click', signUp);
signInBtn.addEventListener('click', signIn);