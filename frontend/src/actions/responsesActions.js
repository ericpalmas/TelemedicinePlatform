import axios from 'axios'
import {
  PATIENT_RESPONSE_LIST_REQUEST,
  PATIENT_RESPONSE_LIST_SUCCESS,
  PATIENT_RESPONSE_LIST_FAIL,
} from '../constants/responsesConstants'

import {
  DOCTOR_LOGOUT,
  DOCTOR_DETAILS_RESET,
  DOCTOR_LIST_RESET,
} from '../constants/doctorConstants'

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: DOCTOR_LOGOUT })
  dispatch({ type: DOCTOR_DETAILS_RESET })
  dispatch({ type: DOCTOR_LIST_RESET })
}

export const listSurveyResponses = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_RESPONSE_LIST_REQUEST,
    })

    const {
      doctorLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/responses/${id}`, config)

    dispatch({
      type: PATIENT_RESPONSE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      localStorage.removeItem('userInfo')
      dispatch({ type: DOCTOR_LOGOUT })
      dispatch({ type: DOCTOR_DETAILS_RESET })
      dispatch({ type: DOCTOR_LIST_RESET })
    }
    dispatch({
      type: PATIENT_RESPONSE_LIST_FAIL,
      payload: message,
    })
  }
}
