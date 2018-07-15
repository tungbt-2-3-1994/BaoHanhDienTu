import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { Header, Icon, Input, Item, Left, Body, Button, Right } from 'native-base';

import { width } from '../constants/dimensions';

import { responsiveFontSize, responsiveWidth } from '../utils/helpers';
import { priColor } from '../constants/colors';


class CommonHeader extends Component {
    render() {
        return (
            <Header searchBar rounded style={{ backgroundColor: priColor, }}>
                <StatusBar
                    backgroundColor={priColor}
                    barStyle="light-content"
                />
                <Left style={{ flex: 1, paddingLeft: 5, backgroundColor: 'transparent' }}>
                    <Button transparent onPress={() => this.props.navigation.navigate('DrawerToggle')}>
                        <Icon name='ios-menu' style={{ color: 'white' }} />
                    </Button>
                </Left>

                <Item rounded style={{ flex: 6, backgroundColor: 'white' }}>
                    <Icon name='ios-search' />
                    <Input placeholder='Tìm kiếm' style={{ fontSize: responsiveFontSize(1.6) }} />
                </Item>

                <Right style={{ flex: 1 }}></Right>

            </Header>
        );
    }
}

export default CommonHeader;
