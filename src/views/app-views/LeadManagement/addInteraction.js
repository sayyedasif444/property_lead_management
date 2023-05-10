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
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addInteraction } from '../../../apis/dashboard/Lead';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  addInteraction,
  singleData,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    values.lead_id = singleData.id;
    addInteraction(values);
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
      title='Add last talk'
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
  addInteraction: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  singleData: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.lead.isError,
  errMessage: state.lead.errMessage,
  isErrorType: state.lead.isErrorType,
  singleData: state.lead.singleData,
});
export default connect(mapStateToProps, { addInteraction })(AddUser);
