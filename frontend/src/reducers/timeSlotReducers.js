import {
  SURVEY_TIME_SLOT_REQUEST,
  SURVEY_TIME_SLOT_SUCCESS,
  SURVEY_TIME_SLOT_FAIL,
  UPDATE_TIME_SLOT_REQUEST,
  UPDATE_TIME_SLOT_SUCCESS,
  UPDATE_TIME_SLOT_FAIL,
} from '../constants/timeSlotConstants'

export const surveyTimeSlotListReducer = (
  state = { surveyTimeSlots: {} },
  action,
) => {
  switch (action.type) {
    case SURVEY_TIME_SLOT_REQUEST:
      return { loading: true, ...state }
    case SURVEY_TIME_SLOT_SUCCESS:
      return { loading: false, surveyTimeSlots: action.payload }
    case SURVEY_TIME_SLOT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// add new sensor to database
export const updateTimeSlotReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TIME_SLOT_REQUEST:
      return {
        loading: true,
      }
    case UPDATE_TIME_SLOT_SUCCESS:
      return {
        loading: false,
        success: true,
        timeSlots: action.payload,
      }
    case UPDATE_TIME_SLOT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
