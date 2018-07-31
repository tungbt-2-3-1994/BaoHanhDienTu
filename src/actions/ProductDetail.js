import { NavigationActions } from 'react-navigation';

import * as Types from '../constants/ActionTypes';

const name = 'PRODUCT_DETAIL';

export const fetchProductDetail = (qr_code) => {
    return (dispatch) => {
        fetch(`https://vatapcheck.com.vn/api/v1/qrcode`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'code': qr_code
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log(name, responseData);
                // dispatch({
                //     type: GET_COMPATIBLE_STORES,
                //     payload: responseData.data
                // });
            })
            .done();
    }
}