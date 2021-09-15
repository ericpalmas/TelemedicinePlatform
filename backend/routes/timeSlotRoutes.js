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
    res.json(surveyTimeSlots)
  }),
)

// @desc Add new sensor
// @route POST /api/sensors
// @access Public
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const { survey, items } = req.body

    console.log(req.body)
    const deletedTimeSlots = await TimeSlot.deleteMany({ survey: survey })

    if (deletedTimeSlots) {
      for (var i = 0; i < items.length; i++) {
        const timeSlot = new TimeSlot({
          survey,
          startHour: items[i].startHour,
          startMinutes: items[i].startMinutes,
          endHour: items[i].endHour,
          endMinutes: items[i].endMinutes,
        })
        console.log(timeSlot)
        const res = await timeSlot.save()
        console.log(res)
      }
      res.status(201)
    }

    // console.log(survey)
    // console.log(surveyTimeSlots)
    // console.log(req.body)

    //const timeSlotAdded = await timeSlot.save()
    //res.status(201).json(timeSlotAdded)
  }),
)

export default router
