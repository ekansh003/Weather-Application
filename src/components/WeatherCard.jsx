import "./WeatherCard.css";

function WeatherCard({ weather, getLocalTime }) {
  if (!weather) return null;

  return (
    <section className="weather-card">
      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt={weather.weather[0].description}
      />

      <h1 className="temperature">{Math.round(weather.main.temp)}°</h1>

      <h2 className="city">
        {weather.name}, {weather.sys.country}
      </h2>

      <p className="condition">{weather.weather[0].main}</p>

      <p className="local-time">🕒 {getLocalTime(weather.timezone)}</p>
    </section>
  );
}

export default WeatherCard;
