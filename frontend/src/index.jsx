import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Get the backend endpoint from environment variables
const baseURL = process.env.BACKEND_ENDPOINT || 'http://0.0.0.0:9000';

// Function to fetch forecast data from the API
const getForecastFromApi = async (lat, lon) => {
  try {
    // Fetch forecast data from the backend API
    const response = await fetch(`${baseURL}forecast?lon=${lon}&lat=${lat}`);
    return response.json(); // Parse the response as JSON
  } catch (error) {
    console.error(error);
  }
  return {}; // Return an empty object if an error occurs
};

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
    };
  }

  async componentDidMount() {
    try {
      // Get the current geolocation coordinates using the browser API
      window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Fetch forecast data using the coordinates
        const forecastData = await getForecastFromApi(latitude, longitude);

        if (forecastData) {
          // Sort and format the forecast data
          const sortedForecast = forecastData.sort((a, b) => a.dt - b.dt);
          const forecast = sortedForecast.slice(0, 10).map(item => ({
            date: item.dt_txt,
            temperature: item.main.temp,
            weather: item.weather[0].description,
          }));

          // Update the component's state with the formatted forecast data
          this.setState({ forecast });
        } else {
          console.log('forecastData format error.');
        }
      });
    } catch (error) {
      console.error('Geolocation Error:', error);
    }
  }

  render() {
    const { forecast } = this.state;

    return (
      <div className="weather-container">
        <h1>Weather Forecast</h1>
        <table className="weather-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature</th>
              <th>Weather</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.temperature}</td>
                <td>{item.weather}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// Render the Weather component inside the 'app' element in the DOM
ReactDOM.render(<Weather />, document.getElementById('app'));
