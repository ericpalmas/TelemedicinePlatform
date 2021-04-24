import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import PatientDisease from '../models/patientDiseaseModel.js'

// @desc Fetch patients and diseases
// @route GET /api/patientsAndDiseases
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const ress = await PatientDisease.find({})
      .select('patient disease')
      .populate('patient')
      .populate('disease')
      .exec()

    var patientDiseases = []
    if (ress) {
      for (var i = 0; i < ress.length; i++) {
        let found = patientDiseases.find((o) => o._id === ress[i].patient._id)
        if (
          patientDiseases.filter((e) => e._id === ress[i].patient._id).length >
          0
        ) {
          let founded = patientDiseases.find((o, j) => {
            if (o._id === ress[i].patient._id) {
              //patientDiseases[j].disease.push(ress[i].disease.name)
              patientDiseases[j].disease.concat(', ', ress[i].disease.name)
              var newVal = patientDiseases[j].disease.concat(
                ', ',
                ress[i].disease.name,
              )
              patientDiseases[j].disease = newVal
              return true
            }
          })
        } else {
          let obj = {
            _id: ress[i].patient._id,
            name: ress[i].patient.name,
            surname: ress[i].patient.surname,
            // disease: [ress[i].disease.name],
            disease: ress[i].disease.name,
          }
          patientDiseases.push(obj)
        }
      }
      res.json(patientDiseases)
    } else {
      res.status(404)
      throw new Error('Disease not found')
    }
  }),
)

export default router