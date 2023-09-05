import { combineReducers } from 'redux';
import AuthReducer from './auth';
import TodoReducer from './todo';

export default combineReducers({
  Auth: AuthReducer,
  Todo: TodoReducer,
});
