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
        //in this line i return the initial state
        ...state,
        surveyId: action.payload,
      }
    case SURVEY_SAVE_ID_RESET:
      return { question: {} }
    default:
      return state
  }
}

// add new disease to database
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
