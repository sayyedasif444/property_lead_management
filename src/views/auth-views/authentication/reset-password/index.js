import React, { useEffect, useRef, useState } from 'react';
import { Card, Row, Col, Form, Input, Button, Alert } from 'antd';
import { connect, useSelector } from 'react-redux';
import {
  CheckCircleOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {
  getOtpTime,
  resetPassword,
  forgotPassword,
} from '../../../../apis/login/auth';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import store from 'redux/store';
import { SET_OTP_TIMEOUT } from 'actions/types';

var timeHolder = null;

const backgroundStyle = {
  backgroundImage: '',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const ResetPassword = ({
  resetPassword,
  isError,
  errMessage,
  isErrorType,
  history,
  otpTimeOut,
  getOtpTime,
  forgotPassword,
}) => {
  const [form] = Form.useForm();
  const theme = useSelector((state) => state.theme.currentTheme);
  const onSend = (values) => {
    const query = window.location.href;
    var url = new URL(query);
    const email = url.searchParams.get('user_email');
    resetPassword(email, values.otp, values.password);
  };

  useEffect(() => {
    if (isError && isErrorType === 'RESET_SUCCESS') {
      setTimeout((e) => {
        window.location.href = '/auth';
      }, 3000);
    }
  }, [isError, isErrorType, history, form]);

  const [timeDisplay, settimeDisplay] = useState(null);

  useEffect(() => {
    const query = window.location.href;
    var url = new URL(query);
    const email = url.searchParams.get('user_email');
    getOtpTime(decodeURIComponent(email));
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
                    Forgot Password?
                  </h3>
                  <p className='mb-4 text-white'>
                    Enter OTP and new password
                  </p>
                </div>
                <Row justify='center'>
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <motion.div
                      initial={{ opacity: 0, marginBottom: 0 }}
                      animate={{
                        opacity: isError ? 1 : 0,
                        marginBottom: isError ? 10 : 0,
                      }}
                      className=''
                    >
                      {isError && isErrorType === 'RESET_FAILED' ? (
                        <Alert
                          type='error'
                          showIcon
                          message={errMessage}
                        ></Alert>
                      ) : (
                        isError &&
                        isErrorType === 'RESET_SUCCESS' && (
                          <Alert
                            type='success'
                            showIcon
                            message={errMessage}
                          ></Alert>
                        )
                      )}
                    </motion.div>
                    <Form
                      form={form}
                      layout='vertical'
                      name='forget-password'
                      onFinish={onSend}
                    >
                      <Form.Item
                        name='otp'
                        className='mb-2'
                        label={
                          <div
                            className={
                              'd-flex justify-content-between w-100 align-items-center'
                            }
                          >
                            <span className='text-white'>OTP</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: 'Please input OTP sent on your email',
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
                        <Input
                          prefix={
                            <CheckCircleOutlined className='text-primary' />
                          }
                        />
                      </Form.Item>
                      <div className='text-right text-white'>
                        {timeDisplay !== null ? (
                          timeDisplay.total === 0 &&
                          timeDisplay.secTotal === 0 ? (
                            <Link
                              to='#!'
                              onClick={(e) => {
                                const query = window.location.href;
                                var url = new URL(query);
                                const email =
                                  url.searchParams.get('user_email');
                                forgotPassword(decodeURIComponent(email));
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
                              const query = window.location.href;
                              var url = new URL(query);
                              const email = url.searchParams.get('user_email');
                              forgotPassword(decodeURIComponent(email));
                            }}
                            className='text-white'
                          >
                            Resend
                          </Link>
                        )}
                      </div>
                      <div style={{ position: 'relative' }}>
                        <Form.Item
                          name='password'
                          className='mb-2'
                          label={
                            <div
                              className={
                                'd-flex justify-content-between w-100 align-items-center'
                              }
                            >
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
                          <Input.Password
                            prefix={<LockOutlined className='text-primary' />}
                          />
                        </Form.Item>
                        <span
                          title='1: Atleast 15 Characters &#013;2: Atleast 1 uppercase and 1 lowercase &#013;3: Atleast 1 number &#013;4: Atleast 1 special character'
                          className=' text-white'
                          style={{
                            position: 'absolute',
                            right: '-24px',
                            bottom: '8px',
                            cursor: 'pointer',
                          }}
                        >
                          <InfoCircleOutlined
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                          />
                        </span>
                      </div>

                      <Form.Item
                        name='cpassword'
                        label={
                          <div
                            className={
                              'd-flex justify-content-between w-100 align-items-center'
                            }
                          >
                            <span className='text-white'>Confirm Password</span>
                          </div>
                        }
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password',
                          },
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (
                                !value ||
                                getFieldValue('password') === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject('Password not matched!');
                            },
                          }),
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
                        <Input.Password
                          prefix={<LockOutlined className='text-primary' />}
                        />
                      </Form.Item>
                      <Form.Item className='mb-0'>
                        <Button type='default' htmlType='submit' block>
                          {'Send'}
                        </Button>
                      </Form.Item>
                      <p className='text-right pr-2'>
                        <a href='/auth/login' className='text-white'>
                          Login
                        </a>
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

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isError: PropTypes.bool,
  isErrorType: PropTypes.string,
  errMessage: PropTypes.string,
  otpTimeOut: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isError: state.auth.isError,
  errMessage: state.auth.errMessage,
  isErrorType: state.auth.isErrorType,
  otpTimeOut: state.auth.otpTimeOut,
});
export default connect(mapStateToProps, {
  resetPassword,
  getOtpTime,
  forgotPassword,
})(ResetPassword);
