import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRepayment } from '../../../../apis/dashboard/Customer';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  addRepayment,
  singleData,
}) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    values.customer_id = singleData.id;
    values.mode = JSON.stringify(mode);
    addRepayment(values);
  };
  const [mode, setmode] = useState({
    mode: 'Cash',
    Cash: null,
    UPI: '',
    Bank: {
      transaction_id: '',
      bank_name: '',
      account_no: '',
      beneficiary_bank: '',
      beneficiary_no: '',
    },
    Cheque: { bank: '', number: '', date_of_check: '' },
  });

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
      title='Add Repayment'
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
              name='date_of_expense'
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
              name='amount'
              style={{ width: '100%' }}
              label={<span>Amount</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Amount`,
                },
              ]}
            >
              <Input placeholder='Amount' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item style={{ width: '100%' }} label={<span>Mode </span>}>
              <Select
                size={'default'}
                style={{ width: '100%' }}
                value={mode.mode}
                onChange={(e) => {
                  setmode({ ...mode, mode: e });
                }}
              >
                <Select.Option value={'Cash'}>Cash</Select.Option>
                <Select.Option value={'UPI'}>UPI</Select.Option>
                <Select.Option value={'Cheque'}>Cheque</Select.Option>
                <Select.Option value={'Bank'}>Bank Transfer</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          {mode.mode === 'UPI' && (
            <Col span={12}>
              <Form.Item
                style={{ width: '100%' }}
                label={<span>Transaction Id</span>}
              >
                <Input
                  placeholder='Transaction Id'
                  value={mode[mode.mode]}
                  onChange={(e) => {
                    var mo = { ...mode };
                    mo[mo.mode] = e.target.value;
                    setmode(mo);
                  }}
                />
              </Form.Item>
            </Col>
          )}
          {mode.mode === 'Cheque' && (
            <>
              <Col span={12}>
                <Form.Item
                  style={{ width: '100%' }}
                  label={<span>Bank Name</span>}
                >
                  <Input
                    placeholder='Bank'
                    value={mode.Cheque.bank}
                    onChange={(e) => {
                      var mo = { ...mode };
                      mo.Cheque.bank = e.target.value;
                      setmode(mo);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: '100%' }}
                  label={<span>Cheque Number</span>}
                >
                  <Input
                    placeholder='Cheque Number'
                    value={mode.Cheque.number}
                    onChange={(e) => {
                      var mo = { ...mode };
                      mo.Cheque.number = e.target.value;
                      setmode(mo);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item style={{ width: '100%' }} label={<span>Date</span>}>
                  <Input
                    placeholder='Date'
                    value={mode.Cheque.date_of_check}
                    onChange={(e) => {
                      var mo = { ...mode };
                      mo.Cheque.date_of_check = e.target.value;
                      setmode(mo);
                    }}
                  />
                </Form.Item>
              </Col>
            </>
          )}{' '}
          {mode.mode === 'Bank' && (
            <>
              <Col span={12}>
                <Form.Item
                  style={{ width: '100%' }}
                  label={<span>Bank Name</span>}
                >
                  <Input
                    placeholder='Bank'
                    value={mode.Bank.bank_name}
                    onChange={(e) => {
                      var mo = { ...mode };
                      mo.Bank.bank_name = e.target.value;
                      setmode(mo);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: '100%' }}
                  label={<span>Account Number</span>}
                >
                  <Input
                    placeholder='Account Number'
                    value={mode.Bank.account_no}
                    onChange={(e) => {
                      var mo = { ...mode };
                      mo.Bank.account_no = e.target.value;
                      setmode(mo);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: '100%' }}
                  label={<span>Beneficiary Bank</span>}
                >
                  <Input
                    placeholder='Beneficiary Bank'
                    value={mode.Bank.beneficiary_bank}
                    onChange={(e) => {
                      var mo = { ...mode };
                      mo.Bank.beneficiary_bank = e.target.value;
                      setmode(mo);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: '100%' }}
                  label={<span>Beneficiary Account</span>}
                >
                  <Input
                    placeholder='Beneficiary Account'
                    value={mode.Bank.beneficiary_no}
                    onChange={(e) => {
                      var mo = { ...mode };
                      mo.Bank.beneficiary_no = e.target.value;
                      setmode(mo);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ width: '100%' }}
                  label={<span>Transaction Id</span>}
                >
                  <Input
                    placeholder='Transaction Id'
                    value={mode.Bank.transaction_id}
                    onChange={(e) => {
                      var mo = { ...mode };
                      mo.Bank.transaction_id = e.target.value;
                      setmode(mo);
                    }}
                  />
                </Form.Item>
              </Col>
            </>
          )}
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
  addRepayment: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  singleData: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.customer.isError,
  errMessage: state.customer.errMessage,
  isErrorType: state.customer.isErrorType,
  singleData: state.customer.singleData,
});
export default connect(mapStateToProps, { addRepayment })(AddUser);
