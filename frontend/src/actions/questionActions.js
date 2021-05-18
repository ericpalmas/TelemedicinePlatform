import axios from 'axios'
import {
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
} from '../constants/questionConstants'

export const createQuestion = (question) => async (dispatch) => {
  try {
    dispatch({
      type: QUESTION_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/questions`, question)

    dispatch({
      type: QUESTION_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: QUESTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    dispatch({
      type: QUESTION_DELETE_REQUEST,
    })

    await axios.delete(`/api/questions/${id}`)

    dispatch({
      type: QUESTION_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: QUESTION_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateQuestion = (question) => async (dispatch) => {
  try {
    dispatch({
      type: QUESTION_UPDATE_REQUEST,
    })

    const { data } = await axios.put(`/api/questions/${question._id}`, question)

    dispatch({
      type: QUESTION_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: QUESTION_UPDATE_FAIL,
      payload: message,
    })
  }
}
