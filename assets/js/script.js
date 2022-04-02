//adding variables connected to elements
var APIKEY = "741b0aef8d0031f234fb37ddb9280e81";
var dateEl = document.querySelector("#date");
var date = moment().format("l");
//get today's day value (1-29 for most days) and turn into integer
var todayNum = parseInt(date.split("/")[1]);
var counter = 1;

//set up date
dateEl.textContent = "(" + date + ")";

//display next 5 dates on each element
var getFiveDays = function () {
  for (let i = todayNum - 1; i <= 5; i++) {
    var nextDay = moment(moment(), "L").add(i, "days").format("L");
    counter = counter;
    var dateFiveDaysEl = document.getElementById(`forecast-day${counter}`);
    dateFiveDaysEl.innerHTML = nextDay;
    counter++;
  }
};
getFiveDays();

fetch(
  "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=" +
    APIKEY
).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  }
});
