import {
  PATIENT_RESPONSE_LIST_FAIL,
  PATIENT_RESPONSE_LIST_REQUEST,
  PATIENT_RESPONSE_LIST_SUCCESS,
} from '../constants/responsesConstants'

export const responsesListReducer = (state = { responses: [] }, action) => {
  switch (action.type) {
    case PATIENT_RESPONSE_LIST_REQUEST:
      return { loading: true, responses: [] }
    case PATIENT_RESPONSE_LIST_SUCCESS:
      return { loading: false, responses: action.payload }
    case PATIENT_RESPONSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
