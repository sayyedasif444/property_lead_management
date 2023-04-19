import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
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
  first_name,
  last_name,
  emailid,
  user_type,
  phone_number,
  id,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    values.id = id;
    editUser(values, true);
  };

  useEffect(() => {
    form.setFieldsValue({
      first_name: first_name !== null ? first_name : '',
      last_name: last_name !== null ? last_name : '',
      emailid: emailid !== null ? emailid : '',
      phone_number: phone_number !== null ? phone_number : '',
      user_type: user_type !== null ? user_type : '',
    });
  }, [emailid, first_name, form, last_name, phone_number, user_type]);

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
        <Col span={8}>
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
        <Col span={8}>
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
        <Col span={8} style={{ display: 'none' }}>
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
        <Col span={8}>
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
  first_name: state.auth.first_name,
  last_name: state.auth.last_name,
  emailid: state.auth.email,
  user_type: state.auth.user_type,
  phone_number: state.auth.phone_number,
  id: state.auth.id,
});
export default connect(mapStateToProps, { editUser })(AddUser);
