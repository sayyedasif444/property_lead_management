import React from 'react';
import { Modal, Table, Popconfirm, Tooltip, message } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { listExpenseCategory } from '../../../apis/dashboard/expense';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BACKEND_URL } from '../../../actions/types';

const AddUser = ({
  visible,
  cancel,
  errMessage,
  isError,
  isErrorType,
  category,
  setData,
  seteditcatModalVisible,
  listExpenseCategory,
}) => {
  const onDelete = async (id) => {
    const config = {
      'Content-Type': 'application/json',
    };
    const body = { id: id };
    await axios({
      method: 'POST',
      url: BACKEND_URL + 'account/delete-expense-category',
      data: body,
      headers: config,
    })
      .then((response) => {
        if (response.data.statuscode === 200) {
          message.success(response.data.message);
          listExpenseCategory();
          setTimeout(() => {
            cancel(false);
          }, 800);
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        message.error('Server Error');
      });
  };

  return (
    <Modal
      title='Expense Category'
      visible={visible}
      centered
      footer={null}
      width={600}
      destroyOnClose={true}
      onCancel={(e) => cancel(false)}
    >
      <Table
        className='border'
        columns={[
          {
            title: 'Sr no',
            dataIndex: 'srno',
            innerWidth: '24px',
            key: 'srno',
          },
          {
            title: 'Particuler',
            dataIndex: 'particular',
            key: 'particular',
          },
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
          },
        ]}
        dataSource={category.map((ele, index) => {
          return {
            key: index,
            srno: index,
            particular: ele.category,
            action: (
              <>
                <Tooltip title='Edit'>
                  <Link to='#!'>
                    <EditOutlined
                      className='text-success'
                      style={{ fontSize: '16px' }}
                      onClick={(e) => {
                        e.preventDefault();
                        setData(ele);
                        seteditcatModalVisible(true);
                      }}
                    />
                  </Link>
                </Tooltip>
                <Popconfirm
                  title='Are you sure?'
                  onConfirm={(e) => {
                    // deleteExpense({ id: element.id });
                    onDelete(ele.id);
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
              </>
            ),
          };
        })}
      />
    </Modal>
  );
};

AddUser.propTypes = {
  listExpenseCategory: PropTypes.any,
  isError: PropTypes.bool,
  errMessage: PropTypes.string,
  isErrorType: PropTypes.string,
  category: PropTypes.any,
};
const mapStateToProps = (state) => ({
  isError: state.expense.isError,
  errMessage: state.expense.errMessage,
  isErrorType: state.expense.isErrorType,
  category: state.expense.category,
});
export default connect(mapStateToProps, { listExpenseCategory })(AddUser);
