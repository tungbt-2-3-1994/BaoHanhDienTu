import React, { Component } from 'react';
import { Image, StatusBar, View, TouchableOpacity } from 'react-native';

import { Header, Button, Icon, Text, Container, Input, Item, InputGroup, Left, Right, Body, Badge } from 'native-base';

import { width } from '../constants/dimensions';

import { responsiveFontSize, responsiveWidth } from '../utils/helpers';

import IconBadge from 'react-native-icon-badge';
import { priColor } from '../constants/colors';

class TextHeader extends Component {
    render() {
        return (
            <Header style={{ backgroundColor: priColor, justifyContent: 'center' }}>
                <StatusBar
                    backgroundColor={priColor}
                    barStyle="light-content"
                />
                <Left style={{ flex: 2, paddingLeft: 2 }}>
                    <Button transparent onPress={() => this.props.navigation.navigate('DrawerToggle')}>
                        <Icon name='ios-menu' style={{ color: 'white', fontSize: responsiveFontSize(2.8) }} />
                    </Button>
                </Left>
                <Body style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(1.9) }}>{this.props.title}</Text>
                </Body>
                <Right style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>

                </Right>
            </Header>
        );
    }
}

export default TextHeader;
