import { Card, Col, message, Row } from 'antd';
import React from 'react';
import EditUser from './editUser';
import EditUserPass from './editPassword';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { deleteUser, listUser } from '../../../apis/dashboard/User';

const Index = ({
  data,
  loading,
  errMessage,
  isError,
  isErrorType,
  isAuthenticated,
  listUser,
  deleteUser,
}) => {
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     listUser();
  //   }
  // }, [listUser, isAuthenticated]);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage]);

  return (
    <div>
      <Card>
        <Row>
          <Col lg={24} className='border-bottom mt-0 pb-3'>
            <h4 className='border-bottom pb-2 mb-3'>User Details</h4>
            <EditUser />
          </Col>
          <Col lg={24} className='mt-3'>
            <h4 className='border-bottom pb-2 mb-3'>Change Password</h4>
            <EditUserPass />
          </Col>
        </Row>
      </Card>
    </div>
  );
};
Index.propTypes = {
  listUser: PropTypes.func,
  deleteUser: PropTypes.func,
  data: PropTypes.any,
  loading: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isAuthenticated: PropTypes.any,
};
const mapStateToProps = (state) => ({
  data: state.user.data,
  loading: state.user.loading,
  isError: state.user.isError,
  errMessage: state.user.errMessage,
  isErrorType: state.user.isErrorType,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { listUser, deleteUser })(Index);
