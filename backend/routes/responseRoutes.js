import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Response from '../models/responseModel.js'
import Question from '../models/questionModel.js'
import Patient from '../models/patientModel.js'
import SurveyResponse from '../models/surveyResponseModel.js'
import Survey from '../models/surveyModel.js'
import SurveyStudy from '../models/surveyStudyModel.js'

import DoctorPatient from '../models/doctorPatientModel.js'
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
            //surveyResponse_id: { $toObjectId: '$surveyResponse' },
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
          $lookup: {
            from: SurveyResponse.collection.name,
            localField: 'surveyResponse',
            foreignField: '_id',
            as: 'surveyResponse',
          },
        },
        {
          $addFields: {
            survey_id: {
              $toObjectId: { $arrayElemAt: ['$question.survey', 0] },
            },
          },
        },

        {
          $lookup: {
            from: Survey.collection.name,
            localField: 'survey_id',
            foreignField: '_id',
            as: 'survey',
          },
        },

        {
          $group: {
            _id: '$surveyResponse',
            surveyResponses: {
              $push: {
                patient: '$patient',
                question: '$question',
                answer: '$answer',
              },
            },

            survey: { $first: '$survey' },
          },
        },
      ],
      function (err, results) {}
    )

    res.json(response)
  })
)

// router.route('/doctor/:id').get(
//   protect,
//   asyncHandler(async (req, res) => {
//     const oggettiToArray = await DoctorPatient.find({
//       doctor: req.params.id,
//     }).select('patient')
//     const listaID = oggettiToArray.map((a) => a.patient)

//     const response = await Response.aggregate([
//       { $match: { patient: { $in: listaID } } },

//       {
//         $lookup: {
//           from: Patient.collection.name,
//           localField: 'patient',
//           foreignField: '_id',
//           as: 'patient',
//         },
//       },

//       {
//         $lookup: {
//           from: Question.collection.name,
//           localField: 'question',
//           foreignField: '_id',
//           as: 'question',
//         },
//       },
//       {
//         $lookup: {
//           from: SurveyResponse.collection.name,
//           localField: 'surveyResponse',
//           foreignField: '_id',
//           as: 'surveyResponse',
//         },
//       },
//       {
//         $addFields: {
//           survey_id: {
//             $toObjectId: { $arrayElemAt: ['$surveyResponse.survey', 0] },
//           },
//         },
//       },
//       {
//         $lookup: {
//           from: Survey.collection.name,
//           localField: 'survey_id',
//           foreignField: '_id',
//           as: 'survey',
//         },
//       },
//       {
//         $group: {
//           _id: '$patient', //$region is the column name in collection
//           surveyResponses: {
//             $push: {
//               patient: '$patient',
//               question: '$question',
//               answer: '$answer',
//               surveyResponse: '$surveyResponse',
//               survey: '$survey',
//             },
//           },
//         },
//       },
//     ])

//     res.json(response)
//   })
// )

router.route('/survey/:id').get(
  protect,
  asyncHandler(async (req, res) => {
    const response = await Response.aggregate([
      {
        $lookup: {
          from: Patient.collection.name,
          localField: 'patient',
          foreignField: '_id',
          as: 'patient',
        },
      },

      {
        $lookup: {
          from: Question.collection.name,
          localField: 'question',
          foreignField: '_id',
          as: 'question',
        },
      },
      {
        $lookup: {
          from: SurveyResponse.collection.name,
          localField: 'surveyResponse',
          foreignField: '_id',
          as: 'surveyResponse',
        },
      },
      {
        $addFields: {
          survey_id: {
            $toObjectId: { $arrayElemAt: ['$surveyResponse.survey', 0] },
          },
        },
      },

      {
        $match: { survey_id: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: Survey.collection.name,
          localField: 'survey_id',
          foreignField: '_id',
          as: 'survey',
        },
      },

      {
        $group: {
          _id: '$surveyResponse',
          surveyResponses: {
            $push: {
              patient: '$patient',
              question: '$question',
              answer: '$answer',
              surveyResponse: '$surveyResponse',
              survey: '$survey',
            },
          },

          survey: { $first: '$survey' },
        },
      },
    ])

    res.json(response)
  })
)

