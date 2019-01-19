'use strict';
function toggleMenu(event) {
  if (this.classList.contains('show')) {
    this.classList.remove('show');
    this.classList.add('hide');
  } else {
    this.classList.add('show');
    this.classList.remove('hide');
  }
}

function openLink(event) {
  event.preventDefault();
  event.stopPropagation(); 
  console.log(this.textContent);
}

// function init(node) {
//   node.addEventListener('click', toggleMenu);
// }

function initLink(node) {
  if (node.dataset.toggle) {
    return;
  }
  node.addEventListener('click', openLink);
}

/* удалил Array.from потому что у NodeList
 есть метод forEach*/
document.querySelectorAll('.dropdown')
  .forEach(item => {
    //заменил вложенную функцию на прямой вызов функции
    item.addEventListener('click', toggleMenu);
  });

document.querySelectorAll('a')
  .forEach(initLink);
  