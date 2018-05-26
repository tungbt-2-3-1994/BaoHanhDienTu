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

        let sty = {};
        let sty1 = {};
        if (navigation.state.index === 0) {
            sty = focusedStyle;
        } else if (navigation.state.index === 1) {
            sty1 = focusedStyle;
        }

        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <Image source={require('../assets/imgs/logo.png')} style={{ alignSelf: 'center', width: 2 * width / 3, height: width / 3 }} />
                    <View style={{ width: 3 * width / 4, height: 1, backgroundColor: 'white', opacity: 0.4 }}></View>
                    <ScrollView style={{ backgroundColor: 'white' }}>
                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('MainTab')}>
                            <Icon style={[{ color: 'grey' }, sty]} name='home' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'grey', fontSize: responsiveFontSize(2.2) }, sty]}>Trang chủ</Text>
                        </Button>
                        <View style={{ width: 3 * width / 4, height: 1, backgroundColor: '#277dac', opacity: 0.4 }}></View>
                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('About')}>
                            <Icon style={[{ color: 'grey' }, sty1]} name='options' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'grey', fontSize: responsiveFontSize(2.2) }, sty1]}>Thông tin</Text>
                        </Button>
                    </ScrollView>
                    <Button large style={{ backgroundColor: '#277dac', position: 'absolute', bottom: 0, left: 0, right: 0, }} full transparent iconLeft onPress={() => alert('logout')}>
                        <Icon style={[{ color: 'white' }, sty1]} name='ios-log-out-outline' />
                        <Text uppercase={false} style={[{ marginLeft: 10, color: 'white', fontSize: responsiveFontSize(2.2) }, sty1]}>Đăng xuất</Text>
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
