import React, { Component } from 'react';
import { Image, StatusBar, View } from 'react-native';

import { Header, Button, Body, Icon, Text, Container, Input, Item, InputGroup, Left, Right } from 'native-base';

import { width } from '../constants/dimensions';

import { responsiveFontSize, responsiveWidth } from '../utils/helpers';
import { priColor } from '../constants/colors';

class BackHeader extends Component {
    render() {
        return (
            <Header searchBar rounded style={{ backgroundColor: priColor }}>
                <StatusBar
                    backgroundColor={priColor}
                    barStyle="light-content"
                />
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name='arrow-back' style={{ color: 'white' }} />
                    </Button>
                </Left>
                <Body style={{ flex: 8, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>{this.props.title}</Text>
                </Body>
                <Right style={{ flex: 0.5 }}></Right>
            </Header>
        );
    }
}

export default BackHeader;
