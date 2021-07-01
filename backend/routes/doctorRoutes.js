import express from 'express'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
const router = express.Router()
import Doctor from '../models/doctorModel.js'
import { protect } from '../middleware/authMiddleware.js'

// @desc Fetch all patients
// @route GET /api/patients
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({})

    res.json(doctors)
  }),
)

// @desc   Auth doctor & get token
// @route  POST /api/doctors/login
// @access Public
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const doctor = await Doctor.findOne({ email })

    if (doctor && (await doctor.matchPassword(password))) {
      res.json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        token: generateToken(doctor._id),
        isAdmin: doctor.isAdmin,
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  }),
)

// @desc   Get doctor profile
// @route  GET /api/doctors/profile
// @access Private
router.route('/profile').get(
  protect,
  asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.user._id)

    if (doctor) {
      res.json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        isAdmin: doctor.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }),
)

export default router
