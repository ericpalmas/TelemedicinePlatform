import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  patientListReducer,
  patientReducer,
  patientByDiseaseListReducer,
  patientCreateReducer,
  patientDeleteReducer,
  patientUpdateReducer,
  patientsAndDiseaseListReducer,
  patientsAndDiseasesListReducer,
} from './reducers/patientReducers'
import {
  diseaseListReducer,
  patientDiseasesListReducer,
  diseaseCreateReducer,
  diseaseDeleteReducer,
  diseaseUpdateReducer,
} from './reducers/diseaseReducers'
import {
  sensorListReducer,
  sensorCreateReducer,
  sensorEnableReducer,
  enabledSensorListReducer,
} from './reducers/sensorReducers'
import {
  surveyTemplateListReducer,
  surveyReducer,
  surveyCreateReducer,
  surveySaveIdReducer,
  currentSurveyReducer,
  surveyPatientAssignmentReducer,
  surveyResponsesByDoctorReducer,
  surveyResponsesReducer,
  surveyAssignedWithPatientReducer,
  surveyDeleteReducer,
} from './reducers/surveyReducers'

import {
  questionCreateReducer,
  questionDeleteReducer,
  questionUpdateReducer,
} from './reducers/questionReducers'

import {
  doctorLoginReducer,
  doctorRegisterReducer,
  doctorDetailsReducer,
  doctorUpdateProfileReducer,
  doctorListReducer,
  doctorDeleteReducer,
  doctorUpdateReducer,
  doctorPatientListReducer,
} from './reducers/doctorReducers'

import {
  surveyTimeSlotListReducer,
  updateTimeSlotReducer,
} from './reducers/timeSlotReducers'

import { responsesListReducer } from './reducers/responsesReducers'

const reducer = combineReducers({
  patientList: patientListReducer,
  patientDetail: patientReducer,
  patientByDiseaseList: patientByDiseaseListReducer,
  patientsAndDiseaseList: patientsAndDiseaseListReducer,
  patientsAndDiseasesList: patientsAndDiseasesListReducer,
  patientCreate: patientCreateReducer,
  patientDelete: patientDeleteReducer,
  patientUpdate: patientUpdateReducer,
  diseaseList: diseaseListReducer,
  diseaseDelete: diseaseDeleteReducer,
  diseaseUpdate: diseaseUpdateReducer,
  sensorList: sensorListReducer,
  sensorCreate: sensorCreateReducer,
  sensorEnable: sensorEnableReducer,
  patientDiseasesList: patientDiseasesListReducer,
  surveyTemplateList: surveyTemplateListReducer,
  survey: surveyReducer,
  diseaseCreate: diseaseCreateReducer,
  surveyCreate: surveyCreateReducer,
  questionCreate: questionCreateReducer,
  questionDelete: questionDeleteReducer,
  questionUpdate: questionUpdateReducer,
  currentSurvey: currentSurveyReducer,
  doctorLogin: doctorLoginReducer,
  doctorRegister: doctorRegisterReducer,
  doctorDetails: doctorDetailsReducer,
  doctorUpdateProfile: doctorUpdateProfileReducer,
  doctorList: doctorListReducer,
  doctorDelete: doctorDeleteReducer,
  doctorUpdate: doctorUpdateReducer,
  surveyPatientAssignment: surveyPatientAssignmentReducer,
  surveyResponsesByDoctor: surveyResponsesByDoctorReducer,
  enabledSensorList: enabledSensorListReducer,
  doctorPatientList: doctorPatientListReducer,
  surveyResponses: surveyResponsesReducer,
  responsesList: responsesListReducer,
  surveyTimeSlotList: surveyTimeSlotListReducer,
  updateTimeSlot: updateTimeSlotReducer,
  surveyAssignedWithPatient: surveyAssignedWithPatientReducer,
  surveyDelete: surveyDeleteReducer,
})

const surveyInfoFromStorage = localStorage.getItem('surveyId')
  ? JSON.parse(localStorage.getItem('surveyId'))
  : {}

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  surveyInfo: { surveyId: surveyInfoFromStorage },
  doctorLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
