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
                        <ListHeader color='red' title='XU HƯỚNG' />
                        <ScrollView style={{ paddingLeft: 5 }} horizontal={true} pagingEnabled={true}>
                            {hot_trend.map((item, index) => {
                                return <HotTrend key={index} uri={item.uri} price={item.price} navigation={this.props.navigation} />
                            })}
                        </ScrollView>
                        <ListHeader color='yellow' title='DÀNH CHO BẠN' />

                        <FlatList
                            style={{ paddingLeft: 5 }}
                            data={hot_trend}
                            numColumns={2}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ backgroundColor: 'white', marginRight: 5, marginBottom: 5 }} onPress={() => { this.props.navigation.navigate('Detail') }}>
                                        <View style={{ width: (width - 15) / 2, height: null, flex: 1, }}>
                                            <Image style={{ width: (width - 30) / 2, height: (width - 30) / 2 }} source={{ uri: item.uri }} />
                                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ paddingVertical: 5, paddingHorizontal: 20, textAlign: 'center', fontSize: responsiveFontSize(1.9) }}>
                                                {item.name}
                                            </Text>
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5 }}>
                                                <Text style={{ fontSize: responsiveFontSize(1.6), fontWeight: 'bold', }}>{item.price}</Text>
                                                <Text style={{ fontSize: responsiveFontSize(1.6), }}>1 chiếc</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => item.name + index}
                            ListEmptyComponent={this.renderEmpty}
                        />
                    </ScrollView>
                </View>
            </View>
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