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
} from './reducers/patientReducers'
import {
  diseaseListReducer,
  patientDiseasesListReducer,
  diseaseCreateReducer,
  diseaseDeleteReducer,
  diseaseUpdateReducer,
} from './reducers/diseaseReducers'
import { sensorListReducer } from './reducers/sensorReducers'
import {
  surveyTemplateListReducer,
  surveyReducer,
  surveyCreateReducer,
  surveySaveIdReducer,
} from './reducers/surveyReducers'

import {
  questionCreateReducer,
  questionDeleteReducer,
  questionUpdateReducer,
} from './reducers/questionReducers'

const reducer = combineReducers({
  patientList: patientListReducer,
  patientDetail: patientReducer,
  patientByDiseaseList: patientByDiseaseListReducer,
  patientsAndDiseaseList: patientsAndDiseaseListReducer,
  patientCreate: patientCreateReducer,
  patientDelete: patientDeleteReducer,
  patientUpdate: patientUpdateReducer,
  diseaseList: diseaseListReducer,
  diseaseDelete: diseaseDeleteReducer,
  diseaseUpdate: diseaseUpdateReducer,
  sensorList: sensorListReducer,
  patientDiseasesList: patientDiseasesListReducer,
  surveyTemplateList: surveyTemplateListReducer,
  survey: surveyReducer,
  diseaseCreate: diseaseCreateReducer,
  surveyCreate: surveyCreateReducer,
  questionCreate: questionCreateReducer,
  questionDelete: questionDeleteReducer,
  questionUpdate: questionUpdateReducer,
})

const surveyInfoFromStorage = localStorage.getItem('surveyId')
  ? JSON.parse(localStorage.getItem('surveyId'))
  : {}

const initialState = {
  surveyInfo: { surveyId: surveyInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
