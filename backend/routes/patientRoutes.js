import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Patient from '../models/patientModel.js'
import PatientDisease from '../models/patientDiseaseModel.js'

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

// @desc Add new disease
// @route POST /api/diseases
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, surname, age, therapy } = req.body

    const patient = new Patient({
      name: name,
      surname: surname,
      age: age,
      therapy: therapy,
    })

    const createdPatient = await patient.save()
    res.status(201).json(createdPatient)
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

// @desc Fetch patients by disease
// @route GET /api/patients/patientsByDisease/:id
// @access Public
router.get(
  '/patientsByDisease/:id',
  asyncHandler(async (req, res) => {
    const result = await PatientDisease.find({ disease: req.params.id })
      .select('patient disease')
      .populate('patient')
      .exec()

    if (result) {
      res.json(result)
    } else {
      res.status(404)
      throw new Error('Disease not found')
    }
  }),
)

export default router
