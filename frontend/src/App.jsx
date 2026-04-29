import { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastBoard from './components/ForecastBoard'
import './App.css'

export default function App() {
  const [weather, setWeather]           = useState(null)
  const [searchedCity, setSearchedCity] = useState(null)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)

  const fetchWeather = async (city) => {
    setLoading(true)
    setError(null)
    setWeather(null)
    setSearchedCity(null)

    try {
      const res = await fetch(
        `http://localhost:3001/api/weather?city=${encodeURIComponent(city)}`
      )
      if (!res.ok) throw new Error('ไม่พบเมืองนี้ ลองใหม่อีกครั้ง')
      const data = await res.json()
      setWeather(data)
      setSearchedCity(city)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="app-bg" />

      <header className="app-header">
        <h1 className="app-title">
          <span className="app-title-icon">🌤</span>
          Weather
        </h1>
        <p className="app-subtitle">ค้นหาสภาพอากาศทั่วโลก</p>
      </header>

      <SearchBar onSearch={fetchWeather} loading={loading} />

      {error && (
        <div className="error-box">
          <span>⚠️</span> {error}
        </div>
      )}

      {weather && (
        <div className="app-dashboard">
          <div className="app-left">
            <WeatherCard data={weather} />
          </div>
          <div className="app-right">
            <ForecastBoard city={searchedCity} />
          </div>
        </div>
      )}

      {!weather && !error && !loading && (
        <div className="empty-state">
          <div className="empty-icon">🌍</div>
          <p>พิมพ์ชื่อเมืองเพื่อดูสภาพอากาศ</p>
        </div>
      )}
    </div>
  )
}