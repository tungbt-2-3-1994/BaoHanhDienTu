import React, { Component } from 'react';
import { Image, StatusBar, View } from 'react-native';

import { Header, Button, Icon, Text, Container, Input, Item, InputGroup, Left, Right } from 'native-base';

import { width } from '../constants/dimensions';

import { responsiveFontSize, responsiveWidth } from '../utils/helpers';

class BackHeader extends Component {
    render() {
        return (
            <Header searchBar rounded style={{ backgroundColor: '#277dac' }}>
                <StatusBar
                    backgroundColor='#277dac'
                    barStyle="light-content"
                />
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
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

export default BackHeader;
