import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const city = 'India'; // Default city (replace with dynamic location if needed)
  const apiKey = 'a272e59033604e1783993857240212'; // Replace with your WeatherAPI API key

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return <div className="text-center text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full h-full bg-white/10 p-4 rounded-lg shadow-md relative">
      {/* City, Temperature, and Condition at the top-center */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-2xl font-semibold text-white">{weatherData.location.name}</h2>
        <p className="text-4xl text-white font-bold">{weatherData.current.temp_c}°C</p>
        <p className="text-xl text-gray-300">{weatherData.current.condition.text}</p>
      </div>

      {/* Date and Time at the bottom-left */}
      <div className="absolute bottom-4 left-4 text-left text-gray-300">
        <p>{new Date(weatherData.location.localtime).toLocaleDateString()}</p>
        <p>{new Date(weatherData.location.localtime).toLocaleTimeString()}</p>
      </div>

      {/* Humidity and Wind Speed at the bottom-right */}
      <div className="absolute bottom-4 right-4 text-right text-gray-300">
        <p>Humidity: {weatherData.current.humidity}%</p>
        <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
      </div>
    </div>
  );
};

export default Weather;
