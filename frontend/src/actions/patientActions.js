import axios from 'axios'
import {
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_REQUEST,
  PATIENT_SUCCESS,
  PATIENT_FAIL,
  PATIENT_BY_DISEASE_LIST_REQUEST,
  PATIENT_BY_DISEASE_LIST_SUCCESS,
  PATIENT_BY_DISEASE_LIST_FAIL,
  PATIENT_AND_DISEASE_LIST_REQUEST,
  PATIENT_AND_DISEASE_LIST_SUCCESS,
  PATIENT_AND_DISEASE_LIST_FAIL,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_SUCCESS,
  PATIENT_CREATE_FAIL,
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

export const listPatientsByDisease = (id) => async (dispatch) => {
  try {
    dispatch({ type: PATIENT_BY_DISEASE_LIST_REQUEST })

    const { data } = await axios.get(`/api/patients/patientsByDisease/${id}`)

    dispatch({
      type: PATIENT_BY_DISEASE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PATIENT_BY_DISEASE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPatientsAndDisease = () => async (dispatch) => {
  try {
    dispatch({ type: PATIENT_AND_DISEASE_LIST_REQUEST })

    const { data } = await axios.get('/api/patientsAndDiseases')

    dispatch({
      type: PATIENT_AND_DISEASE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PATIENT_AND_DISEASE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPatient = (patient) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/patients`, patient)

    dispatch({
      type: PATIENT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PATIENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
