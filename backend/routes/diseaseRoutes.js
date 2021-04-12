import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Disease from '../models/diseaseModel.js'
import PatientDisease from '../models/patientDiseaseModel.js'

// @desc Fetch all diseases
// @route GET /api/diseases
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const diseases = await Disease.find({})
    res.json(diseases)
  }),
)

// @desc Fetch patientDiseases
// @route GET /api/diseases/:patientId
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const result = await PatientDisease.find({ patient: req.params.id })
      .select('patient disease')
      .populate('disease', 'name')
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
