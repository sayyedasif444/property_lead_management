import React, { useEffect } from 'react';
import { Card, Row, Col, Form, Input, Button, Alert, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { connect, useSelector } from 'react-redux';
import { forgotPassword } from '../../../../apis/login/auth';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

const backgroundStyle = {
  backgroundImage: '',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const ForgotPassword = ({
  forgotPassword,
  isError,
  errMessage,
  isErrorType,
}) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const theme = useSelector((state) => state.theme.currentTheme);
  const onSend = async (values) => {
    await sessionStorage.setItem('email_otp_val', values.email);
    await forgotPassword(values.email);
  };
  useEffect(() => {
    console.log(isError, isErrorType, errMessage);
    if (isError && isErrorType === 'RESET_SUCCESS') {
      message.success(errMessage);
      const uri = '/auth/login';
      setTimeout((e) => {
        history.push(uri);
      }, 100);
    }
  }, [isError, isErrorType, history, form, errMessage]);

  return (
    <div className='h-100 bg' style={backgroundStyle}>
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
                    Enter your Email to reset password
                  </p>
                </div>
                <Row justify='center' style={{ marginTop: '-10px' }}>
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
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email address',
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
                        <Input
                          placeholder='Email Address'
                          prefix={<MailOutlined className='text-primary' />}
                        />
                      </Form.Item>
                      <Form.Item className='mb-0'>
                        <Button
                          loading={false}
                          type='default'
                          htmlType='submit'
                          block
                        >
                          {false ? 'Sending' : 'Send'}
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

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  isErrorType: PropTypes.string,
  errMessage: PropTypes.string,
};
const mapStateToProps = (state) => ({
  isError: state.auth.isError,
  errMessage: state.auth.errMessage,
  isErrorType: state.auth.isErrorType,
});
export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
