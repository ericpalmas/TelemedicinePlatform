import {
  STUDY_LIST_REQUEST,
  STUDY_LIST_SUCCESS,
  STUDY_LIST_FAIL,
  STUDY_CREATE_REQUEST,
  STUDY_CREATE_SUCCESS,
  STUDY_CREATE_FAIL,
  STUDY_CREATE_RESET,
  STUDY_DELETE_REQUEST,
  STUDY_DELETE_SUCCESS,
  STUDY_DELETE_FAIL,
  STUDY_UPDATE_REQUEST,
  STUDY_UPDATE_SUCCESS,
  STUDY_UPDATE_FAIL,
  STUDY_UPDATE_RESET,
  PATIENTS_BY_STUDY_LIST_REQUEST,
  PATIENTS_BY_STUDY_LIST_SUCCESS,
  PATIENTS_BY_STUDY_LIST_FAIL,
} from '../constants/studyConstants'

export const studyListReducer = (state = { studies: [] }, action) => {
  switch (action.type) {
    case STUDY_LIST_REQUEST:
      return { loading: true, studies: [] }
    case STUDY_LIST_SUCCESS:
      return { loading: false, studies: action.payload }
    case STUDY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// add new disease to database
export const studyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDY_CREATE_REQUEST:
      return {
        loading: true,
      }
    case STUDY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        study: action.payload,
      }
    case STUDY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case STUDY_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const studyUpdateReducer = (state = { study: {} }, action) => {
  switch (action.type) {
    case STUDY_UPDATE_REQUEST:
      return { loading: true }
    case STUDY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        study: action.payload,
      }
    case STUDY_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case STUDY_UPDATE_RESET:
      return { study: {} }
    default:
      return state
  }
}

// delete a study from database
export const studyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDY_DELETE_REQUEST:
      return {
        loading: true,
      }
    case STUDY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case STUDY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientsByStudyListReducer = (
  state = { patients: [] },
  action
) => {
  switch (action.type) {
    case PATIENTS_BY_STUDY_LIST_REQUEST:
      return { loading: true, patients: [] }
    case PATIENTS_BY_STUDY_LIST_SUCCESS:
      return { loading: false, patients: action.payload }
    case PATIENTS_BY_STUDY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
