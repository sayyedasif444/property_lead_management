import React, { useEffect } from 'react';
import { Row, Col, Modal, Card, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteInteraction,
  listInteraction,
} from '../../../apis/dashboard/Lead';
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { SET_SIGNLE_INTERACTION } from '../../../actions/types';
import moment from 'moment';
import store from '../../../redux/store';

const ListInteraction = ({
  visible,
  cancel,
  singleData,
  listInteraction,
  interaciton,
  setmodalVisibleAddInteraction,
  setmodalVisibleEditInteraction,
  deleteInteraction,
}) => {
  useEffect(() => {
    if (Object.keys(singleData).length > 0) {
      listInteraction({ lead_id: singleData.id });
    }
  }, [singleData, listInteraction]);

  return (
    <Modal
      title='Interactions'
      visible={visible}
      centered
      footer={null}
      width={700}
      destroyOnClose={true}
      onCancel={(e) => cancel(false)}
    >
      <Row>
        <Col sm={24} style={{ maxHeight: '70vh', overflow: 'auto' }}>
          {interaciton.map((ele, index) => (
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
                <Link
                  to='#!'
                  style={{ position: 'absolute', top: '10px', right: '10px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    store.dispatch({
                      type: SET_SIGNLE_INTERACTION,
                      payload: ele,
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
            </Card>
          ))}
        </Col>
        <Col sm={24} className='text-right mt-3'>
          <Button
            type='primary'
            className=''
            htmlType='submit'
            onClick={(e) => setmodalVisibleAddInteraction(true)}
          >
            Add New
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

ListInteraction.propTypes = {
  singleData: PropTypes.any,
  listInteraction: PropTypes.any,
  interaciton: PropTypes.any,
  deleteInteraction: PropTypes.any,
};
const mapStateToProps = (state) => ({
  singleData: state.lead.singleData,
  interaciton: state.lead.interaction,
});
export default connect(mapStateToProps, { listInteraction, deleteInteraction })(
  ListInteraction
);
