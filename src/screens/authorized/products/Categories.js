import React, { Component } from 'react';
import { View, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import NormalHeader from '../../../components/NormalHeader';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import { connect } from 'react-redux';

import { fetchAllCategories } from '../../../actions';
import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';

import { priColor } from '../../../constants/colors';

const ListHeader = ({ title, color }) => {
    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', paddingVertical: 15, }}>
            <View style={{ backgroundColor: color, width: responsiveFontSize(1.5), height: responsiveFontSize(3), marginRight: 10 }}></View>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.9), fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
}

const HotTrend = ({ navigation, uri, price }) => {
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Detail') }} style={{ width: width / 3 - 6.66, height: null, flex: 1, marginRight: 5, backgroundColor: 'white', }}>
            {uri !== null ?
                <Image source={{ uri: uri }} style={{ height: width / 3 - 6.66, width: width / 3 - 6.66, }} />
                :
                <Image source={require('../../../assets/imgs/noImg.png')} style={{ height: width / 3 - 6.66, width: width / 3 - 6.66, }} />
            }
            <View style={{ backgroundColor: 'white', flex: 1, paddingVertical: 10 }}>
                <Text style={{ alignSelf: 'center', fontSize: responsiveFontSize(1.6) }}>{price}</Text>
            </View>

        </TouchableOpacity>
    );
}

const hot_trend = [
    {
        uri: 'http://honeys.vn/vnt_upload/product/01_2016/noi-inox-3-day-honeys-hop02s32401-24cm.jpg',
        price: '50.000 vnđ',
        name: 'Nổi lẩu gia đình cỡ lớn Nổi lẩu gia đình cỡ lớn Nổi lẩu gia đình cỡ lớn'
    },
    {
        uri: 'http://honeys.vn/vnt_upload/product/01_2016/noi-inox-3-day-honeys-hop02s32401-24cm.jpg',
        price: '50.000 vnđ',
        name: 'Nổi lẩu gia đình cỡ lớn'
    },
    {
        uri: 'http://honeys.vn/vnt_upload/product/01_2016/noi-inox-3-day-honeys-hop02s32401-24cm.jpg',
        price: '50.000 vnđ',
        name: 'Nổi lẩu gia đình cỡ lớn'
    },
];

const popular_category = [
    {
        uri: 'http://bizweb.dktcdn.net/100/074/637/files/91zwiajhz-plus-l-sl1500-copy.jpg?v=1495704707827',
        name: 'Đồ Gia Dụng'
    },
    {
        uri: 'http://maylocnuocviet.com/data_store/anhdaidien/may-loc-nuoc-kangaroo-kg-104-uv-tu-vtu.jpg',
        name: 'Máy Lọc Nước'
    },
    {
        uri: 'https://images-na.ssl-images-amazon.com/images/I/71HG3D8-OQL._SL1350_.jpg',
        name: 'Điện Tử'
    },
    {
        uri: 'http://img1.baza.vn/upload/products-var-721iNnw1/yNlMZqX1large.jpg?v=634902362718235839',
        name: 'Trang Sức'
    },
    {
        uri: 'https://donghoeverest.vn/wp-content/uploads/2016/09/4-1.jpg',
        name: 'Đồng Hồ'
    },
    {
        uri: 'http://suachuamaygiat.vn/wp-content/uploads/2013/06/sua-may-giat-electrolux51.jpg',
        name: 'Điện Lạnh'
    },
];

const extend_category = [
    {
        uri: 'http://gl.amthuc365.vn/uploads/thumbs/News-thumb/379-333-ham-luong-duong-qua-nhieu-trong-do-uong-cc6a.jpg',
        name: 'Đồ Uống'
    },
    {
        uri: 'https://chamchut.com/wp-content/uploads/2018/05/04-luu-y-cach-chon-hop-dung-thuc-pham-an-toan.jpg',
        name: 'Thực phẩm'
    },
    {
        uri: 'http://thammyhanquoc.vn/wp-content/uploads/2017/07/th%E1%BA%A9m-m%E1%BB%B9-m%E1%BA%AFt-cicle-eye.jpg',
        name: 'Làm Đẹp'
    },
];

const all_products = [
    {
        uri: 'http://gl.amthuc365.vn/uploads/thumbs/News-thumb/379-333-ham-luong-duong-qua-nhieu-trong-do-uong-cc6a.jpg',
        name: 'Nước sinh tố'
    },
    {
        uri: 'http://suachuamaygiat.vn/wp-content/uploads/2013/06/sua-may-giat-electrolux51.jpg',
        name: 'Máy giặt Samsung'
    },
    {
        uri: 'https://donghoeverest.vn/wp-content/uploads/2016/09/4-1.jpg',
        name: 'Đồng hồ Rolex'
    },
    {
        uri: 'http://maylocnuocviet.com/data_store/anhdaidien/may-loc-nuoc-kangaroo-kg-104-uv-tu-vtu.jpg',
        name: 'Máy lọc nước Kangaroo'
    },
    {
        uri: 'https://images-na.ssl-images-amazon.com/images/I/71HG3D8-OQL._SL1350_.jpg',
        name: 'Macbook Pro 2017'
    },
];

