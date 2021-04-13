import axios from 'axios'
import {
  SURVEY_TEMPLATE_LIST_REQUEST,
  SURVEY_TEMPLATE_LIST_SUCCESS,
  SURVEY_TEMPLATE_LIST_FAIL,
} from '../constants/surveyConstants'

export const listSurveyTemplates = () => async (dispatch) => {
  try {
    dispatch({ type: SURVEY_TEMPLATE_LIST_REQUEST })

    const { data } = await axios.get('/api/surveys')

    dispatch({
      type: SURVEY_TEMPLATE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SURVEY_TEMPLATE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
