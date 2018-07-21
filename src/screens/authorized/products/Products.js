//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableHighlight, FlatList, TouchableOpacity, ActivityIndicator, Platform, ScrollView } from 'react-native';

import BackSearchHeader from '../../../components/BackSearchHeader';

import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';

import { Tab, Tabs, Button, Icon, Text, Card, Body } from 'native-base';
import { priColor } from '../../../constants/colors';
import { host } from '../../../constants/api';

const ListHeader = ({ title, color }) => {
    return (
        <View style={{ backgroundColor: priColor, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', paddingVertical: 15, }}>
            <View style={{ backgroundColor: color, width: responsiveFontSize(1.5), height: responsiveFontSize(3), marginRight: 10 }}></View>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.9), fontWeight: 'bold' }}>{title}</Text>
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
            current_page: 1,
            loadingMore: false,
            total_page: 1000
        }
    }

    componentDidMount() {
        const { id } = this.props.navigation.state.params;
        // console.log(this.state.loading);
        this.setState({
            loading: true
        }, () => {
            fetch(`${host}/categories/${id}?per_page=12&page=${this.state.current_page}`)
                .then(res => res.json())
                .then(resData => {
                    // console.log(resData);
                    if (resData.code === 200) {
                        this.setState({
                            products: resData.data,
                            loading: false,
                            total_page: resData.last_page
                        });
                    }
                })
                .catch(e => {
                    alert('Có lỗi khi lấy sản phẩm về');
                    this.setState({ loading: false });
                });
        });

    }

    handleLoadMore = () => {
        if (this.state.current_page + 1 < this.state.total_page) {
            const { id } = this.props.navigation.state.params;
            this.setState({
                current_page: this.state.current_page + 1,
                loadingMore: true
            }, () => {
                fetch(`${host}/categories/${id}?per_page=12&page=${this.state.current_page}`)
                    .then(res => res.json())
                    .then(resData => {
                        // console.log(resData);
                        if (resData.code === 200) {
                            this.setState({
                                products: [...this.state.products, ...resData.data],
                                loadingMore: false
                            });
                        }
                    })
                    .catch(e => {
                        this.setState({ loadingMore: false });
                    })
            });
        }
    }

    renderEmpty = () => {
        if (this.state.loading === true) {
            return (
                <ActivityIndicator style={{ alignSelf: 'center' }} animating={true} color={priColor} size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: priColor }}>Không có ngành hàng nào</Text>
            </View>
        );
    }

    renderFooter = () => {
        if (!this.state.loadingMore) return null;
        return (
            <View style={{ height: 100, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={priColor} animating={true} size='large' />
            </View>
        );
    }

    render() {
        const { title, uri } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <BackSearchHeader navigation={this.props.navigation} />
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {/* <View style={{ width: width, height: height / 5 }}>
                        <Image source={{ uri: uri }} style={styles.customImage} />
                    </View>
                    <View style={styles.foreground}>
                        <Image style={{ width: width, height: height / 5, resizeMode: 'contain' }} source={{ uri: uri }} />
                    </View> */}
                    <Image style={{ width: width, height: height / 5, resizeMode: 'cover' }} source={{ uri: uri }} />
                    <View style={styles.foreground}>
                        <Image style={{ width: width, height: height / 5, resizeMode: 'contain' }} source={{ uri: uri }} />
                    </View>
                    <ListHeader title={title} color='blue' />
                    <View style={{ backgroundColor: 'white', paddingTop: 10, paddingBottom: 10, flex: 1 }}>
                        <FlatList
                            style={{ marginLeft: 10, marginRight: 5, backgroundColor: 'white', flex: 1 }}
                            data={this.state.products}
                            numColumns={3}
                            onEndReached={this.handleLoadMore}
                            onEndReachedThreshold={Platform.OS === 'ios' ? -0.1 : 0.2}
                            ListFooterComponent={this.renderFooter}
                            // removeClippedSubviews={true}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 40) / 3, flex: 1, height: null, marginRight: 5, marginBottom: 5 }} onPress={() => { this.props.navigation.navigate('Detail', { item: item }) }}>
                                        <View style={{}}>
                                            <Image source={{ uri: item.logo }} style={{ alignSelf: 'center', padding: 3, width: 2 * (width - 40) / 9, height: 2 * (width - 40) / 9, resizeMode: 'contain' }} />
                                            <Text numberOfLines={3} ellipsizeMode='tail' style={{ paddingVertical: 12, fontSize: responsiveFontSize(1.7), textAlign: 'center', padding: 1 }}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => item.name + index + item.gtin + item.id + 'products'}
                            ListEmptyComponent={this.renderEmpty}
                        />
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

//make this component available to the app
export default Products;
