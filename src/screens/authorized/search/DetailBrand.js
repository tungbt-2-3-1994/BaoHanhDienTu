import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import BackHeader from '../../../components/BackHeader';
import { width } from '../../../constants/dimensions';

import MapView from 'react-native-maps';

export default class DetailBrand extends Component {
    static navigationOptions = {
    }

    state = {
        region: {
            latitude: 21.024817,
            longitude: 105.788874,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ecf9fe', }}>
                <BackHeader navigation={this.props.navigation} title='Settings' />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <MapView
                        style={styles.map}
                        region={this.state.region}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    map: {
        ...StyleSheet.absoluteFillObject,
    }
};
