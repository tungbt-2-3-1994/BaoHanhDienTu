import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';

import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Container, Header, Body, Content, Button, Icon } from 'native-base';

import { DrawerItems } from 'react-navigation';
import { width } from '../constants/dimensions';
import { responsiveFontSize } from '../../../BaoHanhDienTu/src/utils/helpers';

class DrawerView extends Component {

    render() {
        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <Image source={require('../assets/imgs/logo.png')} style={{ alignSelf: 'center', width: 2 * width / 3, height: width / 3 }} />
                    <View style={{ width: 3 * width / 4, height: 1, backgroundColor: 'white', opacity: 0.4 }}></View>
                    <ScrollView style={{ backgroundColor: 'white' }}>
                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('MainTab')}>
                            <Icon type='MaterialIcons' style={[{ color: 'grey', }, navigation.state.index === 0 && focusedStyle]} name='home' />
                            <Text uppercase={false} style={[{ marginLeft: 8, color: 'grey', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 0 && focusedStyle]}>Trang chủ</Text>
                        </Button>
                        <View style={{ width: 3 * width / 4, height: 1, backgroundColor: '#277dac', opacity: 0.4 }}></View>

                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('Customer')}>
                            <Icon type='MaterialIcons' style={[{ color: 'grey' }, navigation.state.index === 1 && focusedStyle]} name='sentiment-very-satisfied' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'grey', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 1 && focusedStyle]}>Khách hàng</Text>
                        </Button>
                        <View style={{ width: 3 * width / 4, height: 1, backgroundColor: '#277dac', opacity: 0.4 }}></View>

                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('Support')}>
                            <Icon type='MaterialIcons' style={[{ color: 'grey' }, navigation.state.index === 2 && focusedStyle]} name='perm-phone-msg' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'grey', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 2 && focusedStyle]}>Hỗ trợ</Text>
                        </Button>
                        <View style={{ width: 3 * width / 4, height: 1, backgroundColor: '#277dac', opacity: 0.4 }}></View>

                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('Configure')}>
                            <Icon type='MaterialIcons' style={[{ color: 'grey' }, navigation.state.index === 3 && focusedStyle]} name="insert-chart" />
                            <Text uppercase={false} style={[{ marginLeft: 8, color: 'grey', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 3 && focusedStyle]}>Thông số</Text>
                        </Button>
                        <View style={{ width: 3 * width / 4, height: 1, backgroundColor: '#277dac', opacity: 0.4 }}></View>

                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('Order')}>
                            <Icon type='MaterialIcons' style={[{ color: 'grey' }, navigation.state.index === 4 && focusedStyle]} name='add-shopping-cart' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'grey', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 4 && focusedStyle]}>Đơn hàng</Text>
                        </Button>
                        <View style={{ width: 3 * width / 4, height: 1, backgroundColor: '#277dac', opacity: 0.4 }}></View>

                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('Modify')}>
                            <Icon type='MaterialIcons' style={[{ color: 'grey' }, navigation.state.index === 5 && focusedStyle]} name="border-color" />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'grey', fontSize: responsiveFontSize(2.2) }, navigation.state.index === 5 && focusedStyle]}>Chỉnh sửa</Text>
                        </Button>

                    </ScrollView>
                    <Button large style={{ backgroundColor: '#277dac', position: 'absolute', bottom: 0, left: 0, right: 0, }} full transparent iconLeft onPress={() => alert('logout')}>
                        <Icon style={[{ color: 'white' }]} name='ios-log-out-outline' />
                        <Text uppercase={false} style={[{ marginLeft: 10, color: 'white', fontSize: responsiveFontSize(2.2) }]}>Đăng xuất</Text>
                    </Button>
                </Container>
            </SafeAreaView>
        );
    }
}

const commonStyle = {
    justifyContent: "flex-start",
}

const focusedStyle = {
    color: '#277dac',
    // fontWeight: 'bold',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#277dac'
    },
});

export default DrawerView;
