import React from 'react';
import { View, StatusBar, BackHandler } from 'react-native';

import {
    addNavigationHelpers,
    NavigationActions
} from 'react-navigation';

import { connect } from 'react-redux';

import RootNav from './navigations/RootNav';

import {
    createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

const addListener = createReduxBoundAddListener("root");

class AppWithNavigationState extends React.Component {

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        // alert('aasas');
        // const { dispatch, nav } = this.props;
        // if (nav.index < 0 || typeof (nav.index) === 'undefined') {
        //     return false;
        // }
        // dispatch(NavigationActions.back());
        // return true;
    }

    render() {
        return (
            <RootNav
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                    addListener,
                })}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);