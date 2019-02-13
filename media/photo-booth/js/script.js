'use strict';
const app = document.querySelector('.app');
const list = document.querySelector('.list');
const controls = app.querySelector('.controls');
const errorMessage = document.getElementById('error-message');
const takePhotoBtn = document.getElementById('take-photo');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
app.appendChild(canvas);

const video = document.createElement('video');
app.appendChild(video);

const audio = document.createElement('audio');
audio.setAttribute('hidden', 'true');
audio.src = './audio/click.mp3';


function getDevAccess() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
      video.srcObject = stream;
      video.play();
      controls.style.display = 'flex';
    })
    .catch(err => {
      console.error(`Ошибка:`, err.message);
      errorMessage.innerText = `Ошибка: ${err.message}`;
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let px = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(px, 0, 0);
  }, 1000 / 60);
}

function takePhoto() {
  audio.currentTime = 0;
  audio.play();

  const data = canvas.toDataURL('image/jpeg');

  const figure = createElement('figure', {}, [
  	createElement('img', {src: data}, ''),
  	createElement('figcaption', {}, [
  	  createElement('a', {href: data, download: 'snapshot.png'}, [
  	    createElement('i', {class: 'material-icons'}, 'file_download')]),
  	  createElement('a', {}, [
  	    createElement('i', {class: 'material-icons'}, 'file_upload')]),
  	  createElement('a', {}, [
  	    createElement('i', {class: 'material-icons'}, 'delete')])
  	])
  ]);

  if (list.children.length === 0) {
    list.appendChild(figure);
  } else {
    list.children[0].parentNode.insertBefore(figure, list.children[0]); 
  }
}

function actions(event) {
  event.stopPropagation();
  const photo = event.target.parentNode.parentNode.parentNode;
  if (event.target.innerText === 'delete') {
    list.removeChild(photo);

  } else if (event.target.innerText === 'file_upload') {
    const image = photo.firstChild;
    console.log(image);
    const imageCanvas = document.createElement('canvas');
    const imageCtx = imageCanvas.getContext('2d');
    imageCanvas.width = image.width;
    imageCanvas.height = image.height;
    imageCtx.drawImage(image, 0, 0);
    imageCanvas.toBlob((blob) => {
      let formData = new FormData();
      formData.append('image', blob);
      fetch('https://neto-api.herokuapp.com/photo-booth', {
      	method: 'POST',
      	body: formData,
      })
      .then(() => event.target.parentNode.style.display = 'none')
      .catch(e => {
      	console.error(e.message);
      	errorMessage.innerText = `Ошибка: ${e.message}`;
      });
    });

  } else if (event.target.innerText = 'file_download') {
    event.target.parentNode.style.display = 'none';
  }
}

getDevAccess();

video.addEventListener('canplay', paintToCanvas);
takePhotoBtn.addEventListener('click', takePhoto);
list.addEventListener('click', actions);


function createElement(tagName, attributes, children) {
  const element = document.createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
  }
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}