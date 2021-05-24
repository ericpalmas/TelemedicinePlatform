import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Question from '../models/questionModel.js'
import OfferedAnswer from '../models/offeredAnswerModel.js'

// @desc Add new question
// @route POST /api/questions
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {
      text,
      radio,
      check,
      open,
      slider,
      trueFalse,
      incrementDecrement,
      insertTime,
      survey,
      offeredAnswers,
    } = req.body

    const question = new Question({
      text: text,
      radio: radio,
      check: check,
      open: open,
      slider: slider,
      trueFalse: trueFalse,
      incrementDecrement: incrementDecrement,
      insertTime: insertTime,
      survey: survey,
    })
    const createdQuestion = await question.save()

    console.log(createdQuestion)
    console.log(offeredAnswers)

    if (createdQuestion) {
      for (var i = 0; i < offeredAnswers.length; i++) {
        const offeredAnswer = new OfferedAnswer({
          text: offeredAnswers[i].text,
          selected: false,
          question: createdQuestion._id,
          image: offeredAnswers[i].image,
        })
        console.log(offeredAnswer)
        await offeredAnswer.save()
      }
      res.status(201).json(createdQuestion)
    } else {
      res.status(404)
      throw new Error('Question not found')
    }
  }),
)

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id)

    if (question) {
      await question.remove()
      await OfferedAnswer.deleteMany({ question: req.params.id })

      res.json({ message: 'Question removed' })
    } else {
      res.status(404)
      throw new Error('Question not found')
    }
  }),
)

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { text, radio, check, open, survey } = req.body

    const question = await Question.findById(req.params.id)

    if (question) {
      question.text = text
      question.radio = radio
      question.check = check
      question.open = open
      question.survey = survey

      const updatedQuestion = await question.save()
      res.json(updatedQuestion)
    } else {
      res.status(404)
      throw new Error('Question not found')
    }
  }),
)

export default router