// router.route('/study/:id').get(
//   protect,
//   asyncHandler(async (req, res) => {
//     const response = await Response.aggregate([
//       {
//         $lookup: {
//           from: Patient.collection.name,
//           localField: 'patient',
//           foreignField: '_id',
//           as: 'patient',
//         },
//       },

//       {
//         $lookup: {
//           from: Question.collection.name,
//           localField: 'question',
//           foreignField: '_id',
//           as: 'question',
//         },
//       },
//       {
//         $lookup: {
//           from: SurveyResponse.collection.name,
//           localField: 'surveyResponse',
//           foreignField: '_id',
//           as: 'surveyResponse',
//         },
//       },
//       {
//         $addFields: {
//           survey_id: {
//             $toObjectId: { $arrayElemAt: ['$surveyResponse.survey', 0] },
//           },
//         },
//       },
//       {
//         $lookup: {
//           from: Survey.collection.name,
//           localField: 'survey_id',
//           foreignField: '_id',
//           as: 'survey',
//         },
//       },

//       {
//         $lookup: {
//           from: SurveyStudy.collection.name,
//           localField: 'survey_id',
//           foreignField: 'survey',
//           as: 'study',
//         },
//       },

//       {
//         $addFields: {
//           study_id: {
//             $toObjectId: { $arrayElemAt: ['$study.study', 0] },
//           },
//         },
//       },

//       {
//         $match: { study_id: new mongoose.Types.ObjectId(req.params.id) },
//       },

//       {
//         $group: {
//           _id: '$surveyResponse',
//           surveyResponses: {
//             $push: {
//               patient: '$patient',
//               question: '$question',
//               answer: '$answer',
//               surveyResponse: '$surveyResponse',
//               survey: '$survey',
//             },
//           },

//           survey: { $first: '$survey' },
//         },
//       },
//     ])

//     res.json(response)
//   })
// )

// router.route('/study/:id').get(
//   protect,
//   asyncHandler(async (req, res) => {
//     const response = await Response.aggregate([
//       {
//         $lookup: {
//           from: Patient.collection.name,
//           localField: 'patient',
//           foreignField: '_id',
//           as: 'patient',
//         },
//       },

//       {
//         $unwind: { path: '$patient', preserveNullAndEmptyArrays: true },
//       },

//       {
//         $lookup: {
//           from: Question.collection.name,
//           localField: 'question',
//           foreignField: '_id',
//           as: 'question',
//         },
//       },

//       {
//         $unwind: { path: '$question', preserveNullAndEmptyArrays: true },
//       },
//       {
//         $lookup: {
//           from: SurveyResponse.collection.name,
//           localField: 'surveyResponse',
//           foreignField: '_id',
//           as: 'surveyResponse',
//         },
//       },
//       {
//         $unwind: { path: '$surveyResponse', preserveNullAndEmptyArrays: true },
//       },

//       {
//         $lookup: {
//           from: Survey.collection.name,
//           localField: 'surveyResponse.survey',
//           foreignField: '_id',
//           as: 'survey',
//         },
//       },

//       {
//         $unwind: { path: '$survey', preserveNullAndEmptyArrays: true },
//       },

//       {
//         $lookup: {
//           from: SurveyStudy.collection.name,
//           localField: 'surveyResponse.survey',
//           foreignField: 'survey',
//           as: 'study',
//         },
//       },
//       {
//         $unwind: { path: '$study', preserveNullAndEmptyArrays: true },
//       },

//       {
//         $addFields: {
//           study_id: {
//             $toObjectId: '$study.study',
//           },
//         },
//       },

//       {
//         $match: { study_id: new mongoose.Types.ObjectId(req.params.id) },
//       },

//       {
//         $group: {
//           _id: '$surveyResponse',
//           surveyResponses: {
//             $push: {
//               patient: '$patient',
//               question: '$question',
//               answer: '$answer',
//               surveyResponse: '$surveyResponse',
//               survey: '$survey',
//             },
//           },

//           //survey: { $first: '$survey' },
//         },
//       },
//     ])

//     res.json(response)
//   })
// )

// router.route('/study/:id').get(
//   protect,
//   asyncHandler(async (req, res) => {
//     const response = await Response.aggregate([
//       {
//         $lookup: {
//           from: Patient.collection.name,
//           localField: 'patient',
//           foreignField: '_id',
//           as: 'patient',
//         },
//       },

