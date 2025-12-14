import "../../index.css"
export default function Forecast({ data }) {
  return (
    <div className="mt-6
      flex gap-3
      overflow-x-auto
      pb-2
      sm:justify-center">
      {data.map((daily, i) => {
        const iconUrl = `https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`;
        return (
          <div key={i} className="min-w-[80px]
            rounded-lg
            p-3
            bg-black/30
            text-center
            backdrop-blur">
            <p>{new Date(daily.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })}</p>
            <img className="w-12 h-12" alt="weatherIcon" src={iconUrl} />
            <p>{Math.round(daily.main.temp_min)}° / {Math.round(daily.main.temp_max)}°</p>
          </div>
        )
      })}
    </div>
  );
}
