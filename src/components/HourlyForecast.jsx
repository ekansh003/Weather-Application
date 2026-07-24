import "./HourlyForecast.css";

function HourlyForecast({ hourly }) {
  if (!hourly || hourly.length === 0) return null;

  const hours = hourly;

  const maxTemp = Math.max(...hours.map((h) => h.main.temp));
  const minTemp = Math.min(...hours.map((h) => h.main.temp));

  const startX = 7.5;
  const endX = 92.5;

  const coords = hours.map((hour, i) => ({
    x: startX + (i * (endX - startX)) / (hours.length - 1),
    y: 48 - ((hour.main.temp - minTemp) / (maxTemp - minTemp || 1)) * 22,
  }));

  let path = `M ${coords[0].x} ${coords[0].y}`;

  for (let i = 0; i < coords.length - 1; i++) {
    const current = coords[i];
    const next = coords[i + 1];

    const dx = (next.x - current.x) / 2;

    path += ` C ${current.x + dx} ${current.y},
              ${next.x - dx} ${next.y},
              ${next.x} ${next.y}`;
  }

  return (
    <section className="hourly-section">
      <div className="hourly-container">
        <div className="forecast-header">
          <h2>Hourly Forecast</h2>
        </div>

        <div className="hourly-content">
          <div className="hourly-grid">
            {hours.map((hour, index) => (
              <div className="hour-item" key={index}>
                <span className="hour-temp">{Math.round(hour.main.temp)}°</span>

                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt={hour.weather[0].description}
                />

                <span className="hour-rain">
                  {hour.pop > 0 ? `${Math.round(hour.pop * 100)}%` : ""}
                </span>
              </div>
            ))}
          </div>

          <svg
            className="hourly-chart"
            viewBox="0 0 100 95"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="hourGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#56CCF2" />
                <stop offset="35%" stopColor="#7ED6A8" />
                <stop offset="70%" stopColor="#FFD54F" />
                <stop offset="100%" stopColor="#FF914D" />
              </linearGradient>
            </defs>

            {/* Temperature curve */}

            <path
              d={path}
              fill="none"
              stroke="url(#hourGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Guide lines BELOW graph */}

            {coords.map((point, index) => (
              <line
                key={index}
                x1={point.x}
                y1={point.y + 3}
                x2={point.x}
                y2="92"
                stroke="rgba(255,255,255,.12)"
                strokeWidth="0.45"
              />
            ))}
          </svg>

          <div className="hour-times">
            {hours.map((hour, index) => (
              <span key={index}>
                {index === 0
                  ? "Now"
                  : new Date(hour.dt_txt).toLocaleTimeString([], {
                      hour: "numeric",
                    })}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HourlyForecast;
