import axios from 'axios';
import * as Config from '../constants/config';

export function callApi(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log('BT', err);
    });
};

export function callApiWithHeader(endpoint, header, method = 'POST', body) {
    return axios({
        method: method,
        headers: {
            'X-CSRF-TOKEN': header,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        return err;
    });
};

export function refreshToken() {
    fetch('api')
        .then(token => {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
            axios.defaults.headers.common['Accept'] = 'application/json';
        })
        .catch();
}