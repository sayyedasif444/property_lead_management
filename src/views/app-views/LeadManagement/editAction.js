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
import { editAction } from '../../../apis/dashboard/Lead';
import moment from 'moment';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  editAction,
  singleData,
  user,
  singleAction,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    values.lead_id = singleData.id;
    values.id = singleAction.id;
    values.i_date = new Date(values.i_date.format('YYYY-MM-DD'));
    editAction(values);
  };

  useEffect(() => {
    if (Object.keys(singleAction).length > 0 && visible) {
      form.setFieldsValue({
        i_date:
          singleAction.i_date !== null
            ? moment(singleAction.i_date.substring(0, 10))
            : '',
        i_time: singleAction.i_time !== null ? moment(singleAction.i_time) : '',
        description:
          singleAction.description !== null ? singleAction.description : '',
        assigned_id:
          singleAction.assigned_id !== null ? singleAction.assigned_id : '',
        isArrival:
          singleAction.isArrival !== null ? singleAction.isArrival : false,
      });
    }
  }, [singleAction, form, visible]);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      setTimeout(() => {
        cancel(false);
      }, 1000);
    }
  }, [isError, isErrorType, errMessage, form, cancel]);

  return (
    <Modal
      title='Edit action'
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
  editAction: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  singleData: PropTypes.any,
  user: PropTypes.any,
  singleAction: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.lead.isError,
  errMessage: state.lead.errMessage,
  isErrorType: state.lead.isErrorType,
  user: state.user.data,
  singleData: state.lead.singleData,
  singleAction: state.lead.singleAction,
});
export default connect(mapStateToProps, { editAction })(AddUser);
