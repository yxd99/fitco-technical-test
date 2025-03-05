# Video Managment Backend
This project consists to manage videos, users, comments, likes, etc. is a cloudinary as SaaS to be able to save videos and store in an optimal way the videos. The project is made in NestJS.

## Installation
```bash
# Install project dependencies
npm i
```

## Run
In development mode:

First you need to create a .env file with the configurations, you can copy the .env.example file and rename it to .env.

```bash
npm run start:dev
```
In production mode:
```bash
npm run start:prod
```

## Setup
The project uses a configuration file called example.env. This file contains the following variables:

| Category | Key | Value |
| --- | --- | --- |
| General | PORT | 3000 |
| General | NODE_ENV | development |
| Database | DB_USER | root |
| Database | DB_PASSWORD |  |
| Database | DB_HOST | 127.0.0.1 |
| Database | DB_PORT | 3306 |
| Database | DB_NAME | video_managment |
| Security | JWT_SECRET |  |
| Security | JWT_EXPIRES_IN |  |
| Cloudinary | CLOUDINARY_CLOUD_NAME |  |
| Cloudinary | CLOUDINARY_API_KEY |  |
| Cloudinary | CLOUDINARY_API_SECRET |  |


You must copy the .env.example file and rename it to .env.

## Docker
The project includes a DockerCompose to create a Docker container. To create the container, run the following command:

```bash
docker-compose up -d
```

## Documentation
The project has documentation made in swagger, to visualize it visit:

```bash
http://localhost:3000/api
```

## Unit Testing
It also has unit tests, uses `npm run test:cov` to generate the document and check the coverage.