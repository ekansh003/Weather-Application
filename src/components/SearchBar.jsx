import "./SearchBar.css";
import { HiOutlineSearch } from "react-icons/hi";
import { MdMyLocation } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";

function SearchBar({
  city,
  setCity,
  fetchWeather,
  getCurrentLocation,
  suggestions,
  showSuggestions,
  fetchSuggestions,
  fetchWeatherByCoords,
}) {
  return (
    <section className="search-section">
      <div className="search-container">
        <HiOutlineSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search any city..."
          value={city}
          onChange={(e) => {
            const value = e.target.value;
            setCity(value);
            fetchSuggestions(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather();
          }}
        />

        <button
          className="location-icon"
          onClick={getCurrentLocation}
          title="Current Location"
        >
          <MdMyLocation />
        </button>

        <button className="search-btn" onClick={fetchWeather}>
          Search
          <IoArrowForward />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((item) => (
            <div
              key={`${item.name}-${item.lat}-${item.lon}`}
              className="suggestion-item"
              onClick={() => fetchWeatherByCoords(item.lat, item.lon)}
            >
              <span className="city-name">{item.name}</span>

              <span className="country">
                {item.state ? item.state + ", " : ""}
                {item.country}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchBar;
