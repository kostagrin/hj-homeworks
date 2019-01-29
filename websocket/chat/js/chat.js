'use strict';
const chat = document.querySelector('.chat');
const chatStatus = chat.querySelector('h2.chat-status');
const messages = chat.querySelector('.messages');
const templates = messages.querySelector('.messages-templates');
const msgLoading = templates.querySelectorAll('.message.loading');
const message = templates.getElementsByClassName('message')[1];
const msgPersonal = templates.querySelectorAll('.message.message-personal');
const msgStatus = templates.querySelectorAll('.message.message-status')[0];
const content = messages.querySelector('.messages-content');
const messageBox = chat.querySelector('.message-box');
const messageInput = messageBox.querySelector('.message-input');
const messageSubmit = messageBox.querySelector('.message-submit');

const wsc = new WebSocket('wss://neto-api.herokuapp.com/chat');
document.addEventListener('DOMContentLoaded', wsc);

function getTime() {
	const time = new Date();
	return time.toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit'
	});
}


wsc.addEventListener('open', () => {
	chatStatus.innerHTML = chatStatus.dataset.online;
	messageSubmit.disabled = false;
	let msgText = message.querySelector('.message-text').cloneNode(true);
	msgText = `Пользователь появился в сети`;
	msgStatus.querySelector('.message-text').innerHTML = msgText;
	content.appendChild(msgStatus);
});


wsc.addEventListener('message', event => {
	if (content.firstElementChild.classList.contains('message-status')) {
		content.removeChild(msgStatus);
	}
	let loading = msgLoading[0].cloneNode(true);
	let msg = message.cloneNode(true);
	msg.querySelector('.message-text').innerHTML = event.data;
	msg.querySelector('.timestamp').innerHTML = getTime();

	if (event.data == '...') {
		loading.querySelector('span').innerHTML = 'Собеседник печатает текст';
		content.appendChild(loading);
	} else if (event.data != '...' &&
		content.firstChild.innerHTML ==
		'Собеседник печатает текст') {
		content.removeChild(content.firstChild);
		content.appendChild(msg);
	} else {
		content.appendChild(msg);
	}
});


function sendMyMessage(event)	{
	event.preventDefault();
	let msgText = message.querySelector('.message-text').cloneNode(true);
	let msgPers = msgPersonal[0].cloneNode(true);
	msgText = messageInput.value;
	wsc.send(msgText);
	msgPers.querySelector('.message-text').innerHTML = msgText;
	msgPers.querySelector('.timestamp').innerHTML = getTime();
	content.appendChild(msgPers);
	messageInput.value = '';
}

messageSubmit.addEventListener('click', sendMyMessage);

wsc.addEventListener('close', () => {
	chatStatus.innerHTML = chatStatus.dataset.offline;
	messageSubmit.disabled = true;
	content = null;
});