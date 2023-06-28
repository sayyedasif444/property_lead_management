import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAction } from '../../../apis/dashboard/Lead';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  addAction,
  singleData,
  user,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    values.lead_id = singleData.id;
    addAction(values);
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
      title='Add next action'
      visible={visible}
      centered
      footer={null}
      width={800}
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
              name='i_date'
              style={{ width: '100%' }}
              label={<span>Date</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Date`,
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='i_time'
              style={{ width: '100%' }}
              label={<span>Time</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Source`,
                },
              ]}
            >
              <TimePicker style={{ width: '100%' }} format='HH:mm' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='assigned_id' label={<span>Assign to</span>}>
              <Select size={'default'} style={{ width: '100%' }}>
                <Select.Option value={''}></Select.Option>
                {user.map((ele, index) => (
                  <Select.Option value={ele.id} key={index}>
                    {ele.first_name + ' ' + ele.last_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='isArrival'
              label={<span>Arrival</span>}
              initialValue={false}
            >
              <Select size={'default'} style={{ width: '100%' }}>
                <Select.Option value={false}>No</Select.Option>
                <Select.Option value={true}>Yes</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='description'
              label={<span>Descripiton</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Descripiton`,
                },
              ]}
            >
              <Input.TextArea type='text' placeholder='Descripiton' />
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
  addAction: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  singleData: PropTypes.any,
  user: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.lead.isError,
  errMessage: state.lead.errMessage,
  isErrorType: state.lead.isErrorType,
  user: state.user.data,
  singleData: state.lead.singleData,
});
export default connect(mapStateToProps, { addAction })(AddUser);
