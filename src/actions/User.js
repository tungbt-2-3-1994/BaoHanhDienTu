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
                console.log('asas', responseData);
                if (typeof (responseData.token_type) !== 'undefined') {
                    dispatch({
                        type: Types.NORMAL_LOGIN_SUCCESS,
                        payload: responseData
                    });
                    fetch(`${host}/auth`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${responseData.access_token}`
                        }
                    })
                        .then(res => res.json())
                        .then((resData) => {
                            console.log('resData', resData);
                            if (resData.status === 'login') {
                                dispatch({
                                    type: Types.GET_INFOR_SUCCESS,
                                    payload: resData.user
                                });
                            } else {
                                dispatch({
                                    type: Types.GET_INFOR_FAIL,
                                });
                            }
                        })
                        .catch(e => {
                            console.log('e', e);
                            dispatch({
                                type: Types.GET_INFOR_FAIL,
                            });
                            alert('Đăng nhập thất bại');
                        })
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

export const logout = (accessToken) => {
    return (dispatch) => {
        fetch(`${host}/signout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                'client_id': '1',
                'client_secret': 'ieFnVZkuuJfrou5HFK2VVGQqmVUwwcTSrgHql9fb'
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('asas', responseData);
                if (responseData.code === 200) {
                    dispatch({
                        type: Types.LOGOUT
                    });
                }
            })
            .catch(e => {
                console.log(e);
            })
            .done();
    }
}