import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Survey from '../models/surveyModel.js'

// @desc Fetch all surveys
// @route GET /api/surveys
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const surveys = await Survey.find({})
    res.json(surveys)
  }),
)

export default router
