import axios from 'axios';
import {
  BACKEND_URL,
  LIST_USER_DATA,
  LOADING_LIST_USER,
  SET_ALERT_USER,
  SINGLE_SELF_USER,
} from '../../actions/types';

export const listUser = () => async (dispatch) => {
  dispatch({ type: LOADING_LIST_USER, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = {};
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'user/list-user',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: LOADING_LIST_USER, payload: false });
        dispatch({ type: LIST_USER_DATA, payload: response.data.data });
      } else {
        dispatch({ type: LOADING_LIST_USER, payload: false });
        dispatch({ type: LIST_USER_DATA, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: LOADING_LIST_USER, payload: false });
      dispatch({ type: LIST_USER_DATA, payload: [] });
    });
};

let userAlet;
export const addUser = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'user/add-user',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listUser());
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_USER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_USER,
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
        type: SET_ALERT_USER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const editUser =
  (data, flag = false) =>
  async (dispatch) => {
    const config = {
      'Content-Type': 'application/json',
    };
    const body = data;
    await axios({
      method: 'POST',
      url: BACKEND_URL + 'user/edit-user',
      data: body,
      headers: config,
    })
      .then((response) => {
        if (response.data.statuscode === 200) {
          if (flag) {
            dispatch(listSingleUser(data.id));
          } else {
            dispatch(listUser());
          }
          dispatch({
            type: SET_ALERT_USER,
            payload: {
              isError: true,
              isErrorType: 'SUCCESS',
              errMessage: response.data.message,
            },
          });
          clearTimeout(userAlet);
          userAlet = setTimeout(() => {
            dispatch({
              type: SET_ALERT_USER,
              payload: {
                isError: false,
                isErrorType: null,
                errMessage: null,
              },
            });
          }, 1000);
        } else {
          dispatch({
            type: SET_ALERT_USER,
            payload: {
              isError: true,
              isErrorType: 'FAIL',
              errMessage: response.data.message,
            },
          });
          clearTimeout(userAlet);
          userAlet = setTimeout(() => {
            dispatch({
              type: SET_ALERT_USER,
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
          type: SET_ALERT_USER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: 'Something went wrong! Please try again later',
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_USER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      });
  };

export const passwordUpdate = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'user/update-password',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_USER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_USER,
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
        type: SET_ALERT_USER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const passwordUpdateAdmin = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'user/update-password-admin',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_USER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_USER,
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
        type: SET_ALERT_USER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const deleteUser = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'user/delete-user',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listUser());
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_USER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_USER,
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
        type: SET_ALERT_USER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_USER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const listSingleUser = (id) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = { id: id };
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'user/list-user-by-id',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: SINGLE_SELF_USER, payload: response.data.data });
      }
    })
    .catch((error) => {});
};
