import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Container, Header, Body, Content, Button, Icon } from 'native-base';

import { DrawerItems } from 'react-navigation';
import { width } from '../constants/dimensions';
import { responsiveFontSize } from '../../../BaoHanhDienTu/src/utils/helpers';
import { priColor } from '../constants/colors';

import { connect } from 'react-redux';

import { logout } from '../actions/User';

class DrawerView extends Component {

    onLogout = () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn có thực sự muốn đăng xuất?',
            [
                { text: 'Hủy', onPress: () => { }, style: 'cancel' },
                { text: 'Đồng ý', onPress: () => this.props.logout(this.props.user.token.access_token) },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <Image source={require('../assets/imgs/logo.png')} style={{ alignSelf: 'center', width: 5 * width / 9, height: 10 * width / 27 }} />
                    <View style={{ width: 7 * width / 9, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', opacity: 0.4 }}></View>
                    <ScrollView style={{ backgroundColor: priColor }}>
                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('MainTab')}>
                            <Icon type='MaterialIcons' style={[{ color: 'rgba(255, 255, 255, 0.7)', }, navigation.state.index === 0 && focusedStyle]} name='home' />
                            <Text uppercase={false} style={[{ marginLeft: 8, color: 'rgba(255, 255, 255, 0.7)', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 0 && focusedStyle]}>Trang chủ</Text>
                        </Button>
                        <View style={{ width: 7 * width / 9, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', opacity: 0.4 }}></View>

                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('Customer')}>
                            <Icon type='MaterialIcons' style={[{ color: 'rgba(255, 255, 255, 0.7)' }, navigation.state.index === 1 && focusedStyle]} name='sentiment-very-satisfied' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'rgba(255, 255, 255, 0.7)', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 1 && focusedStyle]}>Khách hàng</Text>
                        </Button>
                        <View style={{ width: 7 * width / 9, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', opacity: 0.4 }}></View>

                        {/* <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('Support')}>
                            <Icon type='MaterialIcons' style={[{ color: 'rgba(255, 255, 255, 0.7)' }, navigation.state.index === 2 && focusedStyle]} name='perm-phone-msg' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'rgba(255, 255, 255, 0.7)', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 2 && focusedStyle]}>Hỗ trợ</Text>
                        </Button>
                        <View style={{ width: 7 * width / 9, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', opacity: 0.4 }}></View>

                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('Configure')}>
                            <Icon type='MaterialIcons' style={[{ color: 'rgba(255, 255, 255, 0.7)' }, navigation.state.index === 3 && focusedStyle]} name="insert-chart" />
                            <Text uppercase={false} style={[{ marginLeft: 8, color: 'rgba(255, 255, 255, 0.7)', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 3 && focusedStyle]}>Thông số</Text>
                        </Button>
                        <View style={{ width: 7 * width / 9, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', opacity: 0.4 }}></View>

                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('Order')}>
                            <Icon type='MaterialIcons' style={[{ color: 'rgba(255, 255, 255, 0.7)' }, navigation.state.index === 4 && focusedStyle]} name='add-shopping-cart' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'rgba(255, 255, 255, 0.7)', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 4 && focusedStyle]}>Đơn hàng</Text>
                        </Button>
                        <View style={{ width: 7 * width / 9, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', opacity: 0.4 }}></View> */}

                        {/* <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('Modify')}>
                            <Icon type='MaterialIcons' style={[{ color: 'rgba(255, 255, 255, 0.7)' }, navigation.state.index === 5 && focusedStyle]} name="border-color" />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'rgba(255, 255, 255, 0.7)', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 5 && focusedStyle]}>Chỉnh sửa</Text>
                        </Button> */}

                    </ScrollView>
                    {this.props.user.isLogin &&
                        < TouchableOpacity style={{ alignItems: 'center', alignSelf: 'center', flexDirection: 'row', backgroundColor: priColor, borderColor: 'white', borderWidth: 1, position: 'absolute', bottom: 0, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 30, marginBottom: 20 }} onPress={() => this.onLogout()}>
                            <Icon active={true} style={[{ color: 'white' }]} name='ios-log-out-outline' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'white', fontSize: responsiveFontSize(2.2) }]}>Đăng xuất</Text>
                        </TouchableOpacity>
                    }
                </Container>
            </SafeAreaView >
        );
    }
}

const commonStyle = {
    justifyContent: "flex-start",
}

const focusedStyle = {
    color: 'white',
    fontWeight: 'bold',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: priColor
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        logout: (accessToken) => {
            dispatch(logout(accessToken));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerView);