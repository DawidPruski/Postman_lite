# Postman Lite

Live: https://postman-lite-eu7b.onrender.com

## Overview

Postman Lite is a lightweight HTTP request tool with both a React frontend and a Spring Boot backend.
The frontend composes and sends requests; the backend proxies those requests, stores history, and provides authentication.

## Stack

- Frontend: React 18, Vite, TypeScript, Tailwind CSS
- Backend: Java 21, Spring Boot 3.5.x, Spring Data MongoDB, Spring Security, JWT

## Features

- Select HTTP method (GET, POST, PUT, PATCH, DELETE)
- Enter target URL and optional request body
- Measure timing for requests
- Server-side request/response history persisted in MongoDB
- Authentication (register/login) backed by JWT
- Compact UI with collapsible logs (status, timing, request/response headers & bodies)
- Graceful error handling for network / HTTP errors

## Configuration

Create server/src/main/resources/.env from server/src/main/resources/.env.example.

Required server env vars:
`MONGO_DATABASE, MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, CLIENT_URL, SECRET_KEY (base64)`

Example client .env (client/.env):
`VITE_SERVER_URL=http://localhost:8080`

## Getting Started

Clone the repository to your local machine:

```sh
git clone https://github.com/DawidPruski/Postman_lite.git
```

Frontend:

```sh
  cd client
  npm install
  npm run dev
```

Backend:

```sh
  cd server
  ./mvnw spring-boot:run
```

Docker:

```sh
docker build -t postman-lite .
docker run -p 8080:8080 postman-lite
```

## Endpoints

Auth:

`POST /api/auth/register`
`POST /api/auth/login`

Proxy / history:

`POST /api/requests/send`
`GET /api/requests/history`
`GET /api/requests/get/{id}`

```

> [!NOTE]
> Program is still under development and may not work perfectly. If you face issues, please open an issue thread.
```
