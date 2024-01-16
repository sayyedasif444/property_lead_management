import {
  Button,
  Card,
  Col,
  DatePicker,
  message,
  Popconfirm,
  Row,
  Table,
  Tooltip,
} from 'antd';
import React, { useRef, useState } from 'react';
import {
  PlusCircleOutlined,
  EditOutlined,
  DownloadOutlined,
  DeleteOutlined,
  FileSyncOutlined,
} from '@ant-design/icons';
import AddUser from './addUser';
import EditUser from './editUser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { deleteUser, listUser } from '../../../apis/dashboard/User';
import { Link } from 'react-router-dom';
import moment from 'moment';
import jsPDF from 'jspdf';
import ViewAdvance from './ViewAdvance';
import ViewDeduction from './ViewDeduction';
import axios from 'axios';
import { BACKEND_URL } from '../../../actions/types';
import { listSalary } from '../../../apis/dashboard/Salary';
import store from '../../../redux/store';
import PaySalary from './PaySalary';

const removeSalary = async (id) => {
  const config = {
    'Content-Type': 'application/json',
  };
  const body = { id: id, isValid: false };
  await axios({
    method: 'POST',
    url: BACKEND_URL + 'salary/delete-salary-user',
    data: body,
    headers: config,
  })
    .then((response) => {
      if (response.data.statuscode === 200) {
        message.success(response.data.message);
        store.dispatch(listSalary());
      } else {
        message.error(response.data.message);
      }
    })
    .catch((error) => {
      message.error('Server Error');
    });
};

