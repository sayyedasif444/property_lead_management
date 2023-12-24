import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { addSalary } from '../../../apis/dashboard/Salary';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  data,
  addSalary,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    if (currentDate !== '') {
      addSalary({
        salary: values.salary,
        start_date: currentDate,
        user_id: values.user_id,
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
    moment(new Date()).format('YYYY-MM') + '-01'
  );

  return (
    <Modal
      title='Add Salary'
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
              name='user_id'
              label={<span>Employee</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Employee`,
                },
              ]}
            >
              <Select size={'default'} style={{ width: '100%' }}>
                <Select.Option value={''}></Select.Option>
                {data.map((ele, index) => (
                  <Select.Option value={ele.id} key={index}>
                    {ele.first_name + ' ' + ele.last_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='salary'
              label={<span>Salary</span>}
              rules={[
                {
                  required: true,
                  message: `Please enter a valid salary`,
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
              <Input placeholder='Salary' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='effective_date'
              label={<span>Effective Date</span>}
            >
              <DatePicker
                picker='month'
                style={{ width: '100%' }}
                value={moment(currentDate)}
                onChange={(e, date) => setcurrentDate(date + '-01')}
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
  addSalary: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
};
const mapStateToProps = (state) => ({
  isError: state.salary.isError,
  errMessage: state.salary.errMessage,
  isErrorType: state.salary.isErrorType,
});
export default connect(mapStateToProps, { addSalary })(AddUser);
