import React, { useState, useEffect } from "react";
import axios from "axios";

function About() {
  const [berlinWeatherData, setBerlinWeatherData] = useState({});
  const [berlinForecastData, setBerlinForecastData] = useState({});
  const [cairoWeatherData, setCairoWeatherData] = useState({});
  const [cairoForecastData, setCairoForecastData] = useState({});

  useEffect(() => {
    const apiKey = "3939ee7037d2ecd81c858a59a0d27e51";
    const berlinCity = "Berlin";
    const cairoCity = "Cairo";
    const units = "metric"; // Change to 'imperial' for Fahrenheit

    // Fetch Berlin weather data
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${berlinCity}&units=${units}&appid=${apiKey}`
      )
      .then((response) => setBerlinWeatherData(response.data))
      .catch((error) =>
        console.error("Error fetching Berlin weather data:", error)
      );

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${berlinCity}&units=${units}&appid=${apiKey}`
      )
      .then((response) => setBerlinForecastData(response.data))
      .catch((error) =>
        console.error("Error fetching Berlin forecast data:", error)
      );

    // Fetch Cairo weather data
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cairoCity}&units=${units}&appid=${apiKey}`
      )
      .then((response) => setCairoWeatherData(response.data))
      .catch((error) =>
        console.error("Error fetching Cairo weather data:", error)
      );

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${cairoCity}&units=${units}&appid=${apiKey}`
      )
      .then((response) => setCairoForecastData(response.data))
      .catch((error) =>
        console.error("Error fetching Cairo forecast data:", error)
      );
  }, []);

  const renderWeatherCard = (city, weatherData, forecastData) => {
    const temperature = weatherData.main && weatherData.main.temp;
    const humidity = weatherData.main && weatherData.main.humidity;
    const windSpeed = weatherData.wind && weatherData.wind.speed;
    const forecastList = forecastData.list && forecastData.list.slice(0, 6);

    return (
      <div className="bg-cyan-500 text-white rounded-xl p-6 w-80" id="About">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-3xl font-semibold">{city}</div>
            <div className="text-lg">
              {weatherData.weather && weatherData.weather[0].description}
            </div>
          </div>
          <div className="text-5xl font-bold">{temperature}°</div>
        </div>

        {/* Details Section */}
        <div className="mt-4 p-4 bg-cyan-600 rounded-lg grid grid-cols-2 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="text-yellow-300 text-lg">☀️</div>
            <div className="text-sm">Sunrise</div>
            <div className="text-xs">
              {weatherData.sys &&
                new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-yellow-300 text-lg">🌇</div>
            <div className="text-sm">Sunset</div>
            <div className="text-xs">
              {weatherData.sys &&
                new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-white text-lg">💧</div>
            <div className="text-sm">Humidity</div>
            <div className="text-xs">{humidity}%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-white text-lg">🌬️</div>
            <div className="text-sm">Wind Speed</div>
            <div className="text-xs">{windSpeed} km/h</div>
          </div>
        </div>

        {/* 6-Day Forecast */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          {forecastList &&
            forecastList.map((forecast, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-lg font-semibold">
                  {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </div>
                <div className="text-sm">{forecast.weather[0].description}</div>
                <div className="text-xl font-bold">
                  {Math.round(forecast.main.temp)}°
                </div>
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                    alt={forecast.weather[0].description}
                    className="w-10 h-10"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <section id="news" className="news my-20">
      <div className="container-main lg:flex-row flex-col px-4 gap-5">
        <div className="left-side flex-1 max-w-xl flex flex-col gap-4">
          <h1 className="text-3xl font-bold">
            Your #1 source of any weather forecasts and updates.
          </h1>
          <p>Stay updated of any weather changes with WeatherNews.</p>
          We are an expert team specializing on everything that concerns weather
          data. Since 2010, our website has been providing accurate and detailed
          weather forecasts available on any device.
        </div>
        <div className="right-side flex-2 flex gap-5 lg:flex-row flex-col">
          {renderWeatherCard("Berlin", berlinWeatherData, berlinForecastData)}
          {renderWeatherCard("Cairo", cairoWeatherData, cairoForecastData)}
        </div>
      </div>
    </section>
  );
}

export default About;
