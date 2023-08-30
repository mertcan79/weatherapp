# WeatherApp

WeatherApp is a simple application that provides weather forecasts based on the OpenWeatherMap API. This repository contains a backend, a frontend, and a mock server to simulate API responses. The application is dockerized as well for easy deployment and development.

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Setting up the Environment](#setting-up-the-environment)
  - [Running the Application](#running-the-application)
- [Testing](#testing)
- [Configuration](#configuration)
- [Deployment](#deployment)

## Requirements

Before you begin, ensure you have the following:

- Node.js (v14)
- Docker (for deployment and local development)
- OpenWeatherMap API Key (sign up at https://openweathermap.org/)
- After getting the API key, you can insert it via terminal with ```echo "APPID={<KEY>}" > .env```

## Getting Started

### Setting up the Environment

1. Clone the repository to your local machine:
     ```
     git clone https://github.com/mertcan79/weatherapp.git
     ```

2. Navigate to project directory and install via npm.
     ```
    cd weatherapp
    cd backend && npm install
    cd ../frontend && npm install
    cd ../mock-server && npm install
     ```

3. Create a .env file in the backend directory and add your OpenWeatherMap API Key and environment variables:
     ```
    APPID=YOUR_API_KEY
    USE_MOCK_SERVER=false
    DOCKER_ENV=false
     ```
## Running Without Docker
If you prefer to run the WeatherApp locally without Docker, follow these steps:
1. **Backend Setup:**
   - Navigate to the `backend` directory:
     ```sh
     cd backend
     ```
   - Start the backend server:
     ```sh
     npm start
     ```
2. **Frontend Setup:**
   - Navigate to the `frontend` directory:
     ```sh
     cd frontend
     ```
   - Start the frontend application:
     ```sh
     npm start
     ```
3. **Mock Server Setup for testing:**
   - Navigate to the `mock-server` directory:
     ```sh
     cd mock-server
     ```
   - Install the required dependencies:
     ```sh
     npm install
     ```
   - Start the mock server:
     ```sh
     npm start
     ```
4. Access the WeatherApp:
   - Open your web browser and navigate to `http://localhost:8000` to access the frontend.
   - You can now use the WeatherApp to get weather forecasts.
## Testing
Automated tests ensure the application's correctness. Tests work with local and Dockerized versions. To run tests:
Navigate to the `backend` directory and run tests:
1. For mocha
     ```sh
     cd backend/tests
     npm test
     ```
2. For Robot
     ```sh
     robot .
     ```

## Running the Application with Docker
Start the application using Docker Compose:
     
     docker-compose up --build
     
This command will build and start the backend, frontend, and mock server containers.
Access the WeatherApp frontend in your browser at `http://localhost:8000´.   


## Configuration
The WeatherApp configuration is managed through environment variables:

1. APPID: Your OpenWeatherMap API Key.
2. USE_MOCK_SERVER: Set to true to use the mock server for weather data.
3. DOCKER_ENV: Set to true if running in a Docker environment. (Automatically done by docker-compose.yml)


## Deployment
The app should be running on AWS Elastic Beanstalk.
