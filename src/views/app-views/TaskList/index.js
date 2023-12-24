import {
  Card,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Table,
  Tooltip,
} from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddUser from './addUser';
import EditUser from './editUser';
import EditUserPass from './editPassword';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { listTaskUser, deleteTask } from '../../../apis/dashboard/Task';
import { Link } from 'react-router-dom';
import store from '../../../redux/store';
import moment from 'moment';
import { SET_SIGNLE_TASK } from '../../../actions/types';

const Index = ({
  data,
  loading,
  errMessage,
  isError,
  isErrorType,
  isAuthenticated,
  listTaskUser,
  deleteTask,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [modalVisibleeditPass, setModalVisibleeditPass] = useState(false);

  const [columns, setcolumns] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      setcolumns([
        {
          title: 'Sr no',
          dataIndex: 'srno',
          innerWidth: '24px',
          key: 'srno',
        },
        {
          title: 'List',
          dataIndex: 'tasklist',
          key: 'tasklist',
        },
        {
          title: 'Assigned To',
          dataIndex: 'assigned_to',
          key: 'assigned_to',
        },
        {
          title: 'Deadline',
          dataIndex: 'deadline',
          key: 'deadline',
          filters: [
            {
              value: '2',
              text: 'Overdue',
            },
            {
              value: '4',
              text: 'Today',
            },
            {
              value: '5',
              text: 'Tomorrow',
            },
          ],
          onFilter: (value, record) => {
            var dataz = data.filter((ele) => ele.id === record.id);
            if (value === '2') {
              if (dataz.length > 0) {
                if (
                  dataz.filter(
                    (ele) =>
                      new Date(ele.deadline.split('-').reverse().join('-')) <
                      new Date()
                  ).length > 0
                ) {
                  return true;
                }
              }
            }
            if (value === '4') {
              if (dataz.length > 0) {
                if (
                  dataz.filter(
                    (ele) =>
                      ele.isOpen &&
                      moment(
                        ele.deadline.split('-').reverse().join('-')
                      ).format('DD-MM-YYYY') ===
                        moment(new Date()).format('DD-MM-YYYY')
                  ).length > 0
                ) {
                  return true;
                }
              }
            }
            if (value === '5') {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              if (dataz.length > 0) {
                if (
                  dataz.filter(
                    (ele) =>
                      ele.isOpen &&
                      moment(
                        ele.deadline.split('-').reverse().join('-')
                      ).format('DD-MM-YYYY') ===
                        moment(moment(new Date()).add(1, 'days')).format(
                          'DD-MM-YYYY'
                        )
                  ).length > 0
                ) {
                  return true;
                }
              }
            }
          },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          filters: [
            {
              value: '2',
              text: 'Active',
            },
            {
              value: '4',
              text: 'Completed',
            },
          ],
          onFilter: (value, record) => {
            var dataz = data.filter((ele) => ele.id === record.id);
            if (value === '2') {
              if (dataz.length > 0) {
                if (dataz.filter((ele) => ele.isOpen).length > 0) {
                  return true;
                }
              }
            }
            if (value === '4') {
              if (dataz.length > 0) {
                if (dataz.filter((ele) => !ele.isOpen).length > 0) {
                  return true;
                }
              }
            }
          },
        },
        // {
        //   title: 'Actions',
        //   dataIndex: 'action',
        //   key: 'x',
        // },
      ]);
    }
  }, [data]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     listTaskUser();
  //   }
  // }, [listTaskUser, isAuthenticated]);

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
            (item.user !== null
              ? item.user.first_name
                  .toLowerCase()
                  .indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.user !== null
              ? item.user.last_name
                  .toLowerCase()
                  .indexOf(search.toLowerCase()) > -1
              : false)
        );
      }
      var dataset = [];
      result.forEach((element, index) => {
        dataset.push({
          key: index + 1,
          srno: index + 1,
          id: element.id,
          deadline: element.deadline,
          isOpen: element.isOpen,
          tasklist: (
            <Link
              to='#!'
              onClick={(e) => {
                e.preventDefault();
                setModalVisibleeditPass(true);
                store.dispatch({
                  type: SET_SIGNLE_TASK,
                  payload: element,
                });
              }}
            >
              View
            </Link>
          ),
          assigned_to:
            element.user !== null
              ? element.user.first_name + ' ' + element.user.last_name
              : '',
          status: element.isOpen ? 'Active' : 'Completed',
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
                        type: SET_SIGNLE_TASK,
                        payload: element,
                      });
                    }}
                  />
                </Link>
              </Tooltip>
              <Popconfirm
                title='Are you sure?'
                onConfirm={(e) => {
                  deleteTask({ id: element.id });
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
  }, [data, search, deleteTask]);

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
          <Col sm={24} md={24} lg={24}>
            <Table
              className='border'
              columns={columns}
              dataSource={searchData}
              loading={loading}
              rowClassName={(record, index) => (record.isOpen ? '' : 'text-success')}
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
  listTaskUser: PropTypes.func,
  deleteTask: PropTypes.func,
  data: PropTypes.any,
  loading: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isAuthenticated: PropTypes.any,
};
const mapStateToProps = (state) => ({
  data: state.task.dataUser,
  loading: state.task.loading,
  isError: state.task.isError,
  errMessage: state.task.errMessage,
  isErrorType: state.task.isErrorType,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { listTaskUser, deleteTask })(Index);
