import React, { useEffect, useState } from 'react';
import  Circle  from 'react-progressbar-circle';
import { FaCloud, FaSun, FaWind, FaRegFlag, FaThermometerHalf, FaWater } from 'react-icons/fa'; // Icons

function App() {
  const [weatherAnalysis, setWeatherAnalysis] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState('bg-blue-500');

  useEffect(() => {
    // Create a WebSocket connection to the server
    const ws = new WebSocket('ws://localhost:9000');

    // Handle incoming messages from the WebSocket server
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Access weatherData and weatherAnalysis from the response
      const receivedWeatherData = data.weatherData;
      const receivedWeatherAnalysis = data.weatherAnalysis;

      // Update state with the received data
      setWeatherData(receivedWeatherData);
      setWeatherAnalysis(receivedWeatherAnalysis);

      // Set background class based on weather condition
      if (receivedWeatherData.weather_condition === 'Rainy') {
        setBackgroundClass('bg-gray-900');
      } else if (receivedWeatherData.weather_condition === 'Sunny') {
        setBackgroundClass('bg-yellow-500');
      } else if (receivedWeatherData.weather_condition === 'Foggy') {
        setBackgroundClass('bg-gray-400');
      }
    };

    // Handle WebSocket errors
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className={`min-h-screen ${backgroundClass} p-8 transition-all`}>
      <div className="container mx-auto p-6 rounded-xl shadow-2xl bg-white space-y-8">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">Weather Dashboard</h1>

        {/* Weather Data Section */}
        {weatherData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Temperature with Circular Progress */}
            <div className="bg-red-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Temperature</h2>
              <Circle
                percentage={(weatherData.temperature + 10) * 2} // Assuming the range is -10 to 40°C
                size={100}
                strokeWidth={6}
                color="#FF5733"
              />
              <p className="text-2xl text-gray-700 mt-4">{weatherData.temperature}°C</p>
              <FaThermometerHalf className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Humidity */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Humidity</h2>
              <p className="text-3xl text-gray-700">{weatherData ? weatherData.humidity : 0}%</p>
              <FaWater className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Weather Condition (Cloud Icon) */}
            <div className="bg-teal-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Weather Condition</h2>
              <p className="text-3xl text-gray-700">{weatherData ? weatherData.weather_condition : 'Loading...'}</p>
              <FaCloud className="text-5xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Wind Speed */}
            <div className="bg-indigo-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Wind Speed</h2>
              <p className="text-3xl text-gray-700">{weatherData ? weatherData.wind_speed : 0} m/s</p>
              <FaWind className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Visibility (Fog Icon) */}
            <div className={`bg-gray-200 p-6 rounded-lg shadow-lg text-center ${backgroundClass === 'bg-gray-900' ? 'bg-gray-700' : ''}`}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Visibility</h2>
              <p className="text-3xl text-gray-700">{weatherData ? weatherData.visibility : 0} km</p>
              <FaRegFlag className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* UV Index */}
            <div className={`bg-pink-100 p-6 rounded-lg shadow-lg text-center ${backgroundClass === 'bg-yellow-500' ? 'bg-yellow-300' : ''}`}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">UV Index</h2>
              <p className="text-3xl text-gray-700">{weatherData ? weatherData.UV_index : 0}</p>
              <FaSun className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for Temperature */}
            <div className="bg-red-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Temperature</h2>
              <Circle
                percentage={0}
                size={100}
                strokeWidth={6}
                color="#FF5733"
              />
              <p className="text-2xl text-gray-700 mt-4">0°C</p>
              <FaThermometerHalf className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Placeholder for Humidity */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Humidity</h2>
              <p className="text-3xl text-gray-700">0%</p>
              <FaWater className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Placeholder for Weather Condition */}
            <div className="bg-teal-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Weather Condition</h2>
              <p className="text-3xl text-gray-700">Loading...</p>
              <FaCloud className="text-5xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Placeholder for Wind Speed */}
            <div className="bg-indigo-100 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Wind Speed</h2>
              <p className="text-3xl text-gray-700">0 m/s</p>
              <FaWind className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Placeholder for Visibility */}
            <div className={`bg-gray-200 p-6 rounded-lg shadow-lg text-center ${backgroundClass === 'bg-gray-900' ? 'bg-gray-700' : ''}`}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Visibility</h2>
              <p className="text-3xl text-gray-700">0 km</p>
              <FaRegFlag className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>

            {/* Placeholder for UV Index */}
            <div className={`bg-pink-100 p-6 rounded-lg shadow-lg text-center ${backgroundClass === 'bg-yellow-500' ? 'bg-yellow-300' : ''}`}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">UV Index</h2>
              <p className="text-3xl text-gray-700">0</p>
              <FaSun className="text-4xl text-gray-600 mt-4 mx-auto" />
            </div>
          </div>
        )}

        {/* Weather Analysis (Summary) Section */}
        {weatherAnalysis && (
          <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Weather Analysis</h2>
            <p className="text-gray-700">{weatherAnalysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
