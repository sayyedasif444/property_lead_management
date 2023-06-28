import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addExpense } from '../../../apis/dashboard/expense';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  addExpense,
  setcategoryModel,
  categoryModel,
  category,
}) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    let mod = { ...mode };
    if (mod.mode === 'Cheque') {
      if (
        mod.Cheque.date_of_check !== '' ||
        mod.Cheque.date_of_check !== null
      ) {
        mod.Cheque.date_of_check = new Date(mod.Cheque.date_of_check);
      }
    }
    values.mode = JSON.stringify(mod);
    addExpense(values);
  };
  const [mode, setmode] = useState({
    mode: 'Cash',
    Cash: null,
    UPI: '',
    Bank: '',
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
      title='Add Expense'
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
              name='payment_type'
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
              name='category_id'
              label={<span>Category</span>}
              rules={[
                {
                  required: true,
                  message: 'Please select value',
                },
              ]}
            >
              <Select style={{ width: '100%' }} placeholder='Select Category'>
                <Select.Option value={''}></Select.Option>
                {category.map((ele) => (
                  <Select.Option value={ele.id} key={ele.id}>
                    {ele.category}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Link
              to='#!'
              style={{
                position: 'absolute',
                fontSize: '13px',
                top: '3px',
                right: '14px',
              }}
              onClick={(e) => {
                e.preventDefault();
                setcategoryModel(true);
              }}
            >
              Add Category
            </Link>
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
          {(mode.mode === 'UPI' || mode.mode === 'Bank') && (
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
  addExpense: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  singleData: PropTypes.any,
  category: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.expense.isError,
  errMessage: state.expense.errMessage,
  isErrorType: state.expense.isErrorType,
  singleData: state.expense.singleData,
  category: state.expense.category,
});
export default connect(mapStateToProps, { addExpense })(AddUser);
