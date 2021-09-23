import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import patientRoutes from './routes/patientRoutes.js'
import diseasesRoutes from './routes/diseaseRoutes.js'
import sensorRoutes from './routes/sensorRoutes.js'
import surveyRoutes from './routes/surveyRoutes.js'
import patientsAndDiseasesRoutes from './routes/patientsAndDiseasesRoutes.js'
import questionsRoutes from './routes/questionsRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import surveyResponseRoutes from './routes/surveyResponseRoutes.js'
import responseRoutes from './routes/responseRoutes.js'
import timeSlotRoutes from './routes/timeSlotRoutes.js'

dotenv.config()

connectDB()

const app = express()

// with this instruction i can pass json to the server
app.use(express.json())

app.use('/api/patients', patientRoutes)
app.use('/api/diseases', diseasesRoutes)
app.use('/api/sensors', sensorRoutes)
app.use('/api/surveys', surveyRoutes)
app.use('/api/patientsAndDiseases', patientsAndDiseasesRoutes)
app.use('/api/questions', questionsRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/surveyResponses', surveyResponseRoutes)
app.use('/api/responses', responseRoutes)
app.use('/api/timeSlot', timeSlotRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
)
