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
  DatePicker,
  Tooltip,
} from 'antd';
import React, { useState } from 'react';
import {
  PlusCircleOutlined,
  EditOutlined,
  WhatsAppOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import AddUser from './addUser';
import EditUser from './editUser';
import EditUserPass from './editPassword';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import {
  deleteLead,
  listLead,
  listSource,
  markLead,
} from '../../../apis/dashboard/Lead';
import { Link } from 'react-router-dom';
import store from '../../../redux/store';
import { SET_SIGNLE_LEAD } from '../../../actions/types';
import { listUser } from '../../../apis/dashboard/User';
import AddInteraction from './addInteraction';
import ListInteraction from './listInteraction';
import EditInteraction from './editInteraction';
import ListAction from './listAction';
import AddAction from './addAction';
import EditAction from './editAction';
import ViewDetails from './viewDetails';
const { RangePicker } = DatePicker;

const Index = ({
  data,
  loading,
  errMessage,
  isError,
  isErrorType,
  isAuthenticated,
  listLead,
  listSource,
  listUser,
  deleteLead,
  markLead,
  user,
  source,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [modalVisibleeditPass, setModalVisibleeditPass] = useState(false);
  const [modalVisibleInteraction, setmodalVisibleInteraction] = useState(false);
  const [modalVisibleAction, setmodalVisibleAction] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [arrivalChange, setarrivalChange] = useState(null);

  useEffect(() => {
    setcolumns([
      {
        title: 'Sr no',
        dataIndex: 'srno',
        innerWidth: '24px',
        key: 'srno',
      },
      {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
      },
      {
        title: 'Email',
        dataIndex: 'emailid',
        key: 'emailid',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters: [
          {
            value: 'Residential',
            text: 'Residential',
          },
          {
            value: 'Investment',
            text: 'Investment',
          },
          {
            value: 'Commercial',
            text: 'Commercial',
          },
        ],
        onFilter: (value, record) => record.type === value,
      },
      {
        title: 'Source',
        dataIndex: 'source',
        key: 'source',
        filters: source.map((ele) => {
          return {
            text: ele.source,
            value: ele.id,
          };
        }),
        onFilter: (value, record) => record.source_id === value,
      },
      {
        title: 'Since',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: 'POC',
        dataIndex: 'poc',
        key: 'poc',
        filters: user.map((ele) => {
          return {
            text: ele.first_name + ' ' + ele.last_name,
            value: ele.id,
          };
        }),
        onFilter: (value, record) => record.assigned_id === value,
      },
      {
        title: 'Last talk',
        dataIndex: 'last_talk',
        key: 'last_talk',
      },
      {
        title: 'Next',
        dataIndex: 'next',
        key: 'next',
        filters: [
          {
            value: '1',
            text: 'Not set',
          },
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
          {
            value: '3',
            text: 'Future',
          },
        ],
        onFilter: (value, record) => {
          var dataz = data.filter((ele) => ele.id === record.lead_id)[0];
          if (value === '1') {
            if (dataz.actions.filter((ele) => ele.isOpen).length === 0) {
              return true;
            }
          }
          if (value === '2') {
            if (dataz.actions.length > 0) {
              if (
                dataz.actions.filter(
                  (ele) => ele.isOpen && new Date(ele.i_date) < new Date()
                ).length > 0
              ) {
                return true;
              }
            }
          }
          if (value === '3') {
            if (dataz.actions.length > 0) {
              if (
                dataz.actions.filter(
                  (ele) => ele.isOpen && new Date(ele.i_date) >= new Date()
                ).length > 0
              ) {
                return true;
              }
            }
          }
          if (value === '4') {
            if (dataz.actions.length > 0) {
              if (
                dataz.actions.filter(
                  (ele) =>
                    ele.isOpen &&
                    moment(ele.i_date).format('DD-MM-YYYY') ===
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
            if (dataz.actions.length > 0) {
              if (
                dataz.actions.filter(
                  (ele) =>
                    ele.isOpen &&
                    moment(ele.i_date).format('DD-MM-YYYY') ===
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
        title: 'Arrival',
        dataIndex: 'arrival',
        key: 'arrival',
        filters: [
          {
            value: '1',
            text: 'Not set',
          },
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
          {
            value: '3',
            text: 'Future',
          },
        ],
        onFilter: (value, record) => {
          var dataz = data.filter((ele) => ele.id === record.lead_id)[0];
          if (value === '1') {
            if (
              dataz.actions.filter((ele) => ele.isOpen && ele.isArrival)
                .length === 0
            ) {
              return true;
            }
          }
          if (value === '2') {
            if (dataz.actions.length > 0) {
              if (
                dataz.actions.filter(
                  (ele) =>
                    ele.isOpen &&
                    ele.isArrival &&
                    new Date(ele.i_date) < new Date()
                ).length > 0
              ) {
                return true;
              }
            }
          }
          if (value === '3') {
            if (dataz.actions.length > 0) {
              if (
                dataz.actions.filter(
                  (ele) =>
                    ele.isOpen &&
                    ele.isArrival &&
                    new Date(ele.i_date) >= new Date()
                ).length > 0
              ) {
                return true;
              }
            }
          }
          if (value === '4') {
            if (dataz.actions.length > 0) {
              if (
                dataz.actions.filter(
                  (ele) =>
                    ele.isOpen &&
                    ele.isArrival &&
                    moment(ele.i_date).format('DD-MM-YYYY') ===
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
            if (dataz.actions.length > 0) {
              if (
                dataz.actions.filter(
                  (ele) =>
                    ele.isOpen &&
                    ele.isArrival &&
                    moment(ele.i_date).format('DD-MM-YYYY') ===
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
        title: 'Completed',
        dataIndex: 'isComplete',
        key: 'isComplete',
        filters: [
          {
            value: '1',
            text: 'Active',
          },
          {
            value: '0',
            text: 'Inactive',
          },
        ],
        onFilter: (value, record) => {
          if (value === '1') {
            if (!record.isCompleted) {
              return true;
            }
          }
          if (value === '0') {
            if (record.isCompleted) {
              return true;
            }
          }
        },
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
      },
    ]);
  }, [user, source, data]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     listLead();
  //     listSource();
  //     listUser();
  //   }
  // }, [listLead, isAuthenticated, listSource, listUser]);

  const [searchData, setsearchData] = useState([]);
  const [search, setsearch] = useState('');
  const [modalVisibleAddInteraction, setmodalVisibleAddInteraction] =
    useState(false);
  const [modalVisibleEditInteraction, setmodalVisibleEditInteraction] =
    useState(false);

  const [modalVisibleAddAction, setmodalVisibleAddAction] = useState(false);
  const [modalVisibleEditAction, setmodalVisibleEditAction] = useState(false);
  const [modalVisibleDetails, setmodalVisibleDetails] = useState(false);

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage]);
  const [fromDate, setfromDate] = useState(null);

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
            (item.mobile_number !== null
              ? item.mobile_number.toLowerCase().indexOf(search.toLowerCase()) >
                -1
              : false)
        );
      }
      var dataset = [];
      result.forEach((element, index) => {
        dataset.push({
          key: index + 1,
          source_id: element.source_id,
          lead_id: element.id,
          assigned_id: element.assigned_id,
          srno: index + 1,
          type: element.property_type,
          isCompleted: element.isCompleted,
          company: element.company,
          emailid: element.emailid,
          phone: element.mobile_number,
          interaction_bool: element.interactions.length > 0,
          action_bool: element.actions.length > 0,
          client: element.first_name + ' ' + element.last_name,
          source: element.source !== null ? element.source.source : '',
          created_at: element.createdAt.substr(0, 8),
          poc:
            element.user !== null
              ? element.user.first_name + ' ' + element.user.last_name
              : '',
          last_talk: (
            <Link
              to='#!'
              className='text-uppercase'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                store.dispatch({
                  type: SET_SIGNLE_LEAD,
                  payload: element,
                });
                setmodalVisibleInteraction(true);
              }}
            >
              {element.interactions.length > 0
                ? moment(
                    element.interactions
                      .sort((a, b) => parseFloat(b.id) - parseFloat(a.id))[0]
                      .i_date.substr(0, 10)
                  ).format('MMM-DD')
                : 'Add'}
            </Link>
          ),
          next: (
            <Link
              to='#!'
              className='text-uppercase'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                store.dispatch({
                  type: SET_SIGNLE_LEAD,
                  payload: element,
                });
                setmodalVisibleAction(true);
              }}
            >
              {element.actions.length > 0
                ? moment(
                    element.actions
                      .sort((a, b) => parseFloat(b.id) - parseFloat(a.id))[0]
                      .i_date.substr(0, 10)
                  ).format('MMM-DD')
                : 'Add'}
            </Link>
          ),
          arrival: (
            <Link
              to='#!'
              className='text-uppercase'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                store.dispatch({
                  type: SET_SIGNLE_LEAD,
                  payload: element,
                });
                setmodalVisibleAction(true);
              }}
            >
              {element.actions.filter((ele) => ele.isArrival).length > 0
                ? moment(
                    element.actions
                      .sort((a, b) => parseFloat(b.id) - parseFloat(a.id))[0]
                      .i_date.substr(0, 10)
                  ).format('MMM-DD')
                : 'Add'}
            </Link>
          ),
          arrivalDate:
            element.actions.filter((ele) => ele.isArrival).length > 0
              ? moment(
                  element.actions
                    .sort((a, b) => parseFloat(b.id) - parseFloat(a.id))[0]
                    .i_date.substr(0, 10)
                ).format('YYYY-MM-DD')
              : null,
          isComplete: (
            <span onClick={(e) => e.stopPropagation()}>
              <Popconfirm
                title='Are you sure?'
                onConfirm={(e) => {
                  markLead({
                    id: element.id,
                    isCompleted: !element.isCompleted,
                  });
                }}
                okText='Yes'
                cancelText='No'
              >
                <Switch checked={element.isCompleted} />
              </Popconfirm>
            </span>
          ),
          actions: (
            <div onClick={(e) => e.stopPropagation()}>
              {sessionStorage.getItem('user_type').toLowerCase() === 'user' ? (
                element.user !== null &&
                element.user.id === parseInt(sessionStorage.getItem('id')) && (
                  <Tooltip title='Edit'>
                    <Link to='#!'>
                      <EditOutlined
                        className='text-primary'
                        style={{ fontSize: '16px' }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setModalVisibleedit(true);
                          store.dispatch({
                            type: SET_SIGNLE_LEAD,
                            payload: element,
                          });
                        }}
                      />
                    </Link>
                  </Tooltip>
                )
              ) : (
                <Tooltip title='Edit'>
                  <Link to='#!'>
                    <EditOutlined
                      className='text-primary'
                      style={{ fontSize: '16px' }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setModalVisibleedit(true);
                        store.dispatch({
                          type: SET_SIGNLE_LEAD,
                          payload: element,
                        });
                      }}
                    />
                  </Link>
                </Tooltip>
              )}
              <Tooltip title='Send WhatsApp Message'>
                <a
                  href={'https://wa.me/' + element.mobile_number}
                  target='_blank'
                  rel='noreferrer'
                  onClick={(e) => e.stopPropagation()}
                >
                  <WhatsAppOutlined
                    className='text-success ml-4 '
                    style={{ fontSize: '16px' }}
                  />
                </a>
              </Tooltip>
              {sessionStorage.getItem('user_type').toLowerCase() === 'user' ? (
                element.user !== null &&
                element.user.id === parseInt(sessionStorage.getItem('id')) && (
                  <Popconfirm
                    title='Are you sure?'
                    onConfirm={(e) => {
                      deleteLead({ id: element.id });
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
                )
              ) : (
                <Popconfirm
                  title='Are you sure?'
                  onConfirm={(e) => {
                    deleteLead({ id: element.id });
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
              )}
            </div>
          ),
        });
      });
      if (fromDate !== null) {
        dataset = dataset.filter(
          (ele) =>
            moment(ele.created_at).format('DD-MM-YYYY') >=
              moment(fromDate[0]).format('DD-MM-YYYY') &&
            moment(ele.created_at).format('DD-MM-YYYY') <=
              moment(fromDate[1]).format('DD-MM-YYYY')
        );
      }
      if (arrivalChange !== null) {
        dataset = dataset.filter(
          (ele) => ele.arrivalDate === arrivalChange.format('YYYY-MM-DD')
        );
      }
      setsearchData(dataset);
    }
  }, [data, search, deleteLead, markLead, fromDate, arrivalChange]);

  return (
    <div>
      <Card>
        <Row>
          <Col sm={12} md={8} lg={5} className='text-left mb-3'>
            <Input
              placeholder='Search'
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </Col>
          <Col sm={12} md={8} lg={6} className='text-left mb-3 pl-2'>
            <RangePicker
              format='DD-MM-YYYY'
              onChange={(e, date) => {
                setfromDate(e);
                // onChange(e, date);
              }}
            />
          </Col>
          <Col sm={12} md={8} lg={10} className='text-right mb-3 pl-2'>
            <DatePicker
              style={{ width: '200px' }}
              onChange={(e, date) => {
                setarrivalChange(e);
              }}
              format={'DD-MM-YYYY'}
            />
          </Col>
          <Col sm={12} md={8} lg={3} className='text-right mb-3'>
            <Button
              type='primary '
              icon={<PlusCircleOutlined />}
              onClick={(e) => setModalVisible(true)}
            >
              Add Lead
            </Button>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    store.dispatch({
                      type: SET_SIGNLE_LEAD,
                      payload: data.filter(
                        (ele) => ele.id === record.lead_id
                      )[0],
                    });
                    setmodalVisibleDetails(true);
                  }, // click row
                };
              }}
              className='border'
              scroll={{ x: 1800 }}
              columns={columns}
              dataSource={searchData}
              loading={loading}
              rowClassName={(record, index) =>
                record.isCompleted
                  ? 'text-success'
                  : record.interaction_bool
                  ? ''
                  : 'text-danger'
              }
            />
          </Col>
        </Row>
      </Card>
      <AddUser
        visible={modalVisible}
        cancel={setModalVisible}
        setModalVisibleeditPass={setModalVisibleeditPass}
      />
      <EditUser
        visible={modalVisibleedit}
        cancel={setModalVisibleedit}
        setModalVisibleeditPass={setModalVisibleeditPass}
      />
      <EditUserPass
        visible={modalVisibleeditPass}
        cancel={setModalVisibleeditPass}
      />
      <ListInteraction
        visible={modalVisibleInteraction}
        cancel={setmodalVisibleInteraction}
        setmodalVisibleAddInteraction={setmodalVisibleAddInteraction}
        setmodalVisibleEditInteraction={setmodalVisibleEditInteraction}
      />
      <AddInteraction
        visible={modalVisibleAddInteraction}
        cancel={setmodalVisibleAddInteraction}
      />
      <EditInteraction
        visible={modalVisibleEditInteraction}
        cancel={setmodalVisibleEditInteraction}
      />
      <ListAction
        visible={modalVisibleAction}
        cancel={setmodalVisibleAction}
        setmodalVisibleAddAction={setmodalVisibleAddAction}
        setmodalVisibleEditAction={setmodalVisibleEditAction}
      />
      <AddAction
        visible={modalVisibleAddAction}
        cancel={setmodalVisibleAddAction}
      />
      <EditAction
        visible={modalVisibleEditAction}
        cancel={setmodalVisibleEditAction}
      />
      <ViewDetails
        visible={modalVisibleDetails}
        cancel={setmodalVisibleDetails}
        setmodalVisibleAddAction={setmodalVisibleAction}
        setmodalVisibleEditAction={setmodalVisibleEditAction}
        setmodalVisibleAddInteraction={setmodalVisibleInteraction}
        setmodalVisibleEditInteraction={setmodalVisibleEditInteraction}
      />
    </div>
  );
};
Index.propTypes = {
  listLead: PropTypes.func,
  deleteLead: PropTypes.func,
  data: PropTypes.any,
  loading: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isAuthenticated: PropTypes.any,
  listSource: PropTypes.any,
  listUser: PropTypes.any,
  markLead: PropTypes.func,
  user: PropTypes.any,
  source: PropTypes.any,
};
const mapStateToProps = (state) => ({
  data: state.lead.data,
  loading: state.lead.loading,
  isError: state.lead.isError,
  errMessage: state.lead.errMessage,
  isErrorType: state.lead.isErrorType,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.data,
  source: state.lead.source,
});
export default connect(mapStateToProps, {
  listLead,
  listSource,
  listUser,
  markLead,
  deleteLead,
})(Index);
