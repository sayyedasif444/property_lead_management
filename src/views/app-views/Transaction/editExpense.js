import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, DatePicker } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editTransaction } from '../../../apis/dashboard/transaction';
import moment from 'moment';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  editTransaction,
  dataset,
}) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    values.id = dataset.id;
    editTransaction(values);
  };

  useEffect(() => {
    if (Object.keys(dataset).length > 0 && visible) {
      form.setFieldsValue({
        name: dataset.name !== null ? dataset.name : '',
        particular: dataset.particular !== null ? dataset.particular : '',
        date:
          dataset.date !== null
            ? moment(new Date(dataset.date.substring(0, 10)))
            : '',
        date_last:
          dataset.date_last !== null
            ? moment(new Date(dataset.date_last.substring(0, 10)))
            : '',
        credit: dataset.credit !== null ? dataset.credit : '',
        debit: dataset.debit !== null ? dataset.debit : '',
        last_payment: dataset.last_payment !== null ? dataset.last_payment : '',
      });
    }
  }, [dataset, form, visible]);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS_EXPENSE') {
      setTimeout(() => {
        cancel(false);
        form.resetFields();
      }, 1000);
    }
  }, [isError, isErrorType, errMessage, form, cancel]);

  return (
    <Modal
      title='Edit Transaction'
      visible={visible}
      centered
      footer={null}
      width={700}
      destroyOnClose={true}
      onCancel={(e) => cancel(false)}
    >
      <Form form={form} layout='vertical' preserve={false} onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='name'
              style={{ width: '100%' }}
              label={<span>Name</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Name`,
                },
              ]}
            >
              <Input placeholder='Name' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='particular'
              style={{ width: '100%' }}
              label={<span>Particular</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Particular`,
                },
              ]}
            >
              <Input placeholder='Particular' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='date'
              style={{ width: '100%' }}
              label={<span>Expected Date</span>}
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
              name='credit'
              style={{ width: '100%' }}
              label={<span>Credit</span>}
            >
              <Input placeholder='Credit' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='debit'
              style={{ width: '100%' }}
              label={<span>Debit</span>}
            >
              <Input placeholder='Debit' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='last_payment'
              style={{ width: '100%' }}
              label={<span>Last Payment</span>}
            >
              <Input placeholder='Last Payment' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='date_last'
              style={{ width: '100%' }}
              label={<span>Last Payment Date</span>}
            >
              <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
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
  editTransaction: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  singleData: PropTypes.any,
  category: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.transaction.isError,
  errMessage: state.transaction.errMessage,
  isErrorType: state.transaction.isErrorType,
  singleData: state.transaction.singleData,
  category: state.transaction.category,
});
export default connect(mapStateToProps, { editTransaction })(AddUser);