const Index = ({
  salary,
  advance,
  addons,
  loading,
  errMessage,
  isError,
  isErrorType,
  isAuthenticated,
  data,
  deduction,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [paymentModel, setpaymentModel] = useState(false);
  const [advanceModal, setadvanceModal] = useState(false);
  const [deductionModal, setdeductionModal] = useState(false);
  const [paymentData, setpaymentData] = useState({});

  const [currentDate, setcurrentDate] = useState(
    moment(new Date()).format('YYYY-MM') + '-01'
  );
  const columns = [
    {
      title: 'Sr no',
      dataIndex: 'srno',
      innerWidth: '24px',
      key: 'srno',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Incentive',
      dataIndex: 'incentive',
      key: 'incentive',
    },
    {
      title: 'Commission',
      dataIndex: 'commission',
      key: 'commission',
    },
    {
      title: 'Advance',
      dataIndex: 'advances',
      key: 'advances',
    },
    {
      title: 'Deduction',
      dataIndex: 'deductions',
      key: 'deductions',
    },
    {
      title: 'Payable',
      dataIndex: 'payable',
      key: 'payable',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
    },
    {
      title: 'Paid Date',
      dataIndex: 'paid_date',
      key: 'paid_date',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'x',
    },
  ];

  const [currentData, setcurrentData] = useState({});

  useEffect(() => {
    if (salary.length > 0) {
      let data = [];
      salary.forEach((element, index) => {
        let sal = element.salaries.filter(
          (ele) => ele.start_date <= currentDate
        );
        let maxDateObject = {};
        if (sal.filter((ele) => ele.isActive).length > 0) {
          maxDateObject = sal.filter((ele) => ele.isActive)[0];
        } else {
          maxDateObject = sal.reduce((maxObject, currentObject) => {
            return currentObject.date > maxObject.date
              ? currentObject
              : maxObject;
          }, sal[0]);
        }

        if (typeof maxDateObject === 'undefined') {
          maxDateObject = {};
        }

        //Other Incentive
        var incent = addons.filter(
          (ele) =>
            ele.user_id === element.id &&
            ele.effective_date === currentDate &&
            ele.type === 'Incentive'
        );

        //Other Commission
        var comm = addons.filter(
          (ele) =>
            ele.user_id === element.id &&
            ele.effective_date === currentDate &&
            ele.type === 'Commission'
        );

        //Other Advance
        var adv = advance.filter(
          (ele) =>
            ele.user_id === element.id &&
            ele.effective_date === currentDate &&
            ele.type === 'Advance'
        );

        let nextDdate = moment(currentDate);

        var Fadv = advance.filter(
          (ele) =>
            ele.user_id === element.id &&
            ele.effective_date ===
              nextDdate.add(1, 'months').format('YYYY-MM-DD') &&
            ele.type === 'Advance'
        );

        //Other Deduction
        var deduct = deduction.filter(
          (ele) =>
            ele.user_id === element.id &&
            ele.effective_date === currentDate &&
            ele.type === 'Deduction'
        );
        if (maxDateObject.isValid) {
          data.push({
            ...element,
            key: index + 1,
            srno: index + 1,
            salaries: maxDateObject,
            salary: maxDateObject.hasOwnProperty('salary')
              ? maxDateObject.salary
              : 0,
            incent: incent,
            comm: comm,
            adv: adv,
            paid: maxDateObject.hasOwnProperty('paidSalaries')
              ? maxDateObject.paidSalaries.filter(
                  (elt) => elt.paid_for_date === currentDate
                ).length > 0
                ? maxDateObject.paidSalaries.filter(
                    (elt) => elt.paid_for_date === currentDate
                  )[0].totalPaid
                : '-'
              : '-',
            paid_date: maxDateObject.hasOwnProperty('paidSalaries')
              ? maxDateObject.paidSalaries.filter(
                  (elt) => elt.paid_for_date === currentDate
                ).length > 0
                ? maxDateObject.paidSalaries.filter(
                    (elt) => elt.paid_for_date === currentDate
                  )[0].paid_date
                : '-'
              : '-',
            incentive:
              incent.length > 0
                ? incent.reduce((sum, item) => sum + parseFloat(item.amount), 0)
                : 0,
            commission:
              comm.length > 0
                ? comm.reduce((sum, item) => sum + parseFloat(item.amount), 0)
                : 0,
            advances: (
              <>
                <Link
                  to='#!'
                  className='mr-2'
                  onClick={(e) => {
                    e.preventDefault();
                    setcurrentData({
                      ...element,
                      advance: adv,
                      commission: comm,
                      incentive: incent,
                      deduction: deduct,
                      salary: maxDateObject.hasOwnProperty('salary')
                        ? maxDateObject.salary
                        : 0,
                    });
                    setadvanceModal(true);
                  }}
                >
                  {adv.length > 0
                    ? JSON.parse(adv[0].amount).reduce(
                        (sum, item) => sum + parseFloat(item.amount),
                        0
                      )
                    : 0}
                </Link>
              </>
            ),
            advance:
              adv.length > 0
                ? JSON.parse(adv[0].amount).reduce(
                    (sum, item) => sum + parseFloat(item.amount),
                    0
                  )
                : 0,
            deductions: (
              <>
                <Link
                  to='#!'
                  className='mr-2'
                  onClick={(e) => {
                    e.preventDefault();
                    setcurrentData({
                      ...element,
                      advance: adv,
                      commission: comm,
                      incentive: incent,
                      deduction: deduct,
                      salary: maxDateObject.hasOwnProperty('salary')
                        ? maxDateObject.salary
                        : 0,
                    });
                    setdeductionModal(true);
                  }}
                >
                  {deduct.length > 0
                    ? JSON.parse(deduct[0].amount).reduce(
                        (sum, item) => sum + parseFloat(item.amount),
                        0
                      )
                    : 0}
                </Link>
              </>
            ),
            deduction:
              deduct.length > 0
                ? JSON.parse(deduct[0].amount).reduce(
                    (sum, item) => sum + parseFloat(item.amount),
                    0
                  )
                : 0,
            payable:
              parseFloat(
                maxDateObject.hasOwnProperty('salary')
                  ? maxDateObject.salary
                  : 0
              ) +
              parseFloat(
                incent.length > 0
                  ? incent.reduce(
                      (sum, item) => sum + parseFloat(item.amount),
                      0
                    )
                  : 0
              ) +
              parseFloat(
                comm.length > 0
                  ? comm.reduce((sum, item) => sum + parseFloat(item.amount), 0)
                  : 0
              ) -
              parseFloat(
                adv.length > 0
                  ? JSON.parse(adv[0].amount).reduce(
                      (sum, item) => sum + parseFloat(item.amount),
                      0
                    )
                  : 0
              ) -
              parseFloat(
                deduct.length > 0
                  ? JSON.parse(deduct[0].amount).reduce(
                      (sum, item) => sum + parseFloat(item.amount),
                      0
                    )
                  : 0
              ),
            action: (
              <>
                <Tooltip title='Edit'>
                  <Link to='#!'>
                    <EditOutlined
                      className='text-success'
                      style={{ fontSize: '16px' }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setcurrentData({
                          ...element,
                          advance: adv,
                          commission: comm,
                          incentive: incent,
                          deduction: deduct,
                          salary: maxDateObject.hasOwnProperty('salary')
                            ? maxDateObject.salary
                            : 0,
                        });
                        setModalVisibleedit(true);
                      }}
                    />
                  </Link>
                </Tooltip>
                <Popconfirm
                  title='Are you sure?'
                  onConfirm={(e) => removeSalary(maxDateObject.id)}
                  okText='Yes'
                  cancelText='No'
                >
                  <Link to='#!' className='ml-3'>
                    <DeleteOutlined
                      className='text-danger'
                      style={{ fontSize: '16px' }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </Link>
                </Popconfirm>
                {maxDateObject.hasOwnProperty('paidSalaries') ? (
                  maxDateObject.paidSalaries.filter(
                    (elt) => elt.paid_for_date === currentDate
                  ).length === 0 ? (
                    <Tooltip title='Pay Salary'>
                      <Link to='#!' className='ml-3'>
                        <FileSyncOutlined
                          className='text-success'
                          style={{ fontSize: '16px' }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setpaymentModel(true);
                            setpaymentData({
                              payable:
                                parseFloat(
                                  maxDateObject.hasOwnProperty('salary')
                                    ? maxDateObject.salary
                                    : 0
                                ) +
                                parseFloat(
                                  incent.length > 0
                                    ? incent.reduce(
                                        (sum, item) =>
                                          sum + parseFloat(item.amount),
                                        0
                                      )
                                    : 0
                                ) +
                                parseFloat(
                                  comm.length > 0
                                    ? comm.reduce(
                                        (sum, item) =>
                                          sum + parseFloat(item.amount),
                                        0
                                      )
                                    : 0
                                ) -
                                parseFloat(
                                  adv.length > 0
                                    ? JSON.parse(adv[0].amount).reduce(
                                        (sum, item) =>
                                          sum + parseFloat(item.amount),
                                        0
                                      )
                                    : 0
                                ) -
                                parseFloat(
                                  deduct.length > 0
                                    ? JSON.parse(deduct[0].amount).reduce(
                                        (sum, item) =>
                                          sum + parseFloat(item.amount),
                                        0
                                      )
                                    : 0
                                ),
                              incentive:
                                incent.length > 0
                                  ? incent.reduce(
                                      (sum, item) =>
                                        sum + parseFloat(item.amount),
                                      0
                                    )
                                  : 0,
                              commission:
                                comm.length > 0
                                  ? comm.reduce(
                                      (sum, item) =>
                                        sum + parseFloat(item.amount),
                                      0
                                    )
                                  : 0,
                              advance:
                                adv.length > 0
                                  ? JSON.parse(adv[0].amount).reduce(
                                      (sum, item) =>
                                        sum + parseFloat(item.amount),
                                      0
                                    )
                                  : 0,

                              deduction:
                                deduct.length > 0
                                  ? JSON.parse(deduct[0].amount).reduce(
                                      (sum, item) =>
                                        sum + parseFloat(item.amount),
                                      0
                                    )
                                  : 0,
                              Fadvance: Fadv,
                              salary: maxDateObject.salary,
                              id: maxDateObject.id,
                              user_id: maxDateObject.user_id,
                              data: maxDateObject.paidSalaries.filter(
                                (elt) => elt.paid_for_date === currentDate
                              )[0],
                            });
                          }}
                        />
                      </Link>
                    </Tooltip>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
              </>
            ),
          });
        }
      });
      setsearchData(data);
    } else {
      setsearchData([]);
    }
  }, [salary, addons, advance, currentDate, deduction]);

  const [searchData, setsearchData] = useState([]);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage]);
  const categoryPdfref = useRef(null);

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
    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal', 9);
    doc.html(categoryPdfref.current, {
      async callback(doc) {
        await doc.save('salary-report-' + currentDate.substring(0, 7));
      },
    });
  };

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
            <DatePicker
              picker='month'
              value={moment(currentDate)}
              onChange={(e, date) => setcurrentDate(date + '-01')}
            />
          </Col>
          <Col sm={16} md={18} lg={19} className='text-right mb-3'>
            <Button
              type='primary mr-2'
              danger
              icon={<DownloadOutlined />}
              onClick={(e) => handleDownload(true)}
            ></Button>
            <Button
              type='primary '
              icon={<PlusCircleOutlined />}
              onClick={(e) => setModalVisible(true)}
            >
              Add Salary
            </Button>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Table
              className='border'
              columns={columns}
              dataSource={searchData}
              loading={loading}
            />
            <h5 className='pl-2 pt-2'>
              Total Payable:{' '}
              {searchData.reduce(
                (sum, ele) => sum + parseFloat(ele.payable),
                0
              )}
            </h5>
          </Col>
        </Row>
      </Card>
      <AddUser visible={modalVisible} cancel={setModalVisible} data={data} />
      <EditUser
        visible={modalVisibleedit}
        cancel={setModalVisibleedit}
        currentData={currentData}
        setcurrentData={setcurrentData}
      />
      <ViewAdvance
        visible={advanceModal}
        cancel={setadvanceModal}
        currentData={currentData}
        setcurrentData={setcurrentData}
      />
      <ViewDeduction
        visible={deductionModal}
        cancel={setdeductionModal}
        currentData={currentData}
        setcurrentData={setcurrentData}
      />
      <PaySalary
        visible={paymentModel}
        cancel={setpaymentModel}
        paymentData={paymentData}
        currentDate={currentDate}
      />
      {/* print */}
      <div style={{ display: 'none' }}>
        <div ref={categoryPdfref} style={styles.page}>
          <h6 style={styles.fullWidth}>
            Salary Report{' '}
            {currentDate !== null ? moment(currentDate).format('MMM-YYYY') : ''}{' '}
          </h6>
          {searchData.length > 0 && (
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
                          width: '50px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Sr No
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        First Name
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Last Name
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Salary
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Commission
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Incentive
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Advance
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Deduction
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Payable
                      </th>
                    </tr>
                    {searchData
                      .filter(
                        (ele) =>
                          parseInt(ele.debit) !== 0 ||
                          parseInt(ele.credit) !== 0
                      )
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
                            {indz + 1}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.first_name}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.last_name}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.salary}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.commission}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.incentive}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.advance}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.deduction}
                          </td>
                          <td
                            style={{
                              width: '120px',
                              borderRight: 'thin solid #DCDCDC',
                              textAlign: 'left',
                              padding: '6px',
                            }}
                          >
                            {ele.payable}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <h5 className='' style={{ width: '410px', fontSize: '9px' }}>
                  Total Payable:{' '}
                  {searchData.reduce((accumulator, object) => {
                    return accumulator + parseFloat(object.payable);
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
  listUser: PropTypes.func,
  deleteUser: PropTypes.func,
  salary: PropTypes.any,
  data: PropTypes.any,
  advance: PropTypes.any,
  deduction: PropTypes.any,
  addons: PropTypes.any,
  loading: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isAuthenticated: PropTypes.any,
};
const mapStateToProps = (state) => ({
  salary: state.salary.salary,
  advance: state.salary.advance,
  deduction: state.salary.deduction,
  addons: state.salary.addons,
  loading: state.salary.loading,
  isError: state.salary.isError,
  errMessage: state.salary.errMessage,
  isErrorType: state.salary.isErrorType,
  data: state.user.data,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { listUser, deleteUser })(Index);
