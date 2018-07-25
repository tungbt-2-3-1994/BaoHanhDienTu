import { combineReducers } from 'redux';

import navReducer from './Navigation';
import Category from './Category';
import User from './User';
import Agency from './Agency';

export default combineReducers({
    nav: navReducer,
    user: User,
});