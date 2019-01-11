
const request = new XMLHttpRequest();

request.addEventListener('load', onLoad);
request.addEventListener('error', onError);

request.open('GET', 'https://neto-api.herokuapp.com/weather', true);

request.send();


function onLoad() {
  if (request.status !== 200) {
    onError();
  } else {
    const response = JSON.parse(request.responseText);
    setData(response);    
  }
}


function onError() {
  console.log("Возникла ошибка сети");
}