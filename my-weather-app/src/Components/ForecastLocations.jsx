import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Countries } from "./Countries"; // Assume Countries array includes flag, country name, and icon (optional).
import { MdArrowOutward } from "react-icons/md";

function ForecastLocations() {
  const navigate = useNavigate();

  const API_KEY = "3939ee7037d2ecd81c858a59a0d27e51";
  const fetchWeatherData = async (lat, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    try {
      const response = await axios.get(apiUrl);
      console.log(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const handleClick = async (country) => {
    // Example coordinates, replace with actual coordinates for each country
    const coordinates = {
      Bulgaria: { lat: 42.7333, lon: 25.2333 },
      "United Kingdom": { lat: 51.509865, lon: -0.118092 },
      Hungary: { lat: 47.1625, lon: 19.5033 },
      Cyprus: { lat: 35.1264, lon: 33.2551 },
      Ukraine: { lat: 48.3794, lon: 31.1656 },
      Spain: { lat: 40.4637, lon: -3.7492 },
      Portugal: { lat: 39.3999, lon: -8.2245 },
      Greece: { lat: 39.0742, lon: 21.8243 },
      Poland: { lat: 51.9194, lon: 19.1451 },
      Germany: { lat: 51.1657, lon: 10.4515 },
      Italy: { lat: 41.8719, lon: 12.5674 },
      Malta: { lat: 35.9375, lon: 14.3754 },
    };

    const { lat, lon } = coordinates[country];
    const weatherData = await fetchWeatherData(lat, lon);

    navigate(`/weather/${country}`, { state: { weatherData } });
  };
  return (
    <section className="world-locations my-10 " id="world-locations">
      <div className="container-main">
        <div className="flex-1 px-4 lg:px-0">
          <h1 className="text-3xl font-bold mb-4">World Weather Forecast</h1>
          <p className="mb-6">Please select a country</p>
          <div className="countries grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {Countries.map((country, ind) => {
              return (
                <div
                  className="flex items-center justify-between bg-white rounded-lg shadow p-4 hover:bg-gray-100 transition duration-200"
                  key={ind}
                >
                  <div className="flex items-center">
                    <img
                      src={country.flag}
                      alt={country.country}
                      className="w-6 h-6 mr-3"
                    />
                    <span className="text-lg font-medium">
                      {country.country}
                    </span>
                  </div>
                  <button
                    className="text-gray-500"
                    onClick={() => handleClick(country.country)}
                  >
                    <MdArrowOutward />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForecastLocations;
