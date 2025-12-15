import "../../index.css";
import "./weather.css";

export default function WeatherCard({ info }) {
  const weather = info.weather[0];
  const main = info.main;
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;
  const dateOptions = {weekday: 'long'};

  return (
    <div className="mt-4 w-full max-w-md rounded-2xl 
    backdrop-blur bg-black/20 p-6 text-white mx-auto">
      <div className="flex items-center justify-center gap-4">
        <img src={iconUrl} alt={weather.description} className="w-20" />
        <h1 className="text-5xl sm:text-4xl font-bold">{Math.round(main.temp)}°C</h1>
        <div className="mt-4 flex flex-col gap-1 text-sm">
          <h2 className="sm:lg text-2xl font-semibold">{info.name}</h2>
          <h3 className="sm:md text-xl font-semibold">{new Date().toLocaleDateString(undefined, dateOptions)}</h3>
        </div>
      </div>
      <p>{weather.description.toUpperCase()}</p>
      <div className="mt-4 flex flex-col gap-2 text-sm 
        sm:flex-row sm:justify-around">
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
