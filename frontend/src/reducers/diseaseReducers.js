import {
  DISEASE_LIST_REQUEST,
  DISEASE_LIST_SUCCESS,
  DISEASE_LIST_FAIL,
  PATIENT_DISEASE_LIST_REQUEST,
  PATIENT_DISEASE_LIST_SUCCESS,
  PATIENT_DISEASE_LIST_FAIL,
  DISEASE_CREATE_REQUEST,
  DISEASE_CREATE_SUCCESS,
  DISEASE_CREATE_FAIL,
  DISEASE_CREATE_RESET,
  DISEASE_DELETE_REQUEST,
  DISEASE_DELETE_SUCCESS,
  DISEASE_DELETE_FAIL,
  DISEASE_UPDATE_REQUEST,
  DISEASE_UPDATE_SUCCESS,
  DISEASE_UPDATE_FAIL,
  DISEASE_UPDATE_RESET,
} from '../constants/diseaseConstants'

export const diseaseListReducer = (state = { diseases: [] }, action) => {
  switch (action.type) {
    case DISEASE_LIST_REQUEST:
      return { loading: true, diseases: [] }
    case DISEASE_LIST_SUCCESS:
      return { loading: false, diseases: action.payload }
    case DISEASE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// get all diseases of a patient
export const patientDiseasesListReducer = (
  state = { patientDiseases: [] },
  action,
) => {
  switch (action.type) {
    case PATIENT_DISEASE_LIST_REQUEST:
      return { loading: true, patientDiseases: [] }
    case PATIENT_DISEASE_LIST_SUCCESS:
      return { loading: false, patientDiseases: action.payload }
    case PATIENT_DISEASE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// add new disease to database
export const diseaseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DISEASE_CREATE_REQUEST:
      return {
        loading: true,
      }
    case DISEASE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        disease: action.payload,
      }
    case DISEASE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case DISEASE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

// delete a disease from database
export const diseaseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DISEASE_DELETE_REQUEST:
      return {
        loading: true,
      }
    case DISEASE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case DISEASE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// update a disease
export const diseaseUpdateReducer = (state = { disease: {} }, action) => {
  switch (action.type) {
    case DISEASE_UPDATE_REQUEST:
      return { loading: true }
    case DISEASE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        disease: action.payload,
      }
    case DISEASE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case DISEASE_UPDATE_RESET:
      return { disease: {} }
    default:
      return state
  }
}
