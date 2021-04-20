import axios from 'axios'
import {
  DISEASE_LIST_REQUEST,
  DISEASE_LIST_SUCCESS,
  DISEASE_LIST_FAIL,
  PATIENT_DISEASE_LIST_REQUEST,
  PATIENT_DISEASE_LIST_SUCCESS,
  PATIENT_DISEASE_LIST_FAIL,
  DISEASE_CREATE_REQUEST,
  DISEASE_CREATE_SUCCESS,
  DISEASE_CREATE_FAIL,
  DISEASE_CREATE_RESET,
} from '../constants/diseaseConstants'

export const listDiseases = () => async (dispatch) => {
  try {
    dispatch({
      type: DISEASE_CREATE_RESET,
    })
    dispatch({ type: DISEASE_LIST_REQUEST })

    const { data } = await axios.get('/api/diseases')

    dispatch({
      type: DISEASE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DISEASE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPatientDiseases = (patientId) => async (dispatch) => {
  try {
    dispatch({ type: PATIENT_DISEASE_LIST_REQUEST })

    const { data } = await axios.get(`/api/diseases/${patientId}`)

    dispatch({
      type: PATIENT_DISEASE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PATIENT_DISEASE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createDisease = (disease) => async (dispatch) => {
  try {
    dispatch({
      type: DISEASE_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/diseases`, disease)

    dispatch({
      type: DISEASE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DISEASE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
