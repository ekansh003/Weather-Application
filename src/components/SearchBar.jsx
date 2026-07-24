import "./SearchBar.css";
import { HiOutlineSearch } from "react-icons/hi";
import { MdMyLocation } from "react-icons/md";

function SearchBar({ city, setCity, fetchWeather, getCurrentLocation }) {
  return (
    <section className="search-section">
      <div className="search-box">
        <HiOutlineSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search any city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="search-btn" onClick={fetchWeather}>
          Search
        </button>
      </div>

      <button className="location-btn" onClick={getCurrentLocation}>
        <MdMyLocation />
        Use Current Location
      </button>
    </section>
  );
}

export default SearchBar;
