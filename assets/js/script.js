//adding variables connected to elements

var dateEl = document.querySelector("#date");
var date = moment().format("l");
//get today's day value (1-29 for most days) and turn into integer
var todayNum = parseInt(date.split("/")[1]);

counter = 1;

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
//get date

dateEl.textContent = "(" + date + ")";
