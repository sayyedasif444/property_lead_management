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
  DeleteOutlined,
  EditOutlined,
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

  useEffect(() => {
    if (isAuthenticated) {
      listTransaction();
    }
  }, [listTransaction, isAuthenticated]);

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
            moment(ele.datezz).format('YYYY-MM-DD') >=
              fromDate[0].format('YYYY-MM-DD') &&
            moment(ele.datezz).format('YYYY-MM-DD') <=
              fromDate[1].format('YYYY-MM-DD')
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
      setsearchData(dataset.sort((a, b) => Number(new Date(b.datezz)) - Number(new Date(a.datezz))));
    }
  }, [data, search, deleteTransaction, fromDate]);

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
                console.log(extra);
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
                setcredit(credit);
                setdebit(debit);
              }}
              className='border'
              columns={columns}
              dataSource={searchData}
              loading={loading}
              scroll={{ x: 1200 }}
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
