import axios from 'axios';
import {
  BACKEND_URL,
  LIST_SALARY_DATA,
  LOADING_LIST_SALARY,
  SET_ALERT_SALARY,
} from '../../actions/types';

export const listSalary = () => async (dispatch) => {
  dispatch({ type: LOADING_LIST_SALARY, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = {};
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'salary/list-salary',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: LOADING_LIST_SALARY, payload: false });
        dispatch({
          type: LIST_SALARY_DATA,
          payload: {
            salary: response.data.data,
            addons: response.data.addons,
            advance: response.data.advance,
          },
        });
      } else {
        dispatch({ type: LOADING_LIST_SALARY, payload: false });
        dispatch({
          type: LIST_SALARY_DATA,
          payload: {
            salary: [],
            addons: [],
            advance: [],
          },
        });
      }
    })
    .catch((error) => {
      dispatch({ type: LOADING_LIST_SALARY, payload: false });
      dispatch({
        type: LIST_SALARY_DATA,
        payload: {
          salary: [],
          addons: [],
          advance: [],
        },
      });
    });
};

export const addSalary = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'salary/add-salary',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listSalary());
        dispatch({
          type: SET_ALERT_SALARY,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        setTimeout(() => {
          dispatch({
            type: SET_ALERT_SALARY,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_SALARY,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        setTimeout(() => {
          dispatch({
            type: SET_ALERT_SALARY,
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
        type: SET_ALERT_SALARY,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      setTimeout(() => {
        dispatch({
          type: SET_ALERT_SALARY,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const addSalaryAddon = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'salary/add-salary-addons',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listSalary());
        dispatch({
          type: SET_ALERT_SALARY,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        setTimeout(() => {
          dispatch({
            type: SET_ALERT_SALARY,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_SALARY,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        setTimeout(() => {
          dispatch({
            type: SET_ALERT_SALARY,
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
        type: SET_ALERT_SALARY,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      setTimeout(() => {
        dispatch({
          type: SET_ALERT_SALARY,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};
