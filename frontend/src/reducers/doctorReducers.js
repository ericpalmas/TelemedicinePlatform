import {
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_LOGIN_FAIL,
  DOCTOR_LOGOUT,
  DOCTOR_REGISTER_REQUEST,
  DOCTOR_REGISTER_SUCCESS,
  DOCTOR_REGISTER_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_RESET,
  DOCTOR_UPDATE_PROFILE_REQUEST,
  DOCTOR_UPDATE_PROFILE_SUCCESS,
  DOCTOR_UPDATE_PROFILE_FAIL,
  DOCTOR_UPDATE_PROFILE_RESET,
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
      return { loading: false, userInfo: action.payload }
    case DOCTOR_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case DOCTOR_LOGOUT:
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
