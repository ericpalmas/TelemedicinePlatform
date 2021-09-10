import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import patients from './data/patients.js'
import diseases from './data/diseases.js'
import doctors from './data/doctors.js'
import surveys from './data/surveys.js'
import sensors from './data/sensors.js'
import questions from './data/questions.js'
import offeredAnswers from './data/offeredAnswers.js'
import samples from './data/samples.js'

import Patient from './models/patientModel.js'
import Disease from './models/diseaseModel.js'
import Doctor from './models/doctorModel.js'
import Survey from './models/surveyModel.js'
import Sensor from './models/sensorModel.js'
import DoctorPatient from './models/doctorPatientModel.js'
import OfferedAnswer from './models/offeredAnswerModel.js'
import PatientDisease from './models/patientDiseaseModel.js'
import Question from './models/questionModel.js'
import Response from './models/responseModel.js'
import Sample from './models/sampleModel.js'
import SurveyResponse from './models/surveyResponseModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Patient.deleteMany()
    await Disease.deleteMany()
    await Doctor.deleteMany()
    await Survey.deleteMany()
    await Sensor.deleteMany()
    await Question.deleteMany()
    await Response.deleteMany()
    await Sample.deleteMany()
    await DoctorPatient.deleteMany()
    await OfferedAnswer.deleteMany()
    await PatientDisease.deleteMany()
    await SurveyResponse.deleteMany()

    const createdPatients = await Patient.insertMany(patients)
    const createdDiseases = await Disease.insertMany(diseases)
    const createdDoctors = await Doctor.insertMany(doctors)
    const createdSurveys = await Survey.insertMany(surveys)
    const createdSensors = await Sensor.insertMany(sensors)

    const updatedQuestions = questions.map((question) => {
      return { ...question, survey: createdSurveys[0]._id }
    })
    const createdQuestions = await Question.insertMany(updatedQuestions)

    const updatedOfferedAnswers = offeredAnswers.map((answer) => {
      return { ...answer, question: createdQuestions[0]._id }
    })
    const createdOfferedAnswers = await OfferedAnswer.insertMany(
      updatedOfferedAnswers,
    )

    // assign patients to doctors
    const doctorPatients = [
      { doctor: createdDoctors[0]._id, patient: createdPatients[0]._id },
      { doctor: createdDoctors[0]._id, patient: createdPatients[1]._id },
      { doctor: createdDoctors[0]._id, patient: createdPatients[2]._id },
      { doctor: createdDoctors[1]._id, patient: createdPatients[3]._id },
      { doctor: createdDoctors[1]._id, patient: createdPatients[4]._id },
    ]
    const createdDoctorPatients = await DoctorPatient.insertMany(doctorPatients)

    // assign diseases to patients
    const patientDiseases = [
      {
        patient: createdPatients[0]._id,
        disease: createdDiseases[0]._id,
      },
      {
        patient: createdPatients[0]._id,
        disease: createdDiseases[2]._id,
      },
      {
        patient: createdPatients[1]._id,
        disease: createdDiseases[1]._id,
      },
      {
        patient: createdPatients[1]._id,
        disease: createdDiseases[2]._id,
      },
    ]
    const createdPatientDisease = await PatientDisease.insertMany(
      patientDiseases,
    )

    //add sensor data (all samples fetched from sensor 1 now)
    const updatedSensorData = samples.map((sample) => {
      return { ...sample, sensor: createdSensors[0]._id }
    })
    const createdSamples = await Sample.insertMany(updatedSensorData)

    // add surveyResponse
    const surveyResponses = [
      {
        survey: createdSurveys[0]._id,
        patient: createdPatients[0]._id,
      },
      {
        survey: createdSurveys[0]._id,
        patient: createdPatients[0]._id,
      },
      {
        survey: createdSurveys[0]._id,
        patient: createdPatients[0]._id,
      },
      {
        survey: createdSurveys[0]._id,
        patient: createdPatients[0]._id,
      },
    ]
    const createdSurveyResponse = await SurveyResponse.insertMany(
      surveyResponses,
    )

    // add responses
    const responses = [
      {
        question: createdQuestions[0]._id,
        patient: createdPatients[0]._id,
        surveyResponse: createdSurveyResponse[0]._id,
        answer: {
          type: 'Slider',
          answer: 3,
        },
      },
      {
        question: createdQuestions[1]._id,
        patient: createdPatients[0]._id,
        surveyResponse: createdSurveyResponse[0]._id,
        answer: {
          type: 'TrueFalse',
          answer: true,
        },
      },
      {
        question: createdQuestions[0]._id,
        patient: createdPatients[0]._id,
        surveyResponse: createdSurveyResponse[1]._id,
        answer: {
          type: 'InsertTime',
          answer: '2:0',
        },
      },
      {
        question: createdQuestions[1]._id,
        patient: createdPatients[0]._id,
        surveyResponse: createdSurveyResponse[1]._id,
        answer: {
          type: 'Open',
          answer: 'yyyyy',
        },
      },
    ]
    const createdResponse = await Response.insertMany(responses)

    console.log('Data imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Patient.deleteMany()
    await Disease.deleteMany()
    await Doctor.deleteMany()
    await Survey.deleteMany()
    await Sensor.deleteMany()
    await Question.deleteMany()
    await Response.deleteMany()
    await Sample.deleteMany()
    await DoctorPatient.deleteMany()
    await OfferedAnswer.deleteMany()
    await PatientDisease.deleteMany()
    await SurveyResponse.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

//i create collections using node backend/seeder
//i destroy collections using node backend/seeder -d

//or i can use script
//npm run data:import
//npm run data:destroy

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
