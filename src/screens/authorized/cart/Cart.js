import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';

import CartHeader from '../../../components/CartHeader';
import { priColor } from '../../../constants/colors';
import { responsiveFontSize } from '../../../utils/helpers';
import { width, height } from '../../../constants/dimensions';
import { Icon, CardItem } from 'native-base';

const TextHeader = ({ text }) => {
    return (
        <View style={{ backgroundColor: '#cccccc', padding: 5, paddingHorizontal: 20 }}>
            <Text style={{ color: 'black', fontSize: responsiveFontSize(2) }}>{text}</Text>
        </View>
    );
}

const CrossText = ({ text }) => {
    return (
        <View style={{}}>
            <Text style={{ fontSize: responsiveFontSize(1.3), color: 'white' }}>{text}</Text>
            <View style={{ position: 'absolute', top: responsiveFontSize(0.9), left: 0, right: 0, height: 1, width: null, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></View>
        </View>
    );
}

const CartRow = ({ url, title, des, salePrice, realPrice, discount, quantity }) => {
    return (
        <View style={{ padding: 5, flexDirection: 'row', width: width }}>
            <Image source={{ uri: url }} style={{ borderWidth: 1, borderColor: 'white', width: 5 * (width - 10) / 16, height: 5 * (width - 10) / 16 }} />
            <View style={{ width: 11 * (width - 10) / 16, paddingLeft: 5, justifyContent: 'space-between' }}>
                <View>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: responsiveFontSize(2), color: 'white' }}>{title}</Text>
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.3) }} numberOfLines={1} ellipsizeMode='tail'>{des}</Text>
                    <Text style={{ color: 'orange', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>{salePrice}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <CrossText text={realPrice} />
                        <Text style={{ marginLeft: 20, fontSize: responsiveFontSize(1.3), color: 'black', fontWeight: 'bold' }}>-{discount}%</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={{ marginLeft: 20 }}>
                            <Icon name='trash' style={{ color: 'white', fontSize: responsiveFontSize(3) }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), color: 'white' }}>{quantity}</Text>
                        <TouchableOpacity style={{ marginLeft: 20 }}>
                            <Icon name='arrow-dropup' style={{ color: 'white', fontSize: responsiveFontSize(3) }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 20 }}>
                            <Icon name='arrow-dropdown' style={{ color: 'red', fontSize: responsiveFontSize(3) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const data = [
    {
        url: 'https://noigiadinh.com/wp-content/uploads/noi-com-dien-Midea-co-18SJC-1.8L.jpg',
        title: 'Chảo chống dính cao cấp 2018',
        des: 'Nhôm, màu bạc',
        salePrice: '50.000 vnđ',
        realPrice: '100.000 vnđ',
        discount: '50',
        quantity: 1,
    },
    {
        url: 'https://noigiadinh.com/wp-content/uploads/noi-com-dien-Midea-co-18SJC-1.8L.jpg',
        title: 'Chảo chống dính cao cấp 2018',
        des: 'Nhôm, màu bạc',
        salePrice: '50.000 vnđ',
        realPrice: '100.000 vnđ',
        discount: '50',
        quantity: 2,
    },
    {
        url: 'https://noigiadinh.com/wp-content/uploads/noi-com-dien-Midea-co-18SJC-1.8L.jpg',
        title: 'Chảo chống dính cao cấp 2018',
        des: 'Nhôm, màu bạc',
        salePrice: '50.000 vnđ',
        realPrice: '100.000 vnđ',
        discount: '50',
        quantity: 3,
    }
];

class Cart extends Component {

    renderEmpty = () => {
        if (this.state.loading === true) {
            return (
                <ActivityIndicator animating={true} color='white' size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white' }}>Không có phân khúc sản phẩm nào</Text>
            </View>
        );
    }

    separateView = () => {
        return (
            <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)', marginBottom: 5 }}></View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <CartHeader title='GIỎ HÀNG' navigation={this.props.navigation} />
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, backgroundColor: priColor, marginBottom: 2 * height / 15 }}>
                        <TextHeader text='Giỏ hàng của tôi' />
                        <FlatList
                            style={{}}
                            data={data}
                            ItemSeparatorComponent={this.separateView}
                            renderItem={({ item }) => {
                                return (
                                    <CartRow url={item.url} title={item.title} des={item.des} salePrice={item.salePrice} realPrice={item.realPrice} discount={item.discount} quantity={item.quantity} />
                                );
                            }}
                            keyExtractor={(item, index) => item.title + index + item.content + 'cartsItem'}
                            ListEmptyComponent={this.renderEmpty}
                        />

                        <View style={{ backgroundColor: 'white', height: 2, width: width }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, paddingHorizontal: 15 }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), }}>Vận chuyển</Text>
                            <Text style={{ color: '#f97e2b', fontSize: responsiveFontSize(1.8), }}>Miễn phí</Text>
                        </View>

                        <TextHeader text='Cách thức thanh toán' />
                        <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
                            <Image source={require('../../../assets/imgs/gat.png')} style={{ width: width / 9, height: width / 9 }} />
                            <View style={{ padding: 5, width: 8 * width / 9 - 10 }}>
                                <Text style={{ fontSize: responsiveFontSize(1.8), }}>Thanh toán tại nhà khi kiểm tra hàng hóa - COD</Text>
                            </View>

                        </View>

                    </ScrollView>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: 5, backgroundColor: '#ff7d2f', position: 'absolute', bottom: 0, left: 0, right: 0, height: height / 13 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2.5) }}>ĐẶT HÀNG</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#cccccc', position: 'absolute', left: 0, right: 0, bottom: height / 14 + 10, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(2.3) }}>Tổng thanh toán</Text>
                        <Text style={{ fontWeight: 'bold', color: '#ff7d2f', fontSize: responsiveFontSize(2.3) }}>50.000 vnđ</Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: priColor,
    },
};

export default Cart;
