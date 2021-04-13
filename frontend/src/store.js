import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { patientListReducer, patientReducer } from './reducers/patientReducers'
import {
  diseaseListReducer,
  patientDiseasesListReducer,
} from './reducers/diseaseReducers'
import { sensorListReducer } from './reducers/sensorReducers'
import { surveyTemplateListReducer } from './reducers/surveyReducers'

const reducer = combineReducers({
  patientList: patientListReducer,
  patientDetail: patientReducer,
  diseaseList: diseaseListReducer,
  sensorList: sensorListReducer,
  patientDiseasesList: patientDiseasesListReducer,
  surveyTemplateList: surveyTemplateListReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