class Categories extends Component {

    static navigationOptions = {
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    renderEmpty = () => {
        if (this.props.categories.loading === true) {
            return (
                <ActivityIndicator animating={true} color={priColor} size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: priColor }}>Không có phân khúc sản phẩm nào</Text>
            </View>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <NormalHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' count={0} />
                <View style={{ flex: 1, backgroundColor: priColor }}>
                    <ScrollView style={{ flex: 1, backgroundColor: priColor, }}>
                        <ListHeader color='red' title='SẢN PHẨM BÁN CHẠY' />
                        <ScrollView style={{ paddingLeft: 5, backgroundColor: 'white' }} horizontal={true} pagingEnabled={true}>
                            {hot_trend.map((item, index) => {
                                return <HotTrend key={index} uri={item.uri} price={item.price} navigation={this.props.navigation} />
                            })}
                        </ScrollView>
                        <ListHeader color='yellow' title='NGÀNH HÀNG' />
                        <View style={{ backgroundColor: 'white', paddingTop: 10, paddingBottom: 5 }}>
                            <FlatList
                                style={{ marginLeft: 10, marginRight: 5, backgroundColor: 'white' }}
                                data={popular_category}
                                numColumns={3}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={{ backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 40) / 3, flex: 1, height: null, marginRight: 5, marginBottom: 5 }} onPress={() => { this.props.navigation.navigate('Detail') }}>
                                            <View style={{}}>
                                                <Image source={{ uri: item.uri }} style={{ alignSelf: 'center', padding: 3, width: 2 * (width - 40) / 9, height: 2 * (width - 40) / 9, resizeMode: 'contain' }} />
                                                <Text numberOfLines={2} style={{ paddingVertical: 12, fontSize: responsiveFontSize(1.7), textAlign: 'center', padding: 1 }}>{item.name}</Text>
                                            </View>

                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => item.name + index}
                                ListEmptyComponent={this.renderEmpty}
                            />
                        </View>
                        <ListHeader color='yellow' title='NGÀNH MỞ RỘNG' />
                        <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                            <FlatList
                                style={{ marginLeft: 10, marginRight: 5, backgroundColor: 'white' }}
                                data={extend_category}
                                horizontal={true}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={{ backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 30) / 3, flex: 1, height: null, marginRight: 5, }} onPress={() => { this.props.navigation.navigate('Detail') }}>
                                            <View style={{}}>
                                                <Image source={{ uri: item.uri }} style={{ alignSelf: 'center', padding: 3, width: 2 * (width - 30) / 9, height: 2 * (width - 30) / 9, resizeMode: 'contain' }} />
                                                <Text numberOfLines={2} style={{ paddingVertical: 12, fontSize: responsiveFontSize(1.7), textAlign: 'center', padding: 1 }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => item.name + index}
                                ListEmptyComponent={this.renderEmpty}
                            />
                        </View>
                        <ListHeader color='blue' title='SẢN PHẨM' />
                        <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                            <FlatList
                                style={{ marginLeft: 10, marginRight: 5, backgroundColor: 'white' }}
                                data={all_products}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={{ paddingBottom: 10, marginRight: 5, backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 30) / 3, flex: 1, height: null }} onPress={() => { this.props.navigation.navigate('Detail') }}>
                                            <View style={{}}>
                                                <Image source={{ uri: item.uri }} style={{ alignSelf: 'center', padding: 3, width: 2 * (width - 30) / 9, height: 2 * (width - 30) / 9, resizeMode: 'contain' }} />
                                                <Text ellipsizeMode='tail' numberOfLines={2} style={{ paddingVertical: 12, fontSize: responsiveFontSize(1.7), textAlign: 'center', padding: 1 }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => item.name + index}
                                ListEmptyComponent={this.renderEmpty}
                            />
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
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    buttons: {
        zIndex: 1,
        height: 15,
        marginTop: -25,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    normalButton: {
        width: 10, height: 10, borderRadius: 5, borderWidth: 1,
        backgroundColor: 'transparent', borderColor: 'white'
    },
    buttonSelected: {
        width: 10, height: 10, borderRadius: 5, borderWidth: 1,
        backgroundColor: 'white', borderColor: 'white'
    },
    button: {
        margin: 3,
        width: 15,
        height: 15,
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    customSlide: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: width,
        height: null,
        flex: 1
    },
};

const mapStateToProps = (state) => {
    return {
        categories: state.category
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCategories: () => {
            dispatch(fetchAllCategories());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);