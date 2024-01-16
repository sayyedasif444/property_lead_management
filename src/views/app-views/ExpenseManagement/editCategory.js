import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../../actions/types';
import { listExpenseCategory } from '../../../apis/dashboard/expense';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  category,
  data,
  listExpenseCategory,
}) => {
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    const config = {
      'Content-Type': 'application/json',
    };
    const body = { category: values.category, id: data.id };
    await axios({
      method: 'POST',
      url: BACKEND_URL + 'account/edit-expense-category',
      data: body,
      headers: config,
    })
      .then((response) => {
        if (response.data.statuscode === 200) {
          message.success(response.data.message);
          listExpenseCategory();
          setTimeout(() => {
            cancel(false);
          }, 800);
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        message.error('Server Error');
      });
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      form.setFieldsValue({ category: data.category });
    }
  }, [data, form]);

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
export default connect(mapStateToProps, { listExpenseCategory })(AddUser);
