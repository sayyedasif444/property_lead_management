import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../../apis/login/auth';
import PropTypes from 'prop-types';

import { Link, Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';
import store from '../../../redux/store';
import { SET_LOADING_FALSE } from '../../../actions/types';
import setAuthToken from '../../../utils/setAuthToken';
import { listProperty } from '../../../apis/dashboard/Property';
import { listTask, listTaskUser } from '../../../apis/dashboard/Task';
import { listUser } from '../../../apis/dashboard/User';
import { listLead, listSource } from '../../../apis/dashboard/Lead';
import { listMeeting } from '../../../apis/dashboard/Meeting';
import { listProjects } from '../../../apis/dashboard/Project';
import { listCustomers } from '../../../apis/dashboard/Customer';
import {
  listExpense,
  listExpenseCategory,
} from '../../../apis/dashboard/expense';
import { listTransaction } from '../../../apis/dashboard/transaction';
import { listSalary } from '../../../apis/dashboard/Salary';

export const LoginForm = ({
  login,
  isAuthenticated,
  errMessage,
  isError,
  isErrorType,
  isOtp,
  isMainLoading,
  listProperty,
  listTask,
  listUser,
  listTaskUser,
  listLead,
  listSource,
  listMeeting,
  listProjects,
  listCustomers,
  listExpenseCategory,
  listExpense,
  listTransaction,
  listSalary,
}) => {
  const onLogin = async (values) => {
    setloadingButton(true);
    store.dispatch({ type: SET_LOADING_FALSE });
    await login(values.email, values.password);
  };

  useEffect(() => {
    if (!isError) {
      setloadingButton(false);
    }
  }, [isError, isErrorType]);

  const [loadingButton, setloadingButton] = useState(false);

  if (isAuthenticated) {
    setAuthToken(sessionStorage.token);
    listProperty();
    listTask();
    listUser();
    listTaskUser();
    listLead();
    listSalary();
    listSource();
    listMeeting();
    listProjects();
    listCustomers();
    listExpenseCategory();
    listExpense();
    listTransaction();
    return <Redirect to='/app' />;
  } else {
    store.dispatch({ type: SET_LOADING_FALSE });
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: isError ? 1 : 0,
          marginBottom: isError ? 20 : 0,
        }}
        className='pt-2 '
      >
        {isError && isErrorType === 'LOGIN' && (
          <Alert type='error' showIcon message={errMessage}></Alert>
        )}
      </motion.div>
      <Form
        layout='vertical'
        name='login-form'
        className='text-white'
        onFinish={onLogin}
      >
        <Form.Item
          name='email'
          label={<span className='text-white'>Email</span>}
          className='mb-2'
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
            {
              type: 'email',
              message: 'Please enter a validate email!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value) {
                  var format =
                    /(\W*(<script)\W*)|(\W*(javascript)\W*)|(\W*(jquery)\W*)|(\W*(console.)\W*)|(\W*(<)\W*)|(\W*(>)\W*)/;
                  if (format.test(value)) {
                    return Promise.reject(
                      'Restricted character/word(s) detected.'
                    );
                  }
                  return Promise.resolve();
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
        >
          <Input prefix={<MailOutlined className='text-primary' />} />
        </Form.Item>
        <Form.Item
          name='password'
          className='text-white mb-4'
          label={
            <div className={``}>
              <span className='text-white'>Password</span>
            </div>
          }
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value) {
                  var format =
                    /(\W*(<script)\W*)|(\W*(javascript)\W*)|(\W*(jquery)\W*)|(\W*(console.)\W*)|(\W*(<)\W*)|(\W*(>)\W*)/;
                  if (format.test(value)) {
                    return Promise.reject(
                      'Restricted character/word(s) detected.'
                    );
                  }
                  return Promise.resolve();
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className='text-primary' />} />
        </Form.Item>
        <Form.Item className='mb-2 mt-3'>
          <Button
            type='default'
            htmlType='submit'
            block
            loading={loadingButton}
          >
            Sign In
          </Button>
        </Form.Item>
        <p className='text-right text-white'>
          <Link to='/auth/forgot-password' className='text-white'>
            Forgot Password
          </Link>
        </p>
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isMainLoading: PropTypes.bool,
  isOtp: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isError: state.auth.isError,
  errMessage: state.auth.errMessage,
  isErrorType: state.auth.isErrorType,
  isMainLoading: state.auth.loading,
  isOtp: state.auth.isOtp,
});
export default connect(mapStateToProps, {
  login,
  listProperty,
  listTask,
  listUser,
  listTaskUser,
  listLead,
  listSource,
  listMeeting,
  listProjects,
  listCustomers,
  listExpenseCategory,
  listExpense,
  listTransaction,
  listSalary,
})(LoginForm);
