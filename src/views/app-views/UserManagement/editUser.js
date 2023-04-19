import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, Select } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editUser } from '../../../apis/dashboard/User';
const { Option } = Select;

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  editUser,
  singleData,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    values.id = singleData.id;
    editUser(values);
  };

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      setTimeout(() => {
        cancel(false);
        form.resetFields();
      }, 1000);
    }
  }, [isError, isErrorType, errMessage, form, cancel]);

  useEffect(() => {
    if (Object.keys(singleData).length > 0) {
      form.setFieldsValue({
        first_name: singleData.first_name !== null ? singleData.first_name : '',
        last_name: singleData.last_name !== null ? singleData.last_name : '',
        emailid: singleData.emailid !== null ? singleData.emailid : '',
        phone_number:
          singleData.phone_number !== null ? singleData.phone_number : '',
        user_type: singleData.user_type !== null ? singleData.user_type : '',
      });
    }
  }, [singleData, form]);

  return (
    <Modal
      title='Edit User'
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
          <Col span={12}>
            <Form.Item
              name='first_name'
              label={<span>First Name</span>}
              rules={[
                {
                  required: true,
                  message: `Please input First Name`,
                },
              ]}
            >
              <Input placeholder='First Name' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='last_name'
              label={<span>Last Name</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Last Name`,
                },
              ]}
            >
              <Input placeholder='Last Name' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='emailid'
              label={<span>Email Id</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Email Id`,
                },
              ]}
            >
              <Input type='email' placeholder='Email Id' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='user_type'
              label={<span>User Role</span>}
              rules={[
                {
                  required: true,
                  message: `Please input user type`,
                },
              ]}
            >
              <Select size={'default'} style={{ width: '100%' }}>
                <Option value={'USER'}>USER</Option>
                <Option value={'ADMIN'}>ADMIN</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='phone_number' label={<span>Phone Number</span>}>
              <Input placeholder='Phone Number' />
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
  editUser: PropTypes.any,
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
export default connect(mapStateToProps, { editUser })(AddUser);
