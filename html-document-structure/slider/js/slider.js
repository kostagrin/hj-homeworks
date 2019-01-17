'use strict';
document.querySelector('.slide')
	.classList.add('slide-current');

function Slider(container) {
	const next = container.querySelector('[data-action = next]');
	const prev = container.querySelector('[data-action = prev]');
	const first = container.querySelector('[data-action = first]');
	const last = container.querySelector('[data-action = last]');

	prev.addEventListener('click', event => moveOneStep(false));
	next.addEventListener('click', event => moveOneStep(true));
	first.addEventListener('click', event => moveToEdge(false));
	last.addEventListener('click', event => moveToEdge(true));

	function changeBtnStatus() {
		let activeSlide = container.querySelector('.slide-current');

		if (!activeSlide.previousElementSibling) {
			first.classList.add('disabled');
			prev.classList.add('disabled');
		}
		else if (!activeSlide.nextElementSibling) {
			next.classList.add('disabled');
			last.classList.add('disabled');
		}
		else {
			first.classList.remove('disabled');
			prev.classList.remove('disabled');
			next.classList.remove('disabled');
			last.classList.remove('disabled');
			
		}
	}

	function moveOneStep(isForward) {
		let currentSlide = container.querySelector('.slide-current');
		let activetedSlide = isForward ?
			currentSlide.nextElementSibling :
			currentSlide.previousElementSibling;

		currentSlide.classList.remove('slide-current');
		activetedSlide.classList.add('slide-current');
		changeBtnStatus();
	}

	function moveToEdge(isForward) {
		let currentSlide = container.querySelector('.slide-current');
		let activetedSlide = isForward ?
			container.querySelector('.slides').lastElementChild :
			container.querySelector('.slides').firstElementChild;

		currentSlide.classList.remove('slide-current');
		activetedSlide.classList.add('slide-current');
		changeBtnStatus();
	}
}

const slides = document.querySelector('.slider');
Slider(slides);