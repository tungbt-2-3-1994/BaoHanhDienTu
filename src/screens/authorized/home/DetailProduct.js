import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import BackHeader from '../../../components/BackHeader';
import { width } from '../../../constants/dimensions';


export default class DetailProduct extends Component {
    static navigationOptions = {
    }

    state = {

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ecf9fe', }}>
                <BackHeader navigation={this.props.navigation} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Detail Product</Text>
                </View>
            </View>
        );
    }
}

const styles = {

};