import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getBackground = (condition) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return "linear-gradient(to bottom, #fceabb, #f8b500)";
    case "clouds":
      return "linear-gradient(to bottom, #d7d2cc, #304352)";
    case "rain":
      return "linear-gradient(to bottom, #314755, #26a0da)";
    case "snow":
      return "linear-gradient(to bottom, #e6dada, #274046)";
    case "thunderstorm":
      return "linear-gradient(to bottom, #373B44, #4286f4)";
    case "drizzle":
      return "linear-gradient(to bottom, #89f7fe, #66a6ff)";
    case "mist":
    case "fog":
      return "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
    default:
      return "linear-gradient(to bottom, #a1c4fd, #c2e9fb)";
  }
};

const formatTime = (timestamp, offset) => {
  const localTime = new Date((timestamp + offset) * 1000);
  return localTime.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getLocalTime = (offsetInSeconds) => {
  const nowUTC = new Date(
    new Date().getTime() + new Date().getTimezoneOffset() * 60000,
  );
  const cityTime = new Date(nowUTC.getTime() + offsetInSeconds * 1000);
  return cityTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
      );
      const forecastData = await forecastRes.json();

      if (weatherData.cod === 200 && forecastData.cod === "200") {
        setWeather(weatherData);
        setForecast(filterDailyForecast(forecastData.list));
        setShowSuggestions(false);
      } else {
        setWeather(null);
        setForecast([]);
        alert("City not found.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      );
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      );
      const forecastData = await forecastRes.json();

      if (weatherData.cod === 200 && forecastData.cod === "200") {
        setWeather(weatherData);
        setForecast(filterDailyForecast(forecastData.list));
        setCity(weatherData.name);
        setShowSuggestions(false);
      } else {
        setWeather(null);
        setForecast([]);
        alert("Could not fetch weather for this location.");
      }
    } catch (error) {
      console.error("Geolocation fetch error:", error);
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
      );
      const data = await res.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Suggestion fetch error:", error);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error("Location access denied", error);
      },
    );
  };

  const filterDailyForecast = (data) => {
    const daily = {};
    data.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!daily[date] && item.dt_txt.includes("12:00:00")) {
        daily[date] = item;
      }
    });
    return Object.values(daily);
  };

  return (
    <div
      className="app"
      style={{
        background: weather ? getBackground(weather.weather?.[0]?.main) : "",
        transition: "background 0.5s ease-in-out",
      }}
    >
      <h1>🌦️ Nimbus: Real-Time Weather Forecast</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => {
            const value = e.target.value;
            setCity(value);
            fetchSuggestions(value);
          }}
        />
        <button onClick={fetchWeather}>Search</button>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            <li onClick={getCurrentLocation} className="suggestion-option">
              📍 Use My Current Location
            </li>
            {suggestions.map((item) => (
              <li
                key={`${item.name}-${item.lat}-${item.lon}`}
                className="suggestion-option"
                onClick={() => fetchWeatherByCoords(item.lat, item.lon)}
              >
                {item.name}, {item.state ? item.state + ", " : ""}
                {item.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {weather && (
        <div className="weather-dashboard">
          <div className="weather-main">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>🕒 Local Time: {getLocalTime(weather.timezone)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={`Weather icon for ${weather.weather[0].description}`}
            />
            <p className="condition">{weather.weather[0].main}</p>
            <h3>{weather.main.temp} °C</h3>
          </div>

          <div className="weather-info">
            <p>
              🌡️ Temp Range:{" "}
              {weather.main.temp_min === weather.main.temp_max
                ? "Not available"
                : `${weather.main.temp_min}°C - ${weather.main.temp_max}°C`}
            </p>
            <p>🌡️ Feels Like: {weather.main.feels_like} °C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>📊 Pressure: {weather.main.pressure} hPa</p>
            <p>🌬️ Wind: {weather.wind.speed} m/s</p>
            <p>
              🌅 Sunrise: {formatTime(weather.sys.sunrise, weather.timezone)}
            </p>
            <p>🌇 Sunset: {formatTime(weather.sys.sunset, weather.timezone)}</p>
          </div>

          {forecast.length > 0 && (
            <div className="forecast-section">
              <h3>📅 5-Day Forecast</h3>
              <div className="forecast-cards">
                {forecast.map((day, index) => (
                  <div key={index} className="forecast-card">
                    <p>
                      <strong>
                        {new Date(day.dt_txt).toLocaleDateString(undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </strong>
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].description}
                    />
                    <p>{day.main.temp}°C</p>
                    <p>{day.weather[0].main}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
