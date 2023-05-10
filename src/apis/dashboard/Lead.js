import axios from 'axios';
import {
  BACKEND_URL,
  LIST_ACTION_DATA,
  LIST_INTERACTION_DATA,
  LIST_LEAD_DATA,
  LIST_SOURCE_DATA,
  LOADING_LIST_ACTION,
  LOADING_LIST_INTERACTION,
  LOADING_LIST_LEAD,
  LOADING_LIST_SOURCE,
  SET_ALERT_LEAD,
  SET_SIGNLE_LEAD,
} from '../../actions/types';
import store from '../../redux/store';

export const listLead = () => async (dispatch) => {
  dispatch({ type: LOADING_LIST_LEAD, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = {};
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'lead/list-lead',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        if (Object.keys(store.getState().lead.singleData).length > 0) {
          dispatch({
            type: SET_SIGNLE_LEAD,
            payload:
              response.data.data.filter(
                (ele) => ele.id === store.getState().lead.singleData.id
              ).length > 0
                ? response.data.data.filter(
                    (ele) => ele.id === store.getState().lead.singleData.id
                  )[0]
                : {},
          });
        }
        dispatch({ type: LOADING_LIST_LEAD, payload: false });
        dispatch({ type: LIST_LEAD_DATA, payload: response.data.data });
      } else {
        dispatch({ type: LOADING_LIST_LEAD, payload: false });
        dispatch({ type: LIST_LEAD_DATA, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: LOADING_LIST_LEAD, payload: false });
      dispatch({ type: LIST_LEAD_DATA, payload: [] });
    });
};

export const listSource = () => async (dispatch) => {
  dispatch({ type: LOADING_LIST_SOURCE, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = {};
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'source/list-source',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: LOADING_LIST_SOURCE, payload: false });
        dispatch({ type: LIST_SOURCE_DATA, payload: response.data.data });
      } else {
        dispatch({ type: LOADING_LIST_SOURCE, payload: false });
        dispatch({ type: LIST_SOURCE_DATA, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: LOADING_LIST_SOURCE, payload: false });
      dispatch({ type: LIST_SOURCE_DATA, payload: [] });
    });
};

export const listInteraction = (data) => async (dispatch) => {
  dispatch({ type: LOADING_LIST_INTERACTION, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'interaction/list-lead-interaction',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: LOADING_LIST_INTERACTION, payload: false });
        dispatch({ type: LIST_INTERACTION_DATA, payload: response.data.data });
      } else {
        dispatch({ type: LOADING_LIST_INTERACTION, payload: false });
        dispatch({ type: LIST_INTERACTION_DATA, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: LOADING_LIST_INTERACTION, payload: false });
      dispatch({ type: LIST_INTERACTION_DATA, payload: [] });
    });
};

export const listAction = (data) => async (dispatch) => {
  dispatch({ type: LOADING_LIST_ACTION, payload: true });
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'action/list-lead-action',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch({ type: LOADING_LIST_ACTION, payload: false });
        dispatch({ type: LIST_ACTION_DATA, payload: response.data.data });
      } else {
        dispatch({ type: LOADING_LIST_ACTION, payload: false });
        dispatch({ type: LIST_ACTION_DATA, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: LOADING_LIST_ACTION, payload: false });
      dispatch({ type: LIST_ACTION_DATA, payload: [] });
    });
};

export const addSource = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'source/add-source',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listSource());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_SOURCE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const addLead = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'lead/add-lead',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const editLead = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'lead/edit-lead',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

let userAlet;

export const deleteLead = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'lead/delete-lead',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const addInteraction = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'interaction/add-interaction',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listInteraction({ lead_id: data.lead_id }));
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const editInteraction = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'interaction/edit-interaction',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listInteraction({ lead_id: data.lead_id }));
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const deleteInteraction = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'interaction/delete-interaction',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listInteraction({ lead_id: data.lead_id }));
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const addAction = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'action/add-action',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listAction({ lead_id: data.lead_id }));
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const editAction = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'action/edit-action',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listAction({ lead_id: data.lead_id }));
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const deleteAction = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'action/delete-action',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listAction({ lead_id: data.lead_id }));
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const markAction = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'action/update-action-status',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listAction({ lead_id: data.lead_id }));
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};

export const markLead = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'lead/update-lead-status',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listLead());
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_LEAD,
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
        type: SET_ALERT_LEAD,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_LEAD,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 1000);
    });
};
