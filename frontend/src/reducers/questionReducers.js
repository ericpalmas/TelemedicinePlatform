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
  QUESTION_UPDATE_RESET,
} from '../constants/questionConstants'

// add new question to database
export const questionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_CREATE_REQUEST:
      return {
        loading: true,
      }
    case QUESTION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        question: action.payload,
      }
    case QUESTION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const questionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_DELETE_REQUEST:
      return { loading: true }
    case QUESTION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case QUESTION_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const questionUpdateReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case QUESTION_UPDATE_REQUEST:
      return { loading: true }
    case QUESTION_UPDATE_SUCCESS:
      return { loading: false, success: true, question: action.payload }
    case QUESTION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case QUESTION_UPDATE_RESET:
      return { question: {} }
    default:
      return state
  }
}
