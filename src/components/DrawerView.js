import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';

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
                    <Image source={require('../assets/imgs/vatap.png')} style={{ alignSelf: 'center', width: width / 4, height: width / 4, borderRadius: width / 8 }} />
                    <View style={{ marginTop: 25, width: 3 * width / 4, height: 1, backgroundColor: 'white', opacity: 0.4 }}></View>
                    <ScrollView>
                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('MainTab')}>
                            <Icon style={[{ color: 'white' }, sty]} name='home' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'white', fontSize: responsiveFontSize(2.2) }, sty]}>Trang chủ</Text>
                        </Button>
                        <View style={{ width: 3 * width / 4, height: 1, backgroundColor: 'white', opacity: 0.4 }}></View>
                        <Button large style={commonStyle} full transparent iconLeft onPress={() => navigation.navigate('About')}>
                            <Icon style={[{ color: 'white' }, sty1]} name='options' />
                            <Text uppercase={false} style={[{ marginLeft: 10, color: 'white', fontSize: responsiveFontSize(2.2) }, sty1]}>Thông tin</Text>
                        </Button>
                    </ScrollView>
                </Container>
            </SafeAreaView>
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
        backgroundColor: '#277dac'
    },
});

export default DrawerView;
