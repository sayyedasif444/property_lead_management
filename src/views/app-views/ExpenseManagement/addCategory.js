import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseCategory } from '../../../apis/dashboard/expense';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  addExpenseCategory,
  category,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    if (
      category.filter(
        (ele) => ele.category.toLowerCase() === values.category.toLowerCase()
      ).length > 0
    ) {
      message.error('Invalid Name');
    }
    addExpenseCategory(values);
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
      title='Add Expense Category'
      visible={visible}
      centered
      footer={null}
      width={600}
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
          <Col span={24}>
            <Form.Item
              name='category'
              label={<span>category</span>}
              rules={[
                {
                  required: true,
                  message: `Please input category`,
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value) {
                      if (
                        category.filter(
                          (ele) =>
                            ele.category.toLowerCase() === value.toLowerCase()
                        ).length > 0
                      ) {
                        return Promise.reject('Category already exists');
                      }
                      return Promise.resolve();
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input type='category' placeholder='category' />
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
  addExpenseCategory: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  category: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.expense.isError,
  errMessage: state.expense.errMessage,
  isErrorType: state.expense.isErrorType,
  category: state.expense.category,
});
export default connect(mapStateToProps, { addExpenseCategory })(AddUser);
