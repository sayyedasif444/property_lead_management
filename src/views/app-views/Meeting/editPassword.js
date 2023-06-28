import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const EditTask = ({ visible, cancel, singleData }) => {
  const [tasklist, settasklist] = useState([{ text: '', status: false }]);

  useEffect(() => {
    if (Object.keys(singleData).length > 0 && visible) {
      settasklist(JSON.parse(singleData.tasklist));
    }
  }, [singleData, visible]);

  return (
    <Modal
      title='View Task'
      visible={visible}
      centered
      footer={null}
      width={700}
      bodyStyle={{ padding: '10px' }}
      destroyOnClose={true}
      onCancel={(e) => cancel(false)}
    >
      {tasklist.length > 0 && (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {tasklist.map((ele, index) => (
            <li className='p-2 border' key={index}>
              {ele.status ? (
                <CheckCircleOutlined
                  className='text-success mr-2'
                  title='Completed'
                />
              ) : (
                <ExclamationCircleOutlined
                  className='text-warning mr-2'
                  title='Not Completed'
                />
              )}
              {ele.text}
              {ele.hasOwnProperty('reason') && ele.reason !== '' && (
                <p className='border-top mb-0 mt-2 pt-1'>
                  <strong>Reason:</strong>{' '}
                  {ele.hasOwnProperty('reason')
                    ? ele.reason === ''
                      ? '-'
                      : ele.reason
                    : ''}{' '}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

EditTask.propTypes = {
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  user: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.task.isError,
  errMessage: state.task.errMessage,
  isErrorType: state.task.isErrorType,
  user: state.user.data,
  singleData: state.task.singleData,
});
export default connect(mapStateToProps, {})(EditTask);
