import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Survey from '../models/surveyModel.js'
import Question from '../models/questionModel.js'
import OfferedAnswer from '../models/offeredAnswerModel.js'

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

// @desc Add new survey template
// @route POST /api/surveys
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, description } = req.body
    const currentDate = new Date()

    const survey = new Survey({
      name: name,
      description: description,
      createdAt: currentDate,
      updatedAt: currentDate,
    })

    const createdSurvey = await survey.save()
    res.status(201).json(createdSurvey)
  }),
)

// @desc Fetch single survey
// @route GET /api/surveys/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    var result = {}

    // query result are immutables
    result.survey = await Survey.findById(req.params.id)
    result.questions = []
    var ress = await Question.find({
      survey: { _id: req.params.id },
    }).populate('survey')

    for (var i = 0; i < ress.length; i++) {
      var question = {}
      question.answers = []
      question.question = ress[i]
      result.questions.push(question)
    }

    if (result) {
      var idList = result.questions.map((q) => q.question._id)
      if (idList) {
        var offeredAnswers = await OfferedAnswer.where('question').in(idList)
        if (offeredAnswers) {
          for (var i = 0; i < result.questions.length; i++) {
            var va = offeredAnswers.filter(
              (answer) =>
                JSON.stringify(answer.question) ===
                JSON.stringify(result.questions[i].question._id),
            )
            result.questions[i].answers = va
          }
        }

        res.json(result)
      }
    } else {
      res.status(404)
      throw new Error('Survey not found')
    }
  }),
)

export default router
