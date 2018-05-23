import * as Types from '../constants/ActionTypes';

var INITIAL = {
    user: {},
    loading: true,
    status: false
};

const User = (state = INITIAL, action) => {
    switch (action.type) {
        case Types.NORMAL_LOGIN_SUCCESS:
            return { ...state, user: action.payload, loading: false, status: true };
        case Types.NORMAL_LOGIN_FAIL:
            return { ...state, loading: false, status: false };
        default:
            return state;
    }
}

export default User;