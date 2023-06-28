import axios from 'axios';
import {
  BACKEND_URL,
  LIST_EXPENSE_DATA,
  LIST_EXPNSE_CATEGORY,
  LOADING_LIST_EXPENSE,
  SET_ALERT_EXPENSE,
} from '../../actions/types';

export const listExpenseCategory = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/list-expense-category',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: LIST_EXPNSE_CATEGORY, payload: response.data.data });
      } else {
        dispatch({ type: LIST_EXPNSE_CATEGORY, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: LIST_EXPNSE_CATEGORY, payload: [] });
    });
};

export const listExpense = (data) => async (dispatch) => {
  dispatch({ type: LOADING_LIST_EXPENSE, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/list-expense',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: LOADING_LIST_EXPENSE, payload: false });
        dispatch({ type: LIST_EXPENSE_DATA, payload: response.data.data });
      } else {
        dispatch({ type: LOADING_LIST_EXPENSE, payload: false });
        dispatch({ type: LIST_EXPENSE_DATA, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: LOADING_LIST_EXPENSE, payload: false });
      dispatch({ type: LIST_EXPENSE_DATA, payload: [] });
    });
};

let userAlet = null;
export const addExpenseCategory = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/add-expense-category',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listExpenseCategory());
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_EXPENSE,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_EXPENSE,
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
        type: SET_ALERT_EXPENSE,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const addExpense = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/add-expense',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listExpense());
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_EXPENSE,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_EXPENSE,
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
        type: SET_ALERT_EXPENSE,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};
export const editExpense = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/edit-expense',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listExpense());
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_EXPENSE,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_EXPENSE,
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
        type: SET_ALERT_EXPENSE,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const deleteExpense = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/delete-expense',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listExpense());
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_EXPENSE,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_EXPENSE,
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
        type: SET_ALERT_EXPENSE,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_EXPENSE,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};
