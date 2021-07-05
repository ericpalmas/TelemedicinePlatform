import {
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_LOGIN_FAIL,
  DOCTOR_LOGOUT,
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
