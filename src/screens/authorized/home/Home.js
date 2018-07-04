import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, WebView, TouchableHighlight, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import NormalHeader from '../../../components/NormalHeader';

import { phonecall, email, text, textWithoutEncoding, web } from 'react-native-communications';

import ImageSlider from 'react-native-image-slider';
import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';

import { Card, CardItem, Left, Body, Right, Button, Icon } from 'native-base';

import ImageProgress from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import { priColor } from '../../../constants/colors';

const CrossText = ({ text }) => {
    return (
        <View style={{ }}>
            <Text style={{ fontSize: responsiveFontSize(1.3), color: 'rgba(255, 255, 255, 0.6)' }}>{text}</Text>
            <View style={{ position: 'absolute', top: responsiveFontSize(0.9), left: 0, right: 0, height: 1, width: null, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></View>
        </View>
    );
}

export default class Home extends Component {

    static navigationOptions = {
    }

    state = {
        latest_sidings: [],
        loading: false,
        page: 1
    }

    componentDidMount() {
        this.setState({ loading: true });

        fetch('http://vatapcheck.com.vn/api/v1/tidings')
            .then(response => response.json())
            .then(responseData => {
                // console.log('as', responseData.data.tidings)
                if (responseData.code === 200) {
                    this.setState({
                        latest_sidings: responseData.data.tidings
                    });
                }
                this.setState({ loading: false });
            })
            .catch(e => {
                this.setState({ loading: false });
                alert('Có lỗi khi lấy tin tức mới nhất');
            });
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
                <NormalHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' count={1} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: priColor, padding: 15 }}>
                    <TouchableOpacity onPress={() => this.setState({ page: 1 })} style={[this.state.page === 1 && { backgroundColor: '#319ebd' }, { borderColor: 'white', borderWidth: 1, borderRadius: 15, padding: 5 }]}>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8) }}>     Tin tức     </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ page: 2 })} style={[this.state.page === 2 && { backgroundColor: '#319ebd' }, { borderColor: 'white', borderWidth: 1, borderRadius: 15, padding: 5 }]}>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8) }}>  Hướng dẫn  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ page: 3 })} style={[this.state.page === 3 && { backgroundColor: '#319ebd' }, { borderColor: 'white', borderWidth: 1, borderRadius: 15, padding: 5 }]}>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8) }}> Khuyến mãi </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: priColor, }}>
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

                    {this.state.page === 1 &&
                        <FlatList
                            style={{ padding: 5, marginBottom: 5 }}
                            data={this.state.latest_sidings}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                            ItemSeparatorComponent={this.separateView}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', backgroundColor: priColor, width: width - 10, height: null, flex: 1, marginBottom: 5, backgroundColor: priColor }}>
                                        <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/tidings/${item.image}` }} style={{ height: 2 * width / 9 - 5, width: 2 * width / 9 - 5, borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, alignSelf: 'center' }} />
                                        <View style={{ padding: 3, paddingLeft: 10, width: 7 * width / 9, justifyContent: 'space-between', }}>
                                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ padding: 3, fontSize: responsiveFontSize(1.8), color: 'white' }}>{item.title}</Text>
                                            <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}></View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Icon name='ios-share-alt-outline' style={{ color: 'white', fontSize: responsiveFontSize(2), marginRight: 5 }} />
                                                    <Text style={{ color: 'white', padding: 3, fontSize: responsiveFontSize(1.5) }}>Chia sẻ</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text style={{ color: 'white', padding: 3, fontSize: responsiveFontSize(1.5) }}>Xem thêm  >></Text>
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
                        <View style={{ padding: 5, marginBottom: 5 }}>
                            <Text>Hướng dẫn</Text>
                        </View>
                    }
                    {this.state.page === 3 &&
                        <FlatList
                            style={{ padding: 5, marginBottom: 5 }}
                            data={this.state.latest_sidings}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                            ItemSeparatorComponent={this.separateView}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', backgroundColor: priColor, width: width - 10, height: null, flex: 1, marginBottom: 5, backgroundColor: priColor, }}>
                                        <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/tidings/${item.image}` }} style={{ height: 2 * width / 9 - 5, width: 2 * width / 9 - 5, borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, alignSelf: 'center' }} />
                                        <View style={{ paddingHorizontal: 3, paddingLeft: 10, width: 7 * width / 9, justifyContent: 'space-between', paddingBottom: width / 27 }}>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingHorizontal: 3, fontSize: responsiveFontSize(1.8), color: 'white' }}>{item.title}</Text>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ paddingHorizontal: 3, fontSize: responsiveFontSize(1.8), color: 'yellow' }}>100.000vnđ</Text>
                                            <View style={{ paddingHorizontal: 3, flexDirection: 'row' }}>
                                                <CrossText text='200.000vnđ' />
                                                <Text style={{ fontSize: responsiveFontSize(1.3), color: 'rgba(0, 0, 0, 0.6)' }}> -50%</Text>
                                            </View>
                                            <TouchableOpacity style={{ position: 'absolute', right: 5, bottom: 0, borderColor: 'yellow', borderWidth: 1, padding: 2 }}>
                                                <Text style={{ color: 'yellow', fontSize: responsiveFontSize(1.8) }}>Mua ngay</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => item.id + index + item.content + 'news'}
                            ListEmptyComponent={this.renderEmpty}
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
    },
    customImage: {
        width: width,
        height: null,
        flex: 1
    },
};