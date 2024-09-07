import React, { useState, useEffect } from "react";
import MainNavbar from "../Components/MainNavbar";
import homeBg from "../assets/home_bg.png";
import News from "../Components/About";
import ForecastLocations from "../Components/ForecastLocations";
import About from "../Components/About";
import Newss from "../Components/news";
import Footer from "../Components/Footer";
import axios from "axios";

function Home() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "3939ee7037d2ecd81c858a59a0d27e51";

  const fetchWeather = async () => {
    if (search === "") {
      setWeather(null); // Clear weather data if search is empty
      return;
    }

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [search]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = hours + ":" + minutes.substr(-2) + " " + ampm;
    return formattedTime;
  };

  return (
    <div className="relative">
      <MainNavbar />

      <section
        id="home"
        className="relative bg-cover bg-center bg-no-repeat h-[100vh] p-4"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <div className="container-main  items-center justify-between h-full lg:flex-row flex-col ">
          {/* Right Side */}
          <div className="right-side flex-1 p-4 text-gray-900 font-bold flex flex-col gap-10">
            <p className="text-5xl max-w-xl leading-snug">
              Weather forecasts for thousands of locations around the world
            </p>
            <input
              type="text"
              placeholder="Search for a place..."
              className="bg-transparent border border-solid border-gray-800 rounded-lg px-4 py-2 max-w-xl"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          {/* Left Side */}
          <div className="left-side flex-2 p-4">
            {weather && (
              <div className="bg-blue-800 text-white rounded-xl p-6 w-80">
                {/* Header Section */}
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-3xl font-semibold">
                        {weather.name}
                      </div>
                      <div className="text-lg">
                        {weather.weather[0].description}
                      </div>
                    </div>
                    <div className="text-5xl font-bold">
                      {Math.round(weather.main.temp)}°
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-900 rounded-lg grid grid-cols-2 gap-4 text-center">
                    {/* Sunrise Item */}
                    <div className="flex flex-col items-center">
                      <div className="text-yellow-300 text-lg">☀️</div>
                      <div className="text-sm">Sunrise</div>
                      <div className="text-xs">
                        {formatTime(weather.sys.sunrise)}
                      </div>
                    </div>

                    {/* Sunset Item */}
                    <div className="flex flex-col items-center">
                      <div className="text-yellow-300 text-lg">🌇</div>
                      <div className="text-sm">Sunset</div>
                      <div className="text-xs">
                        {formatTime(weather.sys.sunset)}
                      </div>
                    </div>

                    {/* Humidity Item */}
                    <div className="flex flex-col items-center">
                      <div className="text-white text-lg">💧</div>
                      <div className="text-sm">Humidity</div>
                      <div className="text-xs">{weather.main.humidity}%</div>
                    </div>

                    {/* Wind Speed Item */}
                    <div className="flex flex-col items-center">
                      <div className="text-white text-lg">🌬️</div>
                      <div className="text-sm">Wind Speed</div>
                      <div className="text-xs">{weather.wind.speed} Km/h</div>
                    </div>
                  </div>
                </>
              </div>
            )}
          </div>
        </div>
      </section>
      <About />
      <ForecastLocations />
      <Newss />
      <Footer />
    </div>
  );
}

export default Home;
