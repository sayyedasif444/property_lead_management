import axios from 'axios';
import {
  BACKEND_URL,
  LIST_TRANSACTION_DATA,
  LOADING_LIST_TRANSACTION,
  SET_ALERT_TRANSACTION,
} from '../../actions/types';

export const listTransaction = (data) => async (dispatch) => {
  dispatch({ type: LOADING_LIST_TRANSACTION, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/list-transaction',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: LOADING_LIST_TRANSACTION, payload: false });
        dispatch({ type: LIST_TRANSACTION_DATA, payload: response.data.data });
      } else {
        dispatch({ type: LOADING_LIST_TRANSACTION, payload: false });
        dispatch({ type: LIST_TRANSACTION_DATA, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: LOADING_LIST_TRANSACTION, payload: false });
      dispatch({ type: LIST_TRANSACTION_DATA, payload: [] });
    });
};

let userAlet = null;

export const addTransaction = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/add-transaction',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listTransaction());
        dispatch({
          type: SET_ALERT_TRANSACTION,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_TRANSACTION,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_TRANSACTION,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_TRANSACTION,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_TRANSACTION,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_TRANSACTION,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const editTransaction = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/edit-transaction',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listTransaction());
        dispatch({
          type: SET_ALERT_TRANSACTION,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_TRANSACTION,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_TRANSACTION,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_TRANSACTION,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_TRANSACTION,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_TRANSACTION,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const deleteTransaction = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/delete-transaction',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listTransaction());
        dispatch({
          type: SET_ALERT_TRANSACTION,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_TRANSACTION,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_TRANSACTION,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_TRANSACTION,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_TRANSACTION,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_TRANSACTION,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};
