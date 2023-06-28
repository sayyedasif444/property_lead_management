import {
  LIST_EXPENSE_DATA,
  LOADING_LIST_EXPENSE,
  SET_ALERT_EXPENSE,
  SET_SIGNLE_EXPENSE,
  LIST_EXPNSE_CATEGORY,
} from '../../actions/types';

const initialState = {
  loading: true,
  isError: false,
  isErrorType: null,
  errMessage: null,
  data: [],
  category: [],
  singleData: {},
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIST_EXPNSE_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case SET_SIGNLE_EXPENSE:
      return {
        ...state,
        singleData: payload,
      };
    case LOADING_LIST_EXPENSE:
      return {
        ...state,
        loading: payload,
      };
    case LIST_EXPENSE_DATA:
      return {
        ...state,
        data: payload,
      };
    case SET_ALERT_EXPENSE:
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
