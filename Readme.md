# Postman Lite

Live: http://postman-lite-pi.vercel.app/

A lightweight, frontend-only HTTP request tool inspired by Postman. It allows you to compose and send HTTP requests, view timing, inspect responses, and keep a session history.

## Features

- Select HTTP method (GET, POST, PUT, PATCH, DELETE).
- Enter target URL and optional request body.
- Send requests with timing measurement (ms) using a unified handler
- Maintain in‑memory request history rendered as collapsible logs:
  - Status code + elapsed time
  - Request method + URL
  - Request headers / body (if present)
  - Response headers / body (pretty printed JSON where possible)
  - Error path gracefully handled (network / HTTP errors)

## Stack

- React 18
- Vite
- Axios
- react-icons
- CSS Modules

## Getting Started

Clone the repository to your local machine:

```sh
git clone https://github.com/DawidPruski/Postman_lite.git
```

and run

```
npm run dev
```

> [!NOTE]  
> Program is still under development and may not work perfectly. If you face issues, please open an issue thread.
