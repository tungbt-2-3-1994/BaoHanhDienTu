import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, FlatList, ScrollView } from 'react-native';

import BackHeader from '../../../components/BackHeader';
import { width, height } from '../../../constants/dimensions';
import { priColor } from '../../../constants/colors';
import ImageProgress from 'react-native-image-progress';
import ImageSlider from 'react-native-image-slider';
import { responsiveFontSize } from '../../../utils/helpers';
import { Icon } from 'native-base';
import { host } from '../../../constants/api';

const CrossText = ({ text }) => {
    return (
        <View style={{}}>
            <Text style={{ fontSize: responsiveFontSize(1.3), color: 'rgba(255, 255, 255, 0.6)' }}>{text}</Text>
            <View style={{ position: 'absolute', top: responsiveFontSize(0.9), left: 0, right: 0, height: 1, width: null, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></View>
        </View>
    );
}

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            same_products: [],
            product: {}
        }
    }

    componentWillMount() {

        const { item } = this.props.navigation.state.params;
        this.setState({ product: item });

        fetch(`${host}/organizations/${item.organization_id}/products?per_page=5`)
            .then(res => res.json())
            .then(resData => {
                if (resData.code === 200) {
                    this.setState({
                        same_products: resData.data,
                    });
                }
            })
            .catch(e => {
                alert('Có lỗi khi lấy sản phẩm về');
            });
    }

    componentWillUnmount() {

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

        // const { item } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} title='CHI TIẾT SẢN PHẨM' />
                <View style={{ flex: 1, paddingBottom: height / 16 }}>
                    <ScrollView ref='myScroll' style={{ backgroundColor: priColor, flex: 1 }}>
                        {/* <View style={{ width: width, height: height / 5, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.8)', }}>
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
                        </View> */}
                        <Image style={{ width: width, height: height / 5, resizeMode: 'cover' }} source={{ uri: this.state.product.logo }} />
                        <View style={styles.foreground}>
                            <Image style={{ width: width, height: height / 5, resizeMode: 'contain' }} source={{ uri: this.state.product.logo }} />
                        </View>
                        <View style={{ paddingHorizontal: 10, paddingTop: 10, paddingBottom: 20 }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }}>{this.state.product.name.toUpperCase()}</Text>
                            {/* <Text style={{ fontSize: responsiveFontSize(1.6), color: 'white', marginTop: 10 }}>Đơn vị: Chiếc</Text> */}
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 20 }}>
                                <Text style={{ fontSize: responsiveFontSize(2), color: 'yellow' }}>{this.state.product.price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')} vnđ</Text>
                            </View>
                            <View style={{ padding: 1, marginTop: 20 }}>
                                <Text style={{ padding: 0, fontSize: responsiveFontSize(1.6), color: 'white', }}>asasasasas</Text>
                            </View>
                            {/* <TouchableOpacity style={{ marginTop: 10, padding: 5, backgroundColor: '#538240', width: 100, borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), textAlign: 'center' }}>Xem thêm</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ backgroundColor: 'white', height: 2, width: width }}></View>
                        <View style={{ paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10 }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }}>Sản phẩm cùng loại</Text>
                            <FlatList
                                style={{ marginBottom: 5, marginTop: 15 }}
                                data={this.state.same_products}
                                // refreshing={this.state.refreshing}
                                // onRefresh={this.handleRefresh}
                                ItemSeparatorComponent={this.separateView}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                product: item
                                            });
                                            this.refs.myScroll.scrollTo({ x: 0, y: 0, animated: true });
                                        }} style={{ flexDirection: 'row', backgroundColor: priColor, width: width - 10, height: null, flex: 1, marginBottom: 5, backgroundColor: priColor, }}>
                                            <Image source={{ uri: item.logo }} style={{ height: 2 * (width - 20) / 9 - 5, width: 2 * (width - 20) / 9 - 5, borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, alignSelf: 'center' }} />
                                            <View style={{ paddingHorizontal: 3, width: 7 * (width - 20) / 9, justifyContent: 'space-between', paddingBottom: (width - 20) / 27, paddingTop: 2 }}>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingHorizontal: 3, fontSize: responsiveFontSize(1.6), color: 'white', fontWeight: 'bold' }}>{item.name.toUpperCase()}</Text>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingHorizontal: 3, fontSize: responsiveFontSize(1.6), color: 'yellow' }}>{item.price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')} vnđ</Text>
                                                <View style={{ paddingHorizontal: 3, flexDirection: 'row' }}>
                                                    <CrossText text={item.price + 'vnđ'} />
                                                    <Text style={{ fontSize: responsiveFontSize(1.3), color: 'rgba(0, 0, 0, 0.6)' }}> -{item.discount}%</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => { }} style={{ position: 'absolute', right: 0, bottom: 0, borderColor: 'yellow', borderWidth: 1, paddingVertical: 2, paddingHorizontal: 5 }}>
                                                    <Text style={{ color: 'yellow', fontSize: responsiveFontSize(1.6) }}>Mua ngay</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => index + item.gtin + 'products'}
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
    foreground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height / 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Detail;

