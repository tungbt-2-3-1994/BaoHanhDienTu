import * as Types from '../constants/ActionTypes';

var INITIAL = {
    token: {},
    infor: {},
    loading: true,
    isLogin: false
};

const User = (state = INITIAL, action) => {
    switch (action.type) {
        case Types.NORMAL_LOGIN_SUCCESS:
            return { ...state, token: action.payload, loading: false, isLogin: false };
        case Types.NORMAL_LOGIN_FAIL:
            return { ...state, loading: false, isLogin: false };
        case Types.GET_INFOR_SUCCESS:
            return { ...state, infor: action.payload, loading: false, isLogin: true };
        case Types.GET_INFOR_FAIL:
            return { ...state, loading: false, isLogin: false };
        case Types.LOGOUT:
            return { ...INITIAL };
        default:
            return state;
    }
}

export default User;