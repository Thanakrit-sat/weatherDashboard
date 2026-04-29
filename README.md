# Weather Dashboard

A web application that displays real-time weather conditions and a 5-day forecast for any city worldwide. Built with React on the frontend and Node.js on the backend, with data sourced from the OpenWeatherMap API.

---

## Features

- Current weather conditions including temperature, humidity, wind speed, visibility, and atmospheric pressure
- 5-day forecast with daily high/low temperatures and weather descriptions
- Dynamic UI that adapts gradient colors based on weather conditions
- In-memory server-side caching to minimize redundant API calls
- Responsive layout that stacks on smaller screens

---

## Tech Stack

**Frontend**
- React 18 (via Vite)
- Plain CSS

**Backend**
- Node.js with Express
- Axios for HTTP requests
- CORS middleware

**External API**
- OpenWeatherMap — Current Weather Data and 5 Day Forecast endpoints

---

---

## Prerequisites

- Node.js v18 or higher
- An API key from [OpenWeatherMap](https://openweathermap.org/api) (free tier is sufficient)

---

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:Thanakrit-sat/weatherDashboard.git
cd weatherDashboard
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file based on the provided template:

```bash
cp .env.example .env
```

Open `.env` and fill in your credentials:

```
OPENWEATHER_API_KEY=your_api_key_here
PORT=3001
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Run the application

Open two terminal windows.

**Terminal 1 — Backend:**
```bash
cd backend
node index.js
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather?city={city}` | Current weather for the specified city |
| GET | `/api/forecast?city={city}` | 5-day forecast (12:00 UTC slots) for the specified city |

Both endpoints use an in-memory cache with a 10-minute TTL to reduce external API usage.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENWEATHER_API_KEY` | Yes | API key obtained from OpenWeatherMap |
| `PORT` | Yes | Port on which the Express server listens |

---

## License

This project is intended for educational purposes.
