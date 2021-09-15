import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import TimeSlot from '../models/timeSlotModel.js'
import Patient from '../models/patientModel.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// @desc Fetch all sensors
// @route GET /api/sensors
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const surveyTimeSlots = await TimeSlot.find({
      survey: req.params.id,
    })

    var result = []
    if (surveyTimeSlots) {
      for (var i = 0; i < surveyTimeSlots.length; i++) {
        result.push({
          startHour: surveyTimeSlots[i].startTime.split(':')[0],
          startMinutes: surveyTimeSlots[i].startTime.split(':')[1],
          endHour: surveyTimeSlots[i].endTime.split(':')[0],
          endMinutes: surveyTimeSlots[i].endTime.split(':')[1],
        })
      }
    }

    res.json(result)
  }),
)

// @desc Add new sensor
// @route POST /api/sensors
// @access Public
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const { survey, startTime, endTime } = req.body

    const timeSlot = new TimeSlot({
      survey,
      startTime,
      endTime,
    })

    const timeSlotAdded = await timeSlot.save()
    res.status(201).json(timeSlotAdded)
  }),
)

export default router
