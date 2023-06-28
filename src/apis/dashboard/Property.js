import axios from 'axios';
import {
  BACKEND_URL,
  BACKEND_URL_PDF,
  LIST_PROPERTY_DATA,
  LOADING_LIST_PROPERTY,
  SET_ALERT_PROPERTY,
  SET_SIGNLE_PROPERTY,
} from '../../actions/types';

let propertyAlert;
export const addProperty = (data, formdata, videoData) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'property/add-property',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        if (formdata.length > 0) {
          dispatch(addMedia(formdata, 'image', response.data.data));
        }
        if (videoData.length > 0) {
          dispatch(addMedia(videoData, 'video', response.data.data));
        }
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(propertyAlert);
        propertyAlert = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROPERTY,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(propertyAlert);
        propertyAlert = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROPERTY,
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
        type: SET_ALERT_PROPERTY,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(propertyAlert);
      propertyAlert = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const listProperty = () => async (dispatch) => {
  dispatch({ type: LOADING_LIST_PROPERTY, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = {};
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'property/list-property',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: LOADING_LIST_PROPERTY, payload: false });
        dispatch({ type: LIST_PROPERTY_DATA, payload: response.data.data });
      } else {
        dispatch({ type: LOADING_LIST_PROPERTY, payload: false });
        dispatch({ type: LIST_PROPERTY_DATA, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: LOADING_LIST_PROPERTY, payload: false });
      dispatch({ type: LIST_PROPERTY_DATA, payload: [] });
    });
};

export const deleteProperty = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'property/delete-property',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProperty());
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(propertyAlert);
        propertyAlert = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROPERTY,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(propertyAlert);
        propertyAlert = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROPERTY,
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
        type: SET_ALERT_PROPERTY,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(propertyAlert);
      propertyAlert = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const editProperty = (data, formdata, videoData) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'property/edit-property',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listPropertybyId(data.id));
        if (formdata.length > 0) {
          dispatch(addMedia(formdata, 'image', response.data.data));
        }
        if (videoData.length > 0) {
          dispatch(addMedia(videoData, 'video', response.data.data));
        }
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(propertyAlert);
        propertyAlert = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROPERTY,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(propertyAlert);
        propertyAlert = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROPERTY,
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
        type: SET_ALERT_PROPERTY,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(propertyAlert);
      propertyAlert = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const addMedia =
  (formdata, isMedia, property_id) => async (dispatch) => {
    var body = new FormData();
    body.append('mediaType', isMedia);
    body.append('property_id', property_id);
    formdata.forEach((ele) => {
      body.append('files', ele);
    });
    const config = {
      'Content-Type': 'application/json',
    };
    await axios({
      method: 'POST',
      url: BACKEND_URL + 'property/add-property-files',
      data: body,
      headers: config,
    })
      .then((response) => {
        if (response.data.statuscode === 200) {
          dispatch(listPropertybyId(property_id));
        } else {
        }
      })
      .catch((error) => {});
  };

export const deletePropertyFile = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'property/delete-file',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listPropertybyId(data.property));
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(propertyAlert);
        propertyAlert = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROPERTY,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(propertyAlert);
        propertyAlert = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROPERTY,
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
        type: SET_ALERT_PROPERTY,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(propertyAlert);
      propertyAlert = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROPERTY,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const listPropertybyId = (id) => async (dispatch) => {
  dispatch({ type: LOADING_LIST_PROPERTY, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = { id };
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'property/property-by-id',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({
          type: SET_SIGNLE_PROPERTY,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: SET_SIGNLE_PROPERTY,
          payload: {},
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_SIGNLE_PROPERTY,
        payload: {},
      });
    });
};

export const downloadData = (id) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = { id: id };
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'property/download-file',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        var link = document.createElement('a');
        link.download = response.data.name;
        link.href = BACKEND_URL_PDF + response.data.data;
        link.target = '_blank'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
      }
    })
    .catch((error) => {});
};
