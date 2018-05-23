import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import TextHeader from '../../../components/TextHeader';
import { width, height } from '../../../constants/dimensions';

import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

import { responsiveFontSize } from '../../../utils/helpers';

export default class DetailBrand extends Component {
    static navigationOptions = {
    }

    state = {

    }

    componentWillMount() {
    }

    render() {
        const { name, phone, email, website, address, description, cover } = this.props.navigation.state.params;
        return (
            <View style={{ flex: 1, backgroundColor: '#ecf9fe', }}>
                <TextHeader navigation={this.props.navigation} title='Chi tiết thương hiệu' />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ backgroundColor: '#eceaeb' }}>
                        <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/ogp/${cover}` }} style={styles.background} />
                        <View style={styles.foreground}>
                            <Image style={{ width: 3 * height / 20, height: 3 * height / 20, borderRadius: 3 * height / 40 }} source={{ uri: `http://vatapcheck.com.vn/static/common/img/ogp/${cover}` }} />
                        </View>
                        <View style={{ paddingHorizontal: 5, marginTop: 3 }}>
                            <Card style={{ width: width - 14, backgroundColor: 'white' }}>
                                <View style={{ backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 20, }}>
                                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: responsiveFontSize(1.7) }}>
                                        Thương hiệu
                                    </Text>
                                    <Text style={{ marginTop: 10, fontSize: responsiveFontSize(1.5) }}>
                                        {name}
                                    </Text>
                                </View>
                            </Card>
                            <Card style={{ width: width - 14, backgroundColor: 'white', marginTop: 3 }}>
                                <View style={{ backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 20, }}>
                                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: responsiveFontSize(1.7) }}>
                                        Giới thiệu
                                    </Text>
                                    <Text style={{ marginTop: 10, fontSize: responsiveFontSize(1.5) }}>
                                        <Text style={{ fontWeight: 'bold', }}>- Tên chổ chức phát hành: </Text>
                                        <Text>{name}</Text>
                                    </Text>
                                    <Text style={{ marginTop: 10, fontSize: responsiveFontSize(1.5) }}>
                                        <Text style={{ fontWeight: 'bold', }}>- Trụ sở chính: </Text>
                                        <Text>{address}</Text>
                                    </Text>
                                    <Text style={{ marginTop: 10, fontSize: responsiveFontSize(1.5) }}>
                                        <Text style={{ fontWeight: 'bold', }}>- Điện thoại: </Text>
                                        <Text>{phone}</Text>
                                    </Text>
                                    <Text style={{ marginTop: 10, fontSize: responsiveFontSize(1.5) }}>
                                        <Text style={{ fontWeight: 'bold', }}>- Email: </Text>
                                        <Text>{email}</Text>
                                    </Text>
                                    <Text style={{ marginTop: 10, fontSize: responsiveFontSize(1.5) }}>
                                        <Text style={{ fontWeight: 'bold', }}>- Website: </Text>
                                        <Text>{website}</Text>
                                    </Text>
                                </View>
                            </Card>
                        </View>
                    </ScrollView>
                </View>
            </View >
        );
    }
}

const styles = {
    background: {
        width: width,
        height: height / 5,
        resizeMode: 'cover'
    },
    foreground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height / 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    }
};