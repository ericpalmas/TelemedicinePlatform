import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Response from '../models/responseModel.js'
import Question from '../models/questionModel.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import mongoose from 'mongoose'

// @desc Fetch all responses
// @route GET /api/responses/:id
// @access Public
router.route('/:id').get(
  protect,
  asyncHandler(async (req, res) => {
    var val = mongoose.Types.ObjectId(req.params.id)

    //const response = await Response.find({})

    const response = await Response.aggregate(
      [
        {
          $match: {
            patient: { $eq: val },
          },
        },
        {
          $addFields: {
            question_id: { $toObjectId: '$question' },
          },
        },
        {
          $lookup: {
            from: Question.collection.name,
            localField: 'question_id',
            foreignField: '_id',
            as: 'question',
          },
        },
        {
          $group: {
            _id: '$surveyResponse',
            surveys: {
              $push: {
                patient: '$patient',
                question: '$question',
                answer: '$answer',
              },
            },
          },
        },
      ],
      function (err, results) {},
    )

    res.json(response)
  }),
)

export default router
