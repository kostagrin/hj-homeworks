'use strict';
const pic = document.querySelector('[data-pic]');
const tweets = document.querySelector('[data-tweets]');
const username = document.querySelector('[data-username]');
const followers = document.querySelector('[data-followers]');
const following = document.querySelector('[data-following]');
const wallpaper = document.querySelector('[data-wallpaper]');
const description = document.querySelector('[data-description]');

const url = `https://neto-api.herokuapp.com/twitter/jsonp`;
const script = document.createElement('script');
script.setAttribute('src', url);

function callback(userData) {
	pic.src = userData.pic;
	tweets.value = userData['tweets'];
	username.innerHTML = userData['username'];
	followers.value = userData['followers'];
	following.value = userData['following'];
	wallpaper.src = userData['wallpaper'];
	description.innerHTML = userData['description'];
}

document.body.appendChild(script);