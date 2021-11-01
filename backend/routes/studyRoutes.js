import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import Patient from '../models/patientModel.js'
import Study from '../models/studyModel.js'
import Survey from '../models/surveyModel.js'
import SurveyStudy from '../models/surveyStudyModel.js'
import SurveyResponse from '../models/surveyResponseModel.js'

import mongoose from 'mongoose'

// left outer join, quando vogliamo anche i non matching documents
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const studies = await Study.aggregate([
      {
        $lookup: {
          from: SurveyStudy.collection.name,
          localField: '_id',
          foreignField: 'study',
          as: 'surveys',
        },
      },
      { $unwind: { path: '$surveys', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'surveys',
          localField: 'surveys.survey',
          foreignField: '_id',
          as: 'surveyToObjects',
        },
      },

      {
        $group: {
          _id: '$_id',
          // surveys: {
          //   $addToSet: '$surveyToObjects',
          // },
          surveys: {
            $addToSet: { $arrayElemAt: ['$surveyToObjects', 0] },
          },
        },
      },

      {
        $lookup: {
          from: Study.collection.name,
          localField: '_id',
          foreignField: '_id',
          as: 'study',
        },
      },
    ])
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
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { name, description, surveyIds } = req.body

    const study = await Study.findById(req.params.id)
    if (study) {
      study.name = name
      study.description = description
      const updatedStudy = await study.save()

      const deletedSurveyStudy = await SurveyStudy.deleteMany({
        study: req.params.id,
      })
      if (deletedSurveyStudy) {
        for (var i = 0; i < surveyIds.length; i++) {
          const newSurveyStudy = new SurveyStudy({
            study: req.params.id,
            survey: surveyIds[i],
          })
          await newSurveyStudy.save()
        }
      }
      res.json(updatedStudy)
    } else {
      res.status(404)
      throw new Error('Study not found')
    }
  })
)

router.get(
  '/patients/:id',
  asyncHandler(async (req, res) => {
    console.log('study patients')
    const patients = await SurveyStudy.aggregate([
      {
        $match: { study: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: SurveyResponse.collection.name,
          localField: 'survey',
          foreignField: 'survey',
          as: 'surveyResponse',
        },
      },
      {
        $unwind: { path: '$surveyResponse', preserveNullAndEmptyArrays: true },
      },

      {
        $lookup: {
          from: Patient.collection.name,
          localField: 'surveyResponse.patient',
          foreignField: '_id',
          as: 'patient',
        },
      },

      {
        $unwind: { path: '$patient', preserveNullAndEmptyArrays: true },
      },

      {
        $group: {
          _id: null,
          patient: { $addToSet: '$patient' },
        },
      },
      {
        $unwind: '$patient',
      },
      {
        $project: {
          _id: 0,
        },
      },

      // {
      //   $project: {
      //     patient: {
      //       $ifNull: ['$patient', false],
      //     },
      //   },
      // },

      // { $project: {Package: 1, deps: {'$setUnion': '$deps.Package'}}}
    ])

    res.json(patients)
  })
)

export default router
