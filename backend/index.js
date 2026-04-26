import express from 'express'
import axios from 'axios'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors())

app.get('/api/weather', async (req, res) => {
  const { city } = req.query
  try {
    const { data } = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: 'metric',
          lang: 'th'
        }
      }
    )
    res.json(data)
  } catch (err) {
    res.status(err.response?.status || 500)
       .json({ error: 'ไม่พบเมืองนี้' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})