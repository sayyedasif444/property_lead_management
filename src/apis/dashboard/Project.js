import axios from 'axios';
import {
  BACKEND_URL,
  LIST_PROJECT_DATA,
  LOADING_LIST_PROJECT,
  SET_ALERT_PROJECT,
  SET_SIGNLE_PROJECT,
} from '../../actions/types';

export const listProjects =
  (id = null) =>
  async (dispatch) => {
    dispatch({ type: LOADING_LIST_PROJECT, payload: true });
    const config = {
      'Content-Type': 'application/json',
    };
    await axios({
      method: 'POST',
      url: BACKEND_URL + 'account/list-project',
      headers: config,
    })
      .then((response) => {
        if (response.data.statuscode === 200) {
          dispatch({ type: LOADING_LIST_PROJECT, payload: false });
          dispatch({ type: LIST_PROJECT_DATA, payload: response.data.data });
          if (id !== null) {
            dispatch({
              type: SET_SIGNLE_PROJECT,
              payload: response.data.data.filter((ele) => ele.id === id)[0],
            });
          }
        } else {
          dispatch({ type: LOADING_LIST_PROJECT, payload: false });
          dispatch({ type: LIST_PROJECT_DATA, payload: [] });
        }
      })
      .catch((error) => {
        dispatch({ type: LOADING_LIST_PROJECT, payload: false });
        dispatch({ type: LIST_PROJECT_DATA, payload: [] });
      });
  };

let userAlet = null;
export const addProject = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/add-project',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(response.data.data));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};
export const editProject = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/edit-project',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const deleteProject = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/delete-project',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects());
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const addPayment = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/add-payment',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const editPayment = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/edit-payment',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const deletePayment = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/delete-payment',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const addExpenseP = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/add-project-expense',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const editExpenseP = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/edit-project-expense',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const deleteExpenseP = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/delete-project-expense',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const addInvestor = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/add-investor',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const editInvestor = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/edit-investor',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const deleteInvestor = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/delete-investor',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const addCommission = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/add-commission',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const editCommission = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/edit-commission',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const deleteCommission = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/delete-commission',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listProjects(data.project_id));
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_PROJECT,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_ALERT_PROJECT,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_PROJECT,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};
