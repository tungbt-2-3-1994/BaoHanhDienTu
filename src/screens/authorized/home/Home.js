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

export default class Home extends Component {

    static navigationOptions = {
    }

    state = {
        latest_sidings: [],
        loading: false,
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
            <View style={{ width: '100%', height: 1, backgroundColor: 'white' }}></View>
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
                <View style={{ flex: 1, backgroundColor: priColor }}>
                    <View style={{ width: width, height: height / 5 }}>
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

                    <FlatList
                        style={{ padding: 5 }}
                        data={this.state.latest_sidings}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        ItemSeparatorComponent={this.separateView}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', backgroundColor: priColor, width: width - 10, height: null, flex: 1, marginBottom: 5, backgroundColor: priColor }}>
                                    <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/tidings/${item.image}` }} style={{ height: 2 * width / 9 - 5, width: 2 * width / 9 - 5, borderColor: 'white', borderWidth: 1, alignSelf: 'center' }} />
                                    <View style={{ padding: 3, width: 7 * width / 9, justifyContent: 'space-between', }}>
                                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ padding: 3, fontSize: responsiveFontSize(1.8), color: 'white' }}>{item.title}</Text>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'white' }}></View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', padding: 3, fontSize: responsiveFontSize(1.5) }}>Chia sẻ</Text>
                                            <Text style={{ color: 'white', padding: 3, fontSize: responsiveFontSize(1.5) }}>Xem thêm  >></Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => item.id + index + item.content + 'news'}
                        ListEmptyComponent={this.renderEmpty}
                    />
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