import axios from 'axios';
import {
  LOGIN_FAILED,
  LOGOUT,
  BACKEND_URL,
  RESET_LOGIN_FAILED,
  LOGIN_SUCCESS,
} from '../../actions/types';

//Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = { emailid: email, password: password };
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'user/login',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: LOGIN_FAILED,
          payload: { message: response.data.message, type: 'LOGIN' },
        });
        setTimeout((e) => {
          dispatch({ type: RESET_LOGIN_FAILED });
        }, 6000);
      }
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_FAILED,
        payload: { message: 'server error', type: 'LOGIN' },
      });
    });
};

//LOGOUT
export const logout = () => async (dispatch) => {
  if (sessionStorage.getItem('token') === null) {
    return;
  }
  await dispatch({ type: LOGOUT });
  sessionStorage.clear();
};

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = { emailid: email };
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'user/email-password',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({
          type: LOGIN_FAILED,
          payload: { message: response.data.message, type: 'RESET_SUCCESS' },
        });
        setTimeout((e) => {
          dispatch({ type: RESET_LOGIN_FAILED });
        }, 6000);
      } else {
        dispatch({
          type: LOGIN_FAILED,
          payload: { message: response.data.message, type: 'RESET_FAILED' },
        });
        setTimeout((e) => {
          dispatch({ type: RESET_LOGIN_FAILED });
        }, 6000);
      }
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_FAILED,
        payload: { message: 'Server error', type: 'RESET_FAILED' },
      });
      setTimeout((e) => {
        dispatch({ type: RESET_LOGIN_FAILED });
      }, 6000);
    });
};
