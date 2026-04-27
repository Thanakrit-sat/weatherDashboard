import { useState } from 'react'
import './SearchBar.css'

export default function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!city.trim()) return
    onSearch(city.trim())
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
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
          disabled={loading || !city.trim()}
        >
          {loading ? <span className="spinner" /> : 'ค้นหา'}
        </button>
      </div>
    </form>
  )
}