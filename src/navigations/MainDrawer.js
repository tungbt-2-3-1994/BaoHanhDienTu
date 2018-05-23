import React from 'react';

import { DrawerNavigator } from 'react-navigation';
import { Dimensions, SafeAreaView } from 'react-native';

import MainTab from './MainTab';
import About from '../screens/authorized/about/About';
import { Container, Header, Image,  } from 'native-base';

import DrawerView from '../components/DrawerView';

const { width, height } = Dimensions.get('window');

const MainDrawer = DrawerNavigator({
    MainTab: { screen: MainTab },
    About: { screen: About }
}, {
        drawerWidth: 3 * width / 4,
        contentComponent: props => <DrawerView {...props} />,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    });


export default MainDrawer;