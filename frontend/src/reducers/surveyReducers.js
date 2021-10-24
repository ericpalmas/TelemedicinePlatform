import {
  SURVEY_TEMPLATE_LIST_REQUEST,
  SURVEY_TEMPLATE_LIST_SUCCESS,
  SURVEY_TEMPLATE_LIST_FAIL,
  SURVEY_REQUEST,
  SURVEY_SUCCESS,
  SURVEY_FAIL,
  SURVEY_SAVE_ID_REQUEST,
  SURVEY_SAVE_ID_RESET,
  SURVEY_CREATE_REQUEST,
  SURVEY_CREATE_SUCCESS,
  SURVEY_CREATE_FAIL,
  SURVEY_CURRENT_REQUEST,
  SURVEY_CURRENT_SUCCESS,
  SURVEY_CURRENT_FAIL,
  SURVEY_PATIENT_ASSIGNMENT_REQUEST,
  SURVEY_PATIENT_ASSIGNMENT_SUCCESS,
  SURVEY_PATIENT_ASSIGNMENT_FAIL,
  SURVEY_ASSIGNED_BY_DOCTOR_REQUEST,
  SURVEY_ASSIGNED_BY_DOCTOR_SUCCESS,
  SURVEY_ASSIGNED_BY_DOCTOR_FAIL,
  SURVEY_ASSIGNED_REQUEST,
  SURVEY_ASSIGNED_SUCCESS,
  SURVEY_ASSIGNED_FAIL,
  SURVEY_ASSIGNED_WITH_PATIENT_REQUEST,
  SURVEY_ASSIGNED_WITH_PATIENT_SUCCESS,
  SURVEY_ASSIGNED_WITH_PATIENT_FAIL,
  SURVEY_DELETE_REQUEST,
  SURVEY_DELETE_SUCCESS,
  SURVEY_DELETE_FAIL,
  SURVEY_UPDATE_NAME_REQUEST,
  SURVEY_UPDATE_NAME_SUCCESS,
  SURVEY_UPDATE_NAME_FAIL,
} from '../constants/surveyConstants'

export const surveyTemplateListReducer = (state = { surveys: [] }, action) => {
  switch (action.type) {
    case SURVEY_TEMPLATE_LIST_REQUEST:
      return { loading: true, surveys: [] }
    case SURVEY_TEMPLATE_LIST_SUCCESS:
      return { loading: false, surveys: action.payload }
    case SURVEY_TEMPLATE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const surveyReducer = (state = { survey: {} }, action) => {
  switch (action.type) {
    case SURVEY_REQUEST:
      return { loading: true, ...state }
    case SURVEY_SUCCESS:
      return { loading: false, survey: action.payload }
    case SURVEY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const surveySaveIdReducer = (state = { surveyId: {} }, action) => {
  switch (action.type) {
    case SURVEY_SAVE_ID_REQUEST:
      return {
        ...state,
        surveyId: action.payload,
      }
    case SURVEY_SAVE_ID_RESET:
      return { question: {} }
    default:
      return state
  }
}

export const currentSurveyReducer = (state = {}, action) => {
  switch (action.type) {
    case SURVEY_CURRENT_REQUEST:
      return {
        loading: true,
      }
    case SURVEY_CURRENT_SUCCESS:
      return {
        loading: false,
        success: true,
        survey: action.payload,
      }
    case SURVEY_CURRENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// add new survey to database
export const surveyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SURVEY_CREATE_REQUEST:
      return {
        loading: true,
      }
    case SURVEY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        survey: action.payload,
      }
    case SURVEY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const surveyPatientAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case SURVEY_PATIENT_ASSIGNMENT_REQUEST:
      return {
        loading: true,
      }
    case SURVEY_PATIENT_ASSIGNMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case SURVEY_PATIENT_ASSIGNMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const surveyResponsesByDoctorReducer = (
  state = { surveysResponses: [] },
  action
) => {
  switch (action.type) {
    case SURVEY_ASSIGNED_BY_DOCTOR_REQUEST:
      return { loading: true, surveysResponses: [] }
    case SURVEY_ASSIGNED_BY_DOCTOR_SUCCESS:
      return { loading: false, surveysResponses: action.payload }
    case SURVEY_ASSIGNED_BY_DOCTOR_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const surveyResponsesReducer = (
  state = { surveysResponses: [] },
  action
) => {
  switch (action.type) {
    case SURVEY_ASSIGNED_REQUEST:
      return { loading: true, surveysResponses: [] }
    case SURVEY_ASSIGNED_SUCCESS:
      return { loading: false, surveysResponses: action.payload }
    case SURVEY_ASSIGNED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const surveyAssignedWithPatientReducer = (
  state = { surveyAssignments: [] },
  action
) => {
  switch (action.type) {
    case SURVEY_ASSIGNED_WITH_PATIENT_REQUEST:
      return { loading: true, surveyAssignments: [] }
    case SURVEY_ASSIGNED_WITH_PATIENT_SUCCESS:
      return { loading: false, surveyAssignments: action.payload }
    case SURVEY_ASSIGNED_WITH_PATIENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// delete a disease from database
export const surveyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SURVEY_DELETE_REQUEST:
      return {
        loading: true,
      }
    case SURVEY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case SURVEY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const surveyUpdateNameReducer = (state = {}, action) => {
  switch (action.type) {
    case SURVEY_UPDATE_NAME_REQUEST:
      return {
        loading: true,
      }
    case SURVEY_UPDATE_NAME_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case SURVEY_UPDATE_NAME_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
