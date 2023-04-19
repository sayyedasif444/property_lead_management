import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { passwordUpdate } from '../../../apis/dashboard/User';

const AddUser = ({ passwordUpdate, singleData }) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    values.id = singleData;
    passwordUpdate(values);
  };

  return (
    <Form
      form={form}
      layout='vertical'
      name='new-company'
      preserve={false}
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name='old_password'
            label={<span>Old Password</span>}
            rules={[
              {
                required: true,
                message: `Please input Old Password`,
              },
            ]}
          >
            <Input type='password' placeholder='Old Password' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name='password'
            label={<span>Password</span>}
            rules={[
              {
                required: true,
                message: `Please input Password`,
              },
            ]}
          >
            <Input type='password' placeholder='Password' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name='confirm_password'
            label={<span>Confirm Password</span>}
            rules={[
              {
                required: true,
                message: `Please input Confirm Password`,
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value) {
                    if (value !== form.getFieldValue('password')) {
                      return Promise.reject('Passwords does not match');
                    }
                    return Promise.resolve();
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input type='password' placeholder='Confirm Password' />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className='text-right mb-0'>
        <Button type='primary' htmlType='submit'>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

AddUser.propTypes = {
  passwordUpdate: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  singleData: PropTypes.any,
  isErrorType: PropTypes.string,
};
const mapStateToProps = (state) => ({
  isError: state.user.isError,
  errMessage: state.user.errMessage,
  isErrorType: state.user.isErrorType,
  singleData: state.auth.id,
});
export default connect(mapStateToProps, { passwordUpdate })(AddUser);
