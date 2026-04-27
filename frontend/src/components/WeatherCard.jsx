import { useState, useEffect } from 'react'
import './WeatherCard.css'

const conditionConfig = {
  Clear:        { bg: ['#FFD77A', '#FF8C38'] },
  Clouds:       { bg: ['#B8C9D9', '#7A94A8'] },
  Rain:         { bg: ['#6A9BC4', '#3A6080'] },
  Drizzle:      { bg: ['#8DB4CC', '#5580A0'] },
  Thunderstorm: { bg: ['#4A4E6A', '#1E2035'] },
  Snow:         { bg: ['#C8DCF0', '#94B4CC'] },
  Mist:         { bg: ['#A8B8C4', '#78909C'] },
  Fog:          { bg: ['#A8B8C4', '#78909C'] },
  Haze:         { bg: ['#C4B090', '#906840'] },
  default:      { bg: ['#94A8B8', '#607080'] },
}

function getWindDir(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function WeatherCard({ data }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [data])

  if (!data) return null

  const { main, wind, sys, visibility } = data
  const weather = data.weather?.[0]
  const condition = weather?.main || 'default'
  const cfg = conditionConfig[condition] ?? conditionConfig.default
  const [c1, c2] = cfg.bg

  const feelsOffset = Math.round(main.feels_like - main.temp)
  const feelsText =
    feelsOffset > 0 ? `รู้สึกร้อนกว่า +${feelsOffset}°`
    : feelsOffset < 0 ? `รู้สึกเย็นกว่า ${feelsOffset}°`
    : 'รู้สึกเหมือนกัน'

  return (
    <div className={`wc-root${visible ? ' in' : ''}`}>
      <div className="wc-card">

        {/* ── Top: gradient ── */}
        <div
          className="wc-top"
          style={{ background: `linear-gradient(145deg, ${c1}, ${c2})` }}
        >
          <div className="wc-location">📍 {sys?.country}</div>
          <div className="wc-city">{data.name}</div>

          <div className="wc-temp-row">
            <div className="wc-temp">
              {Math.round(main.temp)}<sup>°C</sup>
            </div>
            <div className="wc-icon-col">
              <div className="wc-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
                  alt={weather?.description}
                />
              </div>
              <div className="wc-cond-label">{weather?.description}</div>
            </div>
          </div>

          <div className="wc-feels">{feelsText}</div>
          <div className="wc-range">
            <span>↑ {Math.round(main.temp_max)}°</span>
            <span>↓ {Math.round(main.temp_min)}°</span>
          </div>
        </div>

        {/* ── Bottom: stats grid ── */}
        <div className="wc-bottom">

          <div className="wc-stat">
            <div className="wc-stat-label">ความชื้น</div>
            <div className="wc-stat-value">
              {main.humidity}<span className="wc-stat-unit">%</span>
            </div>
            <div className="wc-hum-bar">
              <div
                className="wc-hum-fill"
                style={{
                  width: `${main.humidity}%`,
                  background: `linear-gradient(90deg, ${c1}, ${c2})`,
                }}
              />
            </div>
          </div>

          <div className="wc-stat">
            <div className="wc-stat-label">ความเร็วลม</div>
            <div className="wc-stat-value">
              {wind?.speed}<span className="wc-stat-unit"> m/s</span>
            </div>
            <div className="wc-stat-sub">ทิศ {getWindDir(wind?.deg ?? 0)}</div>
          </div>

          <div className="wc-stat">
            <div className="wc-stat-label">ทัศนวิสัย</div>
            <div className="wc-stat-value">
              {((visibility ?? 0) / 1000).toFixed(1)}
              <span className="wc-stat-unit"> km</span>
            </div>
          </div>

          <div className="wc-stat">
            <div className="wc-stat-label">ความกดอากาศ</div>
            <div className="wc-stat-value">
              {main.pressure}<span className="wc-stat-unit"> hPa</span>
            </div>
          </div>

          {sys?.sunrise && (
            <div className="wc-sun">
              <div className="wc-sun-item">
                <span className="wc-sun-icon">🌅</span>
                <span className="wc-sun-label">พระอาทิตย์ขึ้น</span>
                <span className="wc-sun-time">{formatTime(sys.sunrise)}</span>
              </div>
              <div className="wc-sun-item">
                <span className="wc-sun-icon">🌇</span>
                <span className="wc-sun-label">พระอาทิตย์ตก</span>
                <span className="wc-sun-time">{formatTime(sys.sunset)}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}