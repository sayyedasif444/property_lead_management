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
import { editInteraction } from '../../../apis/dashboard/Lead';
import moment from 'moment';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  editInteraction,
  singleData,
  singleInteraction,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    values.lead_id = singleData.id;
    values.id = singleInteraction.id;
    values.i_date = values.i_date.format('YYYY-MM-DD');
    console.log(values);
    editInteraction(values);
  };

  useEffect(() => {
    if (Object.keys(singleInteraction).length > 0 && visible) {
      form.setFieldsValue({
        i_date:
          singleInteraction.i_date !== null
            ? moment(singleInteraction.i_date.substring(0, 10))
            : '',
        i_time:
          singleInteraction.i_time !== null
            ? moment(singleInteraction.i_time)
            : '',
        description:
          singleInteraction.description !== null
            ? singleInteraction.description
            : '',
      });
    }
  }, [singleInteraction, form, visible]);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      setTimeout(() => {
        cancel(false);
      }, 1000);
    }
  }, [isError, isErrorType, errMessage, form, cancel]);

  return (
    <Modal
      title='Edit last talk'
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
  editInteraction: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  singleData: PropTypes.any,
  singleInteraction: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.lead.isError,
  errMessage: state.lead.errMessage,
  isErrorType: state.lead.isErrorType,
  singleData: state.lead.singleData,
  singleInteraction: state.lead.singleInteraction,
});
export default connect(mapStateToProps, { editInteraction })(AddUser);
