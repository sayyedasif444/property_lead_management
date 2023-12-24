import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '../../components/shared-components/Loading';
import { APP_PREFIX_PATH } from '../../configs/AppConfig';
import { connect } from 'react-redux';
import './style.css';
import { useEffect } from 'react';
import { listProperty } from '../../apis/dashboard/Property';
import { listLead, listSource } from '../../apis/dashboard/Lead';
import { listUser } from '../../apis/dashboard/User';
import { listTaskUser, listTask } from '../../apis/dashboard/Task';
import { listMeeting } from '../../apis/dashboard/Meeting';
import PropTypes from 'prop-types';
import { listProjects } from '../../apis/dashboard/Project';
import { listCustomers } from '../../apis/dashboard/Customer';
import { listExpense, listExpenseCategory } from '../../apis/dashboard/expense';
import { listTransaction } from '../../apis/dashboard/transaction';
import { listSalary } from '../../apis/dashboard/Salary';

export const AppViews = ({
  listProperty,
  listLead,
  listSource,
  listUser,
  listTaskUser,
  listTask,
  listMeeting,
  listProjects,
  listCustomers,
  listExpenseCategory,
  listExpense,
  listTransaction,
  isAuthenticated,
  listSalary,
}) => {
  useEffect(() => {
    return () => {
      if (isAuthenticated) {
        listProperty();
        listTask();
        listUser();
        listTaskUser();
        listLead();
        listSalary();
        listSource();
        listMeeting();
        listProjects();
        listCustomers();
        listExpenseCategory();
        listExpense();
        listTransaction();
      }
    };
  }, [
    listProperty,
    listLead,
    listSource,
    listUser,
    listTaskUser,
    listTask,
    listMeeting,
    listProjects,
    listCustomers,
    listExpenseCategory,
    listExpense,
    listTransaction,
    isAuthenticated,
    listSalary,
  ]);

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
          path={`${APP_PREFIX_PATH}/salary-management`}
          component={lazy(() => import(`./SalaryManagement`))}
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
        <Route
          path={`${APP_PREFIX_PATH}/meeting-schedule`}
          component={lazy(() => import(`./Meeting`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/expense-management`}
          component={lazy(() => import(`./ExpenseManagement`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/project-management`}
          component={lazy(() => import(`./ProjectManagement`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/view-project-details`}
          component={lazy(() => import(`./ProjectManagement/detailsPage`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/customer-management`}
          component={lazy(() => import(`./CustomerManagement`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/view-customer-details`}
          component={lazy(() => import(`./CustomerManagement/detailsPage`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/transaction`}
          component={lazy(() => import(`./Transaction`))}
        />
      </Switch>
    </Suspense>
  );
};
AppViews.propTypes = {
  listProperty: PropTypes.func,
  listLead: PropTypes.func,
  listSource: PropTypes.func,
  listUser: PropTypes.func,
  listTaskUser: PropTypes.func,
  listTask: PropTypes.func,
  isAuthenticated: PropTypes.any,
  listMeeting: PropTypes.func,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  listProperty,
  listLead,
  listSource,
  listUser,
  listTaskUser,
  listTask,
  listMeeting,
  listProjects,
  listCustomers,
  listExpenseCategory,
  listExpense,
  listTransaction,
  listSalary,
})(AppViews);
