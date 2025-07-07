import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Bielsko-Biała");
  const [forecast, setForecast] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeatherData = async (cityName) => {
    setCity(cityName);
    try {
      setLoading(true);
      setError(null);
  
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();
  
      if (weatherData.cod !== 200) {
        throw new Error(weatherData.message);
      }
  
      setWeatherData(weatherData);
  
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
      const forecastRes = await fetch(forecastUrl);
      const forecastData = await forecastRes.json();
  
      if (forecastData.cod !== "200") {
        throw new Error(forecastData.message);
      }
  
      const dailyForecast = forecastData.list.filter(
        (item, index) => index % 8 === 0
      );
  
      setForecast(dailyForecast);
    } catch (error) {
      setError("City not found or network error.");
      setWeatherData(null);
      setForecast([]);
      console.error("Fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchWeatherData(searchInput);
  }

  if (loading) return <div className="wrapper">Loading...</div>;
  
  return (
    <div className="weather-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      { weatherData && weatherData.main && weatherData.weather &&
       <>
        <header className="weather-header">
          <h1 className="weather-city">{ weatherData.name }</h1>
          <p className="weather-temp">{ weatherData.main.temp } °C</p>
          <p className="weather-condition">{ weatherData.weather[0].main }</p>
        </header>

        <section className="weather-stats">
          <div className="stat-block">
            <p className="stat-label">Humidity</p>
            <p className="stat-value" style={{fontWeight:"bold"}}>{Math.round(weatherData.main.humidity)}%</p>
          </div>
          <div className="stat-block">
            <p className="stat-label">Wind Speed</p>
            <p className="stat-value" style={{fontWeight:"bold"}}>{Math.round(weatherData.wind.speed)} mph</p>
          </div>
        </section>

        { forecast.length > 0 && (
          <section className="forecast-section">
            <h2 className="forecast-title">5-Day Forecast</h2>
            <div className="forecast-grid">
              {forecast.map((day, index) => (
                <div key={index} className="daily-forecast">
                  <p className="forecast-day">
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </section>
        )}
       </>
      }
    </div>
  );
}

export default App;
