const conditionBg = {
  Clear:        ['#FFD77A', '#FF8C38'],
  Clouds:       ['#B8C9D9', '#7A94A8'],
  Rain:         ['#6A9BC4', '#3A6080'],
  Drizzle:      ['#8DB4CC', '#5580A0'],
  Thunderstorm: ['#4A4E6A', '#1E2035'],
  Snow:         ['#C8DCF0', '#94B4CC'],
  Mist:         ['#A8B8C4', '#78909C'],
  Fog:          ['#A8B8C4', '#78909C'],
  Haze:         ['#C4B090', '#906840'],
  default:      ['#94A8B8', '#607080'],
}

const DAY_TH = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์']

export default function ForecastCard({ item, index, isToday }) {
  const weather  = item.weather[0]
  const cond     = weather.main
  const [c1, c2] = conditionBg[cond] ?? conditionBg.default
  const date     = new Date(item.dt * 1000)
  const dayLabel = isToday ? 'วันนี้' : DAY_TH[date.getDay()]
  const dateStr  = date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })

  return (
    <div
      className={`fc-card${isToday ? ' fc-card--today' : ''}`}
      style={{
        '--c1': c1,
        '--c2': c2,
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div className="fc-card-bg" />

      <div className="fc-card-inner">
        <div className="fc-card-header">
          <span className="fc-card-day">{dayLabel}</span>
          <span className="fc-card-date">{dateStr}</span>
        </div>

        <div className="fc-card-icon-wrap">
          <img
            className="fc-card-icon"
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
        </div>

        <div className="fc-card-desc">{weather.description}</div>

        <div className="fc-card-temp-row">
          <span className="fc-card-max">{Math.round(item.main.temp_max)}°</span>
          <span className="fc-card-divider">/</span>
          <span className="fc-card-min">{Math.round(item.main.temp_min)}°</span>
        </div>

        <div className="fc-card-stats">
          <div className="fc-card-stat">
            <span className="fc-stat-icon">💧</span>
            <span className="fc-stat-val">{item.main.humidity}%</span>
          </div>
          <div className="fc-card-stat">
            <span className="fc-stat-icon">🌬</span>
            <span className="fc-stat-val">{item.wind?.speed ?? '—'} m/s</span>
          </div>
        </div>

        <div className="fc-hum-bar">
          <div
            className="fc-hum-fill"
            style={{ width: `${item.main.humidity}%` }}
          />
        </div>
      </div>
    </div>
  )
}