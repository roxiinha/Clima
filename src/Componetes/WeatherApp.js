// WeatherApp.js
import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "sua-chave-api";
  const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

  const getWeatherData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: "metric", // Use "imperial" for Fahrenheit
        },
      });

      setWeatherData(response.data);
    } catch (error) {
      console.error("Erro ao obter dados meteorológicos", error);
    }
  };

  return (
    <div>
      <h1>Aplicativo de Clima</h1>
      <input
        type="text"
        placeholder="Digite o nome da cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onMouseEnter={getWeatherData}>Obter Previsão do Tempo</button>

      {weatherData && (
        <div>
          <h2>{weatherData.city.name}</h2>
          {weatherData.list.map((forecast, index) => (
            <div key={index}>
              <p>Data e Hora: {forecast.dt_txt}</p>
              <p>Temperatura: {forecast.main.temp}°C</p>
              <p>Condição: {forecast.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
