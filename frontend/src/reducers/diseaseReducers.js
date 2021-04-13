import {
  DISEASE_LIST_REQUEST,
  DISEASE_LIST_SUCCESS,
  DISEASE_LIST_FAIL,
  PATIENT_DISEASE_LIST_REQUEST,
  PATIENT_DISEASE_LIST_SUCCESS,
  PATIENT_DISEASE_LIST_FAIL,
} from '../constants/diseaseConstants'

export const diseaseListReducer = (state = { diseases: [] }, action) => {
  switch (action.type) {
    case DISEASE_LIST_REQUEST:
      return { loading: true, diseases: [] }
    case DISEASE_LIST_SUCCESS:
      return { loading: false, diseases: action.payload }
    case DISEASE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientDiseasesListReducer = (
  state = { patientDiseases: [] },
  action,
) => {
  switch (action.type) {
    case PATIENT_DISEASE_LIST_REQUEST:
      return { loading: true, patientDiseases: [] }
    case PATIENT_DISEASE_LIST_SUCCESS:
      return { loading: false, patientDiseases: action.payload }
    case PATIENT_DISEASE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
