import express from 'express'
import axios from 'axios'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors())

// memory cache
const cache = new Map()
const CACHE_TTL = 10 * 60 * 1000 // 10 นาที

app.get('/api/weather', async (req, res) => {
  const { city } = req.query

  if (!city) {
    return res.status(400).json({ error: 'กรุณาระบุชื่อเมือง' })
  }

  // cache for reduce API calls 
  const cacheKey = city.toLowerCase().trim()
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    console.log(`[cache] ${city}`)
    return res.json(cached.data)
  }

  // try to fetch from OpenWeatherMap API if not in cache or expired
  try {
    const { data } = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: 'metric',
          lang: 'th',
        },
      }
    )
    cache.set(cacheKey, { data, time: Date.now() })
    console.log(`[api]   ${city}`)

    res.json(data)
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: 'ไม่พบเมืองนี้' })
  }
})

// Forecast endpoint
app.get('/api/forecast', async (req, res) => {
  const { city } = req.query
 
  if (!city) {
    return res.status(400).json({ error: 'กรุณาระบุชื่อเมือง' })
  }
 
  const cacheKey = `forecast:${city.toLowerCase().trim()}`
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    console.log(`[cache] forecast ${city}`)
    return res.json(cached.data)
  }
 
  try {
    const { data } = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: 'metric',
          lang: 'th',
        },
      }
    )
 
    cache.set(cacheKey, { data, time: Date.now() })
    console.log(`[api]   forecast ${city}`)
 
    res.json(data)
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: 'ไม่พบเมืองนี้' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})