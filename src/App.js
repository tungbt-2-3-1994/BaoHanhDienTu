import { Provider, connect } from 'react-redux';
import React from 'react';

import store from './store/store';

import AppWithNavigationState from './AppWithNavigationState';

export default class BaoHanhDienTu extends React.Component {
    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}
