import { combineReducers } from 'redux';
import auth from './Auth';
import theme from './Theme';
import property from './Property';
import user from './User';
import lead from './Lead';
import task from './Task';
import meeting from './Meeting';
import expense from './Expense';
import project from './Project';
import customer from './Customer';
import transaction from './Transaction';
import salary from './Salary';

export default combineReducers({
  auth,
  theme,
  property,
  user,
  lead,
  task,
  meeting,
  expense,
  project,
  customer,
  transaction,
  salary,
});
