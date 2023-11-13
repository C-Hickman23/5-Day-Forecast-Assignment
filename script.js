var locationInput = document.querySelector("#locationInput");
var searchList = document.querySelector("#searchList");
var fiveDayForecast = document.querySelector("#fiveDayForecast").children;
var currentIcon = document.querySelector("#currentIcon")
var currentCity = document.querySelector("#currentCity");
var currentTemp = document.querySelector("#currentTemp");
var currentWind = document.querySelector("#currentWind");
var currentHumidity = document.querySelector("#currentHumidity");
var cityList = JSON.parse(localStorage.getItem("cityList"))||[];

function searchWeather(){
    let cityName = locationInput.value;
    updateForecast(cityName);
}

function updateSearchList(city) {
    if(!(cityList.includes(city))){
        let button = document.createElement("button");
        button.classList.add("btn","text-center","text-light");
        button.id = city;
        button.innerText = city;
        searchList.appendChild(button);
        cityList.unshift(city);
        localStorage.setItem("cityList",JSON.stringify(cityList));
        searchList
    }
}

function initSearchList() {
    cityList.forEach(city => {
        let button = document.createElement("button");
        button.classList.add("btn","text-center","text-light");
        button.id = city;
        button.innerText = city;
        searchList.appendChild(button);
    })
}

function updateForecast(city) {
    let APIcall = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2297bb23545f7a6ed36d1793878bc423&units=imperial`

    fetch(APIcall)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let newIcon = data.list[0].weather[0].icon;
        currentIcon.src = `https://openweathermap.org/img/wn/${newIcon}@2x.png`;
        currentCity.textContent = data.city.name + " " + data.list[0].dt_txt.slice(0,10);
        updateSearchList(data.city.name);
        currentTemp.textContent = data.list[0].main.temp + " °F";
        currentWind.textContent = data.list[0].wind.speed + " mph";
        currentHumidity.textContent = data.list[0].main.humidity.toString() + "%";
        let j = 0;
        for(let i = 4; i < 40; i += 8){
            newIcon = data.list[i].weather[0].icon;
            fiveDayForecast[j].innerHTML = 
            `<h5>${data.list[i].dt_txt.slice(0,10)}</h5>
            <img src=https://openweathermap.org/img/wn/${newIcon}@2x.png class="icon"></img>
            <p>Temp: ${data.list[i].main.temp} °F</p>
            <p>Wind: ${data.list[i].wind.speed} mph</p>
            <p>Humidity: ${data.list[0].main.humidity.toString()}%</p>`
            j++;
        }
    })
    .catch(console.error);
}

updateForecast(cityList[0]);
initSearchList();