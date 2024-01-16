import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  message,
  Popconfirm,
  Row,
  Table,
  Tooltip,
} from 'antd';
import React, { useRef, useState } from 'react';
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import AddExpense from './addExpense';
import EditExpense from './editExpense';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  deleteTransaction,
  listTransaction,
} from '../../../apis/dashboard/transaction';
import jsPDF from 'jspdf';
const { RangePicker } = DatePicker;

const Index = ({
  data,
  loading,
  errMessage,
  isError,
  isErrorType,
  isAuthenticated,
  deleteTransaction,
  listTransaction,
  category,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [fromDate, setfromDate] = useState(null);

  const columns = [
    {
      title: 'Sr no',
      dataIndex: 'srno',
      innerWidth: '24px',
      key: 'srno',
      width: '70px',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Particuler',
      dataIndex: 'particular',
      key: 'particular',
    },
    {
      title: 'Last Payment Date',
      dataIndex: 'date_last',
      key: 'date_last',
      width: '170px',
    },
    {
      title: 'Last Payment',
      dataIndex: 'last_payment',
      key: 'last_payment',
      width: '140px',
    },
    {
      title: 'Expected Amount',
      dataIndex: 'expected_amount',
      key: 'expected_amount',
      width: '140px',
    },
    {
      title: 'Expected Date',
      dataIndex: 'date',
      key: 'date',
      width: '140px',
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      key: 'credit',
    },
    {
      title: 'Debit',
      dataIndex: 'debit',
      key: 'debit',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'x',
      width: '100px',
    },
  ];

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     listTransaction();
  //   }
  // }, [listTransaction, isAuthenticated]);

  const [searchData, setsearchData] = useState([]);
  const [search, setsearch] = useState('');
  const [dataset, setdataset] = useState({});
  const [credit, setcredit] = useState(0);
  const [debit, setdebit] = useState(0);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS_EXPENSE') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage]);

  useEffect(() => {
    if (data !== null) {
      var result = data;
      if (search !== '' && search !== null) {
        result = data.filter(
          (item) =>
            (item.name !== null
              ? item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.credit !== null
              ? item.credit.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.debit !== null
              ? item.debit.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.particular !== null
              ? item.particular.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false)
        );
      }
      var dataset = [];
      let credit = 0;
      let debit = 0;
      result.forEach((element, index) => {
        dataset.push({
          key: index + 1,
          srno: index + 1,
          name: element.name,
          particular: element.particular,
          datezz: element.date,
          expected_amount: element.expected_amount,
          date: moment(element.date).format('DD-MM-YYYY'),
          debit: element.debit,
          credit: element.credit,
          date_last:
            element.date_last !== '' && element.date_last !== null
              ? moment(element.date_last).format('DD-MM-YYYY')
              : '',
          last_payment: element.last_payment,
          action: (
            <div>
              <Tooltip title='Edit'>
                <Link to='#!'>
                  <EditOutlined
                    className='text-success'
                    style={{ fontSize: '16px' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setdataset(element);
                      setModalVisibleedit(true);
                    }}
                  />
                </Link>
              </Tooltip>
              <Popconfirm
                title='Are you sure?'
                onConfirm={(e) => {
                  deleteTransaction({ id: element.id });
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
      if (fromDate !== null) {
        dataset = dataset.filter(
          (ele) =>
            moment(moment(ele.datezz).format('YYYY-MM-DD')).diff(
              moment(fromDate[0]).format('YYYY-MM-DD'),
              'days'
            ) >= 0 &&
            moment(moment(ele.datezz).format('YYYY-MM-DD')).diff(
              moment(fromDate[1]).format('YYYY-MM-DD'),
              'days'
            ) <= 0
        );
      }
      dataset.forEach((element) => {
        credit +=
          element.credit !== null && element.credit !== ''
            ? parseFloat(element.credit)
            : 0;
        debit +=
          element.debit !== null && element.debit !== ''
            ? parseFloat(element.debit)
            : 0;
      });
      setcredit(credit);
      setdebit(debit);
      setsearchData(
        dataset.sort(
          (a, b) => Number(new Date(b.datezz)) - Number(new Date(a.datezz))
        )
      );
      setchangedVal(
        dataset.sort(
          (a, b) => Number(new Date(b.datezz)) - Number(new Date(a.datezz))
        )
      );
    }
  }, [data, search, deleteTransaction, fromDate]);
  const [changedVal, setchangedVal] = useState([]);
  const pdfRef = useRef(null);

  const handleDownload = () => {
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
        await doc.save('transaction');
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
            <Input
              placeholder='Search'
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </Col>
          <Col sm={10} md={8} lg={7} className='text-left mb-3 pl-2'>
            <RangePicker
              format='DD-MM-YYYY'
              onChange={(e, date) => {
                setfromDate(e);
                // onChange(e, date);
              }}
            />
          </Col>
          <Col sm={6} md={10} lg={12} className='text-right mb-3 ml-auto'>
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
              Add Transaction
            </Button>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Table
              onChange={(pagination, filters, sorter, extra) => {
                let credit = 0;
                let debit = 0;
                extra.currentDataSource.forEach((ele) => {
                  if (ele.credit !== '' && ele.credit !== null) {
                    credit += parseFloat(ele.credit);
                  }
                  if (ele.debit !== '' && ele.debit !== null) {
                    debit += parseFloat(ele.debit);
                  }
                });

                setchangedVal(extra.currentDataSource);
                setcredit(credit);
                setdebit(debit);
              }}
              className='border'
              columns={columns}
              dataSource={searchData}
              loading={loading}
              scroll={{ x: 1350 }}
            />
            <h5 style={{ marginTop: '-40px' }} className='pl-3'>
              Credited: {credit} {' / '}
              Debited: {debit}
            </h5>
          </Col>
        </Row>
      </Card>
      <AddExpense visible={modalVisible} cancel={setModalVisible} />
      <EditExpense
        visible={modalVisibleedit}
        cancel={setModalVisibleedit}
        dataset={dataset}
      />
      <div style={{ display: 'none' }}>
        <div ref={pdfRef} style={styles.page}>
          <h6 style={styles.fullWidth}>
            Expense{' '}
            {fromDate !== null
              ? '- (' +
                moment(fromDate[0]).format('DD-MM-YYYY') +
                ' to ' +
                moment(fromDate[0]).format('DD-MM-YYYY') +
                ')'
              : ''}{' '}
          </h6>
          {changedVal.length > 0 && (
            <div>
              <div style={styles.fullWidth}>
                <table style={styles.fullWidth}>
                  <tbody>
                    <tr
                      style={{
                        border: 'thin solid #DCDCDC',
                        borderBottom: 'thin solid #DCDCDC',
                        width: '100%',
                      }}
                    >
                      <th
                        style={{
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Particular
                      </th>
                      <th
                        style={{
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Last Payment Date
                      </th>
                      <th
                        style={{
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Last Payment
                      </th>
                      <th
                        style={{
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Expected Amount
                      </th>
                      <th
                        style={{
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Expected Date
                      </th>
                      <th
                        style={{
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Credit
                      </th>
                      <th
                        style={{
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Debit
                      </th>
                    </tr>
                    {changedVal.map((ele, indz) => (
                      <tr
                        style={{
                          border: 'thin solid #DCDCDC',
                          borderBottom: 'thin solid #DCDCDC',
                          width: '100%',
                        }}
                        key={indz}
                      >
                        <td
                          style={{
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.name}
                        </td>
                        <td
                          style={{
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.particular !== null
                            ? ele.particular.split('').map((ele, inde) => {
                                if (inde % 10 === 0) {
                                  return (
                                    <>
                                      <br />
                                      {ele}
                                    </>
                                  );
                                }
                                return ele;
                              })
                            : ''}
                        </td>
                        <td
                          style={{
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.date_last}
                        </td>
                        <td
                          style={{
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.last_payment}
                        </td>
                        <td
                          style={{
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.expected_amount}
                        </td>
                        <td
                          style={{
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.date}
                        </td>
                        <td
                          style={{
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.credit}
                        </td>
                        <td
                          style={{
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.debit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 className='' style={{ width: '410px', fontSize: '9px' }}>
                  Credited: {credit} {' / '}
                  Debited: {debit}
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
  deleteTransaction: PropTypes.func,
  data: PropTypes.any,
  loading: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isAuthenticated: PropTypes.any,
  listTransaction: PropTypes.func,
  category: PropTypes.any,
};
const mapStateToProps = (state) => ({
  data: state.transaction.data,
  loading: state.transaction.loading,
  isError: state.transaction.isError,
  errMessage: state.transaction.errMessage,
  isErrorType: state.transaction.isErrorType,
  category: state.transaction.category,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  deleteTransaction,
  listTransaction,
})(Index);
