const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

const API_KEY = "3fd03dc55a40876bfa3f0bced015e6d5";

async function checkWeather(city) {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const weather_data = await fetch(url).then(res => res.json());
        console.log(weather_data);

        if (weather_data.cod != 200) {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }

        // Show weather
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = weather_data.weather[0].description;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        // Set weather image & dynamic background
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "assets/cloud.png";
                document.body.style.background = "linear-gradient(to bottom, #757f9a, #d7dde8)";
                break;
            case 'Clear':
                weather_img.src = "assets/clear.png";
                document.body.style.background = "linear-gradient(to bottom, #56ccf2, #2f80ed)";
                break;
            case 'Rain':
                weather_img.src = "assets/rain.png";
                document.body.style.background = "linear-gradient(to bottom, #000428, #004e92)";
                break;
            case 'Mist':
                weather_img.src = "assets/mist.png";
                document.body.style.background = "linear-gradient(to bottom, #606c88, #3f4c6b)";
                break;
            case 'Snow':
                weather_img.src = "assets/snow.png";
                document.body.style.background = "linear-gradient(to bottom, #83a4d4, #b6fbff)";
                break;
            default:
                weather_img.src = "assets/cloud.png";
                document.body.style.background = "linear-gradient(to bottom, #1e3c72, #2a5298)";
        }

    } catch (error) {
        console.error(error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

// Event listeners
searchBtn.addEventListener('click', () => checkWeather(inputBox.value));
inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkWeather(inputBox.value);
});
