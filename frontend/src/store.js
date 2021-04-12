import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { patientListReducer, patientReducer } from './reducers/patientReducers'
import { diseaseListReducer } from './reducers/diseaseReducers'

const reducer = combineReducers({
  patientList: patientListReducer,
  patientDetail: patientReducer,
  diseaseList: diseaseListReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
