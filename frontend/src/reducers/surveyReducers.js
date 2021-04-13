import {
  SURVEY_TEMPLATE_LIST_REQUEST,
  SURVEY_TEMPLATE_LIST_SUCCESS,
  SURVEY_TEMPLATE_LIST_FAIL,
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
