import {
  LIST_CUSTOMER_DATA,
  LOADING_LIST_CUSTOMER,
  SET_ALERT_CUSTOMER,
  SET_SIGNLE_CUSTOMER,
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
    case SET_SIGNLE_CUSTOMER:
      return {
        ...state,
        singleData: payload,
      };
    case LOADING_LIST_CUSTOMER:
      return {
        ...state,
        loading: payload,
      };
    case LIST_CUSTOMER_DATA:
      return {
        ...state,
        data: payload,
      };
    case SET_ALERT_CUSTOMER:
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
