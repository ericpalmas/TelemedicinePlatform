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
  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAIL,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAIL,
  PATIENT_AND_DISEASES_LIST_REQUEST,
  PATIENT_AND_DISEASES_LIST_SUCCESS,
  PATIENT_AND_DISEASES_LIST_FAIL,
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

export const listPatientsByDisease = (parameters) => async (dispatch) => {
  console.log(parameters)
  try {
    dispatch({ type: PATIENT_BY_DISEASE_LIST_REQUEST })

    const { data } = await axios.post(
      `/api/patients/patientsByDisease/${parameters.patientId}`,
      parameters
    )

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

export const listPatientsAndDiseases = () => async (dispatch) => {
  try {
    dispatch({ type: PATIENT_AND_DISEASES_LIST_REQUEST })

    const { data } = await axios.get('/api/patientsAndDiseases')

    dispatch({
      type: PATIENT_AND_DISEASES_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PATIENT_AND_DISEASES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPatientsAndDisease = (parameters) => async (dispatch) => {
  try {
    dispatch({ type: PATIENT_AND_DISEASE_LIST_REQUEST })

    const { data } = await axios.post(
      `/api/patientsAndDiseases/${parameters.surveyId}`,
      parameters
    )

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

export const deletePatient = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_DELETE_REQUEST,
    })

    await axios.delete(`/api/patients/${id}`)

    dispatch({
      type: PATIENT_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: PATIENT_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updatePatient = (patient) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_UPDATE_REQUEST,
    })

    const { data } = await axios.put(`/api/patients/${patient._id}`, patient)

    dispatch({
      type: PATIENT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload: message,
    })
  }
}
