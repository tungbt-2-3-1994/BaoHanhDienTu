import React, { Component } from 'react';
import { Image, StatusBar, View } from 'react-native';

import { Header, Button, Icon, Text, Container, Input, Item, InputGroup, Left, Right } from 'native-base';

import { width } from '../constants/dimensions';

import { responsiveFontSize, responsiveWidth } from '../utils/helpers';

class BackHeaderQRCode extends Component {
    render() {
        return (
            <Header searchBar rounded style={{ backgroundColor: 'red' }}>
                <StatusBar
                    backgroundColor='red'
                    barStyle="light-content"
                />
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={this.props.onPress}>
                        <Icon name='arrow-back' style={{ color: 'white' }} />
                    </Button>
                </Left>
                <Item style={{ backgroundColor: 'white', flex: 10 }}>
                    <Icon name='ios-search' />
                    <Input placeholder='Tìm kiếm' style={{ fontSize: responsiveFontSize(1.6) }} />
                </Item>
                <Right style={{ flex: 0.5 }}></Right>
            </Header>
        );
    }
}

export default BackHeaderQRCode;
