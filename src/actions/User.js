import { NavigationActions } from 'react-navigation';

import * as Types from '../constants/ActionTypes';
import { host } from '../constants/api';

export const normalLogin = (username, password) => {
    return (dispatch) => {
        fetch(`${host}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
                'client_id': '1',
                'client_secret': 'ieFnVZkuuJfrou5HFK2VVGQqmVUwwcTSrgHql9fb'
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('asas', responseData);
                if (typeof (responseData.token_type) !== 'undefined') {
                    dispatch({
                        type: Types.NORMAL_LOGIN_SUCCESS,
                        payload: responseData
                    });
                } else {
                    dispatch({
                        type: Types.NORMAL_LOGIN_FAIL,
                    });
                    alert('Số điện thoại hoặc mật khẩu bạn nhập đã sai. \n Vui lòng đăng nhập lại');
                }
            })
            .catch(e => {
                console.log(e);
                dispatch({
                    type: Types.NORMAL_LOGIN_FAIL,
                });
                alert('Số điện thoại hoặc mật khẩu bạn nhập đã sai. \n Vui lòng đăng nhập lại');
            })
            .done();
    }
}