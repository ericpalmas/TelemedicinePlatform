import axios from 'axios'
import {
  SURVEY_TEMPLATE_LIST_REQUEST,
  SURVEY_TEMPLATE_LIST_SUCCESS,
  SURVEY_TEMPLATE_LIST_FAIL,
  SURVEY_REQUEST,
  SURVEY_SUCCESS,
  SURVEY_FAIL,
  SURVEY_SAVE_ID_REQUEST,
  SURVEY_CREATE_REQUEST,
  SURVEY_CREATE_SUCCESS,
  SURVEY_CREATE_FAIL,
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

export const surveyDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SURVEY_REQUEST })

    const { data } = await axios.get(`/api/surveys/${id}`)

    dispatch({
      type: SURVEY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SURVEY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const saveSurveyId = (data) => (dispatch) => {
  dispatch({
    type: SURVEY_SAVE_ID_REQUEST,
    payload: data,
  })

  localStorage.setItem('surveyId', JSON.stringify(data))
}

export const createSurvey = (survey) => async (dispatch) => {
  try {
    dispatch({
      type: SURVEY_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/surveys`, survey)

    dispatch({
      type: SURVEY_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SURVEY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
