import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { addSalaryAddon } from '../../../apis/dashboard/Salary';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  data,
  addSalaryAddon,
  currentData,
  setcurrentData,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    if (values.type === 'Advance') {
      if (currentData.advance.length > 0) {
        values.amount = [
          ...JSON.parse(currentData.advance[0].amount),
          { data: currentDate, amount: values.amount },
        ];
      } else {
        values.amount = [{ data: currentDate, amount: values.amount }];
      }
    }
    if (values.type === 'Deduction') {
      if (currentData.deduction.length > 0) {
        values.amount = [
          ...JSON.parse(currentData.deduction[0].amount),
          { data: currentDate, amount: values.amount },
        ];
      } else {
        values.amount = [{ data: currentDate, amount: values.amount }];
      }
    }
    if (currentDate !== '') {
      addSalaryAddon({
        amount: JSON.stringify(values.amount),
        effective_date: moment(currentDate).format('YYYY-MM') + '-01',
        type: values.type,
        user_id: currentData.id,
        count: 1,
      });
    }
  };

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      setTimeout(() => {
        cancel(false);
        form.resetFields();
      }, 1000);
    }
  }, [isError, isErrorType, errMessage, form, cancel]);

  const [currentDate, setcurrentDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );

  return (
    <Modal
      title='Salary Addons'
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
              name='type'
              label={<span>Type</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Employee`,
                },
              ]}
            >
              <Select
                size={'default'}
                style={{ width: '100%' }}
                onChange={(e) => {
                  if (e === 'Deduction') {
                    form.setFieldsValue({
                      amount: (currentData.salary / 30).toFixed(2),
                    });
                  }
                }}
              >
                <Select.Option value={''}></Select.Option>
                <Select.Option value={'Incentive'}>Incentive</Select.Option>
                <Select.Option value={'Commission'}>Commission</Select.Option>
                <Select.Option value={'Advance'}>Advance</Select.Option>
                <Select.Option value={'Deduction'}>Deduction</Select.Option>
              </Select>
            </Form.Item>
          </Col>
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
              <Input placeholder='Amount' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='effective_date'
              label={<span>Effective Date</span>}
            >
              <DatePicker
                picker='day'
                style={{ width: '100%' }}
                value={moment(currentDate)}
                onChange={(e, date) => setcurrentDate(date)}
              />
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
  addSalaryAddon: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
};
const mapStateToProps = (state) => ({
  isError: state.salary.isError,
  errMessage: state.salary.errMessage,
  isErrorType: state.salary.isErrorType,
});
export default connect(mapStateToProps, { addSalaryAddon })(AddUser);
