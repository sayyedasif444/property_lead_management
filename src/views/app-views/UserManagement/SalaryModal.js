import React, { useEffect } from 'react';
import { Modal, Table } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { passwordUpdateAdmin } from '../../../apis/dashboard/User';
import axios from 'axios';
import { BACKEND_URL } from '../../../actions/types';
import { useState } from 'react';

const AddUser = ({ visible, cancel, userId }) => {
  const [data, setdata] = useState([]);
  const [searchData, setsearchData] = useState([]);
  const columns = [
    {
      title: 'Sr no',
      dataIndex: 'srno',
      innerWidth: '24px',
      key: 'srno',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Received on',
      dataIndex: 'received_on',
      key: 'received_on',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Deduction',
      dataIndex: 'deduction',
      key: 'deduction',
    },
    {
      title: 'Advance',
      dataIndex: 'advance',
      key: 'deduction',
    },
    {
      title: 'Commission',
      dataIndex: 'commission',
      key: 'commission',
    },
    {
      title: 'Incentive',
      dataIndex: 'incentive',
      key: 'incentive',
    },
  ];

  useEffect(() => {
    if (userId !== null) {
      const config = {
        'Content-Type': 'application/json',
      };
      const body = { user_id: userId };
      axios({
        method: 'POST',
        url: BACKEND_URL + 'salary/list-user-salary',
        data: body,
        headers: config,
      })
        .then((response) => {
          if (response.data.statuscode === 200) {
            setdata(response.data.data);
          } else {
            setdata([]);
          }
        })
        .catch((error) => {
          setdata([]);
        });
    }
  }, [userId]);

  useEffect(() => {
    let newSet = [];
    data.forEach((ele, index) => {
      newSet.push({
        srno: index + 1,
        date: ele.paid_for_date,
        received_on: ele.paid_date,
        amount: ele.totalPaid,
        advance: ele.advance,
        commission: ele.commission,
        deduction: ele.deduction,
        incentive: ele.incentive,
      });
    });
    setsearchData(newSet);
  }, [data]);

  return (
    <Modal
      title='Salary History'
      visible={visible}
      centered
      footer={null}
      width={900}
      destroyOnClose={true}
      onCancel={(e) => cancel(false)}
    >
      <Table className='border' columns={columns} dataSource={searchData} />
    </Modal>
  );
};

AddUser.propTypes = {
  passwordUpdateAdmin: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  singleData: PropTypes.any,
  isErrorType: PropTypes.string,
};
const mapStateToProps = (state) => ({
  isError: state.user.isError,
  errMessage: state.user.errMessage,
  isErrorType: state.user.isErrorType,
  singleData: state.user.singleData,
});
export default connect(mapStateToProps, { passwordUpdateAdmin })(AddUser);
