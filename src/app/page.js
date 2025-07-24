"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("weather_history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const fetchWeather = async (city) => {
    setError("");
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=b11180ea0cd2449e933211732252307&q=${city}`
      );
      if (!res.ok) throw new Error("Couldn't fetch weather");
      const data = await res.json();
      setWeather(data);
      const newHistory = [city, ...history.filter((historyCity) => historyCity !== city)].slice(0, 3);
      setHistory(newHistory);
      localStorage.setItem("weather_history", JSON.stringify(newHistory));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city.trim());
  };

  const handleReset = () =>{
    setCity("");
    setWeather(null);
    setError("");
  }

  return (
    <main>
      <header className="bg-blue-900 py-4 px-2.5">
        <h1 className="text-white text-4xl">WeatherAPP</h1>
      </header>
      <section className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
        <form onSubmit={handleSubmit} onReset={handleReset} className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city"
            className="flex-1 border rounded px-2 py-1"
          />
          <button type="reset" className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300 transition-colors cursor-pointer">
            Clear
          </button>
          <button type="submit" className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-400 transition-colors cursor-pointer">
            Search
          </button>
        </form>
        {history.length > 0 && (
          <div className="mb-4">
            <span className="font-semibold">History:</span>
            <div className="flex gap-2 mt-2">
              {history.map((h) => (
                <button
                  key={h}
                  onClick={() => fetchWeather(h)}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {weather && (
          <div className="flex flex-col items-center mt-4">
            <span className="text-2xl font-bold">{weather.location.name}, {weather.location.country}</span>
            <span className="text-xl">{weather.current.temp_c}°C</span>
            <span>{weather.current.condition.text}</span>
            <span>Humidity: {weather.current.humidity}%</span>
            <Image src={`https:${weather.current.condition.icon}`} alt={`${weather.current.condition.text} icon`} width={64} height={64} />
          </div>
        )}
      </section>
    </main>
  );
}
