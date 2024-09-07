import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { WiHumidity } from "react-icons/wi";
import { CiTempHigh } from "react-icons/ci";
import { MdCompress } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";

const API_KEY = "3939ee7037d2ecd81c858a59a0d27e51"; // Replace with your API key

const fetchWeatherData = async (country) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

function WeatherPage() {
  const { country } = useParams(); // Get country from URL
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData(country);
      if (data) {
        setWeatherData(data);
      } else {
        setError("No weather data available");
      }
      setLoading(false);
    };

    fetchData();
  }, [country]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!weatherData) return <div>No weather data available</div>;

  const { main, weather, name, sys, wind, visibility } = weatherData;
  const { temp, feels_like, humidity, pressure } = main;
  const [weatherCondition] = weather;
  const { sunrise, sunset } = sys;
  const { speed, deg } = wind;

  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 p-6">
      <h1 className="text-4xl font-bold text-white mb-6">{name}</h1>
      <div className="weather-info bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-medium mt-4 capitalize">
            {weatherCondition.description}
          </p>
          <p className="text-6xl font-bold mt-4">{temp}°C</p>
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex items-center space-x-4">
            <CiTempHigh className="size-5" />
            <p className="text-gray-500">Feels Like: {feels_like}°C</p>
          </div>
          <div className="flex items-center space-x-4">
            <WiHumidity className="size-5" />
            <p className="text-gray-500">Humidity: {humidity}%</p>
          </div>
          <div className="flex items-center space-x-4">
            <MdCompress className="size-5" />
            <p className="text-gray-500">Pressure: {pressure} hPa</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaWind className="size-5" />
            <p className="text-gray-500">
              Wind: {speed} m/s, {deg}°
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <MdVisibility className="size-5" />
            <p className="text-gray-500">Visibility: {visibility / 1000} km</p>
          </div>
        </div>
        <div className="flex justify-between mt-6 gap-5">
          <div>
            <FiSunrise className="size-5" />
            <p className="text-gray-500">Sunrise: {sunriseTime}</p>
          </div>
          <div>
            <FiSunset className="size-5" />
            <p className="text-gray-500">Sunset: {sunsetTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
