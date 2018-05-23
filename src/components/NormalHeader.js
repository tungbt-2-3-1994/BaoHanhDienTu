import React, { Component } from 'react';
import { Image, StatusBar, View } from 'react-native';

import { Header, Button, Icon, Text, Container, Input, Item, InputGroup, Left, Right, Body } from 'native-base';

import { width } from '../constants/dimensions';

import { responsiveFontSize, responsiveWidth } from '../utils/helpers';

class NormalHeader extends Component {
    render() {
        return (
            <Header style={{ backgroundColor: '#277dac' }}>
                <StatusBar
                    backgroundColor='#277dac'
                    barStyle="light-content"
                />
                <Left style={{ flex: 1, paddingLeft: 5 }}>
                    <Button transparent onPress={() => this.props.navigation.navigate('DrawerToggle')}>
                        <Icon name='ios-menu' style={{ color: 'white' }} />
                    </Button>
                </Left>
                <Body style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2.3) }}>{this.props.title}</Text>
                </Body>
                <Right style={{ flex: 1 }}></Right>
            </Header>
        );
    }
}

export default NormalHeader;
