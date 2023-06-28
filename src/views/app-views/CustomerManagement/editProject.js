import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, DatePicker } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editCustomer } from '../../../apis/dashboard/Customer';
import moment from 'moment';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  editCustomer,
  singleData,
}) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    values.id = singleData.id;
    editCustomer(values);
  };

  useEffect(() => {
    if (Object.keys(singleData).length > 0 && visible) {
      form.setFieldsValue({
        land_owner: singleData.land_owner !== null ? singleData.land_owner : '',
        mobile_no: singleData.mobile_no !== null ? singleData.mobile_no : '',
        address: singleData.address !== null ? singleData.address : '',
        plot_location:
          singleData.plot_location !== null ? singleData.plot_location : '',
        thana_no: singleData.thana_no !== null ? singleData.thana_no : '',
        plat_no: singleData.plat_no !== null ? singleData.plat_no : '',
        plot_area: singleData.plot_area !== null ? singleData.plot_area : '',
        plot_type: singleData.plot_type !== null ? singleData.plot_type : '',
        khata_no: singleData.khata_no !== null ? singleData.khata_no : '',
        poc: singleData.poc !== null ? singleData.poc : '',
        source: singleData.source !== null ? singleData.source : '',
        muavza: singleData.muavza !== null ? singleData.muavza : '',
        plot_measurement:
          singleData.plot_measurement !== null
            ? singleData.plot_measurement
            : '',
        rate: singleData.rate !== null ? singleData.rate : '',
        total_amount:
          singleData.total_amount !== null ? singleData.total_amount : '',
        duration: singleData.duration !== null ? singleData.duration : '',
        date_of_agreement:
          singleData.date_of_agreement !== null
            ? moment(singleData.date_of_agreement)
            : '',
        date_of_end_agreement:
          singleData.date_of_end_agreement !== null
            ? moment(singleData.date_of_end_agreement)
            : '',
      });
    }
  }, [singleData, form, visible]);

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
      title='Edit Customer'
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
              label={<span>Customer Name</span>}
              rules={[
                {
                  required: true,
                  message: `Please input Customer Name`,
                },
              ]}
            >
              <Input placeholder='Customer Name' />
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
          <Col span={12}>
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
          <Col span={6}>
            <Form.Item
              name='poc'
              style={{ width: '100%' }}
              label={<span>POC</span>}
            >
              <Input placeholder='poc' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='source'
              style={{ width: '100%' }}
              label={<span>Source</span>}
            >
              <Input placeholder='Source' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='rate'
              style={{ width: '100%' }}
              label={<span>Rate</span>}
            >
              <Input placeholder='Rate' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='total_amount'
              style={{ width: '100%' }}
              label={<span>Total Amount</span>}
            >
              <Input placeholder='Total Amount' />
            </Form.Item>
          </Col>
          <Col span={6}>
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
  editCustomer: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  singleData: PropTypes.any,
  category: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.customer.isError,
  errMessage: state.customer.errMessage,
  isErrorType: state.customer.isErrorType,
  singleData: state.customer.singleData,
  category: state.customer.category,
});
export default connect(mapStateToProps, { editCustomer })(AddUser);
