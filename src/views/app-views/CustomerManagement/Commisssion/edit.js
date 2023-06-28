import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Form, Input, Button, Select } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editCommission } from '../../../../apis/dashboard/Project';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  editCommission,
  editPaymentData,
}) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    values.mode = JSON.stringify(mode);
    values.id = editPaymentData.id;
    values.customer_id = editPaymentData.customer_id;
    editCommission(values);
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
    if (editPaymentData !== null && visible) {
      form.setFieldsValue({
        name: editPaymentData.name !== null ? editPaymentData.name : '',
        mobile_number:
          editPaymentData.mobile_number !== null
            ? editPaymentData.mobile_number
            : '',
        address:
          editPaymentData.address !== null ? editPaymentData.address : '',
        amount: editPaymentData.amount !== null ? editPaymentData.amount : '',
      });
      var mod = JSON.parse(editPaymentData.mode);
      if (mod.mode === 'Cheque') {
        if (
          mod.Cheque.date_of_check !== '' ||
          mod.Cheque.date_of_check !== null
        ) {
        }
      }
      setmode(mod);
    }
  }, [editPaymentData, form, visible]);

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
      title='Edit Expense'
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
              name='mobile_number'
              style={{ width: '100%' }}
              label={<span>Mobile Number</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Mobile Number`,
                },
              ]}
            >
              <Input placeholder='Mobile Number' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='address'
              style={{ width: '100%' }}
              label={<span>Address</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Address`,
                },
              ]}
            >
              <Input placeholder='Address' />
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
          )}
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
  editCommission: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  editPaymentData: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.customer.isError,
  errMessage: state.customer.errMessage,
  isErrorType: state.customer.isErrorType,
  category: state.customer.category,
});
export default connect(mapStateToProps, { editCommission })(AddUser);
