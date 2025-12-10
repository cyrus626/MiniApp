
import "./weather.css";

export default function Forecast({ data }) {
  return (
    <div className="forecast-container">
      {data.map((daily, i) => {
          const iconUrl = `https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`;
          return(
            <div key={i} className="forecast-card">
              <p>{new Date(daily.dt_txt).toLocaleDateString(undefined, {weekday: 'short'})}</p>
              <img alt="weatherIcon" src={iconUrl}/>
              <p>{Math.round(daily.main.temp_min)}° / {Math.round(daily.main.temp_max)}°</p>
            </div>
          )
      })}
    </div>
  );
}
