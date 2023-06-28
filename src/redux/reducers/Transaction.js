import {
  LIST_TRANSACTION_DATA,
  LOADING_LIST_TRANSACTION,
  SET_ALERT_TRANSACTION,
  SET_SIGNLE_TRANSACTION,
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
    case SET_SIGNLE_TRANSACTION:
      return {
        ...state,
        singleData: payload,
      };
    case LOADING_LIST_TRANSACTION:
      return {
        ...state,
        loading: payload,
      };
    case LIST_TRANSACTION_DATA:
      return {
        ...state,
        data: payload,
      };
    case SET_ALERT_TRANSACTION:
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
