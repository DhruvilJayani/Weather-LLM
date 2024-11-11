import React, { useEffect, useState } from 'react';

function App() {
  const [weatherAnalysis, setWeatherAnalysis] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection to the server
    const ws = new WebSocket('ws://localhost:9000');

    // Handle incoming messages from the WebSocket server
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.weatherAnalysis) {
        setWeatherAnalysis(data.weatherAnalysis);
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
    <div className="App">
      <h1>Weather Analysis</h1>
      {weatherAnalysis ? (
        <p>{weatherAnalysis}</p>
      ) : (
        <p>Waiting for weather analysis...</p>
      )}
    </div>
  );
}

export default App;
