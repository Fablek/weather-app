import { useState } from "react";
import "./index.css";

function App() {
  return (
    <div className="weather-container">
      <header className="weather-header">
        <h1 className="weather-city">Bielsko-Biała</h1>
        <p className="weather-temp">29°C</p>
        <p className="weather-condition">Cloudy</p>
      </header>

      <section className="weather-stats">
        <div className="stat-block">
          <p className="stat-label">Humidity</p>
          <p className="stat-value">60%</p>
        </div>
        <div className="stat-block">
          <p className="stat-label">Wind Speed</p>
          <p className="stat-value">7 mph</p>
        </div>
      </section>

      <section className="forecast-section">
        <h2 className="forecast-title">5-Day Forecast</h2>
        <div className="forecast-grid">
          <div className="daily-forecast">
            <p className="forecast-day">Monday</p>
            <p className="forecast-condition">Cloudy</p>
            <p className="forecast-temp">25°C</p>
          </div>
          <div className="daily-forecast">
            <p className="forecast-day">Tuesday</p>
            <p className="forecast-condition">Rainy</p>
            <p className="forecast-temp">22°C</p>
          </div>
          <div className="daily-forecast">
            <p className="forecast-day">Wednesday</p>
            <p className="forecast-condition">Sunny</p>
            <p className="forecast-temp">28°C</p>
          </div>
          <div className="daily-forecast">
            <p className="forecast-day">Thursday</p>
            <p className="forecast-condition">Partly Cloudy</p>
            <p className="forecast-temp">26°C</p>
          </div>
          <div className="daily-forecast">
            <p className="forecast-day">Friday</p>
            <p className="forecast-condition">Storm</p>
            <p className="forecast-temp">21°C</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
