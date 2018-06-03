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

const ListHeader = ({ title }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', paddingTop: 10, marginBottom: 10 }}>
            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
}

const ListHeaderMore = ({ title, moreEvent }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', paddingTop: 10, marginBottom: 10, }}>
            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), fontWeight: 'bold' }}>{title}</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={moreEvent}>
                <Text style={{ color: 'red', fontSize: responsiveFontSize(1.3), marginRight: 3 }}>Xem tất cả</Text>
                <Icon name='ios-arrow-forward-outline' style={{ color: 'red', fontSize: responsiveFontSize(2) }} />
            </TouchableOpacity>
        </View>
    );
}

const HotNews = ({ navigation, title, uri, view, share, website, content }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('HomeNewsDetail', { 'uri': uri, 'title': title, 'content': content, 'website': website })} style={{ width: width / 2 - 5, height: null, flex: 1, marginRight: 5, backgroundColor: 'white' }}>
            <View>
                <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/tidings/${uri}` }} style={{ height: width / 2 - 5, width: width / 2 - 5, }} />
            </View>
            <View style={{ backgroundColor: 'white', padding: 3 }}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{ padding: 2, fontSize: responsiveFontSize(1.5) }}>{title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 2 }}>
                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#787878' }}>{view} Lượt xem</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#787878' }}>{share} Chia sẻ</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#e0dedf', justifyContent: 'center', alignItems: 'center', paddingVertical: 1 }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='ios-share-alt-outline' style={{ color: '#787878', marginRight: 5, fontSize: responsiveFontSize(2) }} />
                    <Text style={{ color: '#787878', fontSize: responsiveFontSize(1.4) }}>Chia sẻ</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const AllNews = ({ uri, title, detail, website, navigation, content }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('HomeNewsDetail', { 'uri': uri, 'title': title, 'content': content, 'website': website })} style={{ flexDirection: 'row', backgroundColor: '#dfdfdf', width: width - 10, height: null, flex: 1, marginBottom: 5, backgroundColor: 'white' }}>
            <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/tidings/${uri}` }} style={{ height: 2 * width / 9, width: 2 * width / 9 }} />
            <View style={{ padding: 3, width: 7 * width / 9, justifyContent: 'space-between', }}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{ padding: 3, fontSize: responsiveFontSize(1.5) }}>{title}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={{ padding: 3, fontSize: responsiveFontSize(1.2), color: '#787878' }}>{detail}</Text>
                <Text style={{ padding: 3, fontSize: responsiveFontSize(1.5) }}>Xem thêm  >></Text>
            </View>
        </TouchableOpacity>
    );
}

const fake_data = [
    { 'name': 'Táo ta', 'price': 40000, 'uri': 'https://lamtho.vn/wp-content/uploads/2017/11/ghep-cay-tao.jpg' },
    { 'name': 'Cam sành', 'price': 50000, 'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqJy2M6n9XjUk54XDhtetxN3eHiR8jhiM-I3-lYo8WcvRIagAAcw' },
    { 'name': 'Bóng đèn', 'price': 60000, 'uri': 'http://i.9mobi.vn/cf/images/2015/03/nkk/nhung-hinh-anh-dep-20.jpg' },
    { 'name': 'Bóng đèn', 'price': 80000, 'uri': 'http://i.9mobi.vn/cf/images/2015/03/nkk/nhung-hinh-anh-dep-20.jpg' },
    { 'name': 'Bóng đèn', 'price': 90000, 'uri': 'http://i.9mobi.vn/cf/images/2015/03/nkk/nhung-hinh-anh-dep-20.jpg' },
    { 'name': 'Bóng đèn', 'price': 90000, 'uri': 'http://i.9mobi.vn/cf/images/2015/03/nkk/nhung-hinh-anh-dep-20.jpg' },
];

