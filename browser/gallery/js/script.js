'use strict';
const pics = [
    'breuer-building.jpg',
    'guggenheim-museum.jpg',
    'headquarters.jpg',
    'IAC.jpg',
    'new-museum.jpg'
];


const img = document.getElementById('currentPhoto');

let pic = 0;

img.src = `i/${pics[pic]}`;

const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');


nextPhoto.onclick = () => {
    pic = pic < (pics.length - 1) ? ++pic : 0;
    img.src = `i/${pics[pic]}`;
}

prevPhoto.onclick = () => {
    pic = pic > 0 ? --pic : (pics.length - 1);
    img.src = `i/${pics[pic]}`;
}