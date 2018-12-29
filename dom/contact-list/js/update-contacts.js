'use strict';
const contacts = JSON.parse(loadContacts());
const [contactList] = document.getElementsByClassName('contacts-list');

(function fillInContactList() {
	for (let i = 0; i < contacts.length; i++) {
		let li = document.createElement('LI');

		contactList.appendChild( li );
		contactList.getElementsByTagName('LI')[i].appendChild( document.createElement('STRONG') );
		li.dataset.email = contacts[i].email;
		li.dataset.phone = contacts[i].phone;
		contactList.getElementsByTagName('STRONG')[i].innerHTML = `${contacts[i].name}`;
	}   
})();