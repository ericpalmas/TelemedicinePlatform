import axios from 'axios'
import {
  STUDY_LIST_REQUEST,
  STUDY_LIST_SUCCESS,
  STUDY_LIST_FAIL,
  STUDY_CREATE_REQUEST,
  STUDY_CREATE_SUCCESS,
  STUDY_CREATE_FAIL,
  STUDY_CREATE_RESET,
  STUDY_DELETE_REQUEST,
  STUDY_DELETE_SUCCESS,
  STUDY_DELETE_FAIL,
  STUDY_UPDATE_REQUEST,
  STUDY_UPDATE_SUCCESS,
  STUDY_UPDATE_FAIL,
  PATIENTS_BY_STUDY_LIST_REQUEST,
  PATIENTS_BY_STUDY_LIST_SUCCESS,
  PATIENTS_BY_STUDY_LIST_FAIL,
} from '../constants/studyConstants'

export const listStudies = () => async (dispatch) => {
  try {
    dispatch({
      type: STUDY_CREATE_RESET,
    })
    dispatch({ type: STUDY_LIST_REQUEST })

    const { data } = await axios.get('/api/studies')

    dispatch({
      type: STUDY_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STUDY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createStudy = (disease) => async (dispatch) => {
  try {
    dispatch({
      type: STUDY_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/studies`, disease)
    dispatch({
      type: STUDY_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STUDY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteStudy = (id) => async (dispatch) => {
  try {
    dispatch({
      type: STUDY_DELETE_REQUEST,
    })

    const { data } = await axios.delete(`/api/studies/${id}`)

    dispatch({
      type: STUDY_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: STUDY_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateStudy = (study) => async (dispatch) => {
  try {
    dispatch({
      type: STUDY_UPDATE_REQUEST,
    })

    const { data } = await axios.put(`/api/studies/${study._id}`, study)

    dispatch({
      type: STUDY_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: STUDY_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const patientsByStudylist = (id) => async (dispatch) => {
  try {
    dispatch({ type: PATIENTS_BY_STUDY_LIST_REQUEST })

    const { data } = await axios.get(`/api/studies/patients/${id}`)

    dispatch({
      type: PATIENTS_BY_STUDY_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PATIENTS_BY_STUDY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
