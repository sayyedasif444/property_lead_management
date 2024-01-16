import {
  Button,
  Card,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Switch,
  Table,
  Tooltip,
} from 'antd';
import React, { useState } from 'react';
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import AddProject from './addProject';
import EditProject from './editProject';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import store from '../../../redux/store';
import { SET_SIGNLE_CUSTOMER } from '../../../actions/types';
import AddCategory from './addCategory';
import jsPDF from 'jspdf';
import {
  deleteCustomer,
  listCustomers,
  markCustomer,
} from '../../../apis/dashboard/Customer';
import { useRef } from 'react';

const Index = ({
  data,
  loading,
  errMessage,
  isError,
  isErrorType,
  isAuthenticated,
  deleteCustomer,
  listCustomers,
  markCustomer,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [categoryModel, setcategoryModel] = useState(false);
  const pdfRef = useRef(null);

  const columns = [
    {
      title: 'Sr no',
      dataIndex: 'srno',
      innerWidth: '24px',
      key: 'srno',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Plot Location',
      dataIndex: 'plot_location',
      key: 'plot_location',
    },
    {
      title: 'Total Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Completed',
      dataIndex: 'isCompleted',
      key: 'isCompleted',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'x',
    },
  ];

  const downloadCategory = () => {
    const doc = new jsPDF({
      format: 'a4',
      fontSize: '10px',
      unit: 'px',
      externals: {
        // only define the dependencies you are NOT using as externals!
        canvg: 'canvg',
        html2canvas: 'html2canvas',
        dompurify: 'dompurify',
        pagebreak: { mode: 'avoid-all', after: '.avoidThisRow' },
      },
    });
    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal', 9);
    doc.html(pdfRef.current, {
      async callback(doc) {
        await doc.save('due_amounts');
      },
    });
  };

  const [searchData, setsearchData] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS_EXPENSE') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage]);

  const history = useHistory();

  useEffect(() => {
    if (data !== null) {
      var result = data;
      if (search !== '' && search !== null) {
        result = data.filter(
          (item) =>
            (item.total_amount !== null
              ? item.total_amount.toLowerCase().indexOf(search.toLowerCase()) >
                -1
              : false) ||
            (item.land_owner !== null
              ? item.land_owner.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.address !== null
              ? item.address.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.plot_location !== null
              ? item.plot_location.toLowerCase().indexOf(search.toLowerCase()) >
                -1
              : false) ||
            (item.mobile_no !== null
              ? item.mobile_no.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false)
        );
      }
      var dataset = [];
      result.forEach((element, index) => {
        dataset.push({
          key: index + 1,
          srno: index + 1,
          id: element.id,
          owner: element.land_owner,
          phone_number: element.mobile_no,
          address: element.address,
          plot_location: element.plot_location,
          amount: element.total_amount,
          isCompleted: (
            <span onClick={(e) => e.stopPropagation()}>
              <Popconfirm
                title='Are you sure?'
                onConfirm={(e) => {
                  markCustomer({
                    id: element.id,
                    isActive: !element.isActive,
                  });
                }}
                okText='Yes'
                cancelText='No'
              >
                <Switch checked={element.isActive} />
              </Popconfirm>
            </span>
          ),
          action: (
            <div onClick={(e) => e.stopPropagation()}>
              <Tooltip title='Edit'>
                <Link to='#!'>
                  <EditOutlined
                    className='text-success'
                    style={{ fontSize: '16px' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setModalVisibleedit(true);
                      store.dispatch({
                        type: SET_SIGNLE_CUSTOMER,
                        payload: element,
                      });
                    }}
                  />
                </Link>
              </Tooltip>
              <Popconfirm
                title='Are you sure?'
                onConfirm={(e) => {
                  e.stopPropagation();
                  deleteCustomer({ id: element.id });
                }}
                okText='Yes'
                cancelText='No'
              >
                <Link
                  to='#!'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DeleteOutlined
                    className='text-danger ml-4 '
                    style={{ fontSize: '16px' }}
                  />
                </Link>
              </Popconfirm>
            </div>
          ),
        });
      });

      setsearchData(dataset);
    }
  }, [data, search, deleteCustomer, markCustomer]);

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
      <Card>
        <Row>
          <Col sm={8} md={6} lg={5} className='text-left mb-3'>
            <Input
              placeholder='Search'
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </Col>
          <Col sm={6} md={10} lg={12} className='text-right mb-3 ml-auto'>
            <Button
              type='primary mr-2'
              icon={<DownloadOutlined />}
              onClick={(e) => downloadCategory()}
              danger
            ></Button>
            <Button
              type='primary '
              icon={<PlusCircleOutlined />}
              onClick={(e) => setModalVisible(true)}
            >
              Add Customer
            </Button>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    store.dispatch({
                      type: SET_SIGNLE_CUSTOMER,
                      payload: data.filter((ele) => ele.id === record.id)[0],
                    });
                    history.push('/app/view-customer-details');
                    // setmodalVisibleDetails(true);
                  }, // click row
                };
              }}
              className='border'
              columns={columns}
              dataSource={searchData}
              scroll={{ x: 1100 }}
              loading={loading}
            />
          </Col>
        </Row>
      </Card>
      {modalVisible && (
        <AddProject
          visible={modalVisible}
          cancel={setModalVisible}
          categoryModel={categoryModel}
          setcategoryModel={setcategoryModel}
        />
      )}
      {modalVisibleedit && (
        <EditProject
          visible={modalVisibleedit}
          cancel={setModalVisibleedit}
          categoryModel={categoryModel}
          setcategoryModel={setcategoryModel}
        />
      )}
      <AddCategory visible={categoryModel} cancel={setcategoryModel} />
      <div style={{ display: 'none' }}>
        <div ref={pdfRef} style={styles.page}>
          <h6 style={styles.fullWidth}>Due Amounts </h6>
          {data.filter((ele) => !ele.isActive).length > 0 && (
            <div>
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
                        Customer
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Total
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Paid
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Due
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        L.P.Date
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        L.Payment
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Refund
                      </th>
                    </tr>
                    {data
                      .filter((ele) => !ele.isActive)
                      .map((ele, indz) => (
                        <tr
                          style={{
                            border: 'thin solid #DCDCDC',
                            borderBottom: 'thin solid #DCDCDC',
                            width: '120px',
                          }}
                          key={indz}
                        >
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.land_owner}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.total_amount}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.paymentDetails.reduce(
                              (accumulator, object) => {
                                return accumulator + parseFloat(object.amount);
                              },
                              0
                            )}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {parseFloat(
                              ele.total_amount !== '' &&
                                ele.total_amount !== null
                                ? ele.total_amount
                                : 0
                            ) -
                              ele.paymentDetails.reduce(
                                (accumulator, object) => {
                                  return (
                                    accumulator + parseFloat(object.amount)
                                  );
                                },
                                0
                              )}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.paymentDetails.length > 0
                              ? ele.paymentDetails[0].date_of_payment.substring(
                                  0,
                                  10
                                )
                              : ''}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.paymentDetails.length > 0
                              ? ele.paymentDetails[0].amount
                              : ''}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.customerRepayments.reduce(
                              (accumulator, object) => {
                                return accumulator + parseFloat(object.amount);
                              },
                              0
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <h5 className='' style={{ width: '410px', fontSize: '9px' }}>
                  Total:{' '}
                  {data.reduce((accumulator, object) => {
                    return (
                      accumulator +
                      parseFloat(
                        object.total_amount !== '' &&
                          object.total_amount !== null
                          ? object.total_amount
                          : 0
                      )
                    );
                  }, 0)}
                  <br />
                  Total Recieved:{' '}
                  {data.reduce((accumulator, object) => {
                    return (
                      accumulator +
                      parseFloat(
                        object.paymentDetails.reduce(
                          (sum, ele) => sum + parseFloat(ele.amount),
                          0
                        )
                      )
                    );
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
Index.propTypes = {
  deleteCustomer: PropTypes.func,
  data: PropTypes.any,
  loading: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isAuthenticated: PropTypes.any,
  listCustomers: PropTypes.func,
};
const mapStateToProps = (state) => ({
  data: state.customer.data,
  loading: state.customer.loading,
  isError: state.customer.isError,
  errMessage: state.customer.errMessage,
  isErrorType: state.customer.isErrorType,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  deleteCustomer,
  listCustomers,
  markCustomer,
})(Index);
