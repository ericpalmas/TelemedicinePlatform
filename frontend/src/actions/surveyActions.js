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
  SURVEY_CURRENT_REQUEST,
  SURVEY_CURRENT_SUCCESS,
  SURVEY_CURRENT_FAIL,
  SURVEY_PATIENT_ASSIGNMENT_REQUEST,
  SURVEY_PATIENT_ASSIGNMENT_SUCCESS,
  SURVEY_PATIENT_ASSIGNMENT_FAIL,
  SURVEY_ASSIGNED_BY_DOCTOR_REQUEST,
  SURVEY_ASSIGNED_BY_DOCTOR_SUCCESS,
  SURVEY_ASSIGNED_BY_DOCTOR_FAIL,
  SURVEY_ASSIGNED_SUCCESS,
  SURVEY_ASSIGNED_REQUEST,
  SURVEY_ASSIGNED_FAIL,
  SURVEY_ASSIGNED_WITH_PATIENT_REQUEST,
  SURVEY_ASSIGNED_WITH_PATIENT_SUCCESS,
  SURVEY_ASSIGNED_WITH_PATIENT_FAIL,
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

// export const saveSurveyId = (data) => (dispatch) => {
//   dispatch({
//     type: SURVEY_SAVE_ID_REQUEST,
//     payload: data,
//   })

//   localStorage.setItem('surveyId', JSON.stringify(data))
// }

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

export const currentSurvey = (surveyId) => async (dispatch) => {
  try {
    dispatch({
      type: SURVEY_CURRENT_REQUEST,
    })

    dispatch({
      type: SURVEY_CURRENT_SUCCESS,
      payload: surveyId,
    })

    dispatch({
      type: SURVEY_SAVE_ID_REQUEST,
      payload: surveyId,
    })

    localStorage.setItem('surveyId', JSON.stringify(surveyId))
  } catch (error) {
    dispatch({
      type: SURVEY_CURRENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const assignSurveys = (assignments) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SURVEY_PATIENT_ASSIGNMENT_REQUEST,
    })

    const {
      doctorLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      '/api/surveys/assignment',
      { assignments },
      config,
    )

    dispatch({
      type: SURVEY_PATIENT_ASSIGNMENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SURVEY_PATIENT_ASSIGNMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSurveyResponsesByDoctor = (doctorId) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({ type: SURVEY_ASSIGNED_BY_DOCTOR_REQUEST })

    const {
      doctorLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      '/api/surveyResponses/byDoctorId',
      config,
      { doctorId },
    )

    dispatch({
      type: SURVEY_ASSIGNED_BY_DOCTOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SURVEY_ASSIGNED_BY_DOCTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSurveyResponses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SURVEY_ASSIGNED_REQUEST })

    const {
      doctorLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      '/api/surveyResponses/surveyAssignments',
      config,
    )

    dispatch({
      type: SURVEY_ASSIGNED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SURVEY_ASSIGNED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSurveyAssignedWithPatients = (id) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({ type: SURVEY_ASSIGNED_WITH_PATIENT_REQUEST })

    const {
      doctorLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/surveys/assignedSurveys/patients/${id}`,
      config,
    )

    dispatch({
      type: SURVEY_ASSIGNED_WITH_PATIENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SURVEY_ASSIGNED_WITH_PATIENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
