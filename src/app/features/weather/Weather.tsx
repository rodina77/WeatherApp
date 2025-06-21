"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/app/components/searchBar/SearchBar";
import { WeatherData, Coordinates } from "@/app/interfaces";
import axios from "axios";

interface Props {
  coordinates: Coordinates | null;
  onWeatherUpdate: (data: WeatherData) => void;
}

const Weather: React.FC<Props> = ({ coordinates, onWeatherUpdate }) => {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!coordinates) return;
      try {
        const apiKey = "64dc0b29eb6f7ce88dd92727318b789c";
        const url = city
          ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
          : `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        const mapped: WeatherData = {
          city: data.name,
          temperature: data.main.temp,
          condition: data.weather[0].main,
          wind: data.wind.speed,
          humidity: data.main.humidity,
        };

        onWeatherUpdate(mapped);
      } catch (err) {
        console.error("Weather fetch error", err);
        alert("City not found or API issue.");
      }
    };

    fetchWeather();
  }, [coordinates, city]);

  const handleSearch = (searchedCity: string) => {
    setCity(searchedCity);
  };

  return (
    <div
      className="w-full  md:min-h-[300px]  p-4 md:p-8 border-l border-b border-gray-300 dark:border-gray-600 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out flex flex-col justify-center items-center"
      style={{
        borderRadius: "0px 0px 100px 100px",
        background: "linear-gradient(to right, white, #bbdefb, white)",
      }}
    >
      <div className="text-center mb-4 md:mb-6 px-2 pt-28">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-800">
          BlueSky AI App
        </h1>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-[#7FB7DA]">
          Getting started
        </h3>
      </div>

      <div className="w-full max-w-md md:max-w-lg px-4">
        <SearchBar placeholder="Search for a city..." onWeatherUpdate={handleSearch} />
      </div>
    </div>
  );
};

export default Weather;