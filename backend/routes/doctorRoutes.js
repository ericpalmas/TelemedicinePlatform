import express from 'express'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
const router = express.Router()
import Doctor from '../models/doctorModel.js'
import DoctorPatient from '../models/doctorPatientModel.js'

import { protect, admin } from '../middleware/authMiddleware.js'

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
        surname: doctor.surname,
        email: doctor.email,
        token: generateToken(doctor._id),
        isAdmin: doctor.isAdmin,
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })
)

// @desc   Register a new doctor
// @route  POST /api/doctors
// @access Public
router.route('/').post(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, surname, email, password } = req.body

    const userExists = await Doctor.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await Doctor.create({
      name,
      surname,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
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
        surname: doctor.surname,
        email: doctor.email,
        isAdmin: doctor.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private
router.route('/profile').put(
  protect,
  asyncHandler(async (req, res) => {
    const user = await Doctor.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.surname = req.body.surname || user.surname
      user.email = req.body.email || user.email

      if (req.body.password) {
        user.password = req.body.password || user.password
      }

      const updateUser = await user.save()

      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        surname: updateUser.surname,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
router.route('/:id').delete(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await Doctor.findById(req.params.id)
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Private/Admin
router.route('/').get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await Doctor.find({})
    res.json(users)
  })
)

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Private/Admin
router.route('/:id').get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await Doctor.findById(req.params.id).select('-password')
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
router.route('/:id').put(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await Doctor.findById(req.params.id)

    if (user) {
      user.name = req.body.name || user.name
      user.surname = req.body.surname || user.surname
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin

      const updateUser = await user.save()

      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        surname: updateUser.surname,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

// @desc    Get doctor patients
// @route   GET /api/doctors/patients/:id
// @access  Private/Admin
router.route('/patients/:id').get(
  protect,
  asyncHandler(async (req, res) => {
    const users = await DoctorPatient.find({ doctor: req.params.id })
      .populate('patient')
      .select('patient')
    res.json(users)
  })
)

export default router
