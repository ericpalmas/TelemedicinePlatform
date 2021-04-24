import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  patientListReducer,
  patientReducer,
  patientByDiseaseListReducer,
  patientAndDiseaseListReducer,
  patientCreateReducer,
  patientDeleteReducer,
  patientUpdateReducer,
} from './reducers/patientReducers'
import {
  diseaseListReducer,
  patientDiseasesListReducer,
  diseaseCreateReducer,
  diseaseDeleteReducer,
  diseaseUpdateReducer,
} from './reducers/diseaseReducers'
import { sensorListReducer } from './reducers/sensorReducers'
import { surveyTemplateListReducer } from './reducers/surveyReducers'

const reducer = combineReducers({
  patientList: patientListReducer,
  patientDetail: patientReducer,
  patientByDiseaseList: patientByDiseaseListReducer,
  patientAndDiseaseList: patientAndDiseaseListReducer,
  patientCreate: patientCreateReducer,
  patientDelete: patientDeleteReducer,
  patientUpdate: patientUpdateReducer,
  diseaseList: diseaseListReducer,
  diseaseDelete: diseaseDeleteReducer,
  diseaseUpdate: diseaseUpdateReducer,
  sensorList: sensorListReducer,
  patientDiseasesList: patientDiseasesListReducer,
  surveyTemplateList: surveyTemplateListReducer,
  diseaseCreate: diseaseCreateReducer,
})

// const diseasesFromStorage = localStorage.getItem('diseases')
//   ? JSON.parse(localStorage.getItem('diseases'))
//   : []

const initialState = {
  // diseaseList: { diseases: diseasesFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
