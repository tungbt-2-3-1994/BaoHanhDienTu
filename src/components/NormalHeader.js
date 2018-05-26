import React, { Component } from 'react';
import { Image, StatusBar, View, TouchableOpacity } from 'react-native';

import { Header, Button, Icon, Text, Container, Input, Item, InputGroup, Left, Right, Body, Badge } from 'native-base';

import { width } from '../constants/dimensions';

import { responsiveFontSize, responsiveWidth } from '../utils/helpers';

import IconBadge from 'react-native-icon-badge';

class NormalHeader extends Component {
    render() {
        return (
            <Header style={{ backgroundColor: '#277dac', justifyContent: 'center' }}>
                <StatusBar
                    backgroundColor='#277dac'
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
                    <TouchableOpacity >
                        <Icon name='ios-cart' style={{ color: 'white', fontSize: responsiveFontSize(2.8) }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <IconBadge
                            MainElement={
                                <View style={{ width: 20, height: 20, margin: 6, }}>
                                    <Icon name='ios-notifications' style={{ color: 'white', fontSize: responsiveFontSize(2.8) }} />
                                </View>
                            }
                            BadgeElement={
                                <Text style={{ color: '#FFFFFF' }}>0</Text>
                            }
                        // Hidden={this.state.BadgeCount == 0}
                        />
                    </TouchableOpacity>
                </Right>
            </Header>
        );
    }
}

export default NormalHeader;
