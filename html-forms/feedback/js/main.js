'use strict';
// input block of variables
const contentForm = document.querySelector('.contentform');
const inputFields = contentForm.querySelectorAll('input, textarea');
const sendBtn = contentForm.querySelector('.button-contact');

//output block of variables
const output = document.getElementById('output');
const outputFields = output.querySelectorAll('output');
const redoBtn = output.querySelector('.button-contact');


// rejects all symbols, apart from numbers for 'zip' field
function validateInput() {
	if (this.name === 'zip') {
		this.value = this.value.replace(/[^0-9]/g, '');
	}
}

// fills in ouput message
function fillInOutput() {
	inputFields.forEach(input => {
		outputFields.forEach(output => {
			if (input.name === output.id) {
				output.value = input.value;
			}
		});
	});
}

// makes the Send button active
function activateSendBtn() {
	if (Array.from(inputFields).every(field => field.value)) {
		sendBtn.removeAttribute('disabled');
		fillInOutput();
	}
}

// toggles between forms
function switchContent(event) {
	event.preventDefault();
	contentForm.classList.toggle('hidden');
	output.classList.toggle('hidden');
}

inputFields.forEach(field => field.addEventListener('input', validateInput));
contentForm.addEventListener('change', activateSendBtn);
sendBtn.addEventListener('click', switchContent);
redoBtn.addEventListener('click', switchContent);