'use strict';
document.querySelector('.slide')
	.classList.add('slide-current');

function Slider(container) {
	const arrows = container.querySelectorAll('nav > a');
	const next = container.querySelector('[data-action = next]');
	const prev = container.querySelector('[data-action = prev]');
	const first = container.querySelector('[data-action = first]');
	const last = container.querySelector('[data-action = last]');

	arrows.forEach(arrow => {
		arrow.addEventListener('click', shiftSlides);
	});

	
	function changeBtnStatus() {
		let activeSlide = container.querySelector('.slide-current');
			arrows.forEach(arrow => {
				arrow.classList.remove('disabled');
			});

		if (!activeSlide.previousElementSibling) {
			first.classList.add('disabled');
			prev.classList.add('disabled');
		} else if (!activeSlide.nextElementSibling) {
			next.classList.add('disabled');
			last.classList.add('disabled');
		} 
	}


	function shiftSlides(event) {
		let currentSlide = container.querySelector('.slide-current');
		let nextSlide = event.target.dataset.action;

		currentSlide.classList.remove('slide-current');
		
		switch (nextSlide) {
			case 'next':
			currentSlide.nextElementSibling
				.classList.add('slide-current');
			break;
			case 'prev':
			currentSlide.previousElementSibling
				.classList.add('slide-current');
			break;
			case 'first':
			currentSlide.parentElement.firstElementChild
				.classList.add('slide-current');
			break;
			case 'last':
			currentSlide.parentElement.lastElementChild
				.classList.add('slide-current');
		}
		changeBtnStatus();
	}
	changeBtnStatus();
}

const slider = document.querySelector('.slider');
Slider(slider);