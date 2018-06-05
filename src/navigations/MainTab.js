import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom, TabBarTop } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { width } from '../constants/dimensions';

import { responsiveFontSize, responsiveWidth } from '../utils/helpers';

const styles = StyleSheet.create({
    iconOK: {
        height: responsiveWidth(15),
        width: width / 5 - 15,
        resizeMode: 'stretch'
    },
    iconTab: {
        borderColor: 'rgba(255, 255, 255, 0.5)', width: width / 5, flex: 1, alignItems: 'center', justifyContent: 'center'
    }
});

const IconTab = (src, tintColor, size, index, title) => (
    // <View style={[index !== 4 && { borderRightWidth: 1 }, styles.iconTab]}>
    <View style={styles.iconTab}>
        <Ionicons size={size} color={tintColor} name={src} />
        <Text style={{ fontSize: responsiveFontSize(1.1), color: tintColor, fontWeight: 'bold' }}>{title}</Text>
    </View>
);

const IconScanner = (src, tintColor, size) => (
    // <View style={[{ borderRightWidth: 1, backgroundColor: 'red' }, styles.iconTab]}>
    <View style={styles.iconTab}>
        <Ionicons size={size} color={tintColor} name={src} />
    </View>
);

/**------------------------------------------------------------------------------ */

import CommonHeader from '../components/CommonHeader';
import HomeStack from './HomeStack';
import ProductsStack from './ProductStack';
import QRCodeStack from './QRCodeStack';
import AccountStack from './AccountStack';
import SearchStack from './SearchStack';

export default MainTab = TabNavigator(
    {
        HomeStack: {
            screen: HomeStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => IconTab('ios-home', tintColor, 30, 1, 'Trang chủ')
            }
        },
        SearchStack: {
            screen: SearchStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => IconTab('ios-search', tintColor, 34, 2, 'Tra cứu')
            }
        },
        QRCodeStack: {
            screen: QRCodeStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => IconScanner('ios-qr-scanner-outline', tintColor, 60)
            }
        },
        ProductsStack: {
            screen: ProductsStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => IconTab('ios-cart', tintColor, 30, 3, 'Sản phẩm')
            }
        },
        AccountStack: {
            screen: AccountStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => IconTab('ios-contact', tintColor, 30, 4, 'Tài khoản')
            }
        },
    },
    {
        initialRouteName: 'QRCodeStack',
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            activeBackgroundColor: '#42b0ed',
            showIcon: true,
            showLabel: false,
            style: {
                backgroundColor: '#277dac',
                height: width / 5 - 10,
            },
            indicatorStyle: {
                backgroundColor: 'black',
                height: 10
            },
            upperCaseLabel: false,
            pressColor: 'yellow',
        },
        animationEnabled: false,
        lazy: true,
        swipeEnabled: false,
    }
);