import React, { Component } from 'react';
import { View, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView, TouchableHighlight, RefreshControl, Platform } from 'react-native';
import NormalHeader from '../../../components/NormalHeader';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import { connect } from 'react-redux';

import { fetchAllCategories } from '../../../actions';
import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';

import { priColor } from '../../../constants/colors';
import { host } from '../../../constants/api';

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
        <TouchableOpacity onPress={() => { navigation.navigate('Detail') }} style={{ backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 30) / 3, flex: 1, height: null, marginRight: 5, }}>
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
        uri: 'https://www.thegioinuochoa.com.vn/img/1.png',
        price: '500.000 vnđ',
        name: 'Nước hoa Amo'
    },
    {
        uri: 'http://thosuadieuhoa.net/wp-content/uploads/2016/03/dieu-hoa-toshiba.jpg',
        price: '50.000 vnđ',
        name: 'Điều hòa Toshiba'
    },
    {
        uri: 'https://cdn.tgdd.vn/Products/Images/1943/100670/tu-lanh-samsung-rf56k9041sg-sv-190x190.png',
        price: '50.000 vnđ',
        name: 'Tủ lạnh Samsung'
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
            loading_popular_category: false,
            loading_extend_category: false,
            loading_hot_products: false,
            loading_all_products: false,
            popular_category: [],
            hot_trend: [],
            all_products: [],
            extend_category: [],
            loadMore: false
        }
    }

    componentDidMount() {
        this.setState({ loading_popular_category: true, loading_extend_category: true, loading_all_products: true, loading_hot_products: true });

        fetch(`${host}/categories/normal`)
            .then(response => response.json())
            .then(responseData => {
                if (responseData.code === 200) {
                    this.setState({
                        popular_category: responseData.data,
                    });
                }
                this.setState({ loading_popular_category: false });
            })
            .catch(e => {
                this.setState({ loading_popular_category: false });
                alert('Có lỗi khi lấy ngành hàng');
            });

        fetch(`${host}/categories/expansion`)
            .then(response => response.json())
            .then(responseData => {
                if (responseData.code === 200) {
                    this.setState({
                        extend_category: responseData.data,
                    });
                }
                this.setState({ loading_extend_category: false });
            })
            .catch(e => {
                this.setState({ loading_extend_category: false });
                alert('Có lỗi khi lấy ngành hàng mở rộng');
            });

        fetch(`${host}/products?sort_by=discount&sort_type=desc&per_page=10`)
            .then(response => response.json())
            .then(responseData => {
                if (responseData.code === 200) {
                    this.setState({
                        hot_trend: responseData.data,
                    });
                }
                this.setState({ loading_hot_products: false });
            })
            .catch(e => {
                this.setState({ loading_hot_products: false });
                alert('Có lỗi khi lấy sản phẩm hot');
            });

        fetch(`${host}/products`)
            .then(response => response.json())
            .then(responseData => {
                if (responseData.code === 200) {
                    this.setState({
                        all_products: responseData.data,
                    });
                }
                this.setState({ loading_all_products: false });
            })
            .catch(e => {
                this.setState({ loading_all_products: false });
                alert('Có lỗi khi lấy tất cả sản phẩm');
            });
    }

    renderCategoryEmpty = () => {
        if (this.state.loading_popular_category === true) {
            return (
                <ActivityIndicator animating={true} color={priColor} size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: priColor }}>Không có ngành hàng nào</Text>
            </View>
        );
    }

    renderExtendCategoryEmpty = () => {
        if (this.state.loading_extend_category === true) {
            return (
                <ActivityIndicator animating={true} color={priColor} size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: priColor }}>Không có ngành hàng nào</Text>
            </View>
        );
    }

    renderHotProductsEmpty = () => {
        if (this.state.loading_hot_products === true) {
            return (
                <ActivityIndicator animating={true} color={priColor} size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: priColor }}>Không có ngành hàng nào</Text>
            </View>
        );
    }

    renderAllProductsEmpty = () => {
        if (this.state.loading_all_products === true) {
            return (
                <ActivityIndicator animating={true} color={priColor} size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: priColor }}>Không có ngành hàng nào</Text>
            </View>
        );
    }

    handleLoadMore = () => {
        this.setState({ loadMore: true });
    }

    renderProductsFooter = () => {
        if (!this.state.loadMore) return null;
        return (
            <View style={{ height: 50, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='white' animating={true} size='large' />
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
                        <View style={{ backgroundColor: 'white', paddingVertical: 10, alignItems: 'center' }}>
                            <FlatList
                                style={{ marginLeft: 10, marginRight: 5, backgroundColor: 'white' }}
                                data={this.state.hot_trend}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={{ paddingBottom: 10, marginRight: 5, backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 30) / 3, flex: 1, height: null }} onPress={() => { this.props.navigation.navigate('Detail') }}>
                                            <View style={{}}>
                                                {item.logo !== null ?
                                                    <Image source={{ uri: item.logo }} style={{ alignSelf: 'center', padding: 3, width: 2 * (width - 30) / 9, height: 2 * (width - 30) / 9, resizeMode: 'contain' }} />
                                                    :
                                                    <Image source={require('../../../assets/imgs/noImg.png')} style={{ alignSelf: 'center', padding: 3, width: 2 * (width - 30) / 9, height: 2 * (width - 30) / 9, resizeMode: 'contain' }} />
                                                }
                                                <Text ellipsizeMode='tail' numberOfLines={2} style={{ paddingVertical: 15, fontSize: responsiveFontSize(1.7), textAlign: 'center', padding: 1 }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => item.name + index}
                                ListEmptyComponent={this.renderHotProductsEmpty}
                            />
                        </View>
                        <ListHeader color='yellow' title='NGÀNH HÀNG' />
                        <View style={{ backgroundColor: 'white', paddingTop: 10, paddingBottom: 5 }}>
                            <FlatList
                                style={{ marginLeft: 10, marginRight: 5, backgroundColor: 'white' }}
                                data={this.state.popular_category}
                                numColumns={3}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={{ backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 40) / 3, flex: 1, height: null, marginRight: 5, marginBottom: 5 }} onPress={() => { this.props.navigation.navigate('Detail') }}>
                                            <View style={{}}>
                                                <Image source={{ uri: item.image }} style={{ alignSelf: 'center', padding: 3, width: 2 * (width - 40) / 9, height: 2 * (width - 40) / 9, resizeMode: 'contain' }} />
                                                <Text numberOfLines={3} ellipsizeMode='tail' style={{ paddingVertical: 12, fontSize: responsiveFontSize(1.7), textAlign: 'center', padding: 1 }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => item.name + index}
                                ListEmptyComponent={this.renderCategoryEmpty}
                            />
                        </View>
                        <ListHeader color='yellow' title='NGÀNH MỞ RỘNG' />
                        <View style={{ backgroundColor: 'white', paddingTop: 10, paddingBottom: 5 }}>
                            <FlatList
                                style={{ marginLeft: 10, marginRight: 5, backgroundColor: 'white' }}
                                data={this.state.extend_category}
                                numColumns={3}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={{ backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 40) / 3, flex: 1, height: null, marginRight: 5, marginBottom: 5 }} onPress={() => { this.props.navigation.navigate('Detail') }}>
                                            <View style={{}}>
                                                <Image source={{ uri: item.image }} style={{ alignSelf: 'center', padding: 3, width: 2 * (width - 40) / 9, height: 2 * (width - 40) / 9, resizeMode: 'contain' }} />
                                                <Text numberOfLines={3} ellipsizeMode='tail' style={{ paddingVertical: 12, fontSize: responsiveFontSize(1.7), textAlign: 'center', padding: 1 }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => item.name + index}
                                ListEmptyComponent={this.renderExtendCategoryEmpty}
                            />
                        </View>
                        <ListHeader color='blue' title='SẢN PHẨM' />
                        <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                            <FlatList
                                style={{ marginLeft: 10, marginRight: 5, backgroundColor: 'white' }}
                                data={this.state.all_products}
                                showsHorizontalScrollIndicator={false}
                                onEndReached={this.handleLoadMore}
                                onEndReachedThreshold={Platform.OS === 'ios' ? -0.2 : 0.1}
                                horizontal={true}
                                ListFooterComponent={this.renderProductsFooter}
                                removeClippedSubviews={true}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={{ paddingBottom: 10, marginRight: 5, backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 30) / 3, flex: 1, height: null }} onPress={() => { this.props.navigation.navigate('Detail') }}>
                                            <View style={{}}>
                                                <Image source={{ uri: item.logo }} style={{ alignSelf: 'center', padding: 3, width: 2 * (width - 30) / 9, height: 2 * (width - 30) / 9, resizeMode: 'contain' }} />
                                                <Text ellipsizeMode='tail' numberOfLines={3} style={{ paddingVertical: 20, fontSize: responsiveFontSize(1.7), textAlign: 'center', padding: 1 }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => item.name + index}
                                ListEmptyComponent={this.renderAllProductsEmpty}
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