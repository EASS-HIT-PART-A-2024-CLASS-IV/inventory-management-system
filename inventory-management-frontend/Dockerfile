# Use an official node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./ /app

# Install any needed packages
RUN npm install

# Build the React app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV REACT_APP_API_URL=http://localhost:8000/api/v1

# Serve the build directory
CMD ["serve", "-s", "build", "-l", "3000"]
