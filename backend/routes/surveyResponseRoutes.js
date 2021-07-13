import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Survey from '../models/surveyModel.js'
import SurveyResponse from '../models/surveyResponseModel.js'
import Question from '../models/questionModel.js'
import OfferedAnswer from '../models/offeredAnswerModel.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// @desc   Get survey responses
// @route  GET /api/surveys/assignment
// @access Private
router.route('/surveyAssignments').get(
  protect,
  asyncHandler(async (req, res) => {
    const assignedSurveys = await SurveyResponse.find({})
      .populate('patient')
      .populate('survey')
    res.json(assignedSurveys)
  }),
)

// @desc   Get survey responses
// @route  GET /api/surveys/assignment
// @access Private
router.route('/byDoctorId').get(
  protect,
  asyncHandler(async (req, res) => {
    const assignedSurveys = await SurveyResponse.find({
      doctor: req.user._id,
    })
      .populate('patient')
      .populate('survey')
    res.json(assignedSurveys)
  }),
)

export default router
