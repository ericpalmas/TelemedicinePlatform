import {
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_LOGIN_FAIL,
  DOCTOR_LOGOUT,
  DOCTOR_REGISTER_REQUEST,
  DOCTOR_REGISTER_SUCCESS,
  DOCTOR_REGISTER_FAIL,
  DOCTOR_REGISTER_RESET,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_RESET,
  DOCTOR_UPDATE_PROFILE_REQUEST,
  DOCTOR_UPDATE_PROFILE_SUCCESS,
  DOCTOR_UPDATE_PROFILE_FAIL,
  DOCTOR_UPDATE_PROFILE_RESET,
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_LIST_RESET,
  DOCTOR_DELETE_REQUEST,
  DOCTOR_DELETE_SUCCESS,
  DOCTOR_DELETE_FAIL,
  DOCTOR_UPDATE_REQUEST,
  DOCTOR_UPDATE_SUCCESS,
  DOCTOR_UPDATE_FAIL,
  DOCTOR_UPDATE_RESET,
} from '../constants/doctorConstants'

export const doctorLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_LOGIN_REQUEST:
      return { loading: true }
    case DOCTOR_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case DOCTOR_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case DOCTOR_LOGOUT:
      return {}
    default:
      return state
  }
}

export const doctorRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_REGISTER_REQUEST:
      return { loading: true }
    case DOCTOR_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case DOCTOR_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case DOCTOR_LOGOUT:
      return {}
    case DOCTOR_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const doctorDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case DOCTOR_DETAILS_REQUEST:
      return { ...state, loading: true }
    case DOCTOR_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case DOCTOR_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case DOCTOR_DETAILS_RESET:
      return { user: {} }

    default:
      return state
  }
}

export const doctorUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case DOCTOR_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case DOCTOR_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case DOCTOR_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const doctorListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case DOCTOR_LIST_REQUEST:
      return { loading: true }
    case DOCTOR_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case DOCTOR_LIST_FAIL:
      return { loading: false, error: action.payload }
    case DOCTOR_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const doctorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_DELETE_REQUEST:
      return { loading: true }
    case DOCTOR_DELETE_SUCCESS:
      return { loading: false, success: true }
    case DOCTOR_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const doctorUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case DOCTOR_UPDATE_REQUEST:
      return { loading: true }
    case DOCTOR_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case DOCTOR_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case DOCTOR_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}
