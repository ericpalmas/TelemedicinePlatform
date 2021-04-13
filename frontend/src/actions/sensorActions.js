import axios from 'axios'
import {
  SENSOR_LIST_REQUEST,
  SENSOR_LIST_SUCCESS,
  SENSOR_LIST_FAIL,
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
