import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import "../../index.css";
import Forecast from "./Forecast";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [bgClass, setbgClass] = useState("clear");
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch {
      setError("failed to forecast");
      setForecast([]);
      setLoading(false);
    }
  }

  return (
    <div className={`px-4 py-6  mx-auto ${bgClass}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Weather App</h2>

      <div className="flex flex-col gap-3
      sm:flex-row sm:items:center sm:justify-center
      mb-4">
        <input className="w-full sm:w-72
          px-4 py-2
          border border-gray-300
          rounded-lg
          focus:outline-none
          focus:ring-2 focus:ring-sky-400
        "
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="px-4 py-1
        border border-gray-200
        rounded-lg bg-gray-600 text-white
        hover:bg-gray-700 transition" onClick={() => fetchWeather()}>Search</button>
      </div>
      {loading? <LoadingSpinner /> : "" }
      {error && <p className="error">{error}</p>}

      {data && <WeatherCard info={data} />}

      {forecast && <Forecast data={forecast} />}

    </div>
  );
}
