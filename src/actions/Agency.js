
import { NavigationActions } from 'react-navigation';

import * as Types from '../constants/ActionTypes';

const name = 'AGENCY';

export const getAgencyInfo = (authorization) => {
    return (dispatch) => {
        fetch(`https://vatapcheck.com.vn/api/v1/qrcode/edit`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUzN2FkOGY0NWRhOTRiOTVkNDMyYzg2NTQ5NDNjMzA0MjI0OTM0ZTdmMTlmMzMzYzZjMjY4OWVhMjRhZmJjNTFmZGQyMjU1NGYyMDk1NmU0In0.eyJhdWQiOiIxIiwianRpIjoiNTM3YWQ4ZjQ1ZGE5NGI5NWQ0MzJjODY1NDk0M2MzMDQyMjQ5MzRlN2YxOWYzMzNjNmMyNjg5ZWEyNGFmYmM1MWZkZDIyNTU0ZjIwOTU2ZTQiLCJpYXQiOjE1MjUyODQ3MjcsIm5iZiI6MTUyNTI4NDcyNywiZXhwIjoxNTI2NTgwNzI3LCJzdWIiOiIxMDAwMDY2Iiwic2NvcGVzIjpbXX0.s0BWpBZLCJjmMqy55lIug8CS1L6UAF18GZwr_izyxqFXGrqlNSpk-9SpvVUyeXZwBCLEdD83HQBxPxzPyluDJYmYQsmTxu3CagNuoOPZMqTMqF4hVKNY0pSWPTvY7liHWS52sMU8OftiTlWDJW83T93QUmJLgre826IZaTyE9086laMOyBwf8zQu7Y4A4D3oiamomxzY1qalDeyCi4BzxGJkySMBLPUYMcS1jrW3qpMgbsWf7io5AOv3yG-8YNc0nmI0iik8-Qu1Pk8lDj0eeaa0gXKVikouViYbSF8Bg5aVnTXlHWnC93rADHsxawH1FNW_v9_xPQlKMdnoD8tm4Uy7QUPjJO37QFSB46F_Od6Or9PPPvVRgm9Q4KAFwT3CLsVf78reqJK0CrQEohjIC5B_FhZcYIQwLZh_vV3usnVvlIi3ajwI6Yi-ga01bvANl1dtayPtI7VZfgj_l3T-vAzC2fLDBhJVZJxBBfC1uXEUygOmYvhpgnE-IrNO8Biovj44OIo3LM8e46aB4xpYUot0eLuKe9OyrQ_3GMN0bwxnO2CtYxLGkh3HM4qpE1cWP06xhdF8au8hJzWo4j1zQ-9kkIpCq2-tgkkLVgrsJHX-3Y4FM5nO1hdBkYJDbuRgaKFSF69LTZLEJW8KQruR0EgK3dH9Be0yk5oyFw3fX1w',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (typeof (responseData.organization) === 'undefined') {
                    dispatch({
                        type: Types.GET_AGENCY_FAIL
                    });
                } else {
                    dispatch({
                        type: Types.GET_AGENCY_SUCCESS,
                        payload: responseData
                    });
                }
            })
            .catch(e => {
                dispatch({
                    type: Types.GET_AGENCY_FAIL
                });
                console.log(e);
            });
    }
}