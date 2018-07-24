import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, TouchableHighlight, FlatList, ActivityIndicator, Platform, TextInput } from 'react-native';
import BackHeader from '../../../components/BackHeader';

import { width, height } from '../../../constants/dimensions';

import { responsiveFontSize, responsiveHeight } from '../../../utils/helpers';

import { Tab, Tabs, Button, Icon, Text, Card, Body, Left, Textarea } from 'native-base';

import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux';

import { fetchProductDetail } from '../../../actions';

import { phonecall, email, text, textWithoutEncoding, web } from 'react-native-communications';

import Modal from 'react-native-modalbox';

import IconFA from 'react-native-vector-icons/FontAwesome';

import { normalLogin } from '../../../actions/index';
import { getAgencyInfo } from '../../../actions/Agency';

import { priColor, thirdColor, activeColor } from '../../../constants/colors';
import { host } from '../../../constants/api';

import HTML from 'react-native-render-html';

const fake_data = [
    { 'name': 'Táo ta', 'price': 40000, 'uri': 'https://lamtho.vn/wp-content/uploads/2017/11/ghep-cay-tao.jpg' },
    { 'name': 'Cam sành', 'price': 50000, 'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqJy2M6n9XjUk54XDhtetxN3eHiR8jhiM-I3-lYo8WcvRIagAAcw' },
    { 'name': 'Chôm chôm', 'price': 60000, 'uri': 'https://lamtho.vn/wp-content/uploads/2017/11/ghep-cay-tao.jpg' },
];

const ListHeader = ({ title, size }) => {
    return (
        <View style={{ justifyContent: 'space-between', marginBottom: 10, paddingLeft: 5 }}>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(size), fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
}

const SameProduct = ({ item }) => {
    return (
        <TouchableOpacity style={{ paddingBottom: 10, marginRight: 5, backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 30) / 3, flex: 1, height: null }} onPress={() => { }}>
            <View style={{}}>
                <Image source={{ uri: item.logo }} style={{ alignSelf: 'center', padding: 3, width: 2 * (width - 30) / 9, height: 2 * (width - 30) / 9, resizeMode: 'contain' }} />
                <Text ellipsizeMode='tail' numberOfLines={5} style={{ paddingBottom: 10, paddingTop: 10, fontSize: responsiveFontSize(1.7), textAlign: 'center', padding: 1 }}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const UppperLabel = ({ title, content }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
            <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', padding: 10 }}>
                <Text style={{ fontSize: responsiveFontSize(2.4), color: 'white', fontWeight: 'bold', textAlign: 'center', fontWeight: 'bold' }}>{content}</Text>
            </View>
            <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), }}>{title}</Text>
            </View>
        </View>
    );
}
const UppperScroolView = ({ title, content }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
            <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', padding: 10 }}>
                <Text style={{ fontSize: responsiveFontSize(2.4), color: 'white', fontWeight: 'bold', textAlign: 'center', fontWeight: 'bold' }}>{content}</Text>
            </View>
            <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), }}>{title}</Text>
            </View>
        </View>
    );
}

const UppperNotes = ({ title, content, onChangeText }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', paddingTop: 15, paddingBottom: 10, paddingHorizontal: 10 }}>
                {/* <Textarea
                    style={{ backgroundColor: 'white', margin: 5, fontSize: responsiveFontSize(1.7) }}
                    rowSpan={5}
                    multiline={true}
                    bordered
                    onChangeText={onChangeText}
                    editable={false}
                /> */}
                <Text style={{ padding: 10, backgroundColor: 'white', margin: 5, fontSize: responsiveFontSize(1.7) }}>
                    Đây là thông tin chú thích
                </Text>
            </View>
            <View style={{ position: 'absolute', top: -5, left: 15, backgroundColor: priColor }}>
                <Text style={{ color: 'white', fontSize: responsiveFontSize(2.6), fontWeight: 'bold' }}>{title}</Text>
            </View>
        </View>
    );
}

const CustomerView = ({ icon, brand, content }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingRight: 3 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderColor: 'white', borderWidth: 1, padding: 10, width: responsiveFontSize(4.6), borderRadius: responsiveFontSize(2.3) }}>
                <IconFA name={icon} style={{ fontSize: responsiveFontSize(2), color: 'white' }} />
            </View>
            <View style={{ paddingHorizontal: 2 }}>
                <Text style={{ marginLeft: 8, paddingRight: 10 }}>
                    <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white' }}>{brand} </Text>
                    <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', fontWeight: 'bold' }}>{content} </Text>
                </Text>
            </View>
        </View>
    );
}

