import "./weather.css";
export default function WeatherCard({ info }) {
  const weather = info.weather[0];
  const main = info.main;
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;
  const dateOptions = {weekday: 'long'};

  return (
    <div className="weather-card">
      <div className="weather-main">
        <img src={iconUrl} alt={weather.description} className="weather-icon" />
        <h1>{Math.round(main.temp)}°C</h1>
        <div className="weather-details">
          <h2>{info.name}</h2>
          <h3>{new Date().toLocaleDateString(undefined, dateOptions)}</h3>
        </div>
      </div>
      <p>{weather.description.toUpperCase()}</p>
      <div className="weather-details">
        <p>Humidity: {main.humidity}%</p>
        <p>Windspeed: {info.wind.speed}</p>
        <p>Temperature: {main.temp}, feels like {main.feels_like}°C</p>
      </div>
      
      {/* <h3>{info.name}</h3>

      <div className="weather-main">
        <img src={iconUrl} alt={weather.description} className="weather-icon" />
        <h1>Temp: {Math.round(main.temp)}°C</h1>
      </div>

      <p>{weather.description}</p>

      <div className="weather-details">
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {info.wind.speed} m/s</p>
        <p>Temperature: {main.temp} Feels like: {main.feels_like}</p>
      </div> */}
    </div>
  );
}