//       {
//         $unwind: { path: '$patient', preserveNullAndEmptyArrays: true },
//       },

//       {
//         $lookup: {
//           from: Question.collection.name,
//           localField: 'question',
//           foreignField: '_id',
//           as: 'question',
//         },
//       },

//       {
//         $unwind: { path: '$question', preserveNullAndEmptyArrays: true },
//       },
//       {
//         $lookup: {
//           from: SurveyResponse.collection.name,
//           localField: 'surveyResponse',
//           foreignField: '_id',
//           as: 'surveyResponse',
//         },
//       },
//       {
//         $unwind: { path: '$surveyResponse', preserveNullAndEmptyArrays: true },
//       },

//       {
//         $lookup: {
//           from: Survey.collection.name,
//           localField: 'surveyResponse.survey',
//           foreignField: '_id',
//           as: 'survey',
//         },
//       },

//       {
//         $unwind: { path: '$survey', preserveNullAndEmptyArrays: true },
//       },

//       {
//         $lookup: {
//           from: SurveyStudy.collection.name,
//           localField: 'surveyResponse.survey',
//           foreignField: 'survey',
//           as: 'study',
//         },
//       },
//       {
//         $unwind: { path: '$study', preserveNullAndEmptyArrays: true },
//       },

//       {
//         $addFields: {
//           study_id: {
//             $toObjectId: '$study.study',
//           },
//         },
//       },

//       {
//         $match: { study_id: new mongoose.Types.ObjectId(req.params.id) },
//       },

//       {
//         $group: {
//           _id: '$surveyResponse',
//           surveyResponses: {
//             $push: {
//               patient: '$patient',
//               question: '$question',
//               answer: '$answer',
//               surveyResponse: '$surveyResponse',
//               survey: '$survey',
//             },
//           },
//         },
//       },
//       // {
//       //   $group: {
//       //     _id: '$survey._id',
//       //     surveyResponses: {
//       //       $push: {
//       //         patient: '$patient',
//       //         question: '$question',
//       //         answer: '$answer',
//       //         surveyResponse: '$surveyResponse',
//       //         survey: '$survey',
//       //       },
//       //     },
//       //   },
//       // },
//     ])

//     res.json(response)
//   })
// )

router.route('/study/:id').get(
  protect,
  asyncHandler(async (req, res) => {
    const response = await Response.aggregate([
      {
        $lookup: {
          from: Patient.collection.name,
          localField: 'patient',
          foreignField: '_id',
          as: 'patient',
        },
      },

      {
        $unwind: { path: '$patient', preserveNullAndEmptyArrays: true },
      },

      {
        $lookup: {
          from: Question.collection.name,
          localField: 'question',
          foreignField: '_id',
          as: 'question',
        },
      },

      {
        $unwind: { path: '$question', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: SurveyResponse.collection.name,
          localField: 'surveyResponse',
          foreignField: '_id',
          as: 'surveyResponse',
        },
      },
      {
        $unwind: { path: '$surveyResponse', preserveNullAndEmptyArrays: true },
      },

      {
        $lookup: {
          from: Survey.collection.name,
          localField: 'surveyResponse.survey',
          foreignField: '_id',
          as: 'survey',
        },
      },

      {
        $unwind: { path: '$survey', preserveNullAndEmptyArrays: true },
      },

      {
        $lookup: {
          from: SurveyStudy.collection.name,
          localField: 'surveyResponse.survey',
          foreignField: 'survey',
          as: 'study',
        },
      },
      {
        $unwind: { path: '$study', preserveNullAndEmptyArrays: true },
      },

      {
        $addFields: {
          study_id: {
            $toObjectId: '$study.study',
          },
        },
      },

      {
        $match: { study_id: new mongoose.Types.ObjectId(req.params.id) },
      },

      {
        $group: {
          _id: '$surveyResponse',
          surveyResponses: {
            $push: {
              patient: '$patient',
              question: '$question',
              answer: '$answer',
              surveyResponse: '$surveyResponse',
              survey: '$survey',
            },
          },
        },
      },

      {
        $group: {
          _id: '$_id.survey',
          survey: {
            $push: {
              surveyResponses: '$surveyResponses',
            },
          },
        },
      },
    ])

    res.json(response)
  })
)

export default router
