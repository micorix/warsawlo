const API_CALL_REQUEST = 'GET_DATA_REQUEST'
const API_CALL_SUCCESS = 'GET_DATA_SUCCESS'
const API_CALL_FAILURE = 'GET_DATA_FAILURE'

// reducer with initial state
const initialState = {
  fetching: false,
  data: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null }
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, data: action.data }
    case API_CALL_FAILURE:
      return { ...state, fetching: false, data: null, error: action.error }
    default:
      return state
  }
}
