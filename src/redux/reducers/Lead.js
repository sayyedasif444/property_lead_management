import {
  LIST_INTERACTION_DATA,
  LIST_LEAD_DATA,
  LIST_SOURCE_DATA,
  LOADING_LIST_INTERACTION,
  LOADING_LIST_LEAD,
  LOADING_LIST_SOURCE,
  SET_ALERT_LEAD,
  SET_SIGNLE_LEAD,
  SET_SIGNLE_INTERACTION,
  LOADING_LIST_ACTION,
  LIST_ACTION_DATA,
  SET_SIGNLE_ACTION,
} from '../../actions/types';

const initialState = {
  loading: true,
  isError: false,
  isErrorType: null,
  errMessage: null,
  data: [],
  source: [],
  sourceLoading: false,
  interaction: [],
  interactionLoading: false,
  singleData: {},
  singleInteraction: {},
  action: [],
  actionLoading: false,
  singleAction: {},
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_LIST_ACTION:
      return {
        ...state,
        actionLoading: payload,
      };
    case LIST_ACTION_DATA:
      return {
        ...state,
        action: payload,
      };
    case LOADING_LIST_INTERACTION:
      return {
        ...state,
        interactionLoading: payload,
      };
    case LIST_INTERACTION_DATA:
      return {
        ...state,
        interaction: payload,
      };
    case LOADING_LIST_SOURCE:
      return {
        ...state,
        sourceLoading: payload,
      };
    case LIST_SOURCE_DATA:
      return {
        ...state,
        source: payload,
      };
    case SET_SIGNLE_LEAD:
      return {
        ...state,
        singleData: payload,
      };
    case SET_SIGNLE_ACTION:
      return {
        ...state,
        singleAction: payload,
      };
    case SET_SIGNLE_INTERACTION:
      return {
        ...state,
        singleInteraction: payload,
      };
    case LOADING_LIST_LEAD:
      return {
        ...state,
        loading: payload,
      };
    case LIST_LEAD_DATA:
      return {
        ...state,
        data: payload,
      };
    case SET_ALERT_LEAD:
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
