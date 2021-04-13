import {
  SENSOR_LIST_REQUEST,
  SENSOR_LIST_SUCCESS,
  SENSOR_LIST_FAIL,
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
