import { Col, message, Popconfirm, Row, Table, Tooltip } from 'antd';
import React, { useState } from 'react';
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Add from './add';
import Edit from './edit';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { deletePayment } from '../../../../apis/dashboard/Project';

const Index = ({
  data,
  loading,
  errMessage,
  isError,
  isErrorType,
  deletePayment,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [editPayment, seteditPayment] = useState(null);

  const columns = [
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
      title: 'Actions',
      dataIndex: 'action',
      key: 'x',
    },
  ];

  const [searchData, setsearchData] = useState([]);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS_EXPENSE') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage]);

  useEffect(() => {
    if (data.projectExpenses !== null) {
      var result = data.projectExpenses;
      var dataset = [];
      result.forEach((element, index) => {
        let mode = JSON.parse(element.mode);
        dataset.push({
          key: index + 1,
          srno: index + 1,
          particular: element.particular,
          date: moment(element.date_of_expense).format('DD-MM-YYYY'),
          datezz: element.date_of_expense,
          amount: 'Rs: ' + element.amount,
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
                      seteditPayment(element);
                      setModalVisibleedit(true);
                    }}
                  />
                </Link>
              </Tooltip>
              <Popconfirm
                title='Are you sure?'
                onConfirm={(e) => {
                  deletePayment({ id: element.id, project_id: data.id });
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
  }, [data, deletePayment]);

  return (
    <div>
      <h4 className=' pb-0'>
        Expenses{' '}
        <Link
          size='small'
          type='primary '
          onClick={(e) => setModalVisible(true)}
          style={{
            float: 'right',
            fontWeight: 'normal',
            fontSize: '15px',
            paddingTop: '4px',
            paddingRight: '5px',
          }}
          to='#!'
        >
          <PlusCircleOutlined /> Add Expense
        </Link>
      </h4>
      <Row>
        <Col sm={24} md={24} lg={24}>
          <Table
            className='border'
            columns={columns}
            dataSource={searchData}
            loading={loading}
            pagination={false}
          />
        </Col>
      </Row>
      <Add visible={modalVisible} cancel={setModalVisible} />
      <Edit
        visible={modalVisibleedit}
        cancel={setModalVisibleedit}
        editPaymentData={editPayment}
      />
    </div>
  );
};
Index.propTypes = {
  data: PropTypes.any,
};
const mapStateToProps = (state) => ({
  data: state.project.singleData,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { deletePayment })(Index);
