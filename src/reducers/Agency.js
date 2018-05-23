import * as Types from '../constants/ActionTypes';

var INITIAL = {
    agency: {},
    loading: true,
};

const Agency = (state = INITIAL, action) => {
    switch (action.type) {
        case Types.GET_AGENCY_SUCCESS:
            return { ...state, agency: action.payload, loading: false };
        case Types.GET_AGENCY_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
}

export default Agency;