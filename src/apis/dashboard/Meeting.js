import axios from 'axios';
import {
  BACKEND_URL,
  LIST_MEETING_DATA,
  LOADING_LIST_MEETING,
  SET_ALERT_MEETING,
} from '../../actions/types';

export const listMeeting = () => async (dispatch) => {
  dispatch({ type: LOADING_LIST_MEETING, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = {};
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'meeting/list-meeting',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: LOADING_LIST_MEETING, payload: false });
        dispatch({ type: LIST_MEETING_DATA, payload: response.data.data });
      } else {
        dispatch({ type: LOADING_LIST_MEETING, payload: false });
        dispatch({ type: LIST_MEETING_DATA, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: LOADING_LIST_MEETING, payload: false });
      dispatch({ type: LIST_MEETING_DATA, payload: [] });
    });
};

let userAlet;
export const addMeeting = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'meeting/add-meeting',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listMeeting());
        dispatch({
          type: SET_ALERT_MEETING,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_MEETING,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_MEETING,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_MEETING,
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
        type: SET_ALERT_MEETING,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_MEETING,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const editMeeting = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'meeting/edit-meeting',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listMeeting());
        dispatch({
          type: SET_ALERT_MEETING,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_MEETING,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_MEETING,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_MEETING,
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
        type: SET_ALERT_MEETING,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_MEETING,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const deleteMeeting = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'meeting/delete-meeting',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listMeeting());
        dispatch({
          type: SET_ALERT_MEETING,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_MEETING,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_MEETING,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_MEETING,
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
        type: SET_ALERT_MEETING,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_MEETING,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};
