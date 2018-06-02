//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import TextHeader from '../../../components/TextHeader';
import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';

// create a component
class HomeNewsDetail extends Component {

    componentDidMount() {
        console.log(this.props.navigation.state.params);
    }

    render() {
        const { uri, content, title, website } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <TextHeader navigation={this.props.navigation} title='Tin tức' />
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <Image style={{ width: width, height: height / 4, resizeMode: 'contain' }} source={{ uri: `http://vatapcheck.com.vn/static/common/img/tidings/${uri}` }} />
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Text style={{ marginTop: 5, textAlign: 'center', fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>{title}</Text>
                            <Text style={{ marginTop: 10, textAlign: 'auto', fontSize: responsiveFontSize(1.5) }}>{content}</Text>
                            {/* <Text style={{ marginTop: 10, fontSize: responsiveFontSize(1.5) }}>
                                <Text style={{ color: '#76b451' }}>Website: </Text>
                                <Text style={{}}>{website}</Text>
                            </Text> */}
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
