let currentTime = new Date();
console.log(currentTime);

let h2 = document.querySelector("h2.time");

function formatDate(date) {
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  let months = [
    "Jan",
    "Feby",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
    if(currentDate < 10){currentDate ='0'+ currentDate;}
  let currentHours = date.getHours();
    if(currentHours < 10 ){currentHours ='0'+ currentHours;}
  let currentMinutes = date.getMinutes();
    if(currentMinutes < 10 ) {currentMinutes ='0' + currentMinutes; }

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate},  
                        <br>
                       ${currentHours}:${currentMinutes} `;

  return formattedDate;
}
h2.innerHTML = (formatDate(currentTime));

function showResult(response) {
  console.log(response.data);
  document.getElementById("cityDisplay").innerHTML = (response.data.name);
  document.getElementById("humidity1").innerHTML = (response.data.main.humidity) + "%";
  document.getElementById("description1").innerHTML= (response.data.weather[0].description);
  let temperatureDisplay = document.getElementById("displaytemp");
  temperatureDisplay.innerHTML = `${Math.round(response.data.main.temp)}ºC`;
  let windDisplay = document.getElementById("wind1");
  windDisplay.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
}

function findCity(city) {
  let apiKey = "fc432415aa7fe94fca563ee851cbde80";
  let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResult);
}

function search(event) { 
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  findCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit",search);

function retrievePosition(position) {
  let apiKey = "fc432415aa7fe94fca563ee851cbde80";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=&lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showResult);
}

function getCurrent() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrent);

function convertC() {
 document.querySelector(".tempdisp").innerHTML=`${(Math.round(response.data.main.temp)-32)/1.8} ºF`;
}

let button1 = document.querySelector("#cConvert");
button1.addEventListener("click", convertC);

function convertF() {
 document.querySelector(".tempdisp").innerHTML=`${(Math.round(response.data.main.temp)*1.8)+32} ºC`;
}

let button2 = document.querySelector("#fConvert");
button2.addEventListener("click", convertF);


findCity("Donegal");