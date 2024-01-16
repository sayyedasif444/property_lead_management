import React, { useEffect } from 'react';
import { List, Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSalaryAddon } from '../../../apis/dashboard/Salary';
import { Link } from 'react-router-dom';

const ViewAdvance = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  currentData,
  setcurrentData,
  addSalaryAddon,
}) => {
  useEffect(() => {
    if (isError && isErrorType === 'SUCCESS') {
      setTimeout(() => {
        cancel(false);
      }, 1000);
    }
  }, [isError, isErrorType, errMessage, cancel]);

  return (
    <Modal
      title='Advance'
      visible={visible}
      centered
      footer={null}
      width={500}
      destroyOnClose={true}
      onCancel={(e) => cancel(false)}
      bodyStyle={{ padding: '0px' }}
    >
      <List
        itemLayout='horizontal'
        className='pb-2'
        dataSource={
          currentData.hasOwnProperty('advance')
            ? currentData.advance.length > 0
              ? JSON.parse(currentData.advance[0].amount).map((ele) => {
                  return { title: ele.amount, date: ele.data };
                })
              : []
            : []
        }
        renderItem={(item, index) => (
          <List.Item
            className='border-bottom '
            actions={[
              <Link
                to='#!'
                className='text-danger'
                onClick={(e) => {
                  e.preventDefault();
                  addSalaryAddon({
                    amount: JSON.stringify(
                      JSON.parse(currentData.advance[0].amount).filter(
                        (ele, ind) => ind !== index
                      )
                    ),
                    effective_date: currentData.advance[0].effective_date,
                    type: 'Advance',
                    user_id: currentData.id,
                    count: 1,
                  });
                }}
              >
                Delete
              </Link>,
            ]}
          >
            <List.Item.Meta
              title={
                <div>
                  <p className='mb-0 pb-0'>{item.title}</p>
                  <p className='mb-0 pb-0' style={{ lineHeight: '10px' }}>
                    <small style={{ fontWeight: 'normal' }}>{item.date}</small>
                  </p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

ViewAdvance.propTypes = {
  addSalaryAddon: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
};
const mapStateToProps = (state) => ({
  isError: state.salary.isError,
  errMessage: state.salary.errMessage,
  isErrorType: state.salary.isErrorType,
});
export default connect(mapStateToProps, { addSalaryAddon })(ViewAdvance);
