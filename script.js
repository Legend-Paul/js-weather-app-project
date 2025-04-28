let cityInput = document.querySelector(".city-input");
let currentCityTemp = document.querySelector(".city-temp");
let currentCityName = document.querySelector(".city-name");
let currentMaxTemp = document.querySelector(".max-temp");
let currentMinTemp = document.querySelector(".min-temp");
let currentDay = document.querySelector(".date");
let day = new Date();

function getCityName() {
    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            console.log("Button clicked");

            console.log(cityName);
            if (cityInput.value) {
                cityName = cityInput.value;
                cityInput.value = "";
            }
        }
    });
}
getCityName();

async function getCityInfo() {
    try {
        let response = await fetch(
            "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Nyeri%2C%20Kenya?unitGroup=us&key=ZWPL3H2TS58FU9V7KU84YNYK3&contentType=json"
        );
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
