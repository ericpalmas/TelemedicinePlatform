import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Patient from '../models/patientModel.js'

// @desc Fetch all patients
// @route GET /api/patients
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const patients = await Patient.find({})
    res.json(patients)
  }),
)

// @desc Fetch single patient
// @route GET /api/patients/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id)

    if (patient) {
      res.json(patient)
    } else {
      res.status(404)
      throw new Error('Patient not found')
    }
  }),
)

export default router
