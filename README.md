# Kiosko Backend Challenge

## Description

This project is a backend application for the Kiosko challenge. It provides an API to manage feeds and includes various features such as user authentication, data encryption, and Docker integration. The application is built with Node.js, Express, and Sequelize, using SQLite3 as the database.

## Technologies Used

-   Node.js: JavaScript runtime for building server-side applications.
-   Express: Web framework for Node.js to build the API.
-   Sequelize: ORM for managing SQLite3 database operations.
-   SQLite3: Lightweight, disk-based database engine.
-   Docker: Containerization platform to run the application in isolated environments.
-   bcrypt: Library for hashing passwords.
-   cors: Middleware for handling Cross-Origin Resource Sharing.
-   dotenv: Library for managing environment variables.
-   express-validator: Middleware for validating and sanitizing request data.
-   helmet: Middleware for securing HTTP headers.
-   jsonwebtoken: Library for generating and verifying JSON Web Tokens.
-   senv: Tool for encrypting and decrypting environment variables.

## Running the Application

-   [Setup](#setup)
    -   [Prerequisites](#prerequisites)
    -   [Validate your environment](#validate-your-environment)
    -   [Install Dependencies & Decrypt Environment Variables](#install-dependencies--decrypt-environment-variables)
    -   [Run the required Docker images](#run-the-required-docker-images)
    -   [Database Migrations and Seeders](#database-migrations-and-seeders)
    -   [Run the Backend Services](#run-the-backend-services)
-   [API Documentation](#api-Documentation)
-   [API Smoke Test](#api-smoke-test)

# Setup

## Prerequisites

Before you can run the code from this repository, you must install a few required dependencies:

-   [Node.js 22.x](https://nodejs.org/en/download/). We recommend using [NVM](https://github.com/nvm-sh/nvm) for managing multiple versions of Node.js.
-   [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable). We use yarn as a faster alternative to npm
-   [Docker](https://www.docker.com/products/personal/)

## Validate your environment

To validate you are running the correct version of Node, in a shell run:

```shell
node -v
```

You should see a version like `v22.0.0`. If you have a version less than 20, make sure you install the correct version before continuing.

To validate you are running the correct version of npm, in a shell run:

```shell
yarn -v
```

You should see a version like `1.22.22`. If you have a version less than 1.22, make sure you install the correct version before continuing.

To validate you have Docker installed and running, in a shell run:

```shell
docker -v
```

You should see a version like `Docker version 26.1.4, build 5650f9b`. If you get an error when running this command, make sure you have Docker installed and running before continuing.

> NOTE: make sure you have a minimum Docker version of 20.10.17 or later

## Install Dependencies & Decrypt Environment Variables

> Before you can run installation, make sure you get the environment password from #engineering-backend in Slack and save it with: `echo "kiosko-challenge" > .env.pass` at the root of the project. When you run `yarn install` it will decrypt the `.env.enc` file to `.env` for use.

You must install dependencies before you can build and run the code from this repository.

Then in a shell run:

```shell
yarn install
```

This should take less than a minute or so and you should see no errors upon completion.

## Run the required Docker images

Build and Run Docker Containers, navigate to the source directory and run the following command in a new shell:

```shell
yarn docker:run
```

View Docker Logs:

```shell
yarn docker:logs
```

Stop Docker Containers:

```shell
yarn docker:stop
```

You can then stop the containers manually with the following command:

```shell
docker compose stop
```

## Database Migrations and Seeders

Run Migrations:
Once you have Docker running with your services, you need to initialize the database. In a shell run:

```shell
yarn database:migrate
```

Run Seeders:
Seed the database with initial data using:

```shell
yarn database:seed
```

Assuming no errors, you will have a database initialized with the required tables and initial seed data.

## Run the Backend Services

Once you have the environment setup and the database initialized, you can now run the backend services. In a shell run:

```shell
yarn dev
```

Assuming everything is OK, you should now be able to navigate to http://localhost:3000 and see a not found page.

# API Documentation

The API documentation is available at the following URL:

-   [API Documentation](http://localhost:3000/docs)

## API Smoke Test

You can run a quick smoke test using:

```shell
yarn test
```
