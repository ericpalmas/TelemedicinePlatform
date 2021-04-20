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
