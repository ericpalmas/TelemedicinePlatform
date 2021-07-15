import axios from 'axios'
import {
  SENSOR_LIST_REQUEST,
  SENSOR_LIST_SUCCESS,
  SENSOR_LIST_FAIL,
  SENSOR_CREATE_REQUEST,
  SENSOR_CREATE_SUCCESS,
  SENSOR_CREATE_FAIL,
  SENSOR_ENABLE_REQUEST,
  SENSOR_ENABLE_SUCCESS,
  SENSOR_ENABLE_FAIL,
  SENSOR_LIST_ENABLED_REQUEST,
  SENSOR_LIST_ENABLED_SUCCESS,
  SENSOR_LIST_ENABLED_FAIL,
} from '../constants/sensorConstants'

export const listSensors = () => async (dispatch) => {
  try {
    dispatch({ type: SENSOR_LIST_REQUEST })

    const { data } = await axios.get('/api/sensors')

    dispatch({
      type: SENSOR_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SENSOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createSensor = (sensor) => async (dispatch) => {
  try {
    dispatch({
      type: SENSOR_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/sensors`, sensor)

    dispatch({
      type: SENSOR_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SENSOR_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const enableSensor = (sensor) => async (dispatch) => {
  try {
    dispatch({
      type: SENSOR_ENABLE_REQUEST,
    })

    const { data } = await axios.put(`/api/sensors/enableDisable`, sensor)

    dispatch({
      type: SENSOR_ENABLE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SENSOR_ENABLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listEnabledSensors = (patientId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SENSOR_LIST_ENABLED_REQUEST })

    const {
      doctorLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/sensors/enabledSensors', config, {
      patientId,
    })

    dispatch({
      type: SENSOR_LIST_ENABLED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SENSOR_LIST_ENABLED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
