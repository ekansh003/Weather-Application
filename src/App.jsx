import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherStats from "./components/WeatherStats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

console.log("API KEY:", import.meta.env.VITE_OPENWEATHER_API_KEY);

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

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
  const [hourlyForecast, setHourlyForecast] = useState([]);

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
        setHourlyForecast(forecastData.list);
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
        setHourlyForecast(forecastData.list);
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

  const filterDailyForecast = (list) => {
    const grouped = {};

    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(item);
    });

    return Object.values(grouped).map((items) => {
      const noonForecast =
        items.find((item) => item.dt_txt.includes("12:00:00")) || items[0];

      return {
        ...noonForecast,

        minTemp: Math.round(Math.min(...items.map((i) => i.main.temp_min))),

        maxTemp: Math.round(Math.max(...items.map((i) => i.main.temp_max))),
      };
    });
  };

  return (
    <div className="app">
      <Navbar />
      <Hero />

      <div className="weather-container">
        <SearchBar
          city={city}
          setCity={setCity}
          fetchWeather={fetchWeather}
          getCurrentLocation={getCurrentLocation}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          fetchSuggestions={fetchSuggestions}
          fetchWeatherByCoords={fetchWeatherByCoords}
        />

        {weather && (
          <div className="weather-dashboard">
            <div className="weather-overview">
              <WeatherCard weather={weather} getLocalTime={getLocalTime} />

              <WeatherStats weather={weather} formatTime={formatTime} />
            </div>
            <HourlyForecast hourly={hourlyForecast.slice(0, 6)} />
            <DailyForecast forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
