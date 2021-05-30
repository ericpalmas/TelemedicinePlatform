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

// @desc Add new sensor
// @route POST /api/sensors
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, description } = req.body

    if (name !== '') {
      const sensor = new Sensor({
        name: name,
        description: description,
      })

      const createdSensor = await sensor.save()
      res.status(201).json(createdSensor)
    }
  }),
)

// @desc    Delete a sensor
// @route   DELETE /api/sensors/:id
// @access  Private
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const sensor = await Sensor.findById(req.params.id)

    if (sensor) {
      await sensor.remove()

      res.json({ message: 'Sensor removed' })
    } else {
      res.status(404)
      throw new Error('Sensor not found')
    }
  }),
)

// @desc    Update a sensor
// @route   PUT /api/sensors/:id
// @access  Private
router.put(
  '/enableDisable',
  asyncHandler(async (req, res) => {
    const { sensorId, patientId } = req.body

    const sensor = await Sensor.findById(sensorId)

    if (sensor) {
      if (sensor.patient === undefined) {
        sensor.patient = patientId
      } else {
        sensor.patient = undefined
      }

      const updatedSensor = await sensor.save()
      res.json(updatedSensor)
    } else {
      res.status(404)
      throw new Error('Disease not found')
    }
  }),
)

export default router
