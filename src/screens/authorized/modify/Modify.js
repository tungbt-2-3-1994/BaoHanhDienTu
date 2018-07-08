import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NormalHeader from '../../../components/NormalHeader';

class Modify extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NormalHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' />
                <Text>Tính năng này sẽ có ở các version tiếp theo</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Modify;
