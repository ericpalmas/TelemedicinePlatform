import axios from 'axios'
import {
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_LOGIN_FAIL,
  DOCTOR_LOGOUT,
} from '../constants/doctorConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/doctors/login',
      { email, password },
      config,
    )

    dispatch({
      type: DOCTOR_LOGIN_SUCCESS,
      payload: data,
    })

    //set up user to local storage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: DOCTOR_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//for logout i have to remove user info from local storage
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: DOCTOR_LOGOUT })
  // dispatch({ type: USER_DETAILS_RESET })
  // dispatch({ type: ORDER_LIST_MY_RESET })
  // dispatch({ type: USER_LIST_RESET })
}
