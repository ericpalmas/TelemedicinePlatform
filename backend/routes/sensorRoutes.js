import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Sensor from '../models/sensorModel.js'

// @desc Fetch all sensors
// @route GET /api/sensors
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const sensors = await Sensor.find({})
    res.json(sensors)
  }),
)

export default router
