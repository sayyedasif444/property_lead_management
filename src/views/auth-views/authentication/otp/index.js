import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Button, Form, Input, Alert, Row, Col, Card } from 'antd';
import {
  getOtpTime,
  loadUser,
  OTPloginAPi,
  resendOtp,
} from '../../../../apis/login/auth';
import PropTypes from 'prop-types';

import { Link, Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';
import store from '../../../../redux/store';
import {
  OTP_FALSE,
  SET_LOADING_FALSE,
  SET_OTP_TIMEOUT,
} from '../../../../actions/types';
const backgroundStyle = {
  backgroundImage: '',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

var timeHolder = null;
var firstTime = false;

export const OTPlogin = ({
  OTPloginAPi,
  isAuthenticated,
  errMessage,
  isError,
  isErrorType,
  isMainLoading,
  customUser,
  otpTimeOut,
  getOtpTime,
  isOtp,
  resendOtp,
  otpFreeze,
}) => {
  const theme = useSelector((state) => state.theme.currentTheme);
  const onLogin = (values) => {
    store.dispatch({ type: SET_LOADING_FALSE });
    OTPloginAPi(values.email);
  };

  const [timeDisplay, settimeDisplay] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem('email')) {
      if (!firstTime) {
        getOtpTime(decodeURIComponent(sessionStorage.getItem('email')));
        firstTime = true;
      }
    } else {
      window.location.href = '/auth';
    }
  }, [getOtpTime]);

  const getTimeRemaining = useRef(
    (e) => {
      var total = parseInt(e / 60);
      var secTotal = e % 60;
      clearInterval(timeHolder);
      timeHolder = setInterval(() => {
        if (secTotal === 0) {
          total -= 1;
          secTotal = 59;
        } else {
          secTotal -= 1;
        }
        settimeDisplay({
          total,
          secTotal,
        });
        if (total < 0) {
          clearInterval(timeHolder);
          settimeDisplay(null);
        }
      }, 1000);
    },
    [timeDisplay]
  );

  useEffect(() => {
    if (otpTimeOut > 0) {
      getTimeRemaining.current(otpTimeOut);
      store.dispatch({ type: SET_OTP_TIMEOUT, payload: 0 });
    }
  }, [otpTimeOut]);

  if (isOtp) {
    store.dispatch({ type: OTP_FALSE });
  }
  if (isAuthenticated) {
    loadUser();
    if (sessionStorage.getItem('role') === 'USER') {
      return <Redirect to='/app' />;
    }
    if (sessionStorage.getItem('role') === 'COMPANY-ADMIN') {
      return <Redirect to='/app' />;
    }
    if (sessionStorage.getItem('role') === 'PROJECT-ADMIN') {
      return <Redirect to='/app' />;
    }
    if (sessionStorage.getItem('role') === 'CUSTOM-USER') {
    }
    if (sessionStorage.getItem('role') === 'SUPER-USER') {
      return <Redirect to='/app' />;
    }
  } else {
    store.dispatch({ type: SET_LOADING_FALSE });
  }
  if (customUser === 'COMPLIANCE-ADMIN') {
    return <Redirect to='/app/compliance-master' />;
  } else if (customUser === 'CXO-ADMIN') {
    return <Redirect to='/app' />;
  }
  return (
    <div className='h-100' style={backgroundStyle}>
      <div className='container d-flex flex-column justify-content-center h-100'>
        <Row justify='center'>
          <Col xs={20} sm={20} md={20} lg={9}>
            <Card className='shadow' style={{ background: '#1245A8' }}>
              <div className='my-2'>
                <div className='text-center'>
                  <img
                    className='img-fluid'
                    src={`/img/${
                      theme === 'light' ? 'logo-white.png' : 'logo-white.png'
                    }`}
                    alt=''
                    style={{ height: '70px' }}
                  />
                  <h3 className='mt-3 font-weight-bold text-white'>
                    OTP verification
                  </h3>
                  <p className='mb-4 text-white'>
                    Enter your OTP sent on your email
                  </p>
                </div>
                <Row justify='center' style={{ marginTop: '-10px' }}>
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <motion.div
                      initial={{ opacity: 0, marginBottom: 0 }}
                      animate={{
                        opacity: isError ? 1 : 0,
                        marginBottom: isError ? 20 : 0,
                      }}
                      className='pt-3 '
                    >
                      <Alert type='error' showIcon message={errMessage}></Alert>
                    </motion.div>
                    <Form
                      layout='vertical'
                      name='login-form'
                      onFinish={onLogin}
                    >
                      <Form.Item
                        name='email'
                        className='mb-0'
                        label={<span className='text-white'>OTP</span>}
                        rules={[
                          {
                            required: true,
                            message: 'Please input your OTP',
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
                        <Input placeholder='OTP' />
                      </Form.Item>
                      <div className='text-right text-white mb-3'>
                        {timeDisplay !== null ? (
                          timeDisplay.total === 0 &&
                          timeDisplay.secTotal === 0 ? (
                            <Link
                              to='#!'
                              onClick={(e) => {
                                resendOtp(sessionStorage.getItem('email'));
                              }}
                              className='text-white'
                            >
                              Resend
                            </Link>
                          ) : (
                            'Resend in: ' +
                            String(timeDisplay.total).padStart(2, '0') +
                            ':' +
                            String(timeDisplay.secTotal).padStart(2, '0')
                          )
                        ) : (
                          <Link
                            to='#!'
                            onClick={(e) => {
                              resendOtp(sessionStorage.getItem('email'));
                            }}
                            className='text-white'
                          >
                            Resend
                          </Link>
                        )}
                      </div>
                      <Form.Item className='mb-2'>
                        <Button
                          type='default'
                          htmlType='submit'
                          block
                          loading={isMainLoading ? true : otpFreeze}
                          disabled={otpFreeze}
                        >
                          Sign In
                        </Button>
                      </Form.Item>
                      <p className=''>
                        <Link to='/auth/login' className='text-white'>
                          Login
                        </Link>
                        <Link
                          to='/auth/forgot-password'
                          className='text-white ml-auto'
                          style={{ float: 'right' }}
                        >
                          Forgot Password
                        </Link>
                      </p>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

OTPlogin.propTypes = {
  OTPloginAPi: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isMainLoading: PropTypes.bool,
  customUser: PropTypes.any,
  isOtp: PropTypes.bool,
  otpTimeOut: PropTypes.any,
  otpFreeze: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isError: state.auth.isError,
  errMessage: state.auth.errMessage,
  isErrorType: state.auth.isErrorType,
  isMainLoading: state.auth.loading,
  isOtp: state.auth.isOtp,
  customUser: state.auth.customeUserRole,
  otpTimeOut: state.auth.otpTimeOut,
  otpFreeze: state.auth.otpFreeze,
});
export default connect(mapStateToProps, { OTPloginAPi, getOtpTime, resendOtp })(
  OTPlogin
);
