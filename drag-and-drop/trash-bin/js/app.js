'use strict';
let icon;
let pos;

document.addEventListener('mousedown', event => {
	if (!event.target.classList.contains('logo')) {
		return;
	}

	pos = {
		x: event.target.getBoundingClientRect().left,
		y: event.target.getBoundingClientRect().top
	};

	icon = event.target;
	icon.classList.add('moving');
});



document.addEventListener('mousemove', event => {
	if (!icon) {
		return;
	}
	event.preventDefault();

	icon.style.left = `${event.pageX - (icon.width / 2)}px`;
	icon.style.top = `${event.pageY - (icon.height / 2)}px`;
});



document.addEventListener('mouseup', event => {
	try {
		if (!icon) {
			return;
		}

		icon.classList.remove('moving');
		icon.style.visibility = 'hidden';

		const trash = document
			.elementFromPoint(event.clientX, event.clientY)
			.closest('#trash_bin');

		icon.style.visibility = 'visible';

		if (!trash) {
			icon.style.left = `${pos.x}px`;
			icon.style.top = `${pos.y}px`;
			return;
		}

		icon.style.display = 'none';

	} finally {
		icon = null;
		pos = null;
	}
});