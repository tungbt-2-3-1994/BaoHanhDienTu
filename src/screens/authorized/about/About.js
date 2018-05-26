import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NormalHeader from '../../../components/NormalHeader';

class About extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NormalHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' />
                <Text>About</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default About;
