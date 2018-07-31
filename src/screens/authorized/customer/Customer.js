import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NormalHeader from '../../../components/NormalHeader';
import { responsiveFontSize } from '../../../utils/helpers';

class Customer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NormalHeader count={0} navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'justify', fontSize: responsiveFontSize(1.8) }}>Tính năng này sẽ có ở các version tiếp theo</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Customer;
