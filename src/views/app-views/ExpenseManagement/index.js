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
import React, { useState } from 'react';
import {
  PlusCircleOutlined,
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

  const [total, settotal] = useState([]);

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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
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
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
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
      var sum = 0;
      result.forEach((element, index) => {
        let mode = JSON.parse(element.mode);
        sum +=
          element.amount !== null || element.amout !== ''
            ? parseFloat(element.amount)
            : 0;
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
      settotal(sum);
      if (fromDate !== null) {
        dataset = dataset.filter(
          (ele) =>
            moment(ele.datezz) >= fromDate[0] &&
            moment(ele.datezz) <= fromDate[1]
        );
      }
      setsearchData(dataset);
    }
  }, [data, search, deleteExpense, fromDate]);

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
                var sum = 0;
                extra.currentDataSource.forEach((ele) => {
                  if (ele.price !== '') {
                    sum += parseFloat(ele.price);
                  }
                });
                settotal(sum);
              }}
              className='border'
              columns={columns}
              dataSource={searchData}
              loading={loading}
            />
            <h5 style={{ marginTop: '-40px' }} className='pl-3'>Total Expenses: {total}</h5>
          </Col>
        </Row>
      </Card>
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
