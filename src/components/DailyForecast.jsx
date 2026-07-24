import { useState } from "react";
import "./DailyForecast.css";

function DailyForecast({ forecast }) {
  const [expanded, setExpanded] = useState(false);

  if (!forecast || forecast.length === 0) return null;

  const visibleForecast = expanded
    ? forecast.slice(0, 7)
    : forecast.slice(0, 3);

  return (
    <section className="forecast-section">
      <div className="forecast-container">
        <div className="forecast-header">
          <h2>Daily Forecast</h2>
        </div>

        {visibleForecast.map((day, index) => {
          const min = day.minTemp;
          const max = day.maxTemp;
          const current = Math.round(day.main.temp);

          const date =
            index === 0
              ? "Today"
              : new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                });

          return (
            <div className="forecast-row" key={index}>
              {/* Day */}
              <div className="forecast-day">{date}</div>

              {/* Weather Icon */}
              <div className="forecast-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
              </div>

              {/* Min Temperature */}
              <div className="forecast-min">{min}°</div>

              {/* Temperature Range */}
              <div className="forecast-bar">
                <div className="forecast-track">
                  <div
                    className="forecast-indicator"
                    style={{
                      left: `${((current - min) / (max - min || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Max Temperature */}
              <div className="forecast-max">{max}°</div>
            </div>
          );
        })}

        <div className="forecast-expand" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show Less ▲" : "Show More ▼"}
        </div>
      </div>
    </section>
  );
}

export default DailyForecast;
