import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import './App.css'

export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async (e) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      const res = await fetch(
        `http://localhost:3001/api/weather?city=${encodeURIComponent(city)}`
      )
      if (!res.ok) throw new Error('ไม่พบเมืองนี้ ลองใหม่อีกครั้ง')
      const data = await res.json()
      setWeather(data)
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

      <form className="search-form" onSubmit={fetchWeather}>
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="พิมพ์ชื่อเมือง เช่น Bangkok, London..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />
          <button
            className={`search-btn${loading ? ' loading' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : 'ค้นหา'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-box">
          <span>⚠️</span> {error}
        </div>
      )}

      {weather && <WeatherCard data={weather} />}

      {!weather && !error && !loading && (
        <div className="empty-state">
          <div className="empty-icon">🌍</div>
          <p>พิมพ์ชื่อเมืองเพื่อดูสภาพอากาศ</p>
        </div>
      )}
    </div>
  )
}