//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableHighlight, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';

import BackHeader from '../../../components/BackHeader';

import ImageSlider from 'react-native-image-slider';
import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';

import { Tab, Tabs, Button, Icon, Text, Card, Body } from 'native-base';

const ListHeader = ({ title }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', paddingTop: 15, marginBottom: 10 }}>
            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
}

// create a component
class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            page: 1,
            resfreshing: false,
            total_page: 1000
        }
    }

    componentWillMount() {
        // console.log('Products', this.props.navigation.state.params);
        const { id } = this.props.navigation.state.params.item;
        fetch(`http://vatapcheck.com.vn/api/v1/products/category/${id}`)
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
                if (resData.code === 200) {
                    this.setState({ products: resData.data.products, loading: false, total_page: resData.data.total_page });
                }
            })
    }

    handleLoadMore = () => {
        const { id } = this.props.navigation.state.params.item;
        this.setState({
            page: this.state.page + 1,
            refreshing: true
        }, () => {
            fetch(`http://vatapcheck.com.vn/api/v1/products/category/${id}?page=${this.state.page}`)
                .then(res => res.json())
                .then(resData => {
                    if (resData.code === 200) {
                        this.setState({
                            products: [...this.state.products, ...resData.data.products],
                            refreshing: false
                        });
                    }
                })
                .catch(e => {
                    this.setState({ refreshing: false });
                })
        });
    }

    renderEmpty = () => {
        if (this.state.loading === true) {
            return (
                <ActivityIndicator animating={true} color='red' size='large' />
            );
        }
        return (
            <View>
                <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: responsiveFontSize(2), color: 'green' }}>Không có mặt hàng nào trong danh mục này</Text>
            </View>
        );
    }

    renderFooter = () => {
        if (!this.state.refreshing || this.state.page >= this.state.total_page) return null;
        return (
            <View style={{ height: 50, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='red' animating={true} size='large' />
            </View>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} />
                <View style={{ flex: 1, backgroundColor: '#eceaeb' }}>
                    <View style={{ width: width, height: height / 5 }}>
                        <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/categories/${this.props.navigation.state.params.logo}` }} style={styles.customImage} />
                    </View>
                    <ListHeader title='Sản phẩm' />
                    <FlatList
                        style={{ paddingHorizontal: 3, }}
                        data={this.state.products}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={Platform.OS === 'ios' ? -0.2 : 0}
                        ListFooterComponent={this.renderFooter}
                        numColumns={3}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('Detail', item.gtin)}>
                                    <Card style={{ width: (width - 20) / 3, backgroundColor: 'white' }}>
                                        <View>
                                            <Body>
                                                <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/products/${item.logo}` }} style={{ height: (width - 20) / 3, width: (width - 20) / 3, flex: 1, resizeMode: 'stretch' }} />
                                                <Text style={{ padding: 3, textAlign: 'center', fontSize: responsiveFontSize(1.5) }}>
                                                    {item.name}
                                                </Text>
                                                <Text style={{ padding: 3, textAlign: 'center', opacity: 0.9, fontSize: responsiveFontSize(1.5), color: 'red' }}>
                                                    {item.price !== null ? item.price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') : '0'}đ
                                                </Text>
                                            </Body>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => item.id + index + item.gtin}
                        ListEmptyComponent={this.renderEmpty}
                    />
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
    contentText: { color: '#fff' },
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
        flex: 1,
        resizeMode: 'contain'
    }
});

//make this component available to the app
export default Products;
