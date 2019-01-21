'use strict';
const todoList = document.querySelector('.todo-list');
const done = todoList.querySelector('.done');
const undone = todoList.querySelector('.undone');
const listItems = todoList.querySelectorAll('input');


function sortItem(event) {
	event.target.checked ? 
		done.appendChild(event.target.parentElement) :
		undone.appendChild(event.target.parentElement);		
}

listItems.forEach(item => item.addEventListener('click', sortItem));