let cityInput = document.querySelector(".city-input");
let cityName = null;
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
