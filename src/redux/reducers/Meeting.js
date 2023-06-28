import {
  LIST_MEETING_DATA,
  LOADING_LIST_MEETING,
  SET_ALERT_MEETING,
  SET_SIGNLE_MEETING,
} from '../../actions/types';

const initialState = {
  loading: true,
  isError: false,
  isErrorType: null,
  errMessage: null,
  data: [],
  singleData: {},
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SIGNLE_MEETING:
      return {
        ...state,
        singleData: payload,
      };
    case LOADING_LIST_MEETING:
      return {
        ...state,
        loading: payload,
      };
    case LIST_MEETING_DATA:
      return {
        ...state,
        data: payload,
      };
    case SET_ALERT_MEETING:
      return {
        ...state,
        isError: payload.isError,
        isErrorType: payload.isErrorType,
        errMessage: payload.errMessage,
      };
    default:
      return state;
  }
}

export default userReducer;
