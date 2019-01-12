/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

// Мой код
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/book/');
xhr.send();
xhr.addEventListener('load', onLoad);

function onLoad() {
    const books = JSON.parse(xhr.responseText);
    const bookList = document.getElementById('content');

    for (book of books) {
        let li = document.createElement('LI');
        let img = document.createElement('IMG');
        bookList.appendChild(li);
        li.dataset.title = book.title;
        li.dataset.author = book.author;
        li.dataset.info = book.info;
        li.dataset.price = book.price;
        let cover = li.appendChild(img);
        cover.setAttribute('src', book.cover.small);
    }
}