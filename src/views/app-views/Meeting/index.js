import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  message,
  Popconfirm,
  Row,
} from 'antd';
import React, { useState } from 'react';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import AddUser from './addUser';
import EditUser from './editUser';
import EditUserPass from './editPassword';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { listMeeting, deleteMeeting } from '../../../apis/dashboard/Meeting';
import store from '../../../redux/store';
import { SET_SIGNLE_MEETING } from '../../../actions/types';
import { listUser } from '../../../apis/dashboard/User';

const Index = ({
  data,
  loading,
  errMessage,
  isError,
  isErrorType,
  isAuthenticated,
  listMeeting,
  listUser,
  deleteMeeting,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [modalVisibleeditPass, setModalVisibleeditPass] = useState(false);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     listMeeting();
  //     listUser();
  //   }
  // }, [listMeeting, isAuthenticated, listUser]);

  const [searchData, setsearchData] = useState([]);
  const [search, setsearch] = useState('');
  const [dateSelected, setdateSelected] = useState(moment(new Date()));

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
            (item.title !== null
              ? item.title.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.description !== null
              ? item.description.toLowerCase().indexOf(search.toLowerCase()) >
                -1
              : false)
        );
      }
      if (dateSelected !== null) {
        result = result.filter(
          (ele) =>
            moment(ele.i_date.substring(0, 10)).format('DD-MM-YYYY') ===
            dateSelected.format('DD-MM-YYYY')
        );
      }
      setsearchData(result);
    }
  }, [data, search, dateSelected]);

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
          <Col sm={8} md={6} lg={5} className='text-left mb-3 pl-2'>
            <DatePicker
              style={{ width: '100%' }}
              format={'DD-MM-YYYY'}
              value={dateSelected}
              onChange={(e) => setdateSelected(e)}
            />
          </Col>
          <Col sm={8} md={12} lg={14} className='text-right mb-3'>
            <Button
              type='primary '
              icon={<PlusCircleOutlined />}
              onClick={(e) => setModalVisible(true)}
            >
              Create Meeting
            </Button>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Row>
              {searchData.map((ele, index) => (
                <Col sm={8} key={index} className='p-1'>
                  <Card
                    bodyStyle={{ padding: '15px', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.preventDefault();
                      store.dispatch({
                        type: SET_SIGNLE_MEETING,
                        payload: ele,
                      });
                      setModalVisibleedit(true);
                    }}
                  >
                    <p className='mb-1 pb-0'>
                      <span className=''>
                        {moment(ele.i_date.substring(0, 10)).format(
                          'DD-MMM-YYYY'
                        )}
                      </span>
                      <span className='float-right'>
                        {moment(ele.i_time).format('hh:mm A')}
                      </span>
                    </p>
                    <h5 className='mb-1'>{ele.title}</h5>
                    <p className='mb-1'>{ele.meeting_point}</p>
                    <p className='mb-1'>{ele.description}</p>
                    <p className='mb-0'>
                      Created by: {ele.user.first_name} {ele.user.last_name}
                      {ele.user.id ===
                        parseInt(sessionStorage.getItem('id')) && (
                        <Popconfirm
                          title='Are you sure?'
                          onConfirm={(e) => {
                            e.stopPropagation();
                            deleteMeeting({ id: ele.id });
                          }}
                          onCancel={(e) => {
                            e.stopPropagation();
                          }}
                          okText='Yes'
                          cancelText='No'
                        >
                          <DeleteOutlined
                            className='text-danger float-right'
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                          />
                        </Popconfirm>
                      )}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
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
  listMeeting: PropTypes.func,
  deleteMeeting: PropTypes.func,
  listUser: PropTypes.func,
  data: PropTypes.any,
  loading: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isAuthenticated: PropTypes.any,
};
const mapStateToProps = (state) => ({
  data: state.meeting.data,
  loading: state.meeting.loading,
  isError: state.meeting.isError,
  errMessage: state.meeting.errMessage,
  isErrorType: state.meeting.isErrorType,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  listMeeting,
  listUser,
  deleteMeeting,
})(Index);
