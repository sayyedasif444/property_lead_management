import {
  LIST_PROJECT_DATA,
  LOADING_LIST_PROJECT,
  SET_ALERT_PROJECT,
  SET_SIGNLE_PROJECT,
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
    case SET_SIGNLE_PROJECT:
      return {
        ...state,
        singleData: payload,
      };
    case LOADING_LIST_PROJECT:
      return {
        ...state,
        loading: payload,
      };
    case LIST_PROJECT_DATA:
      return {
        ...state,
        data: payload,
      };
    case SET_ALERT_PROJECT:
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
