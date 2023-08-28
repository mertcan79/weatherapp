# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . ./

# Expose the port that the app will run on
EXPOSE 8000

# Start the app
CMD [ "npm", "start" ]
