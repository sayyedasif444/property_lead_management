import React, { useEffect, useRef } from 'react';
import { Button, Card, Col, message, Row, Tooltip } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Payment from './Payment';
import Investor from './Investor';
import Commisssion from './Commisssion';
import { jsPDF } from 'jspdf';
import Expense from './Expense';

const ViewProperty = ({ singleData, errMessage, isError, isErrorType }) => {
  const history = useHistory();
  useEffect(() => {
    if (singleData === null) {
      history.push('/app/project-management');
    } else if (Object.keys(singleData).length === 0) {
      history.push('/app/project-management');
    }
  }, [singleData, history]);

  const pdfRef = useRef(null);
  const handleDownload = () => {
    const doc = new jsPDF({
      format: 'a4',
      fontSize: '10px',
      unit: 'px',
      externals: {
        canvg: 'canvg',
        html2canvas: 'html2canvas',
        dompurify: 'dompurify',
        pagebreak: { mode: 'avoid-all', after: '.avoidThisRow' },
      },
    });
    doc.setFont('Inter-Regular', 'normal', 9);
    doc.html(pdfRef.current, {
      async callback(doc) {
        await doc.save('Project ' + singleData.id);
      },
    });
  };

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS_EXPENSE') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage]);

  const styles = {
    page: {
      marginTop: '10px',
      marginLeft: '20px',
      marginRight: '10px',
      width: '100%',
      pageBreakAfter: 'always',
      fontSize: '8px',
    },

    columnLayout: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '3rem 0 5rem 0',
      gap: '2rem',
    },

    column: {
      display: 'flex',
      flexDirection: 'column',
    },

    spacer2: {
      height: '2rem',
    },

    fullWidth: {
      width: '410px',
      color: '#000000',
    },

    color: {
      color: '#000000',
    },

    marginb0: {
      marginBottom: 0,
    },
  };

  return (
    <div>
      <Tooltip title='Download PDF' position='top'>
        <Button
          type='primary ml-auto mb-2'
          size='small'
          style={{
            left: 'calc(100% - 40px)',
          }}
          danger
          icon={<DownloadOutlined />}
          onClick={(e) => {
            e.preventDefault();
            handleDownload();
          }}
        />
      </Tooltip>
      <Card>
        <Row>
          <Col lg={24}>
            <h4>
              <span style={{ width: '50%' }}>Overview </span>
              <span className='float-right'>
                <Link
                  className='btn btn-primary'
                  style={{ fontSize: '80%' }}
                  to='/app/project-management'
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
                <h5 className='mb-0'>Land Owner</h5>
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
              <Col sm={6} className='border p-2'>
                <h5 className='mb-0'>Broker</h5>
                <p className='mb-0'>
                  {singleData.broker !== null ? singleData.broker : '-'}
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
      <Card>
        <Row>
          <Col lg={24} className=''>
            {Object.keys(singleData).length > 0 && <Investor />}
          </Col>
        </Row>
      </Card>
      <Card>
        <Row>
          <Col lg={24} className=''>
            {Object.keys(singleData).length > 0 && <Commisssion />}
          </Col>
        </Row>
      </Card>
      <Card>
        <Row>
          <Col lg={24} className=''>
            {Object.keys(singleData).length > 0 && <Expense />}
          </Col>
        </Row>
      </Card>
      <div style={{ display: 'none' }}>
        <div ref={pdfRef} style={styles.page}>
          <h4 style={styles.fullWidth}>Customer Details: </h4>
          {singleData !== null && Object.keys(singleData).length > 0 && (
            <div>
              <div style={styles.fullWidth}>
                <table style={styles.fullWidth}>
                  <tbody>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Land Owner:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.land_owner}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Address:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.address}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Mobile Number:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.mobile_no}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Plot Location:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.plot_location}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Thana Number:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.thana_no}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Plot Area:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.plot_area}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Plot Number:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.plot_no}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Plot Type:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.plot_type}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Khata Number:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.khata_no}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Mauja:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.muavza}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Plot Measurement:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.plot_measurement}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Rate:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.rate}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Total Amount:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.total_amount}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Duration:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.duration}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'none',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Date of Agreement:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.date_of_agreement !== null
                          ? singleData.date_of_agreement.substring(0, 10)
                          : '-'}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'thin solid #DCDCDC',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Date of end of Agreement:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.date_of_end_agreement !== null
                          ? singleData.date_of_end_agreement.substring(0, 10)
                          : '-'}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'thin solid #DCDCDC',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Broker:
                      </th>
                      <td
                        style={{
                          width: '260px',
                          marginLeft: '10px',
                          padding: '6px',
                        }}
                      >
                        {singleData.broker !== null
                          ? singleData.broker.substring(0, 10)
                          : '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h5 style={{ width: '410px', marginTop: '20px' }}>
                Payment Details
              </h5>
              <div style={styles.fullWidth}>
                <table style={styles.fullWidth}>
                  <tbody>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'thin solid #DCDCDC',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Particuler
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Amount
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Mode
                      </th>
                    </tr>
                    {singleData.hasOwnProperty('paymentDetails') &&
                      singleData.paymentDetails.map((ele, index) => (
                        <tr
                          style={{
                            border: 'thin solid #DCDCDC',
                            borderBottom: 'thin solid #DCDCDC',
                            width: '120px',
                          }}
                          key={index}
                        >
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.payment_type}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.date_of_payment !== null &&
                              ele.date_of_payment.substring(0, 10)}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.amount}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {JSON.parse(ele.mode).mode}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <h5 className='' style={{ width: '410px', fontSize: '9px' }}>
                  Total Amount: {singleData.total_amount}{' '}
                  <span className='ml-5'>
                    Payment Done:{' '}
                    {singleData.paymentDetails.reduce((accumulator, object) => {
                      return accumulator + parseFloat(object.amount);
                    }, 0)}
                  </span>
                  <span className='ml-5'>
                    Due:{' '}
                    {parseFloat(singleData.total_amount) -
                      singleData.paymentDetails.reduce(
                        (accumulator, object) => {
                          return accumulator + parseFloat(object.amount);
                        },
                        0
                      )}
                  </span>
                </h5>
              </div>
              <h5 style={{ width: '410px', marginTop: '20px' }}>Investor</h5>
              <div style={styles.fullWidth}>
                <table style={styles.fullWidth}>
                  <tbody>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'thin solid #DCDCDC',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Mobile Number
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Amount
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Mode
                      </th>
                    </tr>
                    {singleData.investors.map((ele, index) => (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'thin solid #DCDCDC',
                          width: '120px',
                        }}
                        key={index}
                      >
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.name}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.mobile_number}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.amount}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {JSON.parse(ele.mode).mode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 className='' style={{ width: '410px', fontSize: '9px' }}>
                  Total Commisssion:{' '}
                  {singleData.investors.reduce((accumulator, object) => {
                    return accumulator + parseFloat(object.amount);
                  }, 0)}
                </h5>
              </div>
              <h5 style={{ width: '410px', marginTop: '20px' }}>Commisssion</h5>
              <div style={styles.fullWidth}>
                <table style={styles.fullWidth}>
                  <tbody>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'thin solid #DCDCDC',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Mobile Number
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Amount
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Mode
                      </th>
                    </tr>
                    {singleData.commissions.map((ele, index) => (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'thin solid #DCDCDC',
                          width: '120px',
                        }}
                        key={index}
                      >
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.name}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.mobile_number}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.amount}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {JSON.parse(ele.mode).mode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 className='' style={{ width: '410px', fontSize: '9px' }}>
                  Total Commisssion:{' '}
                  {singleData.commissions.reduce((accumulator, object) => {
                    return accumulator + parseFloat(object.amount);
                  }, 0)}
                </h5>
              </div>
              <h5 style={{ width: '410px', marginTop: '20px' }}>Expense</h5>
              <div style={styles.fullWidth}>
                <table style={styles.fullWidth}>
                  <tbody>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'thin solid #DCDCDC',
                        width: '120px',
                      }}
                    >
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Particuler
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Amount
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Mode
                      </th>
                    </tr>
                    {singleData.projectExpenses.map((ele, index) => (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'thin solid #DCDCDC',
                          width: '120px',
                        }}
                        key={index}
                      >
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.name}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.date_of_expense !== null &&
                            ele.date_of_expense.substring(0, 10)}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.amount}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {JSON.parse(ele.mode).mode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 className='' style={{ width: '410px', fontSize: '9px' }}>
                  Total Expense:{' '}
                  {singleData.projectExpenses.reduce((accumulator, object) => {
                    return accumulator + parseFloat(object.amount);
                  }, 0)}
                </h5>
              </div>
            </div>
          )}
          <div className='avoidThisRow'></div>
        </div>
      </div>
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
  singleData: state.project.singleData,
  isError: state.project.isError,
  errMessage: state.project.errMessage,
  isErrorType: state.project.isErrorType,
});
export default connect(mapStateToProps, {})(ViewProperty);
