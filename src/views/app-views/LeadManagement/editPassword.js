import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSource } from '../../../apis/dashboard/Lead';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  addSource,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    addSource(values);
  };

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS_SOURCE') {
      message.success(errMessage);
      setTimeout(() => {
        cancel(false);
      }, 1000);
    }
  }, [isError, isErrorType, errMessage, form, cancel]);

  return (
    <Modal
      title='Add Source'
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
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='source'
              label={<span>Source</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Source`,
                },
              ]}
            >
              <Input type='text' placeholder='Source' />
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
  addSource: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
};
const mapStateToProps = (state) => ({
  isError: state.lead.isError,
  errMessage: state.lead.errMessage,
  isErrorType: state.lead.isErrorType,
});
export default connect(mapStateToProps, { addSource })(AddUser);
