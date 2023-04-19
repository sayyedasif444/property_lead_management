import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  RESET_LOGIN_FAILED,
  SET_LOADING_FALSE,
  LOGOUT,
  SINGLE_SELF_USER,
} from '../../actions/types';

const initialState = {
  token: sessionStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  isError: false,
  isErrorType: null,
  errMessage: null,
  first_name: null,
  last_name: null,
  phone_number: null,
  user_type: null,
  email: null,
  id: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        isError: false,
        isErrorType: null,
        errMessage: null,
        first_name: null,
        last_name: null,
        user_type: null,
        email: null,
        id: null,
      };
    case RESET_LOGIN_FAILED:
      return {
        ...state,
        isError: false,
        isErrorType: '',
        errMessage: '',
      };
    case SINGLE_SELF_USER:
      sessionStorage.setItem('firstName', payload.first_name);
      sessionStorage.setItem('lastName', payload.last_name);
      sessionStorage.setItem('email', payload.emailid);
      sessionStorage.setItem('user_type', payload.user_type);
      sessionStorage.setItem('phone_number', payload.phone_number);
      return {
        ...state,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.emailid,
        user_type: payload.user_type,
        phone_number: payload.phone_number,
      };
    case LOGIN_SUCCESS:
      sessionStorage.setItem('token', payload.token);
      sessionStorage.setItem('firstName', payload.firstName);
      sessionStorage.setItem('lastName', payload.lastName);
      sessionStorage.setItem('email', payload.email);
      sessionStorage.setItem('id', payload.id);
      sessionStorage.setItem('user_type', payload.user_type);
      sessionStorage.setItem('phone_number', payload.phone_number);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: payload.token,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        id: payload.id,
        user_type: payload.user_type,
        phone_number: payload.phone_number,
      };
    case LOGIN_FAILED:
      sessionStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        isError: true,
        isErrorType: payload.hasOwnProperty('type')
          ? payload.type
          : 'LOGIN_FAILED',
        errMessage: payload.message,
      };
    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;
