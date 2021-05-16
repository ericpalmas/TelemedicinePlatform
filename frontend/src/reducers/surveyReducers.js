import {
  SURVEY_TEMPLATE_LIST_REQUEST,
  SURVEY_TEMPLATE_LIST_SUCCESS,
  SURVEY_TEMPLATE_LIST_FAIL,
  SURVEY_REQUEST,
  SURVEY_SUCCESS,
  SURVEY_FAIL,
  SURVEY_SAVE_ID_REQUEST,
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
    default:
      return state
  }
}
