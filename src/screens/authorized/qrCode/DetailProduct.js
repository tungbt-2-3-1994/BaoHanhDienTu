import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, FlatList, ScrollView } from 'react-native';

import BackHeader from '../../../components/BackHeader';
import { width, height } from '../../../constants/dimensions';
import { priColor } from '../../../constants/colors';
import ImageProgress from 'react-native-image-progress';
import ImageSlider from 'react-native-image-slider';
import { responsiveFontSize } from '../../../utils/helpers';
import { Icon } from 'native-base';

const data = [
    {
        title: 'Nồi lẩu siên bền dành cho gia đình'
    },
    {
        title: 'Nồi lẩu siên bền dành cho hộ gia đình'
    },
    {
        title: 'Nồi lẩu siên bền dành cho hộ gia đình 2'
    },

];

const CrossText = ({ text }) => {
    return (
        <View style={{}}>
            <Text style={{ fontSize: responsiveFontSize(1.3), color: 'rgba(255, 255, 255, 0.6)' }}>{text}</Text>
            <View style={{ position: 'absolute', top: responsiveFontSize(0.9), left: 0, right: 0, height: 1, width: null, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></View>
        </View>
    );
}

class DetailProduct extends Component {

    componentDidMount() {
        this.props.navigation.state.params.onDone(false);

    }

    componentWillUnmount() {
        this.props.navigation.state.params.onDone(true);
    }

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
        const images = [
            require('../../../assets/imgs/grape1.jpg'),
            require('../../../assets/imgs/grape2.jpeg'),
            require('../../../assets/imgs/grape3.jpg'),
            require('../../../assets/imgs/grape4.jpeg'),
        ];

        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} title='CHI TIẾT SẢN PHẨM' />
                <View style={{ flex: 1, paddingBottom: height / 16 }}>
                    <ScrollView style={{ backgroundColor: priColor, flex: 1 }}>
                        <View style={{ width: width, height: height / 5, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.8)', }}>
                            <ImageSlider
                                loopBothSides
                                autoPlayWithInterval={3000}
                                images={images}
                                customSlide={({ index, item, style, width }) => (
                                    <View key={index} style={[style, styles.customSlide]}>
                                        <Image source={item} style={styles.customImage} />
                                    </View>
                                )}
                                customButtons={(position, move) => (
                                    <View style={styles.buttons}>
                                        {images.map((image, index) => {
                                            return (
                                                <TouchableHighlight
                                                    key={index}
                                                    underlayColor="#ccc"
                                                    onPress={() => move(index)}
                                                    style={styles.button}
                                                >
                                                    <View style={position === index ? styles.buttonSelected : styles.normalButton}></View>
                                                </TouchableHighlight>
                                            );
                                        })}
                                    </View>
                                )}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 10, paddingTop: 10, paddingBottom: 20 }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }}>Điều hòa Panasonic PC12GKH</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.6), color: 'white', marginTop: 10 }}>Đơn vị: Chiếc</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 20 }}>
                                <Text style={{ fontSize: responsiveFontSize(1.6), color: 'yellow' }}>500.000 vnđ</Text>
                            </View>
                            <View style={{ padding: 1, marginTop: 20 }}>
                                <Text style={{ zIndex: 2, padding: 0, fontSize: responsiveFontSize(1.6), color: 'white', }}>Điều hòa Panasonic PC12GKH tiết kiệm điện, làm sạch môi trường. Tự động ngắt điện khi đã đủ nhiệt. More info</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 2, width: width }}></View>
                        <View style={{ paddingHorizontal: 10, paddingTop: 5, paddingBottom: 10 }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }}>Sản phẩm cùng loại</Text>
                            <FlatList
                                style={{ marginBottom: 5, marginTop: 15 }}
                                data={data}
                                // refreshing={this.state.refreshing}
                                // onRefresh={this.handleRefresh}
                                ItemSeparatorComponent={this.separateView}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', backgroundColor: priColor, width: width - 10, height: null, flex: 1, marginBottom: 5, backgroundColor: priColor, }}>
                                            <Image source={{ uri: 'https://media3.scdn.vn/img2/2018/3_28/Mi0yHg_simg_b5529c_250x250_maxb.jpg' }} style={{ height: 2 * (width - 20) / 9 - 5, width: 2 * (width - 20) / 9 - 5, borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, alignSelf: 'center' }} />
                                            <View style={{ paddingHorizontal: 3, width: 7 * (width - 20) / 9, justifyContent: 'space-between', paddingBottom: (width - 20) / 27 }}>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingHorizontal: 3, fontSize: responsiveFontSize(1.6), color: 'white' }}>{item.title}</Text>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingHorizontal: 3, fontSize: responsiveFontSize(1.6), color: 'yellow' }}>100.000vnđ</Text>
                                                <View style={{ paddingHorizontal: 3, flexDirection: 'row' }}>
                                                    <CrossText text='200.000vnđ' />
                                                    <Text style={{ fontSize: responsiveFontSize(1.3), color: 'rgba(0, 0, 0, 0.6)' }}> -50%</Text>
                                                </View>
                                                <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 0, borderColor: 'yellow', borderWidth: 1, paddingBottom: 2 }}>
                                                    <Text style={{ color: 'yellow', fontSize: responsiveFontSize(1.6) }}>Mua ngay</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => item.id + index + item.content + 'news'}
                                ListEmptyComponent={this.renderEmpty}
                            />
                        </View>
                    </ScrollView>
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: height / 16, flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flex: 0.2, backgroundColor: '#9ed6de', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon type='FontAwesome' name='cart-arrow-down' style={{ color: 'white', fontSize: responsiveFontSize(4) }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.2, backgroundColor: '#9ed6de', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon type='Ionicons' name='ios-share-outline' style={{ color: 'white', fontSize: responsiveFontSize(4) }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.6, backgroundColor: '#ff7d2f', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(3), fontWeight: 'bold' }}>MUA NGAY</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    button: {
        margin: 3,
        width: 15,
        height: 15,
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    normalButton: {
        width: 10, height: 10, borderRadius: 5, borderWidth: 1,
        backgroundColor: 'transparent', borderColor: 'white'
    },
    buttonSelected: {
        width: 10, height: 10, borderRadius: 5, borderWidth: 1,
        backgroundColor: 'white', borderColor: 'white'
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
});

export default DetailProduct;