const GuaranteeView = ({ brand, content }) => {
    return (
        <Text style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', }}>{brand}: </Text>
            <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', fontWeight: 'bold' }}>{content}</Text>
        </Text>
    );
}

const CustomerInfoView = ({ brand, content }) => {
    return (
        <Text style={{ marginBottom: 15, flex: 1 }}>
            <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', flex: 0.3, }}>{brand}: </Text>
            <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', fontWeight: 'bold', flex: 0.7 }}>{content}</Text>
        </Text>
    );
}


class ScannedProduct extends Component {

    static navigationOptions = {
    }

    constructor(props) {
        super(props);
        this.state = {
            qr_code: '',
            type: 'product',
            notes: '',
            activePage: 0,
            loading: true,
            data: {},
            same_products: [],
        }
    }

    componentWillMount() {
        // console.log('11111111', this.props.navigation.state.params.code);
        this.props.navigation.state.params.onDone(false, false);
        const { code } = this.props.navigation.state.params;
        var pieces = code.split('/');
        this.setState({
            qr_code: pieces[pieces.length - 1],
        }, () => {
            fetch(`${host}/scan-code`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'code': this.state.qr_code.toString()
                })
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                    if (responseData.code === 200) {
                        this.setState({
                            data: responseData.data,
                            loading: false,
                            type: responseData.type
                        });
                    }
                })
                .catch(e => {
                    this.setState({ loading: false });
                    alert('Có lỗi khi lấy tin tức mới nhất');
                });
        });
    }

    componentWillUnmount() {
        this.props.navigation.state.params.onDone(true, true);
    }


    renderEmpty = () => {
        if (this.state.loading === true) {
            return (
                <ActivityIndicator animating={true} color={priColor} size='large' />
            );
        }
        return (
            <View>
                <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: responsiveFontSize(2), color: 'green' }}>Không có mặt hàng nào trong danh mục này</Text>
            </View>
        );
    }

    componentWillReceiveProps(nextProps) {

    }

    encodeString = (text) => {
        if (text !== null && text.length >= 1) {
            const index = text.length >= 3 ? 3 : text.length;
            let str = text.slice(0, -index);
            return str + '***';
        }
        return text;
    }

    render() {
        // const images = [
        //     require('../../../assets/imgs/grape1.jpg'),
        //     require('../../../assets/imgs/grape2.jpeg'),
        //     require('../../../assets/imgs/grape3.jpg'),
        //     require('../../../assets/imgs/grape4.jpeg'),
        // ];

        let productBarcode = (
            <View style={{ backgroundColor: priColor, }}>
                <View style={{ borderColor: 'white', paddingVertical: 10, paddingHorizontal: 10 }}>
                    {(typeof (this.state.data) !== 'undefined' && typeof (this.state.data.description) !== 'undefined' && this.state.data.description !== null) &&
                        <View style={{ padding: 5, marginBottom: 10 }}>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: 'white', fontSize: responsiveFontSize(1.8) }}>{(typeof (this.state.data) !== 'undefined' && typeof (this.state.data.description) !== 'undefined' && this.state.data.description !== null) && this.state.data.description}</Text>

                            <TouchableOpacity style={{ marginTop: 10, padding: 5, backgroundColor: '#538240', width: 100, borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), textAlign: 'center' }}>Xem thêm</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <UppperLabel title='Đơn vị sở hữu mã vạch' content={typeof (this.state.data.organization) !== 'undefined' && this.state.data.organization.name} />
                    <UppperLabel title='Nhà sản xuất' content={typeof (this.state.data.organization) !== 'undefined' && this.state.data.organization.name} />
                    <UppperLabel title='Nhà nhập khẩu' content={typeof (this.state.data.organization) !== 'undefined' && this.state.data.organization.name} />
                    <UppperLabel title='Thông tin phân phối' content='Chưa có thông tin này' />
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
                        <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', padding: 10 }}>
                            {typeof (this.state.data) !== 'undefined' && typeof (this.state.data.product_same_category) !== 'undefined' ?
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.state.data.product_same_category.map((product, index) => (<SameProduct key={index.toString() + 'SameProducts'} item={product} />))}
                                </ScrollView>
                                :
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7) }}>Không có sản phẩm nào</Text>
                            }
                        </View>
                        <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), }}>Danh mục sản phẩm cùng ngành / catalog</Text>
                        </View>
                    </View>
                </View>
            </View>
        );

        let guaranteeBarcode = (
            <View style={{ padding: 10, backgroundColor: priColor, }}>
                <View style={{ borderColor: 'white', borderWidth: 1, paddingTop: 15, paddingBottom: 5, paddingHorizontal: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(2), marginBottom: 10, fontWeight: 'bold' }}>Thông tin sử dụng</Text>
                    <GuaranteeView brand='Ngày sản xuất' content={typeof (this.state.data) !== 'undefined' && typeof (this.state.data.manufacturing_date) !== 'undefined' && this.state.data.manufacturing_date} />
                    <GuaranteeView brand='Hạn sử dụng' content={(typeof (this.state.data) !== 'undefined' && typeof (this.state.data.warranty_period) !== 'undefined' && typeof (this.state.data.warranty_period_unit) !== 'undefined') && this.state.data.warranty_period + ' ' + this.state.data.warranty_period_unit} />
                    <GuaranteeView brand='Giá' content={(typeof (this.state.data) !== 'undefined' && typeof (this.state.data.price) !== 'undefined') && this.state.data.price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') + ' vnđ'} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <GuaranteeView brand='Số lô' content={typeof (this.state.data.batch) !== 'undefined' && typeof (this.state.data.batch.id) !== 'undefined' && this.state.data.batch.id} />
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <GuaranteeView brand='Ký hiệu' content={typeof (this.state.data.batch) !== 'undefined' && typeof (this.state.data.batch.name) !== 'undefined' && this.state.data.batch.name} />
                        </View>
                    </View>

                </View>
            </View>
        );


        let product = (
            <View style={{ backgroundColor: priColor, }}>
                <View style={{ borderColor: 'white', paddingVertical: 10, paddingHorizontal: 10 }}>
                    {(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.description) !== 'undefined' && this.state.data.product.description !== null) &&
                        <View style={{ padding: 5, marginBottom: 10 }}>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: 'white', fontSize: responsiveFontSize(1.8) }}>{(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.description) !== 'undefined' && this.state.data.product.description !== null) && this.state.data.product.description}</Text>

                            <TouchableOpacity style={{ marginTop: 10, padding: 5, backgroundColor: '#538240', width: 100, borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), textAlign: 'center' }}>Xem thêm</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <UppperLabel title='Đơn vị sở hữu mã vạch' content={typeof (this.state.data.organization) !== 'undefined' && this.state.data.organization.name} />
                    <UppperLabel title='Nhà sản xuất' content={typeof (this.state.data.organization) !== 'undefined' && this.state.data.organization.name} />
                    <UppperLabel title='Nhà nhập khẩu' content={typeof (this.state.data.organization) !== 'undefined' && this.state.data.organization.name} />
                    <UppperLabel title='Thông tin phân phối' content='CÔNG TY TNHH ABC' />
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
                        <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', padding: 10 }}>
                            {typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.product_same_category) !== 'undefined' ?
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.state.data.product.product_same_category.map((product, index) => (<SameProduct key={index.toString() + 'OwnedProducts'} item={product} />))}
                                </ScrollView>
                                :
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7) }}>Không có sản phẩm nào</Text>
                            }
                        </View>
                        <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), }}>Danh mục sản phẩm cùng ngành / catalog</Text>
                        </View>
                    </View>
                </View>
            </View>
        );

        let customer = (
            <View style={{ padding: 10, backgroundColor: priColor, }}>
                <View style={{ borderColor: 'white', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
                    <CustomerView icon='user' brand='Họ và tên:' content='Bùi Tiến Tùng' />
                    <CustomerView icon='phone' brand='Số điện thoại:' content={this.encodeString('01642525299')} />
                    <CustomerView icon='address-card' brand='CMND:' content='145545501' />
                    <CustomerView icon='envelope' brand='Mail:' content='tungbt1994@gmail.com' />
                    <CustomerView icon='map-marker' brand='Địa chỉ:' content='Cầu Giấy, Hà Nội' />
                </View>
                <View style={{ borderColor: 'white', borderWidth: 1, paddingTop: 15, paddingBottom: 5, paddingHorizontal: 15, marginTop: 10 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(2), marginBottom: 10, fontWeight: 'bold' }}>Thông tin mua hàng</Text>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 0.5 }}>
                            <CustomerInfoView brand='Sản phẩm' content='QVRY12' />
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <CustomerInfoView brand='Tên sp' content='Xoong chảo' />
                        </View>
                    </View>
                    <CustomerInfoView brand='Thương hiệu' content='Sunhouse' />
                    <CustomerInfoView brand='Địa chỉ shop' content='Cầu Giấy' />
                    <CustomerInfoView brand='Ngày mua' content='12/12/2018' />
                    <CustomerInfoView brand='Địa chỉ' content='Hà Nội' />
                </View>
                <View style={{ borderColor: 'white', borderWidth: 1, marginTop: 10, paddingTop: 10 }}>
                    <ListHeader title='Sản phẩm đã mua' size='1.7' />
                    <View style={{ paddingBottom: 10, paddingHorizontal: 10, }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {/* {images.map((product, index) => (<SameProduct key={index.toString() + 'SameProduct'} item={product} />))} */}
                        </ScrollView>
                    </View>
                </View>
                <View style={{ borderColor: 'white', borderWidth: 1, marginTop: 10, paddingTop: 10 }}>
                    <ListHeader title='Sản phẩm khuyến mại' size='1.7' />
                    <View style={{ paddingBottom: 10, paddingHorizontal: 10, }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.state.same_products.map((product, index) => (<SameProduct key={index.toString() + 'SameProduct'} item={product} />))}
                        </ScrollView>
                    </View>
                </View>
            </View>

        );

        let guarantee = (
            <View style={{ padding: 10, backgroundColor: priColor, }}>
                <View style={{ borderColor: 'white', borderWidth: 1, paddingTop: 15, paddingBottom: 5, paddingHorizontal: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(2), marginBottom: 10, fontWeight: 'bold' }}>Sản phẩm</Text>
                    <GuaranteeView brand='Ngày sản xuất' content={typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.manufacturing_date) !== 'undefined' && this.state.data.product.manufacturing_date} />
                    <GuaranteeView brand='Hạn sử dụng' content={(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.warranty_period) !== 'undefined' && typeof (this.state.data.product.warranty_period_unit) !== 'undefined') && this.state.data.product.warranty_period + ' ' + this.state.data.product.warranty_period_unit} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <GuaranteeView brand='Số lô' content={typeof (this.state.data.batch) !== 'undefined' && typeof (this.state.data.batch.id) !== 'undefined' && this.state.data.batch.id} />
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <GuaranteeView brand='Ký hiệu' content={typeof (this.state.data.batch) !== 'undefined' && typeof (this.state.data.batch.name) !== 'undefined' && this.state.data.batch.name} />
                        </View>
                    </View>

                </View>
                <View style={{ marginTop: 10, borderColor: 'white', borderWidth: 1, paddingTop: 15, paddingBottom: 5, paddingHorizontal: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(2), marginBottom: 10, fontWeight: 'bold' }}>Thông tin bảo hành</Text>
                    <GuaranteeView brand='Ngày kích hoạt' content={typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.active_warranty_date) !== 'undefined' && this.state.data.product.active_warranty_date} />
                    <GuaranteeView brand='Hạn bảo hành' content={typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.expiration_warranty_date) !== 'undefined' && this.state.data.product.expiration_warranty_date} />
                    <GuaranteeView brand='Tình trạng' content='Đang trong thời gian bảo hành' />
                    <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', }}>Sở hữu: </Text>
                        <TouchableOpacity onPress={() => { this.setState({ activePage: 2 }) }}>
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', fontWeight: 'bold' }}>{this.encodeString('01642525299')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginBottom: 10 }}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: responsiveFontSize(1.7), color: 'white', }}>Note: </Text>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', fontWeight: 'bold' }}>{typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.note) !== 'undefined' && this.state.data.product.note}</Text>
                    </Text>
                </View>
                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 15, backgroundColor: '#538240', padding: 10, paddingHorizontal: 20, borderRadius: 10 }}>
                    <Text style={{ fontSize: responsiveFontSize(2), color: 'white', textAlign: 'center', }}>Điều khoản bảo hành</Text>
                </TouchableOpacity>
            </View>
        );

        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} title='THÔNG TIN TRUY XUẤT' />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ paddingBottom: 5, backgroundColor: priColor }}>
                        {/* <View style={{ width: width, height: height / 5 }}>
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

                        {this.state.type === 'code' &&
                            <View>
                                <Image style={{ width: width, height: height / 5, resizeMode: 'cover' }} source={{ uri: typeof (this.state.data.product) !== 'undefined' ? this.state.data.product.logo : '' }} />
                                <View style={styles.foreground}>
                                    <Image style={{ width: width, height: height / 5, resizeMode: 'contain' }} source={{ uri: typeof (this.state.data.product) !== 'undefined' ? this.state.data.product.logo : '' }} />
                                </View>
                                <View style={{ backgroundColor: 'white', }}>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Sản phẩm:</Text>
                                        <Text style={[{ flex: 0.6 }, styles.titleStyle]}>{(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.name) !== 'undefined') && this.state.data.product.name}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Mã truy xuất:</Text>
                                        <TouchableOpacity onPress={() => text('01642525299', 'SMS text')} style={{ flex: 0.6, borderColor: priColor, borderBottomWidth: 1 }}>
                                            <Text style={[styles.titleStyle]}>Click here to send SMS</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10, marginBottom: 20 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>{this.state.data.type === 'product' ? 'Serial' : 'Mã vạch'}:</Text>
                                        <Text style={[{ flex: 0.6 }, styles.titleStyle]}>{(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.gtin) !== 'undefined') && this.state.data.product.gtin}</Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: 1 }}>
                                    <Tabs page={this.state.activePage} locked={true} initialPage={0} style={{}} tabBarUnderlineStyle={{ backgroundColor: priColor }}>
                                        <Tab style={{ backgroundColor: priColor }} heading="SẢN PHẨM" tabStyle={{ backgroundColor: 'white' }} textStyle={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }} activeTabStyle={{ backgroundColor: priColor }} activeTextStyle={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>
                                            {product}
                                        </Tab>
                                        <Tab style={{ backgroundColor: priColor }} heading="BẢO HÀNH" tabStyle={{ backgroundColor: 'white' }} textStyle={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }} activeTabStyle={{ backgroundColor: priColor }} activeTextStyle={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>
                                            {guarantee}
                                        </Tab>
                                        <Tab style={{ backgroundColor: priColor }} heading="KHÁCH HÀNG" tabStyle={{ backgroundColor: 'white', }} textStyle={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }} activeTabStyle={{ backgroundColor: priColor, }} activeTextStyle={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>
                                            {customer}
                                        </Tab>
                                    </Tabs>
                                </View>
                            </View>
                        }
                        {this.state.type === 'organization' &&
                            <View>
                                <Image style={{ width: width, height: height / 5, resizeMode: 'cover' }} source={{ uri: this.state.data.logo }} />
                                <View style={styles.foreground}>
                                    <Image style={{ width: width, height: height / 5, resizeMode: 'contain' }} source={{ uri: this.state.data.logo }} />
                                </View>

                                <View style={{ backgroundColor: 'white', paddingBottom: 20 }}>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Doanh nghiệp:</Text>
                                        <Text style={[{ flex: 0.6 }, styles.titleStyle]}>{typeof (this.state.data.name) !== 'undefined' && this.state.data.name}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Địa chỉ:</Text>
                                        <Text style={[{ flex: 0.6 }, styles.titleStyle]}>{typeof (this.state.data.address) !== 'undefined' && this.state.data.address}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Số điện thoại:</Text>
                                        <TouchableOpacity onPress={() => phonecall(this.state.data.phone, true)} style={{ flex: 0.6, borderColor: priColor, borderBottomWidth: 1 }}>
                                            <Text style={[styles.titleStyle]}>{typeof (this.state.data.phone) !== 'undefined' && this.state.data.phone}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10, marginBottom: 5 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Website:</Text>
                                        <Text style={[{ flex: 0.6 }, styles.titleStyle]}>{typeof (this.state.data.website) !== 'undefined' && this.state.data.website}</Text>
                                    </View>
                                    {/* <View style={{ marginTop: 1, backgroundColor: priColor }}>
                                        <View style={{ padding: 15, width: width, backgroundColor: priColor }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>THÔNG TIN CHI TIẾT</Text>
                                        </View>
                                        <View style={{ padding: 10, backgroundColor: priColor, }}>
                                            <View style={{ borderColor: 'white', borderWidth: 1, backgroundColor: priColor, padding: 15 }}>
                                                <Text style={{color: 'white', fontSize: responsiveFontSize(1.7)}}>Thông tin chi tiết tại đây</Text>
                                            </View>
                                        </View>
                                    </View> */}
                                </View>
                            </View>
                        }
                        {this.state.type === 'product' &&
                            <View>
                                <Image style={{ width: width, height: height / 5, resizeMode: 'cover' }} source={{ uri: typeof (this.state.data) !== 'undefined' ? this.state.data.logo : '' }} />
                                <View style={styles.foreground}>
                                    <Image style={{ width: width, height: height / 5, resizeMode: 'contain' }} source={{ uri: typeof (this.state.data) !== 'undefined' ? this.state.data.logo : '' }} />
                                </View>
                                <View style={{ backgroundColor: 'white', }}>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Sản phẩm:</Text>
                                        <Text style={[{ flex: 0.6 }, styles.titleStyle]}>{(typeof (this.state.data) !== 'undefined' && typeof (this.state.data.name) !== 'undefined') && this.state.data.name}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Mã truy xuất:</Text>
                                        <TouchableOpacity onPress={() => text('01642525299', 'SMS text')} style={{ flex: 0.6, borderColor: priColor, borderBottomWidth: 1 }}>
                                            <Text style={[styles.titleStyle]}>Click here to send SMS</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10, marginBottom: 20 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Mã vạch:</Text>
                                        <Text style={[{ flex: 0.6 }, styles.titleStyle]}>{(typeof (this.state.data) !== 'undefined' && typeof (this.state.data.gtin) !== 'undefined') && this.state.data.gtin}</Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: 1 }}>
                                    <Tabs page={this.state.activePage} locked={true} initialPage={0} style={{}} tabBarUnderlineStyle={{ backgroundColor: priColor }}>
                                        <Tab style={{ backgroundColor: priColor }} heading="SẢN PHẨM" tabStyle={{ backgroundColor: 'white' }} textStyle={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }} activeTabStyle={{ backgroundColor: priColor }} activeTextStyle={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>
                                            {productBarcode}
                                        </Tab>
                                        <Tab style={{ backgroundColor: priColor }} heading="BẢO HÀNH" tabStyle={{ backgroundColor: 'white' }} textStyle={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }} activeTabStyle={{ backgroundColor: priColor }} activeTextStyle={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>
                                            {guaranteeBarcode}
                                        </Tab>
                                    </Tabs>
                                </View>
                            </View>
                        }

                        {/* <ActivityIndicator style={{ position: 'absolute', bottom: 10, left: width / 2 }} size='large' animating={this.state.loading} color='red' /> */}
                    </ScrollView>

                </View>
            </View>
        );
    }

}

