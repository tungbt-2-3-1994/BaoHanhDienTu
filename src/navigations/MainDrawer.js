import React from 'react';

import { DrawerNavigator } from 'react-navigation';
import { Dimensions, SafeAreaView } from 'react-native';

import MainTab from './MainTab';
import Configure from '../screens/authorized/configure/Configure';
import Customer from '../screens/authorized/customer/Customer';
import Modify from '../screens/authorized/modify/Modify';
import Order from '../screens/authorized/order/Order';
import Support from '../screens/authorized/support/Support';

import { Container, Header, Image, } from 'native-base';

import DrawerView from '../components/DrawerView';

const { width, height } = Dimensions.get('window');

const MainDrawer = DrawerNavigator({
    MainTab: { screen: MainTab },
    Customer: { screen: Customer },
    Support: { screen: Support },
    Configure: { screen: Configure },
    Order: { screen: Order },
    Modify: { screen: Modify },
}, {
        drawerWidth: 7 * width / 9,
        contentComponent: props => <DrawerView {...props} />,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    });


export default MainDrawer;