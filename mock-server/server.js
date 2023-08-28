const express = require('express');

const app = express();
const port = 3001;

app.use(express.json()); // Middleware to parse JSON requests

// Route to handle mock forecast requests
app.get('/mock-forecast', (req, res) => {
  // Mock weather data to be returned in the response
  const mockWeatherData = {
    list: [
      {
        dt_txt: '2023-08-27 15:00:00',
        main: {
          temp: 300.91,
        },
        weather: [
          {
            description: 'clear sky',
          },
        ],
      },
    ],
  };

  // Respond with the mock weather data
  res.json(mockWeatherData);
});

// Start the mock server and listen on the specified port and host
app.listen(port, '0.0.0.0', () => {
  console.log(`Mock server listening at http://0.0.0.0:${port}`);
});
