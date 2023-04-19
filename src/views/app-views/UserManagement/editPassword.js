import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { passwordUpdateAdmin } from '../../../apis/dashboard/User';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  passwordUpdateAdmin,
  singleData,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    values.id = singleData.id;
    passwordUpdateAdmin(values);
  };

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      setTimeout(() => {
        cancel(false);
        form.resetFields();
      }, 1000);
    }
  }, [isError, isErrorType, errMessage, form, cancel]);

  return (
    <Modal
      title='Edit User Password'
      visible={visible}
      centered
      footer={null}
      width={700}
      destroyOnClose={true}
      onCancel={(e) => cancel(false)}
    >
      <Form
        form={form}
        layout='vertical'
        name='new-company'
        preserve={false}
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={24}>
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
          <Col span={24}>
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
    </Modal>
  );
};

AddUser.propTypes = {
  passwordUpdateAdmin: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  singleData: PropTypes.any,
  isErrorType: PropTypes.string,
};
const mapStateToProps = (state) => ({
  isError: state.user.isError,
  errMessage: state.user.errMessage,
  isErrorType: state.user.isErrorType,
  singleData: state.user.singleData,
});
export default connect(mapStateToProps, { passwordUpdateAdmin })(AddUser);
