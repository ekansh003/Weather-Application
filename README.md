# 🌤️ Nimbus

<div align="center">

A modern, responsive weather application built with **React + Vite**, featuring a premium glassmorphism interface, real-time weather updates, hourly & daily forecasts, environmental metrics, and smart location search.

**Built for speed • Designed for simplicity • Crafted for modern UI**

</div>

---

## ✨ Features

### 🌍 Weather

- 🌡️ Real-time temperature
- ☁️ Live weather conditions with dynamic icons
- 🤗 Feels Like temperature
- 💧 Humidity
- 🌬️ Wind Speed
- 📊 Atmospheric Pressure
- 👁️ Visibility
- 🌅 Sunrise & 🌇 Sunset
- ☀️ UV Index
- 🍃 Air Quality Index (AQI)

### 📈 Forecasts

- 🕒 Hourly Forecast with temperature trend graph
- 📅 5-Day Forecast
- 🌍 Local time for searched city

### 🔍 Smart Search

- Search by city name
- Autocomplete city suggestions
- Current location weather
- Fast weather lookup

### 🎨 UI/UX

- Premium dark glassmorphism design
- Responsive layout
- Smooth hover animations
- Modern dashboard interface
- Component-based architecture

---

# 🛠 Tech Stack

| Category    | Technology        |
| ----------- | ----------------- |
| Frontend    | React             |
| Build Tool  | Vite              |
| Language    | JavaScript (ES6+) |
| Styling     | CSS3              |
| Weather API | OpenWeather API   |
| UV Index    | Open-Meteo API    |
| Icons       | React Icons       |

---

# 📂 Project Structure

```text
Nimbus/
│
├── public/
│   ├── favicon.ico
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   └── site.webmanifest
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── SearchBar.jsx
│   │   ├── SearchBar.css
│   │   ├── WeatherCard.jsx
│   │   ├── WeatherCard.css
│   │   ├── WeatherStats.jsx
│   │   ├── WeatherStats.css
│   │   ├── HourlyForecast.jsx
│   │   ├── HourlyForecast.css
│   │   ├── EnvironmentStats.jsx
│   │   ├── EnvironmentStats.css
│   │   ├── DailyForecast.jsx
│   │   ├── DailyForecast.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/ekansh003/Nimbus.git
```

Navigate into the project

```bash
cd Nimbus
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
```

Start the development server

```bash
npm run dev
```

Visit

```
http://localhost:5173
```

---

# 🔑 API Configuration

Nimbus uses:

- **OpenWeather API**
  - Current Weather
  - 5-Day Forecast
  - Geocoding
  - Air Quality

- **Open-Meteo API**
  - UV Index

Only the OpenWeather API key is required.

Create a `.env` file:

```env
VITE_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
```

Get your free API key:

https://openweathermap.org/api

---

# 🌐 Live Demo

**Vercel**

https://nimbus-five-vert.vercel.app/

---

# 🔮 Roadmap

- ⭐ Favorite Cities
- 🕘 Search History
- 🌦 Animated Weather Backgrounds
- 🌍 Multi-language Support
- 🔔 Severe Weather Alerts
- 📊 Weather Analytics
- 📱 Progressive Web App (PWA)
- 🌧 Rain Probability Visualization

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve Nimbus:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 👨‍💻 Author

**Ekansh Jaiswal**

GitHub

https://github.com/ekansh003

---

# ⭐ Show Your Support

If you like Nimbus, consider giving this repository a ⭐.

It helps others discover the project and motivates future improvements.

---

<div align="center">

Made with ❤️ using React + Vite

</div>
