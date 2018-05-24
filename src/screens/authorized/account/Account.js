import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Modal, Platform } from 'react-native';
import NormalHeader from '../../../components/NormalHeader';
import { width } from '../../../constants/dimensions';


export default class Account extends Component {
    static navigationOptions = {
    }

    state = {

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#277dac', }}>
                <NormalHeader navigation={this.props.navigation} title='Tài khoản' />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Account</Text>
                </View>
            </View>
        );
    }
}

const styles = {

};