'use strict';
const textArea = document.querySelector('.textarea');

const block = document.querySelector('.block');
const message = document.querySelector('.message');


function setFocus() {
	block.classList.add('active');
	message.classList.remove('view');
}

function debounce(callback, delay) {
	let timeout;

	return () => {
		clearTimeout(timeout);

		setFocus();

		timeout = setTimeout(function () {
			timeout = null;
			callback();
		}, delay);
	};
}


textArea.addEventListener('focus', setFocus);

textArea.addEventListener('focusout', () => {
	block.classList.remove('active');
	message.classList.remove('view');
});

textArea.addEventListener('keydown', debounce(
	() => {
		block.classList.remove('active');
		message.classList.add('view')
	}, 2000));