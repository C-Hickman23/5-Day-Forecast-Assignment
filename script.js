var locationInput = document.querySelector("#locationInput");
var searchList = document.querySelector("#searchList");
var fiveDayForecast = document.querySelector("#fiveDayForecast").children;

function searchWeather(){
    let cityName = locationInput.value;
    updateForecast(cityName);
}

function updateSearchList(city) {
    if(searchList.children != null){
        let list = searchList.children;
    }
}

function updateForecast(city) {
    let APIcall = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=2297bb23545f7a6ed36d1793878bc423";
    let weatherData = getWeather(APIcall);
    if(weatherData !== undefined){    
        for(let i = 0; i < 5; i++){
            let head = fiveDayForecast[i].children[0];
            head.innerHTML = weatherData.list[i].dt_txt.slice(0,9).replace("-","/");
        }
    }
}

async function getWeather(APIcall) {
    let response = await fetch(APIcall);
    let responseData = await JSON.parse(response);
    return JSON.parse(responseData);
}

updateForecast("London");