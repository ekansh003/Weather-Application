import "./WeatherStats.css";

function WeatherStats({ weather, formatTime }) {
  if (!weather) return null;

  const stats = [
    {
      title: "Feels Like",
      value: `${Math.round(weather.main.feels_like)}°`,
    },
    {
      title: "Humidity",
      value: `${weather.main.humidity}%`,
    },
    {
      title: "Wind",
      value: `${weather.wind.speed} m/s`,
    },
    {
      title: "Pressure",
      value: `${weather.main.pressure} hPa`,
    },
    {
      title: "Sunrise",
      value: formatTime(weather.sys.sunrise, weather.timezone),
    },
    {
      title: "Sunset",
      value: formatTime(weather.sys.sunset, weather.timezone),
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((item) => (
        <div className="stat-card" key={item.title}>
          <h4>{item.title}</h4>

          <p>{item.value}</p>
        </div>
      ))}
    </section>
  );
}

export default WeatherStats;
