//adding variables connected to elements
var APIKEY = "741b0aef8d0031f234fb37ddb9280e81";

// var variables
var dateEl = $("#date");
var cityTitle = $("#cityName");
var tempEl = $("#Temp");
var windEl = $("#Wind");
var weatherIconEl = $("#ICON");
var weatherTextEl = $("#weather");
var humidityEl = $("#Humidity");
var uvEl = $("#UV");
var searchedCityBtn = $(".btn-search");
var featuredCities = $("#featured-cities");
var pastSearches = $("#past-searches");

var citiesLocal = localStorage.getItem("savedCities");

// console.log(featuredCities.children().length);

if (citiesLocal) {
  pastSearches.attr("style", "display:block;");

  citiesLocal = JSON.parse(citiesLocal);
  var savedCitiesArray = citiesLocal;
  for (let i = 0; i < citiesLocal.length; i++) {
    var newElement = document.createElement("div");
    newElement.classList.add("btn-city");
    newElement.innerHTML =
      citiesLocal[i].city.charAt(0).toUpperCase() +
      citiesLocal[i].city.slice(1);
    featuredCities.append(newElement);
  }
} else {
  pastSearches.attr("style", "display:none");
  var savedCitiesArray = [];
}

//five day forecast elements + Parent + adding classes
var fiveDayParentEl = $("#fiveDayForecast");
fiveDayParentEl.addClass("border border-primary");
var fiveDayChildrenEl = fiveDayParentEl
  .children()
  .addClass("text-white align-items-center d-flex flex-column");

var date = moment().format("l");
//get today's day value (1-29 for most days) and turn into integer
var todayNum = parseInt(date.split("/")[1]);
var counter = 1;

//Utilize the weather APP Fetch

var getWeather = function (city) {
  const getWeatherByCityName = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
    },
  };

  fetch(
    `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
    getWeatherByCityName
  )
    .then((response) => response.json())
    .then(function (data) {
      //set up date
      dateEl.text("(" + date + ")");
      // console.log(data);
      // console.log(data.location.name);
      // console.log(data.location.country);
      cityTitle.text(
        data.location.name +
          ", " +
          data.location.country +
          " // Today's Date:-> "
      );
      tempEl.text(data.current.feelslike_c + " °C");
      windEl.text(data.current.gust_kph + " KPH");
      humidityEl.addClass("").text(data.current.humidity + "%");

      var uvIndex = data.current.uv;
      uvEl.text(uvIndex);
      // console.log(data.current.condition.icon);

      weatherIconEl.attr("src", data.current.condition.icon);
      weatherTextEl.text(" ~It's " + data.current.condition.text);

      if (uvIndex < 3) {
        uvEl.addClass("bg-success px-5 py-3 text-white");
      } else if (uvIndex >= 3 && uvIndex <= 8) {
        uvEl.addClass("bg-warning px-5 py-3 text-white");
      } else {
        uvEl.addClass("bg-danger px-5 py-3 text-white");
      }
    })
    .catch((err) => console.error(err));
};

var forecastWeather = function (city) {
  const fiveDayForecast = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
      "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
    },
  };

  fetch(
    `https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${city}&cnt=5&units=metric`,
    fiveDayForecast
  )
    .then(function (response) {
      if (!response.ok) {
        alert("Pleasecheck spelling of your City");
      } else {
        response.json().then(function (data) {
          // console.log(data.list[0].weather[0].icon);
          // console.log(data);

          for (let i = 0; i <= 4; i++) {
            //create IMG element for icon
            var weatherIconEl = document.createElement("img");

            weatherIconEl.setAttribute(
              "src",
              `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
            );

            //get the forecast date as a text
            var forecastDate =
              date[0] +
              "/" +
              (todayNum + i + 1) +
              "/" +
              parseInt(date.split("/")[2]);
            var dayTemp = data.list[i].temp.day + "°C" + "\n";
            var windSpeed = data.list[i].speed + "Metres/second" + "\n";
            var humidityLevel = data.list[i].humidity + "%" + "\n";

            //create elements SPAN for Temp, Wind, Humidity

            var tempForecast = (document.createElement("span").innerHTML =
              "Temp:" + dayTemp);
            var windForecast = (document.createElement("span").innerHTML =
              "Wind: " + windSpeed);
            var humidityForecast = (document.createElement("span").innerHTML =
              "Humidity: " + humidityLevel);
            fiveDayChildrenEl[i].innerHTML = " ";
            fiveDayChildrenEl[i].append(
              forecastDate,
              weatherIconEl,
              tempForecast,

              windForecast,
              humidityForecast
            );
          }
        });
      }
    })
    .catch(function (err) {
      alert(
        "There was an error in fetching, and it was caught! 5 day forecast" +
          err
      );
    });
};

// make search bar usable
searchedCityBtn.on("click", function (event) {
  event.preventDefault();
  // console.log($(this).prev().val());
  var searchedCity = $(this).prev().val();
  // console.log(searchedCity);
  getWeather(searchedCity);
  forecastWeather(searchedCity);

  var savedSearches = {
    city: searchedCity,
  };

  savedCitiesArray.push(savedSearches);

  localStorage.setItem("savedCities", JSON.stringify(savedCitiesArray));
});

featuredCities.on("click", function (event) {
  console.log(event.target.textContent);
  var clickedCity = event.target.textContent;
  getWeather(clickedCity);
  forecastWeather(clickedCity);
});
