import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import authReducer from './authReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer
});

export default rootReducer