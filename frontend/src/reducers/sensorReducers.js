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

export const sensorListReducer = (state = { sensors: [] }, action) => {
  switch (action.type) {
    case SENSOR_LIST_REQUEST:
      return { loading: true, sensors: [] }
    case SENSOR_LIST_SUCCESS:
      return { loading: false, sensors: action.payload }
    case SENSOR_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// add new sensor to database
export const sensorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SENSOR_CREATE_REQUEST:
      return {
        loading: true,
      }
    case SENSOR_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        sensor: action.payload,
      }
    case SENSOR_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// enable sensor
export const sensorEnableReducer = (state = {}, action) => {
  switch (action.type) {
    case SENSOR_ENABLE_REQUEST:
      return {
        loading: true,
      }
    case SENSOR_ENABLE_SUCCESS:
      return {
        loading: false,
        success: true,
        sensorEnable: action.payload,
      }
    case SENSOR_ENABLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const enabledSensorListReducer = (
  state = { sensorsEnabled: [] },
  action,
) => {
  switch (action.type) {
    case SENSOR_LIST_ENABLED_REQUEST:
      return { loading: true, sensorsEnabled: [] }
    case SENSOR_LIST_ENABLED_SUCCESS:
      return { loading: false, sensorsEnabled: action.payload }
    case SENSOR_LIST_ENABLED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
