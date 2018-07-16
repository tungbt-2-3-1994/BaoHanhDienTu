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
        <TouchableOpacity style={{ width: (width - 50) / 3, height: null, flex: 1, marginRight: 10 }}>
            <Image source={item} style={{ borderWidth: 1, borderColor: 'white', height: (width - 50) / 3, width: (width - 50) / 3, resizeMode: 'stretch' }} />
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


class ScannedProduct extends Component {

    static navigationOptions = {
    }

    constructor(props) {
        super(props);
        this.state = {
            qr_code: '',
            type: 1,
            notes: '',
            activePage: 0
        }
    }

    componentDidMount() {
        this.props.navigation.state.params.onDone(false, false);

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
        const images = [
            require('../../../assets/imgs/grape1.jpg'),
            require('../../../assets/imgs/grape2.jpeg'),
            require('../../../assets/imgs/grape3.jpg'),
            require('../../../assets/imgs/grape4.jpeg'),
        ];
        let product = (
            <View style={{ backgroundColor: priColor, }}>
                <View style={{ borderColor: 'white', paddingVertical: 10, paddingHorizontal: 10 }}>
                    <View style={{ padding: 5, marginBottom: 10 }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: 'white', fontSize: responsiveFontSize(1.8) }}>Thông tin vắn tắt sản phẩm Thông tin vắn tắt sản phẩm Thông tin vắn tắt sản phẩm Thông tin vắn tắt sản phẩm Thông tin vắn tắt sản phẩm </Text>
                        <TouchableOpacity style={{ marginTop: 10, padding: 5, backgroundColor: '#538240', width: 100, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), textAlign: 'center' }}>Xem thêm</Text>
                        </TouchableOpacity>
                    </View>
                    <UppperLabel title='Đơn vị sở hữu mã vạch' content='CÔNG TY TNHH ABC' />
                    <UppperLabel title='Nhà sản xuất' content='CÔNG TY TNHH ABC' />
                    <UppperLabel title='Nhà nhập khẩu' content='CÔNG TY TNHH ABC' />
                    <UppperLabel title='Thông tin phân phối' content='CÔNG TY TNHH ABC' />
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
                        <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', padding: 10 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {images.map((product, index) => (<SameProduct key={index.toString() + 'OwnedProducts'} item={product} />))}
                            </ScrollView>
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
                <View style={{ borderColor: 'white', borderWidth: 1, marginTop: 10, paddingTop: 10 }}>
                    <ListHeader title='Sản phẩm đã mua' size='1.7' />
                    <View style={{ paddingBottom: 10, paddingHorizontal: 10, }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {images.map((product, index) => (<SameProduct key={index.toString() + 'SameProduct'} item={product} />))}
                        </ScrollView>
                    </View>
                </View>
            </View>

        );

        let guarantee = (
            <View style={{ padding: 10, backgroundColor: priColor, }}>
                <View style={{ borderColor: 'white', borderWidth: 1, paddingTop: 15, paddingBottom: 5, paddingHorizontal: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(2), marginBottom: 10, fontWeight: 'bold' }}>Sản phẩm</Text>
                    <GuaranteeView brand='Ngày sản xuất' content='12/10/2017' />
                    <GuaranteeView brand='Hạn sử dụng' content='1 năm' />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <GuaranteeView brand='Số lô' content='88' />
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <GuaranteeView brand='Ký hiệu' content='808' />
                        </View>
                    </View>

                </View>
                <View style={{ marginTop: 10, borderColor: 'white', borderWidth: 1, paddingTop: 15, paddingBottom: 5, paddingHorizontal: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(2), marginBottom: 10, fontWeight: 'bold' }}>Thông tin bảo hành</Text>
                    <GuaranteeView brand='Ngày kích hoạt' content='12/10/2017' />
                    <GuaranteeView brand='Hạn bảo hành' content='12/10/2018' />
                    <GuaranteeView brand='Tình trạng' content='Đang trong thời gian bảo hành' />
                    <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', }}>Sở hữu: </Text>
                        <TouchableOpacity onPress={() => { this.setState({ activePage: 2 }) }}>
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', fontWeight: 'bold' }}>{this.encodeString('01642525299')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginBottom: 10 }}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: responsiveFontSize(1.7), color: 'white', }}>Note: </Text>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', fontWeight: 'bold' }}>Đây là thông tin chú thích Đây là thông tin chú thích Đây là thông tin chú thích Đây là thông tin chú thích</Text>
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
                        <View style={{ backgroundColor: 'white', }}>
                            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
                                <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Sản phẩm:</Text>
                                <Text style={[{ flex: 0.6 }, styles.titleStyle]}>Nho Ninh Thuận</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                                <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Mã truy xuất:</Text>
                                <TouchableOpacity onPress={() => text('01642525299', 'SMS text')} style={{ flex: 0.6, borderColor: priColor, borderBottomWidth: 1 }}>
                                    <Text style={[styles.titleStyle]}>Click here to send SMS</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10, marginBottom: 20 }}>
                                <Text style={[{ flex: 0.4 }, styles.titleStyle]}>{this.state.type === 1 ? 'Serial' : 'Mã vạch'}:</Text>
                                <Text style={[{ flex: 0.6 }, styles.titleStyle]}>0998900980</Text>
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