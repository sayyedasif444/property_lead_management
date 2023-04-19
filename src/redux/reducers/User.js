import {
  LIST_USER_DATA,
  LOADING_LIST_USER,
  SET_ALERT_USER,
  SET_SIGNLE_USER,
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
    case SET_SIGNLE_USER:
      return {
        ...state,
        singleData: payload,
      };
    case LOADING_LIST_USER:
      return {
        ...state,
        loading: payload,
      };
    case LIST_USER_DATA:
      return {
        ...state,
        data: payload,
      };
    case SET_ALERT_USER:
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
