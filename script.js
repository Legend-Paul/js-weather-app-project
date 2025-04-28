let cityInput = document.querySelector(".city-input");
let currentCityTemp = document.querySelector(".city-temp");
let currentCityName = document.querySelector(".city-name");
let currentMaxTemp = document.querySelector(".max-temp");
let currentMinTemp = document.querySelector(".min-temp");
let currentDay = document.querySelector(".date");
let otherDaysContainer = document.querySelector(".other-days-cont");
let inputCity = "Nairobi";

let day = new Date();
let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

let todayDay = daysOfWeek[day.getDay()];
let todayMonth = monthsOfYear[day.getMonth()];
let todayDate = day.getDate();
let todayYear = day.getFullYear();

function formatDate(dateString) {
    let date = new Date(dateString);
    let dayName = daysOfWeek[date.getDay()];
    return dayName;
}

let formattedDate = formatDate("2025-04-28");
console.log(formattedDate); // Output: Monday, April 28, 2025

function getCityName() {
    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            console.log("Button clicked");
            if (cityInput.value) {
                inputCity = cityInput.value;
                displayCityInfo(inputCity);
                displaOtherDays(inputCity);
                cityInput.value = "";
            }
        }
    });
}
getCityName();

async function getCityInfo(city) {
    try {
        let response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputCity}?unitGroup=us&key=ZWPL3H2TS58FU9V7KU84YNYK3&contentType=json`
        );
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function changeFarhenheitToCelsius(fahrenheit) {
    fahrenheit = parseFloat(fahrenheit);
    if (isNaN(fahrenheit)) {
        return null;
    }
    let celsius = (fahrenheit - 32) * (5 / 9);
    return celsius.toFixed(2);
}

function displayCityInfo(city) {
    getCityInfo(city)
        .then((data) => {
            let cityName = data.resolvedAddress;
            let cityTemp = changeFarhenheitToCelsius(
                data.currentConditions.temp
            );
            let maxTemp = changeFarhenheitToCelsius(data.days[0].tempmax);
            let minTemp = changeFarhenheitToCelsius(data.days[0].tempmin);
            let cityWeather = data.currentConditions.conditions;
            let weatherIcon = data.currentConditions.icon;

            currentCityName.innerHTML = cityName;
            currentCityTemp.innerHTML = `${cityTemp}°C`;
            currentMinTemp.innerHTML = `${minTemp}°C`;
            currentMaxTemp.innerHTML = `${maxTemp}°C`;
            currentDay.innerHTML = `${todayDay}, ${todayMonth} ${todayDate}, ${todayYear}`;
            document.querySelector(".weather-description").innerHTML =
                cityWeather;

            document.querySelector(
                ".weather-icon"
            ).src = `imgs/${weatherIcon}.png`;
        })
        .catch((error) => {
            console.error("Error displaying city info:", error);
        });
}
displayCityInfo();

function createOtherDays(temp, icon, dayName) {
    return `
		<div class="days">
		<p class="day-temp">${temp}</p>
		<img
			class="day-icon"
			src="imgs/clear-day.png"
			alt="imgs/${icon}"
		/>

		<h3 class="day-name">${dayName}</h3>
		</div>
		
	`;
}

function displaOtherDays(city) {
    otherDaysContainer.innerHTML = "";
    let todayIndex = parseInt(day.getDay());
    getCityInfo(city).then((data) => {
        for (todayIndex; todayIndex <= 5; todayIndex++) {
            let daysName = formatDate(data.days[todayIndex].datetime);
            let temp = changeFarhenheitToCelsius(data.days[todayIndex].tempmax);
            let icon = data.days[todayIndex].icon;
            let weatherDescription = data.days[todayIndex].conditions;
            otherDaysContainer.innerHTML += createOtherDays(
                temp,
                icon,
                daysName
            );
        }
    });
}
displaOtherDays(inputCity);
