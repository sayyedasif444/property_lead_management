import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, Select } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../../apis/dashboard/Lead';
import { Link } from 'react-router-dom';
const { Option } = Select;

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  addLead,
  source,
  user,
  setModalVisibleeditPass,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    if (values.source_id === '') {
      values.source_id = null;
    }
    addLead(values);
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
      title='New Lead'
      visible={visible}
      centered
      footer={null}
      width={900}
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
            <Form.Item name='company' label={<span>Company</span>}>
              <Input type='type' placeholder='Company' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='designation' label={<span>Designation</span>}>
              <Input type='type' placeholder='Designation' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='property_type' label={<span>Property Type</span>}>
              <Select size={'default'} style={{ width: '100%' }}>
                <Option value='Residential'>Residential</Option>
                <Option value='Investment'>Investment</Option>
                <Option value='Commercial'>Commercial</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='emailid' label={<span>Email Id</span>}>
              <Input type='email' placeholder='Email Id' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='mobile_number' label={<span>Phone Number</span>}>
              <Input placeholder='Phone Number' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='source_id' label={<span>Source</span>}>
              <Select size={'default'} style={{ width: '100%' }}>
                <Option value={''}></Option>
                {source.map((ele, index) => (
                  <Option value={ele.id} key={index}>
                    {ele.source}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Link
              to='#!'
              className=''
              style={{ position: 'absolute', right: '10px', top: '0px' }}
              onClick={(e) => {
                e.preventDefault();
                setModalVisibleeditPass(true);
              }}
            >
              Add Source
            </Link>
          </Col>
          <Col span={8}>
            <Form.Item name='assigned_id' label={<span>Assigned to</span>}>
              <Select size={'default'} style={{ width: '100%' }}>
                <Option value={''}></Option>
                {user.map((ele, index) => (
                  <Option value={ele.id} key={index}>
                    {ele.first_name + ' ' + ele.last_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='city' label={<span>City</span>}>
              <Input placeholder='City' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='state' label={<span>State</span>}>
              <Input placeholder='State' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='country' label={<span>Country</span>}>
              <Input placeholder='Country' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='requirement' label={<span>Requirement</span>}>
              <Input.TextArea placeholder='Requirement' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='notes' label={<span>Notes</span>}>
              <Input.TextArea placeholder='Notes' />
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
  addLead: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  source: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.lead.isError,
  errMessage: state.lead.errMessage,
  isErrorType: state.lead.isErrorType,
  source: state.lead.source,
  user: state.user.data,
});
export default connect(mapStateToProps, { addLead })(AddUser);
