const path = require('path');
const dotenv = require('dotenv');

// Construct absolute path to .env file
const envPath = path.resolve(__dirname, '../../.env');
// Load environment variables from .env file
dotenv.config({ path: envPath });

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

// Get the API key from the environment variables
const appId = process.env.APPID;
// Determine whether to use the mock server based on environment variables
const useMockServer = process.env.USE_MOCK_SERVER === 'true';

// Initialize the mapURI variable based on whether mock server is used or not
let mapURI;
if (useMockServer) {
  if (process.env.DOCKER_ENV) {
    // Use mock server URL if running in Docker environment
    mapURI = 'http://mock-server:3001';
  } else {
    // Use mock server URL if running outside of Docker environment
    mapURI = 'http://0.0.0.0:3001';
  }
} else {
  // Use OpenWeatherMap API URL if mock server is not used
  mapURI = 'http://api.openweathermap.org/data/2.5';
}

// Define the port for the backend server to listen on
const port = process.env.PORT || '9000';

// Create a new Koa application
const app = new Koa();

// Enable CORS for the application
app.use(cors());
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

// Function to fetch forecast data from the API
const fetchForecast = async (latitude, longitude) => {
  const endpoint = useMockServer
    ? `${mapURI}/mock-forecast`
    : `${mapURI}/forecast?lat=${latitude}&lon=${longitude}&appid=${appId}&units=metric&cnt=10`;

  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

// Define the /forecast route to fetch and return forecast data
router.get('/forecast', async (ctx) => {
  const { lat, lon } = ctx.query;
  const forecastData = await fetchForecast(lat, lon);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecastData.list ? forecastData.list : [];
});

// Apply the router middleware to the Koa app
app.use(router.routes());
app.use(router.allowedMethods());

// Start listening on the specified port
app.listen(port);

console.log(`App listening on port ${port}`);

// Export the Koa app for testing and other modules
module.exports = app;
