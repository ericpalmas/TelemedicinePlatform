import axios from 'axios'
import {
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_REQUEST,
  PATIENT_SUCCESS,
  PATIENT_FAIL,
} from '../constants/patientConstants'

export const listPatients = () => async (dispatch) => {
  try {
    dispatch({ type: PATIENT_LIST_REQUEST })

    const { data } = await axios.get('/api/patients')

    dispatch({
      type: PATIENT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PATIENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const patientDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PATIENT_REQUEST })

    const { data } = await axios.get(`/api/patients/${id}`)

    dispatch({
      type: PATIENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PATIENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
