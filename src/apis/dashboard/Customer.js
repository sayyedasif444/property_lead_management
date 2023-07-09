import axios from 'axios';
import {
  BACKEND_URL,
  LIST_CUSTOMER_DATA,
  LOADING_LIST_CUSTOMER,
  SET_ALERT_CUSTOMER,
  SET_SIGNLE_CUSTOMER,
} from '../../actions/types';

export const listCustomers =
  (id = null) =>
  async (dispatch) => {
    dispatch({ type: LOADING_LIST_CUSTOMER, payload: true });
    const config = {
      'Content-Type': 'application/json',
    };
    await axios({
      method: 'POST',
      url: BACKEND_URL + 'account/list-customer',
      headers: config,
    })
      .then((response) => {
        if (response.data.statuscode === 200) {
          dispatch({ type: LOADING_LIST_CUSTOMER, payload: false });
          dispatch({ type: LIST_CUSTOMER_DATA, payload: response.data.data });
          if (id !== null) {
            dispatch({
              type: SET_SIGNLE_CUSTOMER,
              payload: response.data.data.filter((ele) => ele.id === id)[0],
            });
          }
        } else {
          dispatch({ type: LOADING_LIST_CUSTOMER, payload: false });
          dispatch({ type: LIST_CUSTOMER_DATA, payload: [] });
        }
      })
      .catch((error) => {
        dispatch({ type: LOADING_LIST_CUSTOMER, payload: false });
        dispatch({ type: LIST_CUSTOMER_DATA, payload: [] });
      });
  };

let userAlet = null;
export const addCustomer = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/add-customer',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listCustomers(response.data.data));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};
export const editCustomer = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/edit-customer',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listCustomers(data.id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const deleteCustomer = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/delete-customer',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listCustomers());
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
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
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
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
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
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
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
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
    url: BACKEND_URL + 'account/add-customer-expense',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
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
    url: BACKEND_URL + 'account/edit-customer-expense',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
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
    url: BACKEND_URL + 'account/delete-customer-expense',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const addRepayment = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/add-customer-repayment',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const editRepayment = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/edit-customer-repayment',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const deleteRepayment = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/delete-customer-repayment',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
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
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
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
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
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
        dispatch(listCustomers(data.customer_id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};

export const markCustomer = (data) => async (dispatch) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'account/edit-customer-status',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        dispatch(listCustomers(data.id));
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'SUCCESS_EXPENSE',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
            payload: {
              isError: false,
              isErrorType: null,
              errMessage: null,
            },
          });
        }, 100);
      } else {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: true,
            isErrorType: 'FAIL',
            errMessage: response.data.message,
          },
        });
        clearTimeout(userAlet);
        userAlet = setTimeout(() => {
          dispatch({
            type: SET_ALERT_CUSTOMER,
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
        type: SET_ALERT_CUSTOMER,
        payload: {
          isError: true,
          isErrorType: 'FAIL',
          errMessage: 'Something went wrong! Please try again later',
        },
      });
      clearTimeout(userAlet);
      userAlet = setTimeout(() => {
        dispatch({
          type: SET_ALERT_CUSTOMER,
          payload: {
            isError: false,
            isErrorType: null,
            errMessage: null,
          },
        });
      }, 100);
    });
};
