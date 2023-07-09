import {
  Button,
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
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import AddProject from './addProject';
import EditProject from './editProject';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import store from '../../../redux/store';
import { SET_SIGNLE_PROJECT } from '../../../actions/types';
import AddCategory from './addCategory';
import { deleteProject, listProjects } from '../../../apis/dashboard/Project';

const Index = ({
  data,
  loading,
  errMessage,
  isError,
  isErrorType,
  isAuthenticated,
  deleteProject,
  listProjects,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleedit, setModalVisibleedit] = useState(false);
  const [categoryModel, setcategoryModel] = useState(false);

  const columns = [
    {
      title: 'Sr no',
      dataIndex: 'srno',
      innerWidth: '24px',
      key: 'srno',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Broker',
      dataIndex: 'broker',
      key: 'broker',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Plot Location',
      dataIndex: 'plot_location',
      key: 'plot_location',
    },
    {
      title: 'Total Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'x',
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      listProjects();
    }
  }, [listProjects, isAuthenticated]);

  const [searchData, setsearchData] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS_EXPENSE') {
      message.success(errMessage);
    } else if (isError && isErrorType === 'FAIL') {
      message.error(errMessage);
    }
  }, [isError, isErrorType, errMessage]);

  const history = useHistory();

  useEffect(() => {
    if (data !== null) {
      var result = data;
      if (search !== '' && search !== null) {
        result = data.filter(
          (item) =>
            (item.total_amount !== null
              ? item.total_amount.indexOf(search) > -1
              : false) ||
            (item.land_owner !== null
              ? item.land_owner.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.broker !== null
              ? item.broker.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.address !== null
              ? item.address.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false) ||
            (item.plot_location !== null
              ? item.plot_location.toLowerCase().indexOf(search.toLowerCase()) >
                -1
              : false) ||
            (item.mobile_no !== null
              ? item.mobile_no.toLowerCase().indexOf(search.toLowerCase()) > -1
              : false)
        );
      }
      var dataset = [];
      result.forEach((element, index) => {
        dataset.push({
          key: index + 1,
          srno: index + 1,
          id: element.id,
          owner: element.land_owner,
          broker: element.broker,
          phone_number: element.mobile_no,
          address: element.address,
          plot_location: element.plot_location,
          amount: element.total_amount,
          action: (
            <div onClick={(e) => e.stopPropagation()}>
              <Tooltip title='Edit'>
                <Link to='#!'>
                  <EditOutlined
                    className='text-success'
                    style={{ fontSize: '16px' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setModalVisibleedit(true);
                      store.dispatch({
                        type: SET_SIGNLE_PROJECT,
                        payload: element,
                      });
                    }}
                  />
                </Link>
              </Tooltip>
              <Popconfirm
                title='Are you sure?'
                onConfirm={(e) => {
                  e.stopPropagation();
                  deleteProject({ id: element.id });
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
  }, [data, search, deleteProject]);

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
          <Col sm={6} md={10} lg={12} className='text-right mb-3 ml-auto'>
            <Button
              type='primary '
              icon={<PlusCircleOutlined />}
              onClick={(e) => setModalVisible(true)}
            >
              Add Project
            </Button>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    store.dispatch({
                      type: SET_SIGNLE_PROJECT,
                      payload: data.filter((ele) => ele.id === record.id)[0],
                    });
                    history.push('/app/view-project-details');
                    // setmodalVisibleDetails(true);
                  }, // click row
                };
              }}
              className='border'
              columns={columns}
              dataSource={searchData}
              scroll={{ x: 1120 }}
              loading={loading}
            />
          </Col>
        </Row>
      </Card>
      {modalVisible && (
        <AddProject
          visible={modalVisible}
          cancel={setModalVisible}
          categoryModel={categoryModel}
          setcategoryModel={setcategoryModel}
        />
      )}
      {modalVisibleedit && (
        <EditProject
          visible={modalVisibleedit}
          cancel={setModalVisibleedit}
          categoryModel={categoryModel}
          setcategoryModel={setcategoryModel}
        />
      )}
      <AddCategory visible={categoryModel} cancel={setcategoryModel} />
    </div>
  );
};
Index.propTypes = {
  deleteProject: PropTypes.func,
  data: PropTypes.any,
  loading: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  isAuthenticated: PropTypes.any,
  listProjects: PropTypes.func,
};
const mapStateToProps = (state) => ({
  data: state.project.data,
  loading: state.project.loading,
  isError: state.project.isError,
  errMessage: state.project.errMessage,
  isErrorType: state.project.isErrorType,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  deleteProject,
  listProjects,
})(Index);
