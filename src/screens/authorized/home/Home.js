import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, WebView, TouchableHighlight, ScrollView, FlatList, ActivityIndicator, Platform, RefreshControl } from 'react-native';
import NormalHeader from '../../../components/NormalHeader';

// import { phonecall, email, text, textWithoutEncoding, web } from 'react-native-communications';

import ImageSlider from 'react-native-image-slider';
import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';

import { Icon } from 'native-base';

import { priColor, activeColor } from '../../../constants/colors';
import { host } from '../../../constants/api';

const CrossText = ({ text }) => {
    return (
        <View style={{}}>
            <Text style={{ fontSize: responsiveFontSize(1.3), color: 'rgba(255, 255, 255, 0.6)' }}>{text} vnđ</Text>
            <View style={{ position: 'absolute', top: responsiveFontSize(0.9), left: 0, right: 0, height: 1, width: null, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></View>
        </View>
    );
}


export default class Home extends Component {

    static navigationOptions = {
    }

    state = {
        news: [],
        discounts: [],
        instructions: [],
        loading: false,
        loading_discount: false,
        loading_instruction: false,
        page: 1,
        current_page: 1,
        current_discount_page: 1,
        current_instruction_page: 1,
        total_page: 1000,
        total_discount_page: 1000,
        total_instruction_page: 1000,
        refreshing_news: false,
        refreshing_discount: false,
        refreshing_instruction: false,
        pull_to_refresh_news: false,
        pull_to_refresh_discount: false,
        pull_to_refresh_instruction: false,
        banners: []
    }

    componentDidMount() {
        this.setState({ loading_discount: true, loading: true, loading_instruction: true });

        fetch(`${host}/tidings/normal?page=${this.state.current_page}`)
            .then(response => response.json())
            .then(responseData => {
                // console.log('as', responseData.data)
                if (responseData.code === 200) {
                    this.setState({
                        news: responseData.data,
                        total_page: responseData.last_page
                    });
                }
                this.setState({ loading: false });
            })
            .catch(e => {
                this.setState({ loading: false });
                alert('Có lỗi khi lấy tin tức mới nhất');
            });

        fetch(`${host}/products/promotion?page=${this.state.current_discount_page}`)
            .then(response => response.json())
            .then(responseData => {
                // console.log('as', responseData.data)
                if (responseData.code === 200) {
                    this.setState({
                        discounts: responseData.data,
                        total_discount_page: responseData.last_page
                    });
                }
                this.setState({ loading_discount: false });
            })
            .catch(e => {
                this.setState({ loading_discount: false });
                alert('Có lỗi khi lấy tin tức mới nhất');
            });
        fetch(`${host}/tidings/guide?page=${this.state.current_instruction_page}`)
            .then(response => response.json())
            .then(responseData => {
                // console.log('as', responseData.data)
                if (responseData.code === 200) {
                    this.setState({
                        instructions: responseData.data,
                        total_instruction_page: responseData.last_page
                    });
                }
                this.setState({ loading_instruction: false });
            })
            .catch(e => {
                this.setState({ loading_instruction: false });
                alert('Có lỗi khi lấy thông tin hướng dẫn');
            });
        fetch(`${host}/banners`)
            .then(response => response.json())
            .then(responseData => {
                console.log('as', responseData);
                if (responseData.code === 200 && responseData.data.length > 0) {
                    this.setState({ banners: responseData.data });
                } else {
                    this.setState({ banners: [{ image: 'https://kienthucmagazine.com/raovat/wp-content/themes/classipost/images/no-banner-image.png' }] });
                }
            })
            .catch(e => {
                console.log('e', e);
                this.setState({ banners: [{ image: 'https://kienthucmagazine.com/raovat/wp-content/themes/classipost/images/no-banner-image.png' }] });
                // alert('Có lỗi khi lấy thông tin hướng dẫn');
            });
    }

    renderInstructionEmpty = () => {
        if (this.state.loading_instruction === true) {
            return (
                <ActivityIndicator animating={true} color='white' size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white' }}>Không có thông tin hướng dẫn</Text>
            </View>
        );
    }

    renderDiscountEmpty = () => {
        if (this.state.loading_discount === true) {
            return (
                <ActivityIndicator animating={true} color='white' size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white' }}>Không có thông tin khuyến mại</Text>
            </View>
        );
    }

    renderEmpty = () => {
        if (this.state.loading === true) {
            return (
                <ActivityIndicator animating={true} color='white' size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white' }}>Không có tin tức cho mục này</Text>
            </View>
        );
    }

    separateView = () => {
        return (
            <View style={{ width: width, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)', marginBottom: 5 }}></View>
        );
    }

    handleLoadMore = () => {
        if (this.state.current_page + 1 < this.state.total_page) {
            this.setState({
                current_page: this.state.current_page + 1,
                loading: true,
                refreshing_news: true
            }, () => {
                fetch(`${host}/tidings/normal?page=${this.state.current_page}`)
                    .then(res => res.json())
                    .then(resData => {
                        if (resData.code === 200) {
                            this.setState({
                                news: [...this.state.news, ...resData.data],
                                loading: false,
                                refreshing_news: false
                            });
                        }
                    })
                    .catch(e => {
                        this.setState({ loading: false, refreshing_news: false });
                    })
            });
        }
    }

    handleDiscountLoadMore = () => {
        if (this.state.current_discount_page + 1 < this.state.total_discount_page) {
            this.setState({
                current_discount_page: this.state.current_discount_page + 1,
                loading_discount: true,
                refreshing_discount: true
            }, () => {
                fetch(`${host}/tidings/normal?page=${this.state.current_discount_page}`)
                    .then(res => res.json())
                    .then(resData => {
                        if (resData.code === 200) {
                            this.setState({
                                discount: [...this.state.discounts, ...resData.data],
                                loading_discount: false,
                                refreshing_discount: false
                            });
                        }
                    })
                    .catch(e => {
                        this.setState({ loading_discount: false, refreshing_discount: false });
                    })
            });
        }
    }
    handleInstructionLoadMore = () => {
        if (this.state.current_instruction_page + 1 < this.state.total_instruction_page) {
            this.setState({
                current_instruction_page: this.state.current_instruction_page + 1,
                loading_instruction: true,
                refreshing_instruction: true
            }, () => {
                fetch(`${host}/tidings/guide?page=${this.state.current_instruction_page}`)
                    .then(res => res.json())
                    .then(resData => {
                        if (resData.code === 200) {
                            this.setState({
                                instructions: [...this.state.instructions, ...resData.data],
                                loading_instruction: false,
                                refreshing_instruction: false
                            });
                        }
                    })
                    .catch(e => {
                        this.setState({ loading_instruction: false, refreshing_instruction: false });
                    })
            });
        }
    }

    handleNewsRefresh = () => {
        this.setState({
            pull_to_refresh_news: true,
            current_page: 1
        }, () => {
            fetch(`${host}/tidings/normal?page=${this.state.current_page}`)
                .then(response => response.json())
                .then(responseData => {
                    // console.log('as', responseData.data)
                    if (responseData.code === 200) {
                        this.setState({
                            news: responseData.data,
                            total_page: responseData.last_page
                        });
                    }
                    this.setState({ pull_to_refresh_news: false });
                })
                .catch(e => {
                    this.setState({ pull_to_refresh_news: false });
                    alert('Có lỗi khi lấy tin tức mới nhất');
                });
        });
    }

    handleDiscountRefresh = () => {
        this.setState({
            pull_to_refresh_discount: true,
            current_discount_page: 1
        }, () => {
            fetch(`${host}/products/promotion?page=${this.state.current_discount_page}`)
                .then(response => response.json())
                .then(responseData => {
                    // console.log('as', responseData.data)
                    if (responseData.code === 200) {
                        this.setState({
                            discounts: responseData.data,
                            total_discount_page: responseData.last_page
                        });
                    }
                    this.setState({ pull_to_refresh_discount: false });
                })
                .catch(e => {
                    this.setState({ pull_to_refresh_discount: false });
                    alert('Có lỗi khi lấy khuyến mãi mới nhất');
                });
        });
    }

    handleInstructionRefresh = () => {
        this.setState({
            pull_to_refresh_instruction: true,
            current_instruction_page: 1
        }, () => {
            fetch(`${host}/tidings/guide?page=${this.state.current_instruction_page}`)
                .then(response => response.json())
                .then(responseData => {
                    // console.log('as', responseData.data)
                    if (responseData.code === 200) {
                        this.setState({
                            instructions: responseData.data,
                            total_instruction_page: responseData.last_page
                        });
                    }
                    this.setState({ pull_to_refresh_instruction: false });
                })
                .catch(e => {
                    this.setState({ pull_to_refresh_instruction: false });
                    alert('Có lỗi khi lấy thông tin hướng dẫn');
                });
        });
    }

    renderFooter = () => {
        if (!this.state.refreshing_news) return null;
        return (
            <View style={{ height: 50, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='white' animating={true} size='large' />
            </View>
        );
    }

    renderDiscountFooter = () => {
        if (!this.state.refreshing_discount) return null;
        return (
            <View style={{ height: 50, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='white' animating={true} size='large' />
            </View>
        );
    }

    renderInstructionFooter = () => {
        if (!this.state.refreshing_instruction) return null;
        return (
            <View style={{ height: 50, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='white' animating={true} size='large' />
            </View>
        );
    }

    render() {

        const images = [
            require('../../../assets/imgs/banner1.png'),
            require('../../../assets/imgs/banner2.png'),
        ];

        return (
            <View style={styles.container}>
                <NormalHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' count={0} />
                <View style={{ flexDirection: 'row', backgroundColor: priColor, paddingVertical: 15, }}>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity onPress={() => this.setState({ page: 1 })} style={[{ justifyContent: 'center', alignItems: 'center', flex: 6, borderColor: 'rgba(255, 255, 255, 0.7)', borderWidth: 1, borderRadius: 15, padding: 5, }, this.state.page === 1 && { backgroundColor: activeColor, borderColor: 'white' },]}>
                        <Text style={[{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', fontSize: responsiveFontSize(1.8) }, this.state.page === 1 && { color: 'white', fontWeight: 'bold' }]}>Tin tức</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity onPress={() => this.setState({ page: 2 })} style={[{ justifyContent: 'center', alignItems: 'center', flex: 6, borderColor: 'rgba(255, 255, 255, 0.7)', borderWidth: 1, borderRadius: 15, padding: 5, }, this.state.page === 2 && { backgroundColor: activeColor, borderColor: 'white' },]}>
                        <Text style={[{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', fontSize: responsiveFontSize(1.8) }, this.state.page === 2 && { color: 'white', fontWeight: 'bold' }]}>Hướng dẫn</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity onPress={() => this.setState({ page: 3 })} style={[{ justifyContent: 'center', alignItems: 'center', flex: 6, borderColor: 'rgba(255, 255, 255, 0.7)', borderWidth: 1, borderRadius: 15, padding: 5 }, this.state.page === 3 && { backgroundColor: activeColor, borderColor: 'white' },]}>
                        <Text style={[{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', fontSize: responsiveFontSize(1.8) }, this.state.page === 3 && { color: 'white', fontWeight: 'bold' }]}>Khuyến mãi</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View style={{ flex: 1, backgroundColor: priColor, }}>
                    <View style={{ width: width, height: 2 * width / 5, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.8)', }}>
                        {this.state.banners.length > 0 &&
                            <ImageSlider
                                loopBothSides
                                autoPlayWithInterval={3000}
                                images={this.state.banners}
                                customSlide={({ index, item, style, width }) => (
                                    <View key={index} style={[style, styles.customSlide]}>
                                        <Image source={{uri: item.image}} style={styles.customImage} />
                                    </View>
                                )}
                                customButtons={(position, move) => (
                                    <View style={styles.buttons}>
                                        {this.state.banners.map((image, index) => {
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
                        }
                    </View>

                    {this.state.page === 1 &&
                        <FlatList
                            style={{ marginBottom: 5, paddingTop: 5 }}
                            data={this.state.news}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.pull_to_refresh_news}
                                    onRefresh={this.handleNewsRefresh}
                                    tintColor="#fff"
                                    titleColor="#fff"
                                />
                            }
                            ItemSeparatorComponent={this.separateView}
                            onEndReached={this.handleLoadMore}
                            onEndReachedThreshold={Platform.OS === 'ios' ? -0.2 : 0.2}
                            ListFooterComponent={this.renderDiscountFooter}
                            removeClippedSubviews={true}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('HomeNewsDetail', { uri: item.image, content: item.content, title: item.title, link: item.link }) }} style={{ flexDirection: 'row', backgroundColor: priColor, width: width, height: null, flex: 1, marginBottom: 5, backgroundColor: priColor }}>
                                        <Image source={{ uri: item.image }} style={{ height: 2 * width / 9 - 5, width: 2 * width / 9 - 5, borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, alignSelf: 'center', marginLeft: 5 }} />
                                        <View style={{ paddingHorizontal: 3, paddingLeft: 10, width: 7 * width / 9, justifyContent: 'space-between', }}>
                                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ padding: 3, fontSize: responsiveFontSize(1.8), color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
                                            <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}></View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Icon active={true} name='eye' style={{ color: 'white', fontSize: responsiveFontSize(2), marginRight: 5 }} />
                                                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', padding: 3, fontSize: responsiveFontSize(1.4) }}>500 lượt</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', padding: 3, fontSize: responsiveFontSize(1.4) }}>Xem thêm  >></Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => item.id + index + item.content + 'news'}
                            ListEmptyComponent={this.renderEmpty}
                        />}
                    {this.state.page === 2 &&
                        <FlatList
                            style={{ marginBottom: 5, paddingTop: 5 }}
                            data={this.state.instructions}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.pull_to_refresh_instruction}
                                    onRefresh={this.handleInstructionRefresh}
                                    tintColor="#fff"
                                    titleColor="#fff"
                                />
                            }
                            ItemSeparatorComponent={this.separateView}
                            onEndReached={this.handleInstructionLoadMore}
                            onEndReachedThreshold={Platform.OS === 'ios' ? -0.2 : 0.1}
                            ListFooterComponent={this.renderInstructionFooter}
                            removeClippedSubviews={true}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('HomeNewsDetail', { uri: item.image, content: item.content, title: item.title, link: item.link }) }} style={{ flexDirection: 'row', backgroundColor: priColor, width: width, height: null, flex: 1, marginBottom: 5, backgroundColor: priColor }}>
                                        <Image source={{ uri: item.image }} style={{ height: 2 * width / 9 - 5, width: 2 * width / 9 - 5, borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, alignSelf: 'center', marginLeft: 5 }} />
                                        <View style={{ paddingHorizontal: 3, paddingLeft: 10, width: 7 * width / 9, justifyContent: 'space-between', }}>
                                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ padding: 3, fontSize: responsiveFontSize(1.8), color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
                                            <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}></View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Icon active={true} name='eye' style={{ color: 'white', fontSize: responsiveFontSize(2), marginRight: 5 }} />
                                                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', padding: 3, fontSize: responsiveFontSize(1.4) }}>500 lượt</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', padding: 3, fontSize: responsiveFontSize(1.4) }}>Xem thêm  >></Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => item.id + index + item.content + 'instruction'}
                            ListEmptyComponent={this.renderInstructionEmpty}
                        />
                    }
                    {this.state.page === 3 &&
                        <FlatList
                            style={{ paddingTop: 5, marginBottom: 5 }}
                            data={this.state.discounts}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.pull_to_refresh_discount}
                                    onRefresh={this.handleDiscountRefresh}
                                    tintColor="#fff"
                                    titleColor="#fff"
                                />
                            }
                            ItemSeparatorComponent={this.separateView}
                            onEndReached={this.handleDiscountLoadMore}
                            onEndReachedThreshold={Platform.OS === 'ios' ? -0.2 : 0.1}
                            ListFooterComponent={this.renderFooter}
                            removeClippedSubviews={true}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('DetailProduct', { item: item }) }} style={{ flexDirection: 'row', backgroundColor: priColor, width: width, height: null, flex: 1, marginBottom: 5, backgroundColor: priColor, }}>
                                        <Image source={{ uri: item.logo }} style={{ height: 2 * width / 9 - 5, width: 2 * width / 9 - 5, borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, alignSelf: 'center', marginLeft: 5 }} />
                                        <View style={{ paddingHorizontal: 3, paddingLeft: 10, width: 7 * width / 9, justifyContent: 'space-between', paddingBottom: width / 27 }}>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingHorizontal: 3, fontSize: responsiveFontSize(1.8), color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingHorizontal: 3, fontSize: responsiveFontSize(1.8), color: 'yellow' }}>{item.price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')} vnđ</Text>
                                            <View style={{ paddingHorizontal: 3, flexDirection: 'row' }}>
                                                <CrossText text={(item.price * (100 + item.discount) / 100).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')} />
                                                <Text style={{ fontSize: responsiveFontSize(1.3), color: '#E42217' }}> -{item.discount}%</Text>
                                            </View>
                                            <TouchableOpacity style={{ position: 'absolute', right: 5, bottom: 0, borderColor: 'yellow', borderWidth: 1, padding: 2 }}>
                                                <Text style={{ color: 'yellow', fontSize: responsiveFontSize(1.8) }}>Mua ngay</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => item.name + index + item.gtin + 'discount'}
                            ListEmptyComponent={this.renderDiscountEmpty}
                        />
                    }
                </View>
            </View >
        );
    }

}

const styles = {
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
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)'
    },
    customImage: {
        width: width,
        height: null,
        flex: 1
    },
};