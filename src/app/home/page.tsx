"use client";

import { useState } from "react";
import axios from "axios";
import { UseGeoLocation } from "../Hooks/useGeoLocation";
import { WeatherData } from "../interfaces";
import dynamic from 'next/dynamic';

const WeatherCard = dynamic(() => import('../components/weatherCard/WeatherCard'), {
  loading: () => <p>Loading weather...</p>,
  ssr: false 
});

const AboutUs = dynamic(() => import('../features/aboutUS/AboutUs'));

const Weather = dynamic(() => import('../features/weather/Weather'), {
  loading: () => <p>Loading weather component...</p>
});

export default function HomePage() {
  const { coordinates, error } = UseGeoLocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  return (
    
    <div>

      <Weather coordinates={coordinates} onWeatherUpdate={setWeatherData} />

      <div className="flex pt-8">
        {weatherData ? (
          <WeatherCard data={weatherData} />
        ) : (
          <p className="text-gray-500">Loading weather data...</p>
        )}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <AboutUs/>
       
    </div>

  );
}
