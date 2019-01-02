'use strict';
const contacts = JSON.parse(loadContacts());

// try {
// 	const contacts = JSON.parse(loadContacts());
// } catch (err) {
// 	return err;
// }


// const contacts = {};
// try {
// contacts = JSON.parse(loadContacts());
// } catch (err) {
// 	return err;
// }


const contactList = document.querySelector('.contacts-list');

(function fillInContactList() {
	for (let i = 0; i < contacts.length; i++) {
		let li = document.createElement('LI');
		let strong = document.createElement('STRONG');

		strong.innerHTML = contacts[i].name;
		contactList.appendChild(li);
		li.appendChild(strong);
		li.dataset.email = contacts[i].email;
		li.dataset.phone = contacts[i].phone;
	}
})();