const styles = {
    titleStyle: {
        color: priColor, fontSize: responsiveFontSize(2), fontWeight: 'bold',
    },
    product_modal: {
        flex: 1,
        height: null
    },
    product_modal_text: {
        fontSize: responsiveFontSize(1.8),
        textAlign: 'left',
        color: 'black',

    },
    product_modal_dropdown: {
        flex: 1,
        borderRadius: 10,
        padding: 5,
        marginTop: 5
    },
    product_modal_row: {
        padding: 4,
        flex: 1,
        alignItems: 'flex-start',
    },
    product_modal_row_text: {
        fontSize: responsiveFontSize(1.8),
    },
    product_modal_separator: {
        height: 1,
        backgroundColor: 'cornflowerblue',
    },
    title: {
        fontSize: responsiveFontSize(1.8), flex: 0.3, color: priColor,
    },
    textInput: { width: 3 * width / 4, marginTop: 10, marginHorizontal: 10, borderRadius: 10, textAlign: 'center', backgroundColor: '#d7eff1', padding: 15, fontSize: 16 },
    btnLoginContainer: { marginTop: 10, alignSelf: 'center', borderColor: 'white', borderRadius: 10, borderWidth: 1.5 },
    cancelContainer: { marginTop: 10, alignSelf: 'center', borderColor: 'white', borderRadius: 10, borderWidth: 1.5, backgroundColor: priColor, marginRight: 15 },
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
        resizeMode: 'stretch'
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
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        agency: state.agency,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        normalLogin: (username, password) => {
            dispatch(normalLogin(username, password));
        },
        getAgencyInfo: (auth) => {
            dispatch(getAgencyInfo(auth));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScannedProduct);