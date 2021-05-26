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

// @desc Add new disease
// @route POST /api/diseases
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, description } = req.body

    if (name !== '') {
      const disease = new Disease({
        name: name,
        description: description,
      })

      const createdDisease = await disease.save()
      res.status(201).json(createdDisease)
    }
  }),
)

// @desc    Delete a disease
// @route   DELETE /api/diseases/:id
// @access  Private
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const diseases = await Disease.find({}).where('_id').ne(req.params.id)
    const disease = await Disease.findById(req.params.id)

    if (disease) {
      const result = await disease.remove()
      await PatientDisease.deleteMany({ disease: req.params.id })
      res.json(diseases)
    } else {
      res.status(404)
      throw new Error('Disease not found')
    }
  }),
)

// @desc    Update a disease
// @route   PUT /api/diseases/:id
// @access  Private

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { name, description } = req.body

    const disease = await Disease.findById(req.params.id)

    if (disease) {
      disease.name = name
      disease.description = description

      const updatedDisease = await disease.save()
      res.json(updatedDisease)
    } else {
      res.status(404)
      throw new Error('Disease not found')
    }
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
