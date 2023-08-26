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
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import AddExpense from './addExpense';
import EditExpense from './editExpense';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import store from '../../../redux/store';
import { SET_SIGNLE_EXPENSE } from '../../../actions/types';
import moment from 'moment';
import AddCategory from './addCategory';
import {
  deleteExpense,
  listExpense,
  listExpenseCategory,
} from '../../../apis/dashboard/expense';
import jsPDF from 'jspdf';
const { RangePicker } = DatePicker;

const Index = ({
  data,
  loading,
  errMessage,
  isError,
  isErrorType,
  isAuthenticated,
  deleteExpense,
  listExpenseCategory,
  listExpense,
  category,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [categoryModel, setcategoryModel] = useState(false);
  const [fromDate, setfromDate] = useState(null);

  const [columns, setcolumns] = useState([
    {
      title: 'Sr no',
      dataIndex: 'srno',
      innerWidth: '24px',
      key: 'srno',
    },
    {
      title: 'Particuler',
      dataIndex: 'particular',
      key: 'particular',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
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
      title: 'Mode',
      dataIndex: 'mode',
      key: 'mode',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'x',
    },
  ]);

  useEffect(() => {
    if (category.length > 0 && data.length > 0) {
      setcolumns([
        {
          title: 'Sr no',
          dataIndex: 'srno',
          innerWidth: '24px',
          key: 'srno',
        },
        {
          title: 'Particuler',
          dataIndex: 'particular',
          key: 'particular',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
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
          title: 'Mode',
          dataIndex: 'mode',
          key: 'mode',
          filters: [
            {
              text: 'Cash',
              value: 'Cash',
            },
            {
              text: 'Bank',
              value: 'Bank',
            },
            {
              text: 'UPI',
              value: 'UPI',
            },
            {
              text: 'Cheque',
              value: 'Cheque',
            },
          ],
          onFilter: (value, record) => record.transaction === value,
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
          filters: category.map((ele) => {
            return {
              text: ele.category,
              value: ele.category,
            };
          }),
          onFilter: (value, record) => record.category === value,
        },
        {
          title: 'Actions',
          dataIndex: 'action',
          key: 'x',
        },
      ]);
    }
  }, [category, data]);

  useEffect(() => {
    if (isAuthenticated) {
      listExpenseCategory();
      listExpense();
    }
  }, [listExpenseCategory, listExpense, isAuthenticated]);

  const [searchData, setsearchData] = useState([]);
  const [search, setsearch] = useState('');
  const [changedVal, setchangedVal] = useState([]);

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
            (item.amount !== null
              ? item.amount.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.expenseCategory.category !== null
              ? item.expenseCategory.category
                  .toLowerCase()
                  .indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.payment_type !== null
              ? item.payment_type.toLowerCase().indexOf(search.toLowerCase()) >
                -1
              : false)
        );
      }
      var dataset = [];
      result.forEach((element, index) => {
        let mode = JSON.parse(element.mode);
        dataset.push({
          key: index + 1,
          srno: index + 1,
          particular: element.payment_type,
          date: moment(element.date_of_expense).format('DD-MM-YYYY'),
          category:
            element.expenseCategory !== null
              ? element.expenseCategory.category
              : '',
          transaction: mode !== null ? mode.mode : '',
          datezz: element.date_of_expense,
          amount: 'Rs: ' + element.amount,
          credit: element.type === 'Credit' ? 'Rs: ' + element.amount : '-',
          debit: element.type === 'Debit' ? 'Rs: ' + element.amount : '-',
          amounts: element.amount,
          type: element.type,
          price:
            element.amount !== null || element.amout !== ''
              ? element.amount
              : 0,
          mode:
            mode.mode === 'Cash' ? (
              'Cash'
            ) : (
              <Tooltip
                title={
                  mode.mode === 'UPI' || mode.mode === 'Bank' ? (
                    'Transaction id: ' + mode[mode.mode]
                  ) : mode.mode === 'Cheque' ? (
                    <>
                      <span>Cheque Number: {mode[mode.mode].number}</span>
                      <br />
                      <span>Bank Name: {mode[mode.mode].name}</span>
                      <br />
                      <span>Date: {mode[mode.mode].date_of_check}</span>
                      <br />
                    </>
                  ) : (
                    ''
                  )
                }
              >
                {mode.mode}
              </Tooltip>
            ),

          action: (
            <div>
              <Tooltip title='Edit'>
                <Link to='#!'>
                  <EditOutlined
                    className='text-success'
                    style={{ fontSize: '16px' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setModalVisibleedit(true);
                      store.dispatch({
                        type: SET_SIGNLE_EXPENSE,
                        payload: element,
                      });
                    }}
                  />
                </Link>
              </Tooltip>
              <Popconfirm
                title='Are you sure?'
                onConfirm={(e) => {
                  deleteExpense({ id: element.id });
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
            moment(ele.datezz) >= fromDate[0] &&
            moment(ele.datezz) <= fromDate[1]
        );
      }
      setchangedVal(dataset);
      setsearchData(dataset);
    }
  }, [data, search, deleteExpense, fromDate]);
  const pdfRef = useRef(null);
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
        await doc.save('expense');
      },
    });
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
          <Col sm={6} md={10} lg={12} className='text-right mb-3'>
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
              Add Expense
            </Button>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Table
              onChange={(pagination, filters, sorter, extra) => {
                setchangedVal(extra.currentDataSource);
              }}
              className='border'
              columns={columns}
              dataSource={searchData}
              loading={loading}
            />
            <h5 style={{ marginTop: '-60px' }} className='pl-3'>
              Total Credit:{' '}
              {changedVal.reduce((accumulator, object) => {
                return (
                  accumulator +
                  parseFloat(object.type === 'Credit' ? object.amounts : 0)
                );
              }, 0)}
              <br />
              Total Debit:{' '}
              {changedVal.reduce((accumulator, object) => {
                return (
                  accumulator +
                  parseFloat(object.type === 'Debit' ? object.amounts : 0)
                );
              }, 0)}
            </h5>
          </Col>
        </Row>
      </Card>
      <div style={{ display: 'none' }}>
        <div ref={pdfRef} style={styles.page}>
          <h4 style={styles.fullWidth}>Expense: </h4>
          {changedVal.length > 0 && (
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
                        Particular
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
                        Credit
                      </th>
                      <th
                        style={{
                          width: '120px',
                          borderRight: 'thin solid #DCDCDC',
                          textAlign: 'left',
                          padding: '6px',
                        }}
                      >
                        Debit
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
                    {changedVal.map((ele, indz) => (
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
                          {ele.particular}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.date !== null && ele.date.substring(0, 10)}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.credit}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.debit}
                        </td>
                        <td
                          style={{
                            width: '120px',
                            borderRight: 'thin solid #DCDCDC',
                            textAlign: 'left',
                            padding: '6px',
                          }}
                        >
                          {ele.mode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 className='' style={{ width: '410px', fontSize: '9px' }}>
                  Total Credit:{' '}
                  {changedVal.reduce((accumulator, object) => {
                    return (
                      accumulator +
                      parseFloat(object.type === 'Credit' ? object.amounts : 0)
                    );
                  }, 0)}
                  <br />
                  Total Debit:{' '}
                  {changedVal.reduce((accumulator, object) => {
                    return (
                      accumulator +
                      parseFloat(object.type === 'Debit' ? object.amounts : 0)
                    );
                  }, 0)}
                </h5>
              </div>
            </div>
          )}
          <div className='avoidThisRow'></div>
        </div>
      </div>
      <AddExpense
        visible={modalVisible}
        cancel={setModalVisible}
        categoryModel={categoryModel}
        setcategoryModel={setcategoryModel}
      />
      <EditExpense
        visible={modalVisibleedit}
        cancel={setModalVisibleedit}
        categoryModel={categoryModel}
        setcategoryModel={setcategoryModel}
      />
      <AddCategory visible={categoryModel} cancel={setcategoryModel} />
    </div>
  );
};
Index.propTypes = {
  listExpenseCategory: PropTypes.func,
  deleteExpense: PropTypes.func,
  data: PropTypes.any,
  loading: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isAuthenticated: PropTypes.any,
  listExpense: PropTypes.func,
  category: PropTypes.any,
};
const mapStateToProps = (state) => ({
  data: state.expense.data,
  loading: state.expense.loading,
  isError: state.expense.isError,
  errMessage: state.expense.errMessage,
  isErrorType: state.expense.isErrorType,
  category: state.expense.category,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  listExpenseCategory,
  deleteExpense,
  listExpense,
})(Index);
