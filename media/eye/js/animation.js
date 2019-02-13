'use strict';
const eye = document.querySelector('.big-book__eye');
const pupil = document.querySelector('.big-book__pupil');
const cursorCoords = { x: 0, y: 0 };
let eyeCenter = { x: 0, y: 0 };


function animateEye(event) {
  cursorCoords.x = event.clientX;
  cursorCoords.y = event.clientY;
    getEyeCenter();
    const offset = getOffsetPupil();
    pupil.style.setProperty('--pupil-size', getSizePupil());
    pupil.style.setProperty('--pupil-x', `${offset.x}px`);
    pupil.style.setProperty('--pupil-y', `${offset.y}px`);
}


function getEyeCenter() {
    const coords = eye.getBoundingClientRect();
    eyeCenter = {
        x: coords.left + (coords.right - coords.left) / 2,
        y: coords.top + (coords.bottom - coords.top) / 2
    };
}


function getSizePupil() {
    const distance = getDistance(cursorCoords, eyeCenter);
    return Math.max((1 - Math.min(distance / eyeCenter.x, 1)) * 3, 1);
}


function getDistance(a, b) {
    return Math.sqrt((a.x - b.x)** 2 + (a.y - b.y)** 2);
}


function getOffsetPupil() {
    const offset = { x: 0, y: 0 };
    offset.x = getOffset(cursorCoords.x, eyeCenter.x, document.documentElement.clientWidth);
    offset.y = getOffset(cursorCoords.y, eyeCenter.y, document.documentElement.clientHeight);
    return offset;
}


function getOffset(a, b, axis) {
    const offset = a > b
        ? (a - b) / (axis - b) * 30
        : (a - b) / b * 30;
    return Math.min(offset, 30);
}

document.addEventListener('mousemove', animateEye);