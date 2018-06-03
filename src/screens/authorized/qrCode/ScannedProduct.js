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

import ModalDropdown from 'react-native-modal-dropdown';
import { priColor, thirdColor } from '../../../constants/colors';

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
            <Image source={item} style={{ height: (width - 50) / 3, width: (width - 50) / 3, resizeMode: 'stretch' }} />
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
                <Textarea
                    style={{ backgroundColor: 'white', margin: 5, fontSize: responsiveFontSize(1.7) }}
                    rowSpan={5}
                    multiline={true}
                    bordered
                    onChangeText={onChangeText}
                />
            </View>
            <View style={{ position: 'absolute', top: -5, left: 15, backgroundColor: priColor }}>
                <Text style={{ color: 'white', fontSize: responsiveFontSize(2.6), fontWeight: 'bold' }}>{title}</Text>
            </View>
        </View>
    );
}

const CustomerView = ({ icon, brand }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: thirdColor, borderColor: thirdColor, borderWidth: 1, padding: 10, width: responsiveFontSize(4.6), borderRadius: responsiveFontSize(2.3) }}>
                <IconFA name={icon} style={{ fontSize: responsiveFontSize(2), color: thirdColor }} />
            </View>
            <Text style={{ fontSize: responsiveFontSize(1.7), marginLeft: 8, color: 'white' }}>{brand} </Text>
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
            notes: ''
        }
    }

    componentDidMount() {
        this.props.navigation.state.params.onDone(false);

    }

    componentWillUnmount() {
        this.props.navigation.state.params.onDone(true);
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
                    <UppperLabel title='Nhà sản xuất' content='CÔNG TY TNHH ABC' />
                    <UppperLabel title='Nhà phân phối' content='CÔNG TY TNHH ABC' />
                    <UppperLabel title='Điểm bán' content='CÔNG TY TNHH ABC' />
                    <UppperLabel title='Điểm bảo hành' content='CÔNG TY TNHH ABC' />
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
                        <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', padding: 10 }}>
                            <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
                                {images.map((product, index) => (<SameProduct key={index.toString() + 'OwnedProducts'} item={product} />))}
                            </ScrollView>
                        </View>
                        <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), }}>Sản phẩm sở hữu</Text>
                        </View>
                    </View>
                </View>
            </View>
        );

        let customer = (
            <View style={{ padding: 10, backgroundColor: priColor, }}>
                <View style={{ borderColor: 'white', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
                    <CustomerView icon='user' brand='Họ và tên:' />
                    <CustomerView icon='phone' brand='Số điện thoại:' />
                    <CustomerView icon='address-card' brand='CMND:' />
                    <CustomerView icon='envelope' brand='Mail:' />
                    <CustomerView icon='map-marker' brand='Địa chỉ:' />
                </View>
                <View style={{ borderColor: 'white', borderWidth: 1, marginTop: 10, paddingTop: 10 }}>
                    <ListHeader title='Sản phẩm đã mua' size='1.7' />
                    <View style={{ paddingBottom: 10, paddingHorizontal: 10, }}>
                        <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
                            {images.map((product, index) => (<SameProduct key={index.toString() + 'SameProduct'} item={product} />))}
                        </ScrollView>
                    </View>
                </View>
            </View>

        );

        let guarantee = (
            <View style={{ padding: 10, backgroundColor: priColor, }}>
                <View style={{ borderColor: 'white', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15 }}>
                    <GuaranteeView brand='Ngày kích hoạt' content='12/10/2017' />
                    <GuaranteeView brand='Hạn sử dụng' content='12/10/2018' />
                    <GuaranteeView brand='Thời gian bảo hành' content='1 năm' />
                    <GuaranteeView brand='Tình trạng' content='Còn hạn bảo hành' />
                    <GuaranteeView brand='Số lô' content='88' />
                </View>
                <View style={{ marginTop: 10 }}>
                    <UppperNotes title='Note' onChangeText={(text) => this.setState({ notes: text })} />
                </View>

            </View>
        );

        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} title='THÔNG TIN TRUY XUẤT' />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ paddingBottom: 5, backgroundColor: priColor }}>
                        <View style={{ width: width, height: height / 5 }}>
                            {this.state.url === null ?
                                <Text style={{ alignSelf: 'center', textAlign: 'center' }}>Không có ảnh đại diện cho sản phẩm này</Text>
                                :
                                <Image source={require('../../../assets/imgs/logoApp.png')} style={styles.customImage} />
                            }

                        </View>
                        <View style={{ backgroundColor: 'white' }}>
                            <Text style={{ color: priColor, fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', marginTop: 10, textAlign: 'center' }}>Sản phẩm: Nho Ninh Thuận</Text>
                            <Text style={{ color: priColor, fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', marginTop: 5, marginBottom: 5 }}>{this.state.type === 1 ? 'Serial' : 'Mã vạch'}: 12345678</Text>
                        </View>
                        <View style={{ marginTop: 1 }}>
                            <Tabs initialPage={0} style={{}} tabBarUnderlineStyle={{ backgroundColor: priColor }}>
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
        resizeMode: 'contain'
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