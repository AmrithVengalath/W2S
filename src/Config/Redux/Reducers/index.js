import {combineReducers} from 'redux';
import userReducer from './UserReducer';

const AppReducer = combineReducers({
  userReducer,
});

export default AppReducer;
