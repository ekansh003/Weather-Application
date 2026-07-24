import "./EnvironmentStats.css";
import { FaSun, FaLeaf, FaEye } from "react-icons/fa";

function EnvironmentStats({ weather, airQuality, uvIndex }) {
  return (
    <section className="environment-section">
      <div className="environment-card">
        <div className="env-header">
          <FaSun className="env-icon uv" />
          <span>UV Index</span>
        </div>

        <h2>{uvIndex ?? "--"}</h2>

        <p>
          {uvIndex == null
            ? "Loading..."
            : uvIndex <= 2
              ? "Low"
              : uvIndex <= 5
                ? "Moderate"
                : uvIndex <= 7
                  ? "High"
                  : uvIndex <= 10
                    ? "Very High"
                    : "Extreme"}
        </p>
      </div>

      <div className="environment-card">
        <div className="env-header">
          <FaLeaf className="env-icon aqi" />
          <span>Air Quality</span>
        </div>

        <h2>Level {airQuality?.list?.[0]?.main?.aqi ?? "--"}/5</h2>

        <p>
          {(() => {
            const aqi = airQuality?.list?.[0]?.main?.aqi;

            switch (aqi) {
              case 1:
                return "Good";
              case 2:
                return "Fair";
              case 3:
                return "Moderate";
              case 4:
                return "Poor";
              case 5:
                return "Very Poor";
              default:
                return "Loading...";
            }
          })()}
        </p>
      </div>

      <div className="environment-card">
        <div className="env-header">
          <FaEye className="env-icon visibility" />
          <span>Visibility</span>
        </div>

        <h2>{(weather.visibility / 1000).toFixed(1)} km</h2>

        <p>
          {weather.visibility >= 10000
            ? "Excellent"
            : weather.visibility >= 8000
              ? "Very Good"
              : weather.visibility >= 5000
                ? "Good"
                : weather.visibility >= 2000
                  ? "Moderate"
                  : "Poor"}
        </p>
      </div>
    </section>
  );
}

export default EnvironmentStats;
