import axios from 'axios'
import {
  SURVEY_TIME_SLOT_REQUEST,
  SURVEY_TIME_SLOT_SUCCESS,
  SURVEY_TIME_SLOT_FAIL,
  UPDATE_TIME_SLOT_REQUEST,
  UPDATE_TIME_SLOT_SUCCESS,
  UPDATE_TIME_SLOT_FAIL,
} from '../constants/timeSlotConstants'

export const surveyTimeSlotList = (id) => async (dispatch) => {
  try {
    dispatch({ type: SURVEY_TIME_SLOT_REQUEST })

    const { data } = await axios.get(`/api/timeSlot/${id}`)

    dispatch({
      type: SURVEY_TIME_SLOT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SURVEY_TIME_SLOT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateTimeSlots = (timeSlots) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TIME_SLOT_REQUEST,
    })

    const { data } = await axios.put(`/api/timeSlot/`, timeSlots)

    dispatch({
      type: UPDATE_TIME_SLOT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_TIME_SLOT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
