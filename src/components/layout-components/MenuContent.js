import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Grid } from 'antd';
import IntlMessage from '../util-components/IntlMessage';
import Icon from '../util-components/Icon';
import { connect } from 'react-redux';
import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from '../../constants/ThemeConstant';
import utils from '../../utils';
import { onMobileNavToggle } from '../../redux/actions/Theme';
import {
  ProjectOutlined,
  FileAddOutlined,
  UserSwitchOutlined,
  ClockCircleOutlined,
  IssuesCloseOutlined,
  CalendarOutlined,
  AccountBookOutlined,
  ContainerOutlined,
  UsergroupAddOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from '../../configs/AppConfig';

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const superUserNavTree = [
  {
    key: 'general-settings',
    path: `${APP_PREFIX_PATH}/`,
    title: 'sidenav.general-settings',
    icon: ProjectOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'property-management',
        path: `${APP_PREFIX_PATH}/property-management`,
        title: 'sidenav.property-management',
        icon: ProjectOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'lead-management',
        path: `${APP_PREFIX_PATH}/lead-management`,
        title: 'sidenav.lead-management',
        icon: FileAddOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'task-management',
        path: `${APP_PREFIX_PATH}/task-management`,
        title: 'sidenav.task-management',
        icon: ClockCircleOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'my-task',
        path: `${APP_PREFIX_PATH}/my-task`,
        title: 'sidenav.my-task',
        icon: IssuesCloseOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'user-management',
        path: `${APP_PREFIX_PATH}/user-management`,
        title: 'sidenav.user-management',
        icon: UserSwitchOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'meeting-schedule',
        path: `${APP_PREFIX_PATH}/meeting-schedule`,
        title: 'sidenav.schedule-meeting',
        icon: CalendarOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'account-management',
        path: `${APP_PREFIX_PATH}/account-management`,
        title: 'sidenav.account-management',
        icon: AccountBookOutlined,
        breadcrumb: true,
        active: true,
        submenu: [
          {
            key: 'Project Management',
            path: `${APP_PREFIX_PATH}/project-management`,
            title: 'sidenav.project-management',
            icon: ProfileOutlined,
            breadcrumb: true,
            submenu: [],
          },
          {
            key: 'Customer Management',
            path: `${APP_PREFIX_PATH}/customer-management`,
            title: 'sidenav.customer-management',
            icon: UsergroupAddOutlined,
            breadcrumb: true,
            submenu: [],
          },
          {
            key: 'Expense Management',
            path: `${APP_PREFIX_PATH}/expense-management`,
            title: 'sidenav.expense-management',
            icon: ContainerOutlined,
            breadcrumb: true,
            submenu: [],
          },
          {
            key: 'Transaction',
            path: `${APP_PREFIX_PATH}/transaction`,
            title: 'sidenav.transaction',
            icon: ContainerOutlined,
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const userNavTree = [
  {
    key: 'general-settings',
    path: `${APP_PREFIX_PATH}/`,
    title: 'sidenav.general-settings',
    icon: ProjectOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'property-management',
        path: `${APP_PREFIX_PATH}/property-management`,
        title: 'sidenav.property-management',
        icon: ProjectOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'lead-management',
        path: `${APP_PREFIX_PATH}/lead-management`,
        title: 'sidenav.lead-management',
        icon: FileAddOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'my-task',
        path: `${APP_PREFIX_PATH}/my-task`,
        title: 'sidenav.my-task',
        icon: IssuesCloseOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: 'meeting-schedule',
        path: `${APP_PREFIX_PATH}/meeting-schedule`,
        title: 'sidenav.schedule-meeting',
        icon: CalendarOutlined,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
];

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key) => {
  let keyList = [];
  let keyString = '';
  if (key) {
    const arr = key.split('-');
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

const SideNavContent = (props) => {
  const {
    sideNavTheme,
    routeInfo,
    hideGroupTitle,
    localization,
    onMobileNavToggle,
    user_type,
  } = props;
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');
  const [navContent, setnavContent] = useState([]);

  useEffect(() => {
    if (user_type === 'USER') {
      setnavContent(userNavTree);
    } else {
      setnavContent(superUserNavTree);
    }
  }, [user_type]);

  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false);
    }
  };

  return (
    <Menu
      theme={sideNavTheme === SIDE_NAV_LIGHT ? 'light' : 'dark'}
      mode='inline'
      style={{ height: '100%', borderRight: 0 }}
      defaultSelectedKeys={['property-management']}
      defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
      className={hideGroupTitle ? 'hide-group-title' : 'tt'}
    >
      {navContent.map((menu) =>
        menu.submenu.length > 0 ? (
          <Menu.ItemGroup
            key={menu.key}
            title={setLocale(localization, menu.title)}
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  icon={
                    subMenuFirst.icon ? (
                      <Icon type={subMenuFirst?.icon} />
                    ) : null
                  }
                  key={subMenuFirst.key}
                  title={setLocale(localization, subMenuFirst.title)}
                >
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item
                      key={subMenuSecond.key}
                      style={{ paddingLeft: '34px' }}
                    >
                      {subMenuSecond.icon ? (
                        <Icon type={subMenuSecond?.icon} />
                      ) : null}
                      <span>
                        {setLocale(localization, subMenuSecond.title)}
                      </span>
                      <Link
                        onClick={() => closeMobileNav()}
                        to={subMenuSecond.path}
                      />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key}>
                  {subMenuFirst.icon ? <Icon type={subMenuFirst.icon} /> : null}
                  <span>{setLocale(localization, subMenuFirst.title)}</span>
                  <Link
                    onClick={() => closeMobileNav()}
                    to={subMenuFirst.path}
                  />
                </Menu.Item>
              )
            )}
          </Menu.ItemGroup>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon} /> : null}
            <span>{setLocale(localization, menu?.title)}</span>
            {menu.path ? (
              <Link onClick={() => closeMobileNav()} to={menu.path} />
            ) : null}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const TopNavContent = (props) => {
  const { topNavColor, localization } = props;
  const [navContent, setnavContent] = useState([]);
  useEffect(() => {
    setnavContent(superUserNavTree);
  }, []);

  return (
    <Menu mode='horizontal' style={{ backgroundColor: topNavColor }}>
      {navContent.map((menu) =>
        menu.submenu.length > 0 ? (
          <SubMenu
            key={menu.key}
            popupClassName='top-nav-menu'
            title={
              <span>
                {menu.icon ? <Icon type={menu?.icon} /> : null}
                <span>{setLocale(localization, menu.title)}</span>
              </span>
            }
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  key={subMenuFirst.key}
                  popupClassName='top-nav-menu'
                  icon={
                    subMenuFirst.icon ? (
                      <Icon type={subMenuFirst?.icon} />
                    ) : null
                  }
                  title={setLocale(localization, subMenuFirst.title)}
                >
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item key={subMenuSecond.key}>
                      <span>
                        {setLocale(localization, subMenuSecond.title)}
                      </span>
                      <Link to={subMenuSecond.path} />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key}>
                  {subMenuFirst.icon ? (
                    <Icon type={subMenuFirst?.icon} />
                  ) : null}
                  <span>{setLocale(localization, subMenuFirst.title)}</span>
                  <Link to={subMenuFirst.path} />
                </Menu.Item>
              )
            )}
          </SubMenu>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon} /> : null}
            <span>{setLocale(localization, menu?.title)}</span>
            {menu.path ? <Link to={menu.path} /> : null}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const MenuContent = (props) => {
  return props.type === NAV_TYPE_SIDE ? (
    <SideNavContent {...props} />
  ) : (
    <TopNavContent {...props} />
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { sideNavTheme, topNavColor } = theme;
  const { user_type } = auth;
  return {
    sideNavTheme,
    topNavColor,
    user_type,
  };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MenuContent);
