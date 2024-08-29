# Use an official Node.js runtime as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 3000

# Run database migrations and seeders
CMD ["sh", "-c", "yarn database:migrate && yarn database:seed && yarn start"]
