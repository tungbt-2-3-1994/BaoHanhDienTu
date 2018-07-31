import { combineReducers } from 'redux';

import navReducer from './Navigation';
import User from './User';

export default combineReducers({
    nav: navReducer,
    user: User,
});