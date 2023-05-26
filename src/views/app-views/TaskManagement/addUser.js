import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTask } from '../../../apis/dashboard/Task';
import { useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Fragment } from 'react';

const AddTask = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  addTask,
  user,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    values.tasklist = JSON.stringify(tasklist);
    values.deadline = moment(values.deadline).format('DD-MM-YYYY');
    addTask(values);
  };

  const [tasklist, settasklist] = useState([{ text: '', status: false }]);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      setTimeout(() => {
        cancel(false);
        form.resetFields();
      }, 1000);
    }
  }, [isError, isErrorType, errMessage, form, cancel]);

  return (
    <Modal
      title='New Task'
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
              name='assigned_id'
              label={<span>Assign to</span>}
              rules={[
                {
                  required: true,
                  message: `Please select user`,
                },
              ]}
            >
              <Select size={'default'} style={{ width: '100%' }}>
                <Select.Option value={''}></Select.Option>
                {user.map((ele, index) => (
                  <Select.Option value={ele.id} key={index}>
                    {ele.first_name + ' ' + ele.last_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='deadline'
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
          {tasklist.map((ele, index) =>
            index === 0 ? (
              <Col span={24} key={index}>
                <Form.Item
                  className='mb-0'
                  label={<span>Task {index + 1}</span>}
                  rules={[
                    {
                      required: true,
                      message: `Please input task`,
                    },
                  ]}
                >
                  <Input
                    type='text'
                    placeholder='Task'
                    value={ele.text}
                    onChange={(e) => {
                      var data = [...tasklist];
                      data[index].text = e.target.value;
                      settasklist(data);
                    }}
                  />
                </Form.Item>
              </Col>
            ) : (
              <Fragment key={index}>
                <Col span={22}>
                  <Form.Item
                    className='mb-0 mt-3'
                    label={<span>Task {index + 1}</span>}
                    rules={[
                      {
                        required: true,
                        message: `Please input Task`,
                      },
                    ]}
                  >
                    <Input
                      type='text'
                      placeholder={'Task ' + (index + 1)}
                      value={ele.text}
                      onChange={(e) => {
                        var data = [...tasklist];
                        data[index].text = e.target.value;
                        settasklist(data);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Link
                    to={'#!'}
                    onClick={(e) =>
                      settasklist(tasklist.filter((item, ind) => ind !== index))
                    }
                  >
                    <CloseCircleOutlined
                      style={{ paddingTop: '58px' }}
                      className='text-danger'
                    />
                  </Link>
                </Col>
              </Fragment>
            )
          )}
          <Link
            to={'#!'}
            className='mb-3 pl-3 mt-1'
            onClick={(e) => {
              e.preventDefault();
              let data = [...tasklist];
              data.push({ text: '', status: false });
              settasklist(data);
            }}
          >
            Add More Task
          </Link>
          <Col span={24}>
            <Form.Item
              name='description'
              label={<span>Descripiton</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Descripiton`,
                },
              ]}
            >
              <Input.TextArea type='text' placeholder='Descripiton' />
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

AddTask.propTypes = {
  addTask: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  user: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.task.isError,
  errMessage: state.task.errMessage,
  isErrorType: state.task.isErrorType,
  user: state.user.data,
});
export default connect(mapStateToProps, { addTask })(AddTask);
