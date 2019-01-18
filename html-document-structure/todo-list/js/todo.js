'use strict';
const todoList = document.querySelector('.todo-list');
const done = todoList.querySelector('.done');
const undone = todoList.querySelector('.undone');
const listItems = todoList.querySelectorAll('input');


function sortItem(event) {
	let item = event.currentTarget;

	if(item.hasAttribute('checked')) {
		undone.appendChild(item.parentElement);
		item.removeAttribute('checked');
	} else {
		done.appendChild(item.parentElement);
		item.setAttribute('checked', true);
	}
}

listItems.forEach(item => item.addEventListener('click', sortItem));