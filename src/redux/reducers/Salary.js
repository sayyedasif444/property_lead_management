import {
  SET_ALERT_SALARY,
  LIST_SALARY_DATA,
  LOADING_LIST_SALARY,
} from '../../actions/types';

const initialState = {
  loading: true,
  isError: false,
  isErrorType: null,
  errMessage: null,
  salary: [],
  advance: [],
  deduction: [],
  addons: [],
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_LIST_SALARY:
      return {
        ...state,
        loading: payload,
      };
    case LIST_SALARY_DATA:
      return {
        ...state,
        salary: payload.salary,
        advance: payload.advance,
        deduction: payload.deduction,
        addons: payload.addons,
      };
    case SET_ALERT_SALARY:
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
