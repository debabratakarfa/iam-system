# Use an official Node runtime as the parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including devDependencies
RUN npm install --production=false

# Copy the current directory contents into the container
COPY . .

# Build the app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Serve the app
CMD ["serve", "-s", "build", "-l", "3000"]

# Make port 3000 available to the world outside this container
EXPOSE 3000
