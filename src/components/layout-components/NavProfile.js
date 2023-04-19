import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { connect } from 'react-redux';
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import Icon from '../../components/util-components/Icon';
import { logout } from '../../apis/login/auth';
import { Link } from 'react-router-dom';

const menuItem = [
  {
    title: 'Edit Profile',
    icon: EditOutlined,
    path: '/app/user-profile',
  },

  // {
  //   title: 'Account Setting',
  //   icon: SettingOutlined,
  //   path: '/',
  // },
  // {
  //   title: 'Help Center',
  //   icon: QuestionCircleOutlined,
  //   path: '/',
  // },
];

export const NavProfile = ({ logout, first_name, last_name, role }) => {
  const profileImg = '/img/avatars/thumb-1.png';
  const profileMenu = (
    <div className='nav-profile nav-dropdown'>
      <div className='nav-profile-header'>
        <div className='d-flex'>
          <Avatar size={45} src={profileImg} />
          <div className='pl-3'>
            <h4 className='mb-0'>
              {first_name} {last_name}
            </h4>
            <span className='text-muted'>{role}</span>
          </div>
        </div>
      </div>
      <div className='nav-profile-body'>
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <Link to={el.path}>
                  <Icon type={el.icon} />
                  <span className='font-weight-normal'>{el.title}</span>
                </Link>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={(e) => logout()}>
            <span>
              <LogoutOutlined />
              <span className='font-weight-normal'>Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement='bottomRight' overlay={profileMenu} trigger={['click']}>
      <Menu className='d-flex align-item-center' mode='horizontal'>
        <Menu.Item key='profile'>
          <Avatar src={profileImg} style={{ marginTop: '-10px' }} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

NavProfile.propTypes = {};
const mapStateToProps = (state) => ({
  first_name: state.auth.first_name,
  last_name: state.auth.last_name,
  role: state.auth.user_type,
});

export default connect(mapStateToProps, { logout })(NavProfile);
