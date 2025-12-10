import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import "./weather.css";
import Forecast from "./Forecast";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [bgClass, setbgClass] = useState("clear");
  const API_KEY = "d176452cb58b6b3d2c92d8ca3d25a5c1"
  // Detect current location on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const geoRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const detected = await geoRes.json();
      if (detected.cod === 200) {
        setCity(detected.name);
        fetchWeather(detected.name);
      } else {
        setError("Could not retrieve current location");
      }

    });
  }, []);



  // function to fetch weather
  const fetchWeather = async (searchCity = city) => {
    try {
      setError("");
      const geoRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      const geoJson = await geoRes.json();

      if (geoJson.cod !== 200) {
        setError("City not found");
        return;
      }
      
      setData(geoJson);

      // set background
      console.log()
      setbgClass(geoJson.weather[0].main.toLowerCase())

      forcastWeather(geoJson.name)

    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    }
  };

  //function to forecast weather
  const forcastWeather = async (cityName) => {
    try {
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastJson = await forecastRes.json();
      
      // collect 5 day forcast
      const data = forecastJson.list.filter((_, index) => {
        if(index < 7) return false;

        return (index + 9) % 8 === 0;
      });
      setForecast(data)
    } catch {
      setError("failed to forecast");
      setForecast([]);
    }
  }

  return (
    <div className={`weather-wrapper ${bgClass}`}>
      <h2>Weather App</h2>

      <div className="weather-input">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather()}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && <WeatherCard info={data} />}

      {forecast && <Forecast data={forecast} />}

    </div>
  );
}
