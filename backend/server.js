import express from 'express'
import dotenv from 'dotenv'
import patients from './data/patients.js'
import diseases from './data/diseases.js'

dotenv.config()

const app = express()

app.get('/api/diseases', (req, res) => {
  res.json(diseases)
})

app.get('/api/patients', (req, res) => {
  res.json(patients)
})

app.get('/api/patients/:id', (req, res) => {
  const patient = patients.find((p) => p._id === req.params.id)
  res.json(patient)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
)
