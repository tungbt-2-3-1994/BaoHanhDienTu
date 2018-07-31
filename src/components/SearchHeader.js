import React, { Component } from 'react';
import { Image, StatusBar, View, TouchableOpacity } from 'react-native';

import { Header, Button, Icon, Text, Container, Input, Item, InputGroup, Left, Right } from 'native-base';

import { width } from '../constants/dimensions';

import { responsiveFontSize, responsiveWidth } from '../utils/helpers';
import { priColor } from '../constants/colors';

class BackSearchHeader extends Component {
    render() {
        return (
            <Header searchBar rounded style={{ backgroundColor: priColor }}>
                <StatusBar
                    backgroundColor={priColor}
                    barStyle="light-content"
                />
                <Left style={{ flex: 1, paddingLeft: 2 }}>
                    <Button transparent onPress={() => this.props.navigation.navigate('DrawerToggle')}>
                        <Icon name='ios-menu' style={{ color: 'white', fontSize: responsiveFontSize(2.8) }} />
                    </Button>
                </Left>
                <Item style={{ backgroundColor: 'white', flex: 6 }}>
                    <Icon name='ios-search' />
                    <Input onChangeText={this.props.onChangeText} placeholder='Nhập mã code' style={{ fontSize: responsiveFontSize(1.6) }} />
                </Item>
                <Right style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.props.onSearch} style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </Right>
            </Header>
        );
    }
}

export default BackSearchHeader;
