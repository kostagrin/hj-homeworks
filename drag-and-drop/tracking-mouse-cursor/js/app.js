'use strict';
const leftEye = document.querySelector('.cat_position_for_left_eye');
const rightEye = document.querySelector('.cat_position_for_right_eye');

let eyesCoords = {
	left: {
		x: null,
		y: null
	},
	right: {
		x: null,
		y: null
	}
};

let cursorPos = {
	x: null,
	y: null
}


function getEyesCoords() {
	eyesCoords.left.x = leftEye.getClientRects()[0].x + (leftEye.getClientRects()[0].width / 2);
	eyesCoords.left.y = leftEye.getClientRects()[0].y + (leftEye.getClientRects()[0].height / 2);
	eyesCoords.right.x = rightEye.getClientRects()[0].x + (rightEye.getClientRects()[0].width / 2);
	eyesCoords.right.y = rightEye.getClientRects()[0].y + (rightEye.getClientRects()[0].height / 2);
}


function updateCursorPos(event) {
	cursorPos.x = event.clientX;
	cursorPos.y = event.clientY;
}


function rotateEyes(event) {
	getEyesCoords();
	updateCursorPos(event);

	if (cursorPos.x < eyesCoords.left.x) {
		leftEye.firstElementChild.style.left = `0%`;
	} else if (cursorPos.x > eyesCoords.left.x) {
		leftEye.firstElementChild.style.left = `50%`;
	} else {
		leftEye.firstElementChild.style.left = `25%`;
	} 

	if (cursorPos.y < eyesCoords.left.y) {
		leftEye.firstElementChild.style.top = `0%`;
	} else if (cursorPos.y > eyesCoords.left.y) {
		leftEye.firstElementChild.style.top = `50%`;
	}	else {
		leftEye.firstElementChild.style.top = `25%`;
	} 



	if (cursorPos.x < eyesCoords.right.x) {
		rightEye.firstElementChild.style.left = `0%`;
	} else if (cursorPos.x > eyesCoords.right.x) {
		rightEye.firstElementChild.style.left = `50%`;
	} else {
		rightEye.firstElementChild.style.left = `25%`;
	} 

	if (cursorPos.y < eyesCoords.right.y) {
		rightEye.firstElementChild.style.top = `0%`;
	} else if (cursorPos.y > eyesCoords.right.y) {
		rightEye.firstElementChild.style.top = `50%`;
	}	else {
		rightEye.firstElementChild.style.top = `25%`;
	} 
}

document.addEventListener('mousemove', rotateEyes);