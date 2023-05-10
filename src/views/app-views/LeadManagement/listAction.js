import React, { useEffect } from 'react';
import { Row, Col, Modal, Card, Button, Popconfirm, Tooltip } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteAction,
  listAction,
  markAction,
} from '../../../apis/dashboard/Lead';
import { Link } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CheckSquareFilled,
} from '@ant-design/icons';
import { SET_SIGNLE_ACTION } from '../../../actions/types';
import moment from 'moment';
import store from '../../../redux/store';

const ListAction = ({
  visible,
  cancel,
  singleData,
  listAction,
  action,
  setmodalVisibleAddAction,
  setmodalVisibleEditAction,
  deleteAction,
  user,
  markAction,
}) => {
  useEffect(() => {
    if (Object.keys(singleData).length > 0) {
      listAction({ lead_id: singleData.id });
    }
  }, [singleData, listAction]);

  return (
    <Modal
      title='Actions'
      visible={visible}
      centered
      footer={null}
      width={700}
      destroyOnClose={true}
      onCancel={(e) => cancel(false)}
    >
      <Row>
        <Col sm={24} style={{ maxHeight: '70vh', overflow: 'auto' }}>
          {action.map((ele, index) => (
            <Card className='p-0' bodyStyle={{ padding: '14px' }} key={index}>
              <div>
                <h5 className='mb-0'>
                  {ele.user !== null
                    ? ele.user.first_name + ' ' + ele.user.last_name
                    : ''}
                  <span className='ml-2 text-muted'>
                    <small className='mr-1'>
                      {ele.i_date !== null ? ele.i_date.substr(0, 10) : ''}{' '}
                    </small>
                    <small>
                      {ele.i_time !== null
                        ? moment(ele.i_time).format('HH:mm')
                        : ''}
                    </small>
                  </span>
                </h5>
                <p className='mb-0'>
                  {ele.description !== null ? ele.description : ''}
                </p>
                <p className='mb-0'>
                  <strong>Assigned to:</strong>{' '}
                  {ele.assigned_id !== null
                    ? user.filter((elez) => elez.id === ele.assigned_id)[0]
                        .first_name +
                      ' ' +
                      user.filter((elez) => elez.id === ele.assigned_id)[0]
                        .last_name
                    : ''}
                </p>
                <Link
                  to='#!'
                  style={{ position: 'absolute', top: '10px', right: '10px' }}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Popconfirm
                    title='Are you sure?'
                    onConfirm={(e) => {
                      deleteAction({ id: ele.id, lead_id: singleData.id });
                    }}
                    okText='Yes'
                    cancelText='No'
                  >
                    <DeleteOutlined
                      className='text-danger ml-4 '
                      style={{ fontSize: '16px' }}
                    />
                  </Popconfirm>
                </Link>
                <Link
                  to='#!'
                  style={{ position: 'absolute', top: '10px', right: '40px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    store.dispatch({
                      type: SET_SIGNLE_ACTION,
                      payload: ele,
                    });
                    if (ele.isOpen) setmodalVisibleEditAction(true);
                  }}
                >
                  <EditOutlined
                    className='text-success '
                    style={{ fontSize: '16px' }}
                  />
                </Link>
                <Tooltip
                  title={ele.isOpen ? 'Mark as complete' : 'Completed'}
                  placement='bottom'
                >
                  <Link
                    to='#!'
                    style={{ position: 'absolute', top: '10px', right: '70px' }}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {ele.isOpen ? (
                      <Popconfirm
                        title='Are you sure?'
                        onConfirm={(e) => {
                          markAction({
                            isOpen: !ele.isOpen,
                            lead_id: ele.lead_id,
                            id: ele.id,
                          });
                        }}
                        okText='Yes'
                        cancelText='No'
                      >
                        <CheckOutlined
                          className='text-success '
                          style={{ fontSize: '16px' }}
                        />
                      </Popconfirm>
                    ) : (
                      <CheckSquareFilled
                        className='text-success '
                        style={{ fontSize: '16px' }}
                      />
                    )}
                  </Link>
                </Tooltip>
              </div>
            </Card>
          ))}
        </Col>
        <Col sm={24} className='text-right mt-3'>
          <Button
            type='primary'
            className=''
            htmlType='submit'
            onClick={(e) => setmodalVisibleAddAction(true)}
          >
            Add New
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

listAction.propTypes = {
  singleData: PropTypes.any,
  listAction: PropTypes.any,
  action: PropTypes.any,
  deleteAction: PropTypes.any,
  user: PropTypes.any,
  markAction: PropTypes.func,
};
const mapStateToProps = (state) => ({
  singleData: state.lead.singleData,
  action: state.lead.action,
  user: state.user.data,
});
export default connect(mapStateToProps, {
  listAction,
  deleteAction,
  markAction,
})(ListAction);
