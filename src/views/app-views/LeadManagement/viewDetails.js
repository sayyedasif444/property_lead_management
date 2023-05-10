import React from 'react';
import { Col, Modal, Row, Statistic, Tooltip } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  WhatsAppOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useEffect } from 'react';
import { listAction, listInteraction } from '../../../apis/dashboard/Lead';
import { Link } from 'react-router-dom';
import store from '../../../redux/store';
import {
  SET_SIGNLE_ACTION,
  SET_SIGNLE_INTERACTION,
} from '../../../actions/types';
import moment from 'moment';

const ViewDetails = ({
  visible,
  cancel,
  addInteraction,
  singleData,
  setmodalVisibleAddAction,
  setmodalVisibleEditAction,
  setmodalVisibleAddInteraction,
  setmodalVisibleEditInteraction,
  listInteraction,
  listAction,
  action,
  interaction,
}) => {
  useEffect(() => {
    if (Object.keys(singleData).length > 0) {
      listInteraction({ lead_id: singleData.id });
      listAction({ lead_id: singleData.id });
    }
  }, [singleData, listInteraction, listAction]);
  return (
    <Modal
      title='Details'
      visible={visible}
      centered
      footer={null}
      width={700}
      destroyOnClose={true}
      onCancel={(e) => cancel(false)}
      bodyStyle={{ padding: '20px 20px 30px 20px' }}
    >
      <Row gutter={16} className='m-0'>
        <Col span={8} className='border p-2'>
          <Statistic
            title='Name'
            value={singleData.first_name + ' ' + singleData.last_name}
          />
        </Col>
        <Col span={8} className='border p-2'>
          <Statistic
            title='Email'
            value={Object.keys(singleData).length > 0 ? singleData.emailid : ''}
          />
        </Col>
        <Col span={8} className='border p-2'>
          <Statistic
            title='Phone'
            value={
              Object.keys(singleData).length > 0 ? singleData.mobile_number : ''
            }
          />
          <Tooltip title='Send WhatsApp Message'>
            {Object.keys(singleData).length > 0 ? (
              <a
                href={'https://wa.me/' + singleData.mobile_number}
                target='_blank'
                rel='noreferrer'
                style={{ position: 'absolute', top: '20px', right: '20px' }}
              >
                <WhatsAppOutlined
                  className='text-success ml-4 '
                  style={{ fontSize: '16px' }}
                />
              </a>
            ) : (
              ''
            )}
          </Tooltip>
        </Col>
        <Col span={8} className='border p-2'>
          <Statistic
            title='Property Type'
            value={
              Object.keys(singleData).length > 0 ? singleData.property_type : ''
            }
          />
        </Col>
        <Col span={8} className='border p-2'>
          <Statistic
            title='Source'
            value={
              Object.keys(singleData).length > 0
                ? singleData.source !== null
                  ? singleData.source.source
                  : ''
                : ''
            }
          />
        </Col>
        <Col span={8} className='border p-2'>
          <Statistic
            title='Assigned To'
            value={
              Object.keys(singleData).length > 0
                ? singleData.assigned_id !== null
                  ? singleData.user.first_name + ' ' + singleData.user.last_name
                  : ''
                : ''
            }
          />
        </Col>
        <Col span={12} className='border p-2'>
          <Statistic
            title='Requirements'
            value={
              Object.keys(singleData).length > 0 ? singleData.requirement : ''
            }
          />
        </Col>
        <Col span={12} className='border p-2'>
          <Statistic
            title='Notes'
            value={Object.keys(singleData).length > 0 ? singleData.notes : ''}
          />
        </Col>
        {action.length > 0 && (
          <Col span={24} className='border p-2 mt-1'>
            <h5 className='border-bottom pb-2 pl-1'>Next Action</h5>
            <div>
              <h5 className='mb-0'>
                {action.length > 0 && action[0].user !== null
                  ? action[0].user.first_name + ' ' + action[0].user.last_name
                  : ''}
                <span className='ml-2 text-muted'>
                  <small className='mr-1'>
                    {action.length > 0 && action[0].i_date !== null
                      ? action.length > 0 && action[0].i_date.substr(0, 10)
                      : ''}{' '}
                  </small>
                  <small>
                    {action.length > 0 && action[0].i_time !== null
                      ? moment(action.length > 0 && action[0].i_time).format(
                          'HH:mm'
                        )
                      : ''}
                  </small>
                </span>
              </h5>
              <p className='mb-0'>
                {action.length > 0 && action[0].description !== null
                  ? action.length > 0 && action[0].description
                  : ''}
              </p>
              <Tooltip title={'View or Add new'}>
                <Link
                  to='#!'
                  style={{ position: 'absolute', top: '10px', right: '40px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    setmodalVisibleAddAction(true);
                  }}
                >
                  <PlusCircleOutlined
                    className='text-primary '
                    style={{ fontSize: '16px' }}
                  />
                </Link>
              </Tooltip>
              <Link
                to='#!'
                style={{ position: 'absolute', top: '10px', right: '10px' }}
                onClick={(e) => {
                  e.preventDefault();
                  store.dispatch({
                    type: SET_SIGNLE_ACTION,
                    payload: action[0],
                  });
                  setmodalVisibleEditAction(true);
                }}
              >
                <EditOutlined
                  className='text-success '
                  style={{ fontSize: '16px' }}
                />
              </Link>
            </div>
          </Col>
        )}
        {interaction.length > 0 && (
          <Col span={24} className='border p-2 mt-1'>
            <h5 className='border-bottom pb-2 pl-1'>Last talk</h5>
            <div>
              <h5 className='mb-0'>
                {interaction[0].user !== null
                  ? interaction[0].user.first_name +
                    ' ' +
                    interaction[0].user.last_name
                  : ''}
                <span className='ml-2 text-muted'>
                  <small className='mr-1'>
                    {interaction[0].i_date !== null
                      ? interaction[0].i_date.substr(0, 10)
                      : ''}{' '}
                  </small>
                  <small>
                    {interaction[0].i_time !== null
                      ? moment(interaction[0].i_time).format('HH:mm')
                      : ''}
                  </small>
                </span>
              </h5>
              <p className='mb-0'>
                {interaction[0].description !== null
                  ? interaction[0].description
                  : ''}
              </p>
              <Tooltip title={'View or Add new'}>
                <Link
                  to='#!'
                  style={{ position: 'absolute', top: '10px', right: '40px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    setmodalVisibleAddInteraction(true);
                  }}
                >
                  <PlusCircleOutlined
                    className='text-primary '
                    style={{ fontSize: '16px' }}
                  />
                </Link>
              </Tooltip>
              <Link
                to='#!'
                style={{ position: 'absolute', top: '10px', right: '10px' }}
                onClick={(e) => {
                  e.preventDefault();
                  store.dispatch({
                    type: SET_SIGNLE_INTERACTION,
                    payload: interaction[0],
                  });
                  setmodalVisibleEditInteraction(true);
                }}
              >
                <EditOutlined
                  className='text-success '
                  style={{ fontSize: '16px' }}
                />
              </Link>
            </div>
          </Col>
        )}
      </Row>
    </Modal>
  );
};

ViewDetails.propTypes = {
  listInteraction: PropTypes.any,
  listAction: PropTypes.any,
  singleData: PropTypes.any,
  interaction: PropTypes.any,
  action: PropTypes.any,
};
const mapStateToProps = (state) => ({
  action: state.lead.action,
  interaction: state.lead.interaction,
  singleData: state.lead.singleData,
});
export default connect(mapStateToProps, { listInteraction, listAction })(
  ViewDetails
);
