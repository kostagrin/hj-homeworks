'use strict';
const tabs = document.getElementById('tabs');
const tabsNav = tabs.querySelector('.tabs-nav');
const tabProto = tabsNav.firstElementChild;
const articleList = tabs.querySelector('.tabs-content').children;

tabsNav.removeChild(tabProto);


for (let i = 0; i < articleList.length; i++) {	
	let tabClone = tabProto.cloneNode(true);
	tabsNav.appendChild(tabClone);

	tabClone.firstElementChild.textContent = articleList[i].dataset.tabTitle;

	tabClone.firstElementChild.classList.add(articleList[i].dataset.tabIcon);

	if (i > 0) {
		articleList[i].classList.add('hidden');
	}

	if (!articleList[i].hasAttribute('class', 'hidden')) {
		let currentTab = Array.from(tabsNav.children).find(function() {
			return articleList[i].dataset.tabIcon;
		});
		currentTab.classList.add('ui-tabs-active');
	}
}

function changeTab(event) {
	if (event.currentTarget.classList.contains('ui-tabs-active')) {
		return;
	} 
	let identifier = event.currentTarget.firstElementChild.classList[1];
	let currentTab = tabsNav.querySelector('.ui-tabs-active');
	
	currentTab.classList.remove('ui-tabs-active');
	event.currentTarget.classList.add('ui-tabs-active');

	Array.from(articleList).forEach(article => {
		article.classList.add('hidden');
		if(article.dataset.tabIcon == identifier) {
			article.classList.remove('hidden');
		}
	});
}

Array.from(tabsNav.children).forEach(tab => {
	tab.addEventListener('click', changeTab);
});