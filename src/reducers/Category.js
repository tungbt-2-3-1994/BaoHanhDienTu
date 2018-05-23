import * as Types from '../constants/ActionTypes';

var INITIAL = {
    categories: [],
    loading: true
};

const Category = (state = INITIAL, action) => {
    switch (action.type) {
        case Types.FETCH_ALL_CATEGORY_SUCCESS:
            return { ...state, categories: action.payload, loading: false };
        case Types.FETCH_ALL_CATEGORY_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
}

export default Category;