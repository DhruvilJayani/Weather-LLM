import mqtt from 'mqtt';
import ollama from 'ollama';  // Import the Ollama SDK
import Cerebras from '@cerebras/cerebras_cloud_sdk';

// Initialize Cerebras client with API key
const cerebrasClient = new Cerebras({
  apiKey: "csk-freexmn4nm65fjnc6pvwvh4nvmrtyweeerp2v4demkjdwx9v",
});

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
        const startTime = Date.now();
        // // Call Ollama API for summarization
        // const response = await ollama.chat({
        //     model: 'mistral',
        //     messages: [{ role: 'user', content: prompt }],
        // });
        const completionCreateResponse = await cerebrasClient.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama3.1-8b',  // Replace with the model you're using
        });


        const endTime = Date.now();

        // Calculate the duration
        const duration = endTime - startTime;
        // Log the response content from Ollama
        // console.log("Ollama response:", response.message.content);
        console.log("Cerebras response:", completionCreateResponse);
        console.log("Time taken by Cerebras to respond:", duration, "ms");
        const responseText = completionCreateResponse.choices[0].message.content;
        console.log("Response Text:", responseText);
    } catch (error) {
        console.error("Error while fetching Ollama response:", error);
    }
});

// Error handling
client.on('error', (err) => {
    console.log('Error:', err);
});
