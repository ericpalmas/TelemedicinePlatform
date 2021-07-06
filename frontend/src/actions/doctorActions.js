import axios from 'axios'
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

export const register = (name, surname, email, password) => async (
  dispatch,
) => {
  try {
    dispatch({
      type: DOCTOR_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/doctors',
      { name, surname, email, password },
      config,
    )

    dispatch({
      type: DOCTOR_REGISTER_SUCCESS,
      payload: data,
    })

    // dispatch({
    //     type: DOCTOR_LOGIN_SUCCESS,
    //     payload: data,
    // })

    //localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: DOCTOR_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getDoctorDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DETAILS_REQUEST,
    })

    const {
      doctorLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/doctors/${id}`, config)

    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateDoctorProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_UPDATE_PROFILE_REQUEST,
    })

    const {
      doctorLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/doctors/profile`, user, config)

    dispatch({
      type: DOCTOR_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: DOCTOR_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: DOCTOR_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
}
