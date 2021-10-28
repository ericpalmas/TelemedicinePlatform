import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import Patient from '../models/patientModel.js'
import Study from '../models/studyModel.js'
import Survey from '../models/surveyModel.js'
import SurveyStudy from '../models/surveyStudyModel.js'

// @desc Fetch all studies
// @route GET /api/studies
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const studies = await Study.find({})

    res.json(studies)
  })
)

// @desc Add new study
// @route POST /api/studies
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, description, surveyIds } = req.body

    console.log(req.body)

    if (name !== '') {
      const study = new Study({
        name: name,
        description: description,
      })
      const createdStudy = await study.save()

      if (createdStudy) {
        for (var i = 0; i < surveyIds.length; i++) {
          const surveyStudy = new SurveyStudy({
            survey: surveyIds[i],
            study: createdStudy._id,
          })

          const createdSurveyStudy = await surveyStudy.save()
        }
      }

      res.status(201).json(createdStudy)
    }
  })
)

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Private

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const study = await Study.findById(req.params.id)

    if (study) {
      await study.remove()
      await SurveyStudy.deleteMany({ study: req.params.id })

      res.json({ message: 'Study removed' })
    } else {
      res.status(404)
      throw new Error('Study not found')
    }
  })
)

// @desc    Update a patient
// @route   PUT /api/patients/:id
// @access  Private
// router.put(
//   '/:id',
//   asyncHandler(async (req, res) => {
// const { name, surname, age, therapy, items } = req.body
// const patient = await Patient.findById(req.params.id)
// if (patient) {
//   patient.name = name
//   patient.surname = surname
//   patient.age = age
//   patient.therapy = therapy
//   const updatedPatient = await patient.save()
//   const deletePatientDiseases = await PatientDisease.deleteMany({
//     patient: req.params.id,
//   })
//   if (deletePatientDiseases) {
//     for (var i = 0; i < items.length; i++) {
//       const newDisease = new PatientDisease({
//         patient: req.params.id,
//         disease: items[i],
//       })
//       await newDisease.save()
//     }
//   }
//   res.json(updatedPatient)
// } else {
//   res.status(404)
//   throw new Error('Product not found')
// }
//   })
// )

export default router
