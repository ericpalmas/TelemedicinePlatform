import axios from 'axios'
import {
  DISEASE_LIST_REQUEST,
  DISEASE_LIST_SUCCESS,
  DISEASE_LIST_FAIL,
} from '../constants/diseaseConstants'

export const listDiseases = () => async (dispatch) => {
  try {
    dispatch({ type: DISEASE_LIST_REQUEST })

    const { data } = await axios.get('/api/diseases')

    dispatch({
      type: DISEASE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DISEASE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
