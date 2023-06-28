import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, DatePicker } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTransaction } from '../../../apis/dashboard/transaction';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  addTransaction,
}) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    addTransaction(values);
  };

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
      title='Add Transaction'
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
  addTransaction: PropTypes.any,
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
export default connect(mapStateToProps, { addTransaction })(AddUser);