const HotProducts = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => alert(item.name)} style={{ width: (width - 15) / 3, height: null, flex: 1, marginRight: 5, marginBottom: 5 }}>
            <ImageProgress
                source={{ uri: item.uri }}
                style={{ height: (width - 15) / 3, width: (width - 15) / 3, }}
                indicator={Progress.Pie}
                indicatorProps={{
                    size: 20,
                    borderWidth: 0,
                    unfilledColor: '#42b0ed'
                }}
            />
            <Text style={{ padding: 3, textAlign: 'center', fontSize: responsiveFontSize(1.5) }}>
                {item.name}
            </Text>
            <Text style={{ padding: 3, textAlign: 'center', opacity: 0.9, fontSize: responsiveFontSize(1.5), color: 'red' }}>
                {item.price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')}đ
            </Text>
        </TouchableOpacity>
    );
}

export default class Home extends Component {

    static navigationOptions = {
    }

    state = {
        hot_sidings: [],
        latest_sidings: [],
        loading1: false,
        loading2: false,
    }

    viewMoreNews = (data) => {
        this.props.navigation.navigate('ViewMoreNews', data);
    }

    componentWillMount() {
        this.setState({ loading1: true });
        this.setState({ loading2: true });
        fetch('http://vatapcheck.com.vn/api/v1/tidings-hot')
            .then(response => response.json())
            .then(responseData => {
                // console.log('tin hot', responseData);
                if (responseData.code === 200) {
                    this.setState({
                        hot_sidings: responseData.data.tidingHots
                    });
                }
                this.setState({ loading1: false });
            })
            .catch(e => {
                this.setState({ loading1: false });
                alert('Có lỗi khi lấy tin tức nổi bật');
            });

        fetch('http://vatapcheck.com.vn/api/v1/tidings')
            .then(response => response.json())
            .then(responseData => {
                // console.log('as', responseData)
                if (responseData.code === 200) {
                    this.setState({
                        latest_sidings: responseData.data.tidings
                    });
                }
                this.setState({ loading2: false });
            })
            .catch(e => {
                this.setState({ loading2: false });
                alert('Có lỗi khi lấy tin tức mới nhất');
            });
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
                <View style={{ flex: 1, backgroundColor: '#eceaeb' }}>
                    <ScrollView>
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
                        <View style={{ paddingHorizontal: 5, paddingBottom: 5 }}>
                            <View style={{ backgroundColor: 'white', marginTop: 5 }}>
                                <ListHeader title='Tin tức nổi bật' />
                                <ScrollView horizontal={true} pagingEnabled={true}
                                >
                                    {this.state.loading1 ?
                                        (<View style={{ width: width, height: null, justifyContent: 'center', alignItems: 'center' }}>
                                            <ActivityIndicator animating={true} color='red' size='large' />
                                        </View>
                                        )
                                        : (this.state.hot_sidings.map((news, index) =>
                                            <HotNews website={news.link} navigation={this.props.navigation} key={news.id} title={news.title} share={news.share} content={news.content} view={news.view} uri={news.image} />
                                        ))}
                                </ScrollView>
                            </View>
                            <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                                <ListHeaderMore title='Tin tức mới nhất' moreEvent={() => this.viewMoreNews(this.state.latest_sidings)} />
                                {
                                    this.state.loading2 ?
                                        (<View style={{ width: width, height: null, justifyContent: 'center', alignItems: 'center' }}>
                                            <ActivityIndicator animating={true} color='red' size='large' />
                                        </View>
                                        )
                                        :
                                        (this.state.latest_sidings.slice(0, 3).map((news, index) =>
                                            <AllNews website={news.link} navigation={this.props.navigation} key={news.id} title={news.title} detail={news.content} uri={news.image} content={news.content} />)
                                        )}
                            </View>
                            <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                                <ListHeader title='Sản phẩm nổi bật' />
                                <FlatList
                                    style={{}}
                                    data={fake_data}
                                    numColumns={3}
                                    renderItem={({ item }) => {
                                        return <HotProducts item={item} />
                                    }}
                                    keyExtractor={(item, index) => item.id + index + item.name}
                                    ListEmptyComponent={this.renderEmpty}
                                />
                            </View>
                        </View>
                    </ScrollView>
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