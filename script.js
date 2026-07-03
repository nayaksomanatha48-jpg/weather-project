const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weather = document.getElementById("weather");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const weatherIcon = document.getElementById("weather_icon");

const forecastContainer = document.getElementById("forecastContainer");

const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "578abacf35mshf4728cd731de964p19c225jsna0d2bb97895d",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
    }
};

async function getWeather(city) {

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=5`;

    try {

        const response = await fetch(url, options);
        const result = await response.json();

        if (result.error) {
            alert(result.error.message);
            return;
        }

        // Current Weather
        cityName.textContent = `${result.location.name}, ${result.location.country}`;
        temperature.textContent = result.current.temp_c + "°C";
        weather.textContent = result.current.condition.text;
        humidity.textContent = result.current.humidity + "%";
        wind.textContent = result.current.wind_kph + " km/h";
        pressure.textContent = result.current.pressure_mb + " hPa";
        weatherIcon.src = "https:" + result.current.condition.icon;

        // Clear old forecast
        forecastContainer.innerHTML = "";

        // Loop through forecast days
        result.forecast.forecastday.forEach(day => {

            // Convert date to weekday
            const weekDay = new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short"
            });

            forecastContainer.innerHTML += `

            <div class="col-lg-2 col-md-4 col-6 mb-4">

                <div class="forecast-card">

                    <h5 class="forecast-day">${weekDay}</h5>

                    <img src="https:${day.day.condition.icon}" alt="icon">

                    <div class="forecast-temp">
                        ${day.day.avgtemp_c}°C
                    </div>

                    <p>${day.day.condition.text}</p>

                    <hr>

                    <p class="sunrise">
                        🌅 ${day.astro.sunrise}
                    </p>

                    <p class="sunset">
                        🌇 ${day.astro.sunset}
                    </p>

                </div>

            </div>

            `;

        });
        console.log(result);

    } catch (error) {

        console.log(error);
        alert("Unable to fetch weather.");

    }

}

// Search Button
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    getWeather(city);

});

// Enter Key Support
cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});

// Default Weather
getWeather("New York");