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
import Category from './Category';
import EditCategory from './editCategory';
const { RangePicker } = DatePicker;

function uniqueObjectArray(array, key, keyList) {
  let newSet = [];
  array.forEach((item) => {
    let flag = newSet.filter((ele) => ele[key] === item[key]).length > 0;
    if (!flag) {
      if (keyList.length === 0) {
        newSet.push({ ...item });
      } else {
        let data = {};
        keyList.forEach((ele) => {
          data[ele] = item[ele];
        });
        newSet.push({ ...data });
      }
    }
  });
  return newSet;
}

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
  const [catmodalVisible, setcatModalVisible] = useState(false);
  const [editcatmodalVisible, seteditcatModalVisible] = useState(false);
  const [editCatData, seteditCatData] = useState({});
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [categoryModel, setcategoryModel] = useState(false);
  const [fromDate, setfromDate] = useState(null);
  const [searchData, setsearchData] = useState([]);
  const [categoryPrintData, setcategoryPrintData] = useState([]);

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
          filters: uniqueObjectArray(category, 'category', [
            'category',
            'createdAt',
            'id',
            'updatedAt',
          ]).map((ele) => {
            return {
              text: ele.category,
              value: ele.category,
            };
          }),
          onFilter: (value, record) =>
            record.category.toLowerCase() === value.toLowerCase(),
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
    if (category.length > 0 && searchData.length > 0) {
      let categoryData = [];
      category.forEach((ele) => {
        categoryData.push({
          id: ele.id,
          category: ele.category,
          debit: searchData
            .filter(
              (item) => item.type === 'Debit' && item.category_id === ele.id
            )
            .reduce((sum, item) => sum + parseFloat(item.price), 0)
            .toFixed(2),
          credit: searchData
            .filter(
              (item) => item.type === 'Credit' && item.category_id === ele.id
            )
            .reduce((sum, item) => sum + parseFloat(item.price), 0)
            .toFixed(2),
        });
      });
      setcategoryPrintData(categoryData);
    }
  }, [category, searchData]);

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
    doc.html(categoryPdfref.current, {
      async callback(doc) {
        await doc.save('expense_report');
      },
    });
  };

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
          category_id: element.category_id,
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
      setchangedVal(dataset);
      setsearchData(dataset);
    }
  }, [data, search, deleteExpense, fromDate]);

  const pdfRef = useRef(null);
  const categoryPdfref = useRef(null);
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
          <Col sm={5} md={4} lg={3} className='text-left mb-3'>
            <Input
              placeholder='Search'
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </Col>
          <Col sm={8} md={7} lg={6} className='text-left mb-3 pl-2'>
            <RangePicker
              format='DD-MM-YYYY'
              onChange={(e, date) => {
                setfromDate(e);
                // onChange(e, date);
              }}
            />
          </Col>
          <Col sm={11} md={13} lg={15} className='text-right mb-3'>
            <Button
              type='primary mr-2'
              danger
              icon={<DownloadOutlined />}
              onClick={(e) => handleDownload(true)}
            ></Button>
            <Button
              type='primary mr-2 '
              icon={<DownloadOutlined />}
              onClick={(e) => downloadCategory()}
            >
              Category
            </Button>
            <Button
              type='primary mr-2 '
              icon={<PlusCircleOutlined />}
              onClick={(e) => setcatModalVisible(true)}
            >
              Category
            </Button>
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
              {changedVal
                .reduce((accumulator, object) => {
                  return (
                    accumulator +
                    parseFloat(object.type === 'Credit' ? object.amounts : 0)
                  );
                }, 0)
                .toFixed(2)}
              <br />
              Total Debit:{' '}
              {changedVal
                .reduce((accumulator, object) => {
                  return (
                    accumulator +
                    parseFloat(object.type === 'Debit' ? object.amounts : 0)
                  );
                }, 0)
                .toFixed(2)}
            </h5>
          </Col>
        </Row>
      </Card>
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
      <div style={{ display: 'none' }}>
        <div ref={categoryPdfref} style={styles.page}>
          <h6 style={styles.fullWidth}>
            Expense Report{' '}
            {fromDate !== null
              ? '- (' +
                moment(fromDate[0]).format('DD-MM-YYYY') +
                ' to ' +
                moment(fromDate[0]).format('DD-MM-YYYY') +
                ')'
              : ''}{' '}
          </h6>
          {categoryPrintData.length > 0 && (
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
                        Category
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
                    </tr>
                    {categoryPrintData
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
                            {ele.category}
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
                        </tr>
                      ))}
                  </tbody>
                </table>
                <h5 className='' style={{ width: '410px', fontSize: '9px' }}>
                  Total Credit:{' '}
                  {categoryPrintData.reduce((accumulator, object) => {
                    return accumulator + parseFloat(object.credit);
                  }, 0)}
                  <br />
                  Total Debit:{' '}
                  {categoryPrintData.reduce((accumulator, object) => {
                    return accumulator + parseFloat(object.debit);
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
      <Category
        visible={catmodalVisible}
        cancel={setcatModalVisible}
        seteditcatModalVisible={seteditcatModalVisible}
        setData={seteditCatData}
      />
      <EditCategory
        visible={editcatmodalVisible}
        cancel={seteditcatModalVisible}
        data={editCatData}
      />
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
