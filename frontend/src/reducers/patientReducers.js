import {
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_REQUEST,
  PATIENT_SUCCESS,
  PATIENT_FAIL,
  PATIENT_BY_DISEASE_LIST_FAIL,
  PATIENT_BY_DISEASE_LIST_SUCCESS,
  PATIENT_BY_DISEASE_LIST_REQUEST,
  PATIENT_AND_DISEASE_LIST_REQUEST,
  PATIENT_AND_DISEASE_LIST_SUCCESS,
  PATIENT_AND_DISEASE_LIST_FAIL,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_SUCCESS,
  PATIENT_CREATE_FAIL,
  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAIL,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAIL,
  PATIENT_UPDATE_RESET,
  PATIENT_CREATE_ASSIGNED_REQUEST,
  PATIENT_CREATE_ASSIGNED_SUCCESS,
  PATIENT_CREATE_ASSIGNED_FAIL,
  PATIENT_AND_DISEASES_LIST_REQUEST,
  PATIENT_AND_DISEASES_LIST_SUCCESS,
  PATIENT_AND_DISEASES_LIST_FAIL,
} from '../constants/patientConstants'

export const patientListReducer = (state = { patients: [] }, action) => {
  switch (action.type) {
    case PATIENT_LIST_REQUEST:
      return { ...state, loading: true, patients: [] }
    case PATIENT_LIST_SUCCESS:
      return { loading: false, patients: action.payload }
    case PATIENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_REQUEST:
      return { loading: true, ...state }
    case PATIENT_SUCCESS:
      return { loading: false, patient: action.payload }
    case PATIENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// get the list of patient that have this disease
export const patientByDiseaseListReducer = (
  state = { patients: [] },
  action
) => {
  switch (action.type) {
    case PATIENT_BY_DISEASE_LIST_REQUEST:
      return { loading: true, patients: [] }
    case PATIENT_BY_DISEASE_LIST_SUCCESS:
      return { loading: false, patients: action.payload }
    case PATIENT_BY_DISEASE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// get the list of patient and the relative diseases
export const patientsAndDiseaseListReducer = (
  state = { patients: [] },
  action
) => {
  switch (action.type) {
    case PATIENT_AND_DISEASE_LIST_REQUEST:
      return { loading: true, patients: [] }
    case PATIENT_AND_DISEASE_LIST_SUCCESS:
      return { loading: false, patients: action.payload }
    case PATIENT_AND_DISEASE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// get the list of patient and the relative diseases
export const patientsAndDiseasesListReducer = (
  state = { patients: [] },
  action
) => {
  switch (action.type) {
    case PATIENT_AND_DISEASES_LIST_REQUEST:
      return { loading: true, patients: [] }
    case PATIENT_AND_DISEASES_LIST_SUCCESS:
      return { loading: false, patients: action.payload }
    case PATIENT_AND_DISEASES_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// add new patient to database
export const patientCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case PATIENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case PATIENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const patientDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_DELETE_REQUEST:
      return { loading: true }
    case PATIENT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PATIENT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientUpdateReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_UPDATE_REQUEST:
      return { loading: true }
    case PATIENT_UPDATE_SUCCESS:
      return { loading: false, success: true, patient: action.payload }
    case PATIENT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PATIENT_UPDATE_RESET:
      return { patient: {} }
    default:
      return state
  }
}
