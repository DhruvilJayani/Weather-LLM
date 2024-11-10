import mqtt from 'mqtt';
import ollama from 'ollama';  // Import the Ollama SDK

// MQTT Broker Configuration
const broker = "mqtt://broker.hivemq.com";  // Match this with the Python script's broker
const topic = "weather_data";

// Connect to the MQTT Broker
const client = mqtt.connect(broker);

// When the connection is established
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    
    // Subscribe to the topic
    client.subscribe(topic, (err) => {
        if (err) {
            console.log('Subscription failed:', err);
        } else {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

// When a new message is received
client.on('message', async (topic, message) => {
    console.log(`Received message on topic: ${topic}`);
    
    // Parse the JSON payload
    const weatherData = JSON.parse(message.toString());
    
    // Log the weather data
    console.log("Weather Data:", weatherData);

    // Prepare the prompt for Ollama
    const prompt = `Given the following weather data, can you provide a detailed analysis? The data includes the current temperature, humidity, air pressure, weather condition, wind speed and direction, precipitation, cloud cover, visibility, dew point, UV index, moon phase, and sunrise/sunset times.: ${JSON.stringify(weatherData)}`;

    try {
        // Call Ollama API for summarization
        const response = await ollama.chat({
            model: 'mistral',
            messages: [{ role: 'user', content: prompt }],
        });

        // Log the response content from Ollama
        console.log("Ollama response:", response.message.content);

    } catch (error) {
        console.error("Error while fetching Ollama response:", error);
    }
});

// Error handling
client.on('error', (err) => {
    console.log('Error:', err);
});
