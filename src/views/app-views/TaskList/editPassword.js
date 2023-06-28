import React, { useEffect } from 'react';
import { Button, Checkbox, Col, Input, Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { updateTaskList } from '../../../apis/dashboard/Task';
import { Link } from 'react-router-dom';

const EditTask = ({ visible, cancel, singleData, updateTaskList }) => {
  const [tasklist, settasklist] = useState([{ text: '', status: false }]);

  useEffect(() => {
    if (Object.keys(singleData).length > 0 && visible) {
      settasklist(
        JSON.parse(singleData.tasklist).map((ele) => {
          return {
            ...ele,
            show: false,
            reason: ele.hasOwnProperty('reason') ? ele.reason : '',
          };
        })
      );
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
            <li key={index} className='p-2 border mb-1'>
              <Checkbox
                checked={ele.status}
                className='mr-2'
                onChange={(e) => {
                  var data = [...tasklist];
                  data[index].status = !data[index].status;
                  settasklist(data);
                }}
              />
              {ele.text}
              <br />
              <div className='mt-2 pt-1 border-top'>
                {ele.reason !== '' ? (
                  ele.show ? (
                    <Input
                      placeholder='Add reason'
                      value={ele.reason}
                      onChange={(e) => {
                        var data = [...tasklist];
                        data[index].reason = e.target.value;
                        settasklist(data);
                      }}
                    />
                  ) : (
                    <p className='pb-0 pl-1 mb-0'>{ele.reason}</p>
                  )
                ) : (
                  ele.show && (
                    <Input
                      placeholder='Add reason'
                      value={ele.reason}
                      onChange={(e) => {
                        var data = [...tasklist];
                        data[index].reason = e.target.value;
                        settasklist(data);
                      }}
                    />
                  )
                )}
                {ele.hasOwnProperty('reason') ? (
                  <Link
                    to='#!'
                    className='pt-1 pl-1'
                    onClick={(e) => {
                      e.preventDefault();
                      var data = [...tasklist];
                      data.map((ele) => {
                        return { ...ele, show: false };
                      });
                      data[index].show = !data[index].show;
                      settasklist(data);
                    }}
                  >
                    {ele.show
                      ? 'Save'
                      : ele.reason === ''
                      ? 'Add reason'
                      : 'Edit reason'}
                  </Link>
                ) : (
                  <Link
                    to='#!'
                    className='pt-1 pl-1'
                    onClick={(e) => {
                      e.preventDefault();
                      var data = [...tasklist];
                      data.map((ele) => {
                        return { ...ele, show: false };
                      });
                      data[index].show = !data[index].show;
                      settasklist(data);
                    }}
                  >
                    {ele.show
                      ? 'Save'
                      : ele.reason === ''
                      ? 'Add reason'
                      : 'Edit reason'}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <Col span={24} className='text-right'>
        <Button
          type='primary'
          htmlType='button'
          onClick={(e) => {
            e.preventDefault();
            updateTaskList({
              id: singleData.id,
              tasklist: JSON.stringify(tasklist),
            });
          }}
        >
          Save
        </Button>
      </Col>
    </Modal>
  );
};

EditTask.propTypes = {
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  user: PropTypes.any,
  updateTaskList: PropTypes.func,
};
const mapStateToProps = (state) => ({
  isError: state.task.isError,
  errMessage: state.task.errMessage,
  isErrorType: state.task.isErrorType,
  user: state.user.data,
  singleData: state.task.singleData,
});
export default connect(mapStateToProps, { updateTaskList })(EditTask);
