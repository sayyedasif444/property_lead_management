import {
  LIST_PROPERTY_DATA,
  LOADING_LIST_PROPERTY,
  SET_ALERT_PROPERTY,
  SET_SIGNLE_PROPERTY,
} from '../../actions/types';

const initialState = {
  loading: true,
  isError: false,
  isErrorType: null,
  errMessage: null,
  data: [],
  singleData: {},
};

function propertyReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SIGNLE_PROPERTY:
      return {
        ...state,
        singleData: payload,
      };
    case LOADING_LIST_PROPERTY:
      return {
        ...state,
        loading: payload,
      };
    case LIST_PROPERTY_DATA:
      return {
        ...state,
        data: payload,
      };
    case SET_ALERT_PROPERTY:
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

export default propertyReducer;
