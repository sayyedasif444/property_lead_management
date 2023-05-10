import { combineReducers } from 'redux';
import auth from './Auth';
import theme from './Theme';
import property from './Property';
import user from './User';
import lead from './Lead';

export default combineReducers({
  auth,
  theme,
  property,
  user,
  lead,
});
