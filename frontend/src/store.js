import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  patientListReducer,
  patientReducer,
  patientByDiseaseListReducer,
  patientAndDiseaseListReducer,
  patientCreateReducer,
} from './reducers/patientReducers'
import {
  diseaseListReducer,
  patientDiseasesListReducer,
  diseaseCreateReducer,
} from './reducers/diseaseReducers'
import { sensorListReducer } from './reducers/sensorReducers'
import { surveyTemplateListReducer } from './reducers/surveyReducers'

const reducer = combineReducers({
  patientList: patientListReducer,
  patientDetail: patientReducer,
  patientByDiseaseList: patientByDiseaseListReducer,
  patientAndDiseaseList: patientAndDiseaseListReducer,
  patientCreate: patientCreateReducer,
  diseaseList: diseaseListReducer,
  sensorList: sensorListReducer,
  patientDiseasesList: patientDiseasesListReducer,
  surveyTemplateList: surveyTemplateListReducer,
  diseaseCreate: diseaseCreateReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
