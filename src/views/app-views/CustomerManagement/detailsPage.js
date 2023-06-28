import React, { useEffect } from 'react';
import { Card, Col, message, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Payment from './Payment';
import Commisssion from './Commisssion';

const ViewProperty = ({ singleData, errMessage, isError, isErrorType }) => {
  const history = useHistory();
  useEffect(() => {
    if (singleData === null) {
      history.push('/app/customer-management');
    } else if (Object.keys(singleData).length === 0) {
      history.push('/app/customer-management');
    }
  }, [singleData, history]);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS_EXPENSE') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage]);
  return (
    <div>
      <Card>
        <Row>
          <Col lg={24}>
            <h4>
              <span style={{ width: '50%' }}>Overview </span>
              <span className='float-right'>
                <Link
                  className='btn btn-primary'
                  style={{ fontSize: '80%' }}
                  to='/app/customer-management'
                >
                  <ArrowLeftOutlined /> Go Back
                </Link>
              </span>
            </h4>
            <hr className='mb-3' />
          </Col>
          <Col lg={24} className='mt-0'>
            <Row>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Customer Name</h5>
                <p className='mb-0'>
                  {singleData.land_owner !== null ? singleData.land_owner : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Address</h5>
                <p className='mb-0'>
                  {singleData.address !== null ? singleData.address : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Mobile Number</h5>
                <p className='mb-0'>
                  {singleData.mobile_no !== null ? singleData.mobile_no : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Plot Location</h5>
                <p className='mb-0'>
                  {singleData.plot_location !== null
                    ? singleData.plot_location
                    : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Thana Number</h5>
                <p className='mb-0'>
                  {singleData.thana_no !== null ? singleData.thana_no : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Plot Area</h5>
                <p className='mb-0'>
                  {singleData.plot_area !== null ? singleData.plot_area : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Plot Number</h5>
                <p className='mb-0'>
                  {singleData.plot_no !== null ? singleData.plot_no : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Plot Type</h5>
                <p className='mb-0'>
                  {singleData.plot_type !== null ? singleData.plot_type : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Khata Number</h5>
                <p className='mb-0'>
                  {singleData.khata_no !== null ? singleData.khata_no : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Mauja</h5>
                <p className='mb-0'>
                  {singleData.muavza !== null ? singleData.muavza : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Plot Measurement</h5>
                <p className='mb-0'>
                  {singleData.plot_measurement !== null
                    ? singleData.plot_measurement
                    : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Rate</h5>
                <p className='mb-0'>
                  {singleData.rate !== null ? singleData.rate : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Total Amount</h5>
                <p className='mb-0'>
                  {singleData.total_amount !== null
                    ? singleData.total_amount
                    : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Duration</h5>
                <p className='mb-0'>
                  {singleData.duration !== null ? singleData.duration : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Date of Agreement</h5>
                <p className='mb-0'>
                  {singleData.date_of_agreement !== null
                    ? moment(singleData.date_of_agreement).format('DD-MM-YYYY')
                    : '-'}
                </p>
              </Col>
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Duration</h5>
                <p className='mb-0'>
                  {singleData.date_of_end_agreement !== null
                    ? moment(singleData.date_of_end_agreement).format(
                        'DD-MM-YYYY'
                      )
                    : '-'}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card>
        <Row>
          <Col lg={24} className=''>
            {Object.keys(singleData).length > 0 && <Payment />}
          </Col>
        </Row>
      </Card>
      {/* <Card>
        <Row>
          <Col lg={24} className=''>
            {Object.keys(singleData).length > 0 && <Investor />}
          </Col>
        </Row>
      </Card> */}
      <Card>
        <Row>
          <Col lg={24} className=''>
            {Object.keys(singleData).length > 0 && <Commisssion />}
          </Col>
        </Row>
      </Card>
      {/* <Card>
        <Row>
          <Col lg={24} className=''>
            {Object.keys(singleData).length > 0 && <Expense />}
          </Col>
        </Row>
      </Card> */}
    </div>
  );
};

ViewProperty.propTypes = {
  singleData: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
};
const mapStateToProps = (state) => ({
  singleData: state.customer.singleData,
  isError: state.customer.isError,
  errMessage: state.customer.errMessage,
  isErrorType: state.customer.isErrorType,
});
export default connect(mapStateToProps, {})(ViewProperty);
