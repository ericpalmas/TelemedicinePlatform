import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Patient from '../models/patientModel.js'
import PatientDisease from '../models/patientDiseaseModel.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import DoctorPatient from '../models/doctorPatientModel.js'
import SurveyResponse from '../models/surveyResponseModel.js'

// @desc Fetch all patients
// @route GET /api/patients
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const patients = await Patient.find({})

    res.json(patients)
  })
)

// @desc Add new disease
// @route POST /api/diseases
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { doctorId, name, surname, age, therapy, items } = req.body

    const patient = new Patient({
      name: name,
      surname: surname,
      age: age,
      therapy: therapy,
    })

    const createdPatient = await patient.save()

    if (createdPatient) {
      const currentDate = new Date()
      const doctorPatient = new DoctorPatient({
        doctor: doctorId,
        patient: createdPatient._id,
        createdAt: currentDate,
        updatedAt: currentDate,
      })
      const newDoctorPatient = await doctorPatient.save()

      if (items.length !== 0) {
        for (var i = 0; i < items.length; i++) {
          const newDisease = new PatientDisease({
            patient: createdPatient._id,
            disease: items[i],
          })
          const assignedDiseases = await newDisease.save()
        }
      }
      res.status(201).json(createdPatient)
    } else {
      res.status(404)
      throw new Error('Patient not created')
    }
  })
)

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Private

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id)

    if (patient) {
      await patient.remove()
      await PatientDisease.deleteMany({ patient: req.params.id })
      await DoctorPatient.deleteMany({ patient: req.params.id })
      await SurveyResponse.deleteMany({ patient: req.params.id })

      res.json({ message: 'Patient removed' })
    } else {
      res.status(404)
      throw new Error('Patient not found')
    }
  })
)

// @desc    Update a patient
// @route   PUT /api/patients/:id
// @access  Private
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { name, surname, age, therapy, items } = req.body

    const patient = await Patient.findById(req.params.id)

    if (patient) {
      patient.name = name
      patient.surname = surname
      patient.age = age
      patient.therapy = therapy

      const updatedPatient = await patient.save()

      const deletePatientDiseases = await PatientDisease.deleteMany({
        patient: req.params.id,
      })

      if (deletePatientDiseases) {
        for (var i = 0; i < items.length; i++) {
          const newDisease = new PatientDisease({
            patient: req.params.id,
            disease: items[i],
          })
          await newDisease.save()
        }
      }

      res.json(updatedPatient)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
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
  })
)

// @desc Fetch patients by disease
// @route GET /api/patients/patientsByDisease/:id
// @access Public
router.post(
  '/patientsByDisease/:id',
  asyncHandler(async (req, res) => {
    const { surveyId, doctorId } = req.body

    var doctorPatientIds = []
    const doctorPatients = await DoctorPatient.find({
      doctor: doctorId,
    })
    for (var i = 0; i < doctorPatients.length; i++) {
      doctorPatientIds.push(doctorPatients[i].patient + '')
    }

    // mettere il controllo che i pazienti ritornati siano assegnati al dottore loggato
    const result = await PatientDisease.find({ disease: req.params.id })
      .select('patient disease')
      .where('patient')
      .in(doctorPatientIds)
      .populate('patient')
      .exec()

    if (result) {
      res.json(result)
    } else {
      res.status(404)
      throw new Error('Disease not found')
    }
  })
)

export default router
