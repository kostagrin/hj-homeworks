'use strict';
const slider = document.getElementById('slider');

const pics = [
    'airmax-jump.png',
    'airmax-on-foot.png',
    'airmax-playground.png',
    'airmax-top-view.png',
    'airmax.png'
]


slider.src = `i/${pics[0]}`;

let pic = 1;

setInterval(() => {
    slider.src = `i/${pics[pic]}`;
    pic = pic == pics.length - 1 ? 0 : ++pic;
}, 5000);