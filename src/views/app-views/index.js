import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '../../components/shared-components/Loading';
import { APP_PREFIX_PATH } from '../../configs/AppConfig';
import { connect } from 'react-redux';
import './style.css';

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover='content' />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/property-management`}
          component={lazy(() => import(`./PropertyManagement`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/add-property`}
          component={lazy(() => import(`./PropertyManagement/addProperty`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/edit-property`}
          component={lazy(() => import(`./PropertyManagement/editProperty`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/view-property`}
          component={lazy(() => import(`./PropertyManagement/viewProperty`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/user-management`}
          component={lazy(() => import(`./UserManagement`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/user-profile`}
          component={lazy(() => import(`./ProfileManage`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/lead-management`}
          component={lazy(() => import(`./LeadManagement`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/task-management`}
          component={lazy(() => import(`./TaskManagement`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/my-task`}
          component={lazy(() => import(`./TaskList`))}
        />
      </Switch>
    </Suspense>
  );
};
AppViews.propTypes = {};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(AppViews);
