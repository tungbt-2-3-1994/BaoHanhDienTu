import { NavigationActions } from 'react-navigation';

import * as Types from '../constants/ActionTypes';

const name = 'LOGIN';

export const normalLogin = (username, password) => {
    return (dispatch) => {
        fetch(`https://vatapcheck.com.vn/api/v1/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': username,
                'password': password,
                'grant_type': 'password',
                'client_id': 1,
                'client_secret': 'ieFnVZkuuJfrou5HFK2VVGQqmVUwwcTSrgHql9fb'
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (typeof (responseData.access_token) === 'undefined') {
                    dispatch({
                        type: Types.NORMAL_LOGIN_FAIL
                    });
                    alert('Đăng nhập không thành công');
                } else {
                    dispatch({
                        type: Types.NORMAL_LOGIN_SUCCESS,
                        payload: responseData
                    });
                    alert('Đăng nhập thành công');
                }
            })
            .catch(e => console.log(e))
            .done();
    }
}