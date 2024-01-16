import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSalaryAddon, listSalary } from '../../../apis/dashboard/Salary';
import moment from 'moment';
import { useEffect } from 'react';
import { BACKEND_URL } from '../../../actions/types';
import axios from 'axios';
import store from '../../../redux/store';
import { useState } from 'react';

const addSalary = async (data, cancel) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = data;
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'salary/pay-salary',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        message.success(response.data.message);
        cancel();
        store.dispatch(listSalary());
      } else {
        message.error(response.data.message);
      }
    })
    .catch((error) => {
      message.error('Server Error');
    });
};

const ViewAdvance = ({
  visible,
  cancel,
  paymentData,
  currentDate,
  addSalaryAddon,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (paymentData.hasOwnProperty('payable')) {
      form.setFieldsValue({ amount: paymentData.payable });
      settext(paymentData.payable);
    }
  }, [paymentData, form]);

  const onSubmit = (values) => {
    let data = {
      totalPaid: values.amount,
      salary_id: paymentData.id,
      user_id: paymentData.user_id,
      advance: paymentData.advance,
      incentive: paymentData.incentive,
      commission: paymentData.commission,
      deduction: paymentData.deduction,
      isPaid: true,
      paid_date: values.paid_date,
      paid_for_date: currentDate,
    };
    addSalary(data, cancel);
    if (parseFloat(values.amount) !== parseFloat(paymentData.payable)) {
      let amount = [];
      if (paymentData.Fadvance.length > 0) {
        amount = [
          ...JSON.parse(paymentData.Fadvance[0].amount),
          {
            data: moment(currentDate).add(1, 'months').format('YYYY-MM-DD'),
            amount: parseFloat(values.amount) - parseFloat(paymentData.payable),
          },
        ];
      } else {
        amount = [
          {
            data: moment(currentDate).add(1, 'months').format('YYYY-MM-DD'),
            amount: parseFloat(values.amount) - parseFloat(paymentData.payable),
          },
        ];
      }
      addSalaryAddon({
        amount: JSON.stringify(amount),
        effective_date: moment(currentDate)
          .add(1, 'months')
          .format('YYYY-MM-DD'),
        type: 'Advance',
        user_id: paymentData.user_id,
        count: 1,
      });
    }
  };
  const [text, settext] = useState('');

  return (
    <>
      <Modal
        title='Payment'
        visible={visible}
        centered
        footer={null}
        width={500}
        destroyOnClose={true}
        onCancel={(e) => cancel(false)}
      >
        <Form
          form={form}
          layout='vertical'
          name='new-company'
          preserve={false}
          initialValues={{ paid_date: moment(new Date()) }}
          onFinish={onSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='amount'
                label={<span>Amount</span>}
                rules={[
                  {
                    required: true,
                    message: `Please enter a valid amount`,
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (value) {
                        if (isNaN(value)) {
                          return Promise.reject('Please enter a valid salary');
                        }
                        return Promise.resolve();
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                <Input
                  placeholder='Amount'
                  onChange={(e) => {
                    settext(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='paid_date' label={<span>Date</span>}>
                <DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className='text-right mb-0'>
            {parseFloat(text) !== parseFloat(paymentData.payable) ? (
              <Popconfirm
                okText='Yes'
                title={
                  'Paying amount is not same as payable amount. this will lead in addition in next months advance section. Are you sure?'
                }
                onConfirm={() => {
                  form.submit();
                }}
              >
                <Button type='primary' htmlType='button'>
                  Save
                </Button>
              </Popconfirm>
            ) : (
              <Button type='primary' htmlType='submit'>
                Save
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

ViewAdvance.propTypes = {
  addSalaryAddon: PropTypes.any,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { addSalaryAddon })(ViewAdvance);
