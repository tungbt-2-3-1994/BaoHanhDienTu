import * as Types from '../constants/ActionTypes';

var INITIAL = {
    user: {},
    loading: true,
    isLogin: false
};

const User = (state = INITIAL, action) => {
    switch (action.type) {
        case Types.NORMAL_LOGIN_SUCCESS:
            return { ...state, user: action.payload, loading: false, isLogin: true };
        case Types.NORMAL_LOGIN_FAIL:
            return { ...state, loading: false, isLogin: false };
        case Types.LOGOUT:
            return { ...INITIAL };
        default:
            return state;
    }
}

export default User;