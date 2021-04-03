import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Disease from '../models/diseaseModel.js'

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

export default router
