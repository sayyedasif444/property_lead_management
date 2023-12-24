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
  KeyOutlined,
} from '@ant-design/icons';
import AddUser from './addUser';
import EditUser from './editUser';
import EditUserPass from './editPassword';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { deleteUser, listUser } from '../../../apis/dashboard/User';
import { Link } from 'react-router-dom';
import store from '../../../redux/store';
import { SET_SIGNLE_USER } from '../../../actions/types';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [modalVisibleeditPass, setModalVisibleeditPass] = useState(false);
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
      title: 'Email',
      dataIndex: 'emailid',
      key: 'emailid',
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'x',
    },
  ];

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     listUser();
  //   }
  // }, [listUser, isAuthenticated]);

  const [searchData, setsearchData] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
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
            (item.first_name !== null
              ? item.first_name.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.last_name !== null
              ? item.last_name.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.emailid !== null
              ? item.emailid.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.phone_number !== null
              ? item.phone_number.toLowerCase().indexOf(search.toLowerCase()) >
                -1
              : false)
        );
      }
      var dataset = [];
      result.forEach((element, index) => {
        dataset.push({
          key: index + 1,
          srno: index + 1,
          first_name: element.first_name,
          last_name: element.last_name,
          emailid: element.emailid,
          phone_number: element.phone_number,
          status: (
            <Popconfirm
              title='Are you sure?'
              onConfirm={(e) =>
                deleteUser({ id: element.id, isActive: !element.isActive })
              }
              okText='Yes'
              cancelText='No'
            >
              <Switch checked={element.isActive} />
            </Popconfirm>
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
                        type: SET_SIGNLE_USER,
                        payload: element,
                      });
                    }}
                  />
                </Link>
              </Tooltip>
              <Tooltip title='Change Password'>
                <Link
                  to='#!'
                  onClick={(e) => {
                    e.preventDefault();
                    setModalVisibleeditPass(true);
                    store.dispatch({
                      type: SET_SIGNLE_USER,
                      payload: element,
                    });
                  }}
                >
                  <KeyOutlined
                    className='text-primary ml-4 '
                    style={{ fontSize: '16px' }}
                  />
                </Link>
              </Tooltip>
            </div>
          ),
        });
      });
      setsearchData(dataset);
    }
  }, [data, search, deleteUser]);

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
          <Col sm={16} md={18} lg={19} className='text-right mb-3'>
            <Button
              type='primary '
              icon={<PlusCircleOutlined />}
              onClick={(e) => setModalVisible(true)}
            >
              Add User
            </Button>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Table
              className='border'
              columns={columns}
              dataSource={searchData}
              loading={loading}
            />
          </Col>
        </Row>
      </Card>
      <AddUser visible={modalVisible} cancel={setModalVisible} />
      <EditUser visible={modalVisibleedit} cancel={setModalVisibleedit} />
      <EditUserPass
        visible={modalVisibleeditPass}
        cancel={setModalVisibleeditPass}
      />
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
