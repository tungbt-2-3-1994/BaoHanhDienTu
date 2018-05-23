import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableHighlight, ScrollView, Platform, } from 'react-native';
import BackHeader from '../../../components/BackHeader';

import { connect } from 'react-redux';

import { fetchAllProductsInCategory } from '../../../actions';

import ImageSlider from 'react-native-image-slider';
import { width, height } from '../../../constants/dimensions';

import { responsiveFontSize } from '../../../utils/helpers';

import { Tab, Tabs, Button, Icon, Text, Card, CardItem, Body } from 'native-base';

import { phonecall, email, text, textWithoutEncoding, web } from 'react-native-communications';

import Modal from 'react-native-modalbox';

import ReadMore from 'react-native-read-more-text';

const CategoryBox = ({ src, size, title }) => (
    <TouchableOpacity onPress={() => alert(title)} style={{ paddingVertical: 10, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, width: (width - 40) / 3 }}>
        <Ionicons size={size} name={src} />
        <Text style={{ textAlign: 'center', opacity: 0.7, fontSize: responsiveFontSize(1.15), color: 'black', fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
);


class Detail extends Component {

    state = {
        dataDetail: {},
        type: 1,
        productName: '',
        productPrice: 0,
        productDes: '',
        url: '',
        agencies: []
    }

    static navigationOptions = {
    }

    componentWillMount() {

    }

    showCert = () => {
        this.refs.myModal.open();
    }

    componentDidMount() {
        // console.log('Detail', this.props.navigation.state.params);
        const gtin = this.props.navigation.state.params;
        // console.log('g', gtin);
        fetch(`http://vatapcheck.com.vn/api/v1/barcode`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'gtin': gtin
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.code === 200) {
                    if (responseData.data !== null) {
                        if (responseData.data.organization !== null && responseData.data.product !== null) {
                            this.setState({
                                productName: responseData.data.product.name,
                                dataDetail: responseData.data.organization,
                                productPrice: responseData.data.product.price,
                                productDes: responseData.data.product.description,
                                url: responseData.data.product.logo,
                                agencies: responseData.data.agencies,
                                type: 1
                            });
                        }
                    }
                } else {
                    fetch(`http://vatapcheck.com.vn/api/v1/qrcode`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            'code': gtin
                        })
                    })
                        .then((res) => res.json())
                        .then((resData) => {
                            console.log(resData);
                            if (resData.code === 200) {
                                if (resData.data !== null) {
                                    if (resData.data.organization !== null && resData.data.product !== null) {
                                        this.setState({
                                            productName: resData.data.product.name,
                                            productPrice: resData.data.product.price,
                                            dataDetail: resData.data.organization,
                                            productDes: resData.data.product.description,
                                            url: resData.data.product.logo,
                                            agencies: resData.data.agencies,
                                            type: 2
                                        });
                                    }
                                }
                            }
                        })
                        .catch(e => alert('Thất bại khi lấy dữ liệu'))
                        .done();
                }
            })
            .catch(e => alert('Thất bại khi lấy dữ liệu'))
            .done();
    }

    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ fontSize: responsiveFontSize(1.5), color: 'red', marginTop: 5 }} onPress={handlePress}>
                Xem thêm
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ fontSize: responsiveFontSize(1.5), color: 'red', marginTop: 5 }} onPress={handlePress}>
                Ẩn
            </Text>
        );
    }


    render() {
        const images = [
            require('../../../assets/imgs/grape1.jpg'),
            require('../../../assets/imgs/grape2.jpeg'),
            require('../../../assets/imgs/grape3.jpg'),
            require('../../../assets/imgs/grape4.jpeg'),
        ];
        let agency = (
            <View style={{ paddingHorizontal: 3, backgroundColor: '#eceaeb' }}>
                <Card style={{ width: width - 10, backgroundColor: 'white', padding: 10 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), flex: 0.3, color: 'red' }}>Công ty</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.4), flex: 0.7, color: 'red' }}>{this.state.dataDetail.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), flex: 0.3, color: 'red' }}>Địa chỉ</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.4), flex: 0.7 }}>{this.state.dataDetail.address}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), flex: 0.3, color: 'red' }}>Liên hệ</Text>
                        <Text onPress={() => { phonecall(this.state.dataDetail.phone, true) }} style={{ fontSize: responsiveFontSize(1.4), flex: 0.7, color: 'red' }}>
                            {this.state.dataDetail.phone}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), flex: 0.3, color: 'red' }}>Email</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.4), flex: 0.7 }}>{this.state.dataDetail.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.5), flex: 0.3, color: 'red' }}>Website</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.4), flex: 0.7, color: 'red' }}>{this.state.dataDetail.website}</Text>
                    </View>

                </Card>
                <Card style={{ width: width - 10, backgroundColor: 'white', padding: 10, marginTop: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: responsiveFontSize(1.5), fontWeight: 'bold', color: 'red', marginBottom: 10 }}>Giới thiệu công ty</Text>
                    <ReadMore
                        numberOfLines={5}
                        renderTruncatedFooter={this._renderTruncatedFooter}
                        renderRevealedFooter={this._renderRevealedFooter}
                        onReady={this._handleTextReady}>
                        <Text style={{ color: '#3f3f3f', textAlign: 'auto', fontSize: responsiveFontSize(1.5) }}>
                            {this.state.dataDetail.description}
                        </Text>
                    </ReadMore>
                </Card>
            </View>
        );

        let partner = (
            <View style={{ paddingHorizontal: 3, backgroundColor: '#eceaeb' }}>
                <View style={{ width: width - 10, backgroundColor: 'white', padding: 10 }}>
                    {this.state.agencies.length !== 0 ?
                        (this.state.agencies.map(agen => (
                            <TouchableOpacity key={agen.id} onPress={() => alert(`Show địa điểm của ${agen.name} trên bản đồ`)}>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Text style={{ fontSize: responsiveFontSize(1.5) }}>{agen.name}</Text>
                                            <Text note style={{ fontSize: responsiveFontSize(1.5) }}>{agen.address}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        )))
                        :
                        (<Text style={{ fontSize: responsiveFontSize(1.5), color: 'red' }}>Không có địa điểm bán cho sản phẩm này</Text>)
                    }
                </View>
            </View>

        );
        let productInfor = (
            <View style={{ paddingHorizontal: 3, backgroundColor: '#eceaeb' }}>
                <Card style={{ width: width - 10, backgroundColor: 'white', padding: 10, marginBottom: 1 }}>
                    <Text style={{ color: 'red', textAlign: 'auto', fontSize: responsiveFontSize(1.5), marginBottom: 5 }}>
                        Giá tham khảo
                    </Text>
                    <Text style={{ color: '#3f3f3f', textAlign: 'auto', fontSize: responsiveFontSize(1.5) }}>
                        {this.state.productPrice !== null ? this.state.productPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') : '0'}đ
                    </Text>
                </Card>
                <Card style={{ width: width - 10, backgroundColor: 'white', padding: 10, marginBottom: 1 }}>
                    <Text style={{ color: 'red', textAlign: 'auto', fontSize: responsiveFontSize(1.5), marginBottom: 5 }}>
                        Thông tin chi tiết
                    </Text>
                    <ReadMore
                        numberOfLines={5}
                        renderTruncatedFooter={this._renderTruncatedFooter}
                        renderRevealedFooter={this._renderRevealedFooter}
                        onReady={this._handleTextReady}>
                        <Text style={{ color: '#3f3f3f', textAlign: 'auto', fontSize: responsiveFontSize(1.5) }}>
                            {this.state.productDes}
                        </Text>
                    </ReadMore>
                </Card>
            </View>
        );
        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ marginBottom: 5 }}>
                        <View style={{ width: width, height: height / 5 }}>
                            <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/products/${this.state.url}` }} style={styles.customImage} />
                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', marginTop: 10, textAlign: 'center' }}>{this.state.productName}</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.3), alignSelf: 'center', marginTop: 10, opacity: 0.8 }}>{this.state.type === 1 ? 'Mã vạch' : 'Serial'}: {this.props.navigation.state.params}</Text>
                        <View style={{ backgroundColor: 'red', marginTop: 20, flexDirection: 'row', padding: 4 }}>
                            <TouchableOpacity onPress={() => this.showCert()} style={{ flex: 1, marginRight: 4, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
                                <Text style={{ color: 'red', fontSize: responsiveFontSize(2), marginRight: 7 }}>Đã xác thực</Text>
                                <Icon name='ios-checkmark' style={{ fontSize: 40, color: 'red' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
                                <Text style={{ color: 'red', fontSize: responsiveFontSize(2), marginRight: 7 }}>Chỉ dẫn địa lý</Text>
                                <Icon name='ios-navigate' style={{ fontSize: 30, color: 'red' }} />
                            </TouchableOpacity>

                        </View>
                        <Tabs initialPage={0} style={{ marginTop: 20 }} tabBarUnderlineStyle={{ backgroundColor: 'red' }}>
                            <Tab heading="Chi tiết sản phẩm" tabStyle={{ backgroundColor: 'white' }} textStyle={{ textAlign: 'center', color: 'black', fontSize: responsiveFontSize(1.5) }} activeTabStyle={{ backgroundColor: 'red', }} activeTextStyle={{ color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.5), textAlign: 'center' }}>
                                {productInfor}
                            </Tab>
                            <Tab heading="Nhà sản xuất" tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'black', fontSize: responsiveFontSize(1.5), textAlign: 'center' }} activeTabStyle={{ backgroundColor: 'red' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.5), textAlign: 'center' }}>
                                {agency}
                            </Tab>
                            <Tab heading="Nhà phân phối" tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'black', fontSize: responsiveFontSize(1.5), textAlign: 'center' }} activeTabStyle={{ backgroundColor: 'red' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.5), textAlign: 'center' }}>
                                {partner}
                            </Tab>
                        </Tabs>
                    </ScrollView>
                    <Modal
                        ref={'myModal'}
                        style={{
                            paddingVertical: 20,
                            alignItems: 'center',
                            borderRadius: Platform.OS === 'ios' ? 15 : 10,
                            shadowRadius: 10,
                            width: 7 * width / 8,
                            height: 2 * height / 3,
                            justifyContent: 'space-between'
                        }}
                        position='center'
                        backdrop={true}
                    ></Modal>
                </View>
            </View>
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

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);