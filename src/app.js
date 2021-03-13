let currentTime = new Date();

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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showResult(response) {
  let temperatureDisplay = document.getElementById("displaytemp");
  let windDisplay = document.getElementById("wind1");
  let weatherIcon= document.querySelector("#icon");

  tempResult= (response.data.main.temp)

  document.getElementById("cityDisplay").innerHTML = (response.data.name);
  document.getElementById("humidity1").innerHTML = (response.data.main.humidity) + "%";
  document.getElementById("description1").innerHTML= (response.data.weather[0].description);
  
  temperatureDisplay.innerHTML = `${Math.round(response.data.main.temp)}ºC`;
  windDisplay.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecast= (response.data.list[0]);
  let time= document.querySelector("#projection1");
  time.innerHTML= `${formatHours(forecast.dt * 1000)}`;
  let weather= document.querySelector("#projection6");
  weather.innerHTML= `${Math.round(forecast.main.temp_max)} /  ${Math.round(forecast.main.temp_min)}°C`;
  icon1.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
  );
  icon1.setAttribute("alt", forecast.weather[0].description);

  let forecast1= (response.data.list[1]);
  let time1= document.querySelector("#projection2");
  time1.innerHTML=  `${formatHours(forecast1.dt * 1000)}`;
  let weather1= document.querySelector("#projection7");
  weather1.innerHTML= `${Math.round(forecast1.main.temp_max)} /  ${Math.round(forecast1.main.temp_min)}°C`;
    icon2.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${forecast1.weather[0].icon}@2x.png`
  );
  icon2.setAttribute("alt", forecast.weather[0].description);


  let forecast2= (response.data.list[2]);
  let time2= document.querySelector("#projection3");
  time2.innerHTML=  `${formatHours(forecast2.dt * 1000)}`;
  let weather2= document.querySelector("#projection8");
  weather2.innerHTML= `${Math.round(forecast2.main.temp_max)} /  ${Math.round(forecast2.main.temp_min)}°C`;
   icon3.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${forecast2.weather[0].icon}@2x.png`
  );
  icon3.setAttribute("alt", forecast.weather[0].description);


  let forecast3= (response.data.list[3]);
  let time3= document.querySelector("#projection4");
  time3.innerHTML=  `${formatHours(forecast3.dt * 1000)}`;
  let weather3= document.querySelector("#projection9");
  weather3.innerHTML= `${Math.round(forecast3.main.temp_max)} /  ${Math.round(forecast3.main.temp_min)}°C`;
  icon4.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${forecast3.weather[0].icon}@2x.png`
  );
  icon4.setAttribute("alt", forecast.weather[0].description);


  let forecast4= (response.data.list[4]);
  let time4= document.querySelector("#projection5");
  time4.innerHTML=  `${formatHours(forecast4.dt * 1000)}`;
  let weather4= document.querySelector("#projection10");
  weather4.innerHTML= `${Math.round(forecast4.main.temp_max)} /  ${Math.round(forecast4.main.temp_min)}°C`;
}



function findCity(city) {
  let apiKey = "fc432415aa7fe94fca563ee851cbde80";
  let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResult);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

function convertF(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#displaytemp");
  let conversion = (tempResult* 9) / 5 + 32;
  temperatureDisplay.innerHTML= `${Math.round(conversion)} ºF`;
}

function convertC(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#displaytemp");
  temperatureDisplay.innerHTML= `${Math.round(tempResult)} ºC`;
}

let tempResult= null;

let button1 = document.querySelector("#cConvert");
button1.addEventListener("click", convertC);

let button2 = document.querySelector("#fConvert");
button2.addEventListener("click", convertF);

findCity("Donegal");