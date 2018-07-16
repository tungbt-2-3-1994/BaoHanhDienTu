//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

import BackHeader from '../../../components/BackHeader';
import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';
import { host_img } from '../../../constants/api';

// create a component
class HomeNewsDetail extends Component {

    componentDidMount() {
        console.log(this.props.navigation.state.params);
    }

    render() {
        const { uri, content, title, link } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} title='Tin tức' />
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <Image style={{ width: width, height: height / 4, resizeMode: 'contain' }} source={{ uri: `${host_img}/static/common/img/tidings/${uri}` }} />
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Text style={{ marginTop: 5, textAlign: 'center', fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>{title}</Text>
                            <Text style={{ marginTop: 10, textAlign: 'auto', fontSize: responsiveFontSize(1.5) }}>{content}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(link)}>
                                <Text style={{ color: '#1f14a4', fontSize: responsiveFontSize(1.5), marginTop: 10 }}>{link}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default HomeNewsDetail;
