import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer
});

export default rootReducer;