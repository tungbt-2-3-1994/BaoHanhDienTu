import { NavigationActions } from 'react-navigation';

import * as Types from '../constants/ActionTypes';

const name = 'category';

export const fetchAllCategories = () => {
    return (dispatch) => {
        fetch(`https://vatapcheck.com.vn/api/v1/categories`)
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.code === 200) {
                    dispatch({
                        type: Types.FETCH_ALL_CATEGORY_SUCCESS,
                        payload: responseData.data.categories
                    });
                } else {
                    dispatch({
                        type: Types.FETCH_ALL_CATEGORY_FAIL,
                    });
                }
            })
            .catch(e => {
                dispatch({
                    type: Types.FETCH_ALL_CATEGORY_FAIL,
                });
            });
    }
}


export const fetchAllProductsInCategory = (id_cat) => {
    return (dispatch) => {
        fetch(`https://vatapcheck.com.vn/api/v1/products/category/${id_cat}`)
            .then((response) => response.json())
            .then((responseData) => {
                // console.log(name, responseData);
                if (responseData.code === 200) {
                    dispatch({
                        type: Types.FETCH_ALL_PRODUCTS_SUCCESS,
                        payload: responseData.data.categories
                    });
                } else {
                    dispatch({
                        type: Types.FETCH_ALL_PRODUCTS_FAIL,
                    });
                }
                // dispatch({
                //     type: GET_COMPATIBLE_STORES,
                //     payload: responseData.data
                // });
                // const navigateToCompaMenu = NavigationActions.navigate({
                //     routeName: 'CompatibleMenu',
                //     params: {
                //         'data': vegIds,
                //         'quantityData': quantity
                //     }
                // });
                // dispatch(navigateToCompaMenu);
            })
            .catch(e => {
                // console.log(name, e);
                dispatch({
                    type: Types.FETCH_ALL_PRODUCTS_FAIL,
                });
            });
    }
}
