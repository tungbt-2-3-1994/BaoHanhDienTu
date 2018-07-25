import { NavigationActions } from 'react-navigation';

import * as Types from '../constants/ActionTypes';
import { host } from '../constants/api';

export const normalLogin = (name, phone, pass, confirm) => {
    console.log(name, phone, pass, confirm);
    return (dispatch) => {
        fetch(`${host}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': name,
                'password': pass,
                'password_confirmation': confirm,
                'telephone': phone,
                'client_id': '1',
                'client_secret': 'ieFnVZkuuJfrou5HFK2VVGQqmVUwwcTSrgHql9fb'
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('asas', responseData);
                if (responseData.code === 200) {
                    dispatch({
                        type: Types.REGISTER_SUCCESS,

                    });
                }
                // if (typeof (responseData.access_token) === 'undefined') {
                //     dispatch({
                //         type: Types.NORMAL_LOGIN_FAIL
                //     });
                //     alert('Đăng nhập không thành công');
                // } else {
                //     dispatch({
                //         type: Types.NORMAL_LOGIN_SUCCESS,
                //         payload: responseData
                //     });
                //     alert('Đăng nhập thành công');
                // }
            })
            .catch(e => console.log(e))
            .done();
    }
}