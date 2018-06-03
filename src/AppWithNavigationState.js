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
        BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
    }

    _isDrawerOpen = nav => nav.routes[0].index === 1

    _shouldCloseApp = nav => {
        console.log(nav);
        if (nav.index > 0) return false;

        if (nav.routes) {
            return nav.routes.every(this._shouldCloseApp);
        }

        return true;
    }

    _goBack = () => this.props.dispatch(NavigationActions.back())

    _closeDrawer = () => this.props.dispatch(NavigationActions.navigate({
        routeName: "DrawerClose"
    }))

    _handleBackPress = () => {
        if (this._isDrawerOpen(this.props.nav)) {
            this._closeDrawer()
            return true
        }
        if (this._shouldCloseApp(this.props.nav)) {
            return false
        }
        this._goBack()
        return true
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