// Select DOM elements
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherData = document.getElementById('weatherData');

// API key and base URL
const apiKey = '13ae082b3d6fd45b4f4a1b31fe2cd0a3'; // Replace with your API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';    

// Function to fetch and display weather data
const getWeather = async (city) => {
    const url = `${apiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`; // encode the city name
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Log the response for debugging

        if (data.cod === 200) {
            const { name, main, weather, wind } = data;

            weatherData.innerHTML = `
                <h2>Weather in ${name}</h2>
                <p><strong>Temperature:</strong> ${main.temp}°C</p>
                <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
                <p><strong>Weather:</strong> ${weather[0].description}</p>
                <p><strong>Humidity:</strong> ${main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
            `;
        } else {
            weatherData.innerHTML = `<p>City not found. Please try again.</p>`;
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        weatherData.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
};

// Event listener for button click
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        weatherData.innerHTML = `<p>Please enter a city name.</p>`;
    }
});
