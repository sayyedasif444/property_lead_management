import {
  LIST_TASK_DATA,
  LIST_TASK_DATA_USERS,
  LOADING_LIST_TASK,
  LOADING_LIST_USER_TASK,
  SET_ALERT_TASK,
  SET_SIGNLE_TASK,
} from '../../actions/types';

const initialState = {
  loading: true,
  loadingUser: true,
  isError: false,
  isErrorType: null,
  errMessage: null,
  data: [],
  dataUser: [],
  singleData: {},
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SIGNLE_TASK:
      return {
        ...state,
        singleData: payload,
      };
    case LOADING_LIST_TASK:
      return {
        ...state,
        loading: payload,
      };
    case LIST_TASK_DATA:
      return {
        ...state,
        data: payload,
      };
    case LOADING_LIST_USER_TASK:
      return {
        ...state,
        loadingUser: payload,
      };
    case LIST_TASK_DATA_USERS:
      return {
        ...state,
        dataUser: payload,
      };
    case SET_ALERT_TASK:
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
