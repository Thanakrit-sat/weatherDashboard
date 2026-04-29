import { useState, useEffect } from 'react'
import ForecastCard from './ForecastCard'
import './ForecastBoard.css'

function parseForecast(list) {
  const seen = new Set()
  return list
    .filter((item) => item.dt_txt.includes('12:00:00'))
    .filter((item) => {
      const day = item.dt_txt.slice(0, 10)
      if (seen.has(day)) return false
      seen.add(day)
      return true
    })
    .slice(0, 5)
}

export default function ForecastBoard({ city }) {
  const [days, setDays]       = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!city) return
    const fetch5Day = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `http://localhost:3001/api/forecast?city=${encodeURIComponent(city)}`
        )
        if (!res.ok) throw new Error('โหลดพยากรณ์ไม่สำเร็จ')
        const data = await res.json()
        setDays(parseForecast(data.list))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch5Day()
  }, [city])

  if (!city) return null

  return (
    <div className="fb-wrap">
      <div className="fb-header">
        <div className="fb-header-left">
          <span className="fb-label">พยากรณ์อากาศ</span>
          <span className="fb-sublabel">5 วันข้างหน้า · {city}</span>
        </div>
        <div className="fb-dots">
          <span /><span /><span />
        </div>
      </div>

      <div className="fb-body">
        {loading && (
          <div className="fb-loading">
            <div className="fb-spinner" />
            <span>กำลังโหลดพยากรณ์...</span>
          </div>
        )}

        {error && (
          <div className="fb-error">⚠️ {error}</div>
        )}

        {!loading && !error && days.length > 0 && (
          <div className="fb-grid">
            {days.map((item, i) => (
              <ForecastCard
                key={item.dt}
                item={item}
                index={i}
                isToday={i === 0}
              />
            ))}
          </div>
        )}
      </div>

      {!loading && days.length > 0 && (
        <div className="fb-footer">
          <span>ข้อมูลจาก OpenWeatherMap · อัปเดตทุก 3 ชั่วโมง</span>
        </div>
      )}
    </div>
  )
}