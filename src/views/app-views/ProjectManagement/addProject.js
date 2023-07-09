import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, DatePicker } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProject } from '../../../apis/dashboard/Project';
import { useHistory } from 'react-router-dom';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  addProject,
}) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    addProject(values);
  };

  const history = useHistory();

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS_EXPENSE') {
      setTimeout(() => {
        if (visible) {
          history.push('/app/view-project-details');
        }
        cancel(false);
        form.resetFields();
      }, 1000);
    }
  }, [isError, isErrorType, errMessage, form, cancel, history, visible]);

  return (
    <Modal
      title='Add Project'
      visible={visible}
      centered
      footer={null}
      width={900}
      destroyOnClose={true}
      onCancel={(e) => cancel(false)}
    >
      <Form form={form} layout='vertical' preserve={false} onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name='land_owner'
              style={{ width: '100%' }}
              label={<span>Land Owner</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Land Owner`,
                },
              ]}
            >
              <Input placeholder='Land Owner' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='broker'
              style={{ width: '100%' }}
              label={<span>Broker</span>}
            >
              <Input placeholder='Broker' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='mobile_no'
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
          <Col span={6}>
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
          <Col span={6}>
            <Form.Item
              name='plot_location'
              style={{ width: '100%' }}
              label={<span>Plot Location</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Plot Location`,
                },
              ]}
            >
              <Input placeholder='Plot Location' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='thana_no'
              style={{ width: '100%' }}
              label={<span>Thana Number</span>}
            >
              <Input placeholder='Thana Number' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='plot_area'
              style={{ width: '100%' }}
              label={<span>Plot Area</span>}
            >
              <Input placeholder='Plot Area' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='plot_no'
              style={{ width: '100%' }}
              label={<span>Plot Number</span>}
            >
              <Input placeholder='Plot Number' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='plot_type'
              style={{ width: '100%' }}
              label={<span>Plot Type</span>}
            >
              <Input placeholder='Plot Type' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='khata_no'
              style={{ width: '100%' }}
              label={<span>Khata Number</span>}
            >
              <Input placeholder='Khata Number' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='muavza'
              style={{ width: '100%' }}
              label={<span>Mauja</span>}
            >
              <Input placeholder='Mauja' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='plot_measurement'
              style={{ width: '100%' }}
              label={<span>Plot Measurement</span>}
            >
              <Input placeholder='Plot Measurement' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name='rate'
              style={{ width: '100%' }}
              label={<span>Rate</span>}
            >
              <Input placeholder='Rate' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name='total_amount'
              style={{ width: '100%' }}
              label={<span>Total Amount</span>}
            >
              <Input placeholder='Total Amount' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name='duration'
              style={{ width: '100%' }}
              label={<span>Duration</span>}
            >
              <Input placeholder='Duration' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='date_of_agreement'
              style={{ width: '100%' }}
              label={<span>Date of Agreement</span>}
            >
              <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='date_of_end_agreement'
              style={{ width: '100%' }}
              label={<span>Agreement End Date</span>}
            >
              <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
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
  addProject: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  singleData: PropTypes.any,
  category: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.project.isError,
  errMessage: state.project.errMessage,
  isErrorType: state.project.isErrorType,
  singleData: state.project.singleData,
  category: state.project.category,
});
export default connect(mapStateToProps, { addProject })(AddUser);
