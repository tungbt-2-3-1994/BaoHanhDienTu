import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, TouchableHighlight, FlatList, ActivityIndicator, Platform, TextInput, Alert } from 'react-native';
import BackHeader from '../../../components/BackHeader';

import { width, height } from '../../../constants/dimensions';

import { responsiveFontSize } from '../../../utils/helpers';

import { Tab, Tabs, Icon, Text } from 'native-base';

import { connect } from 'react-redux';

import { phonecall, email, text, textWithoutEncoding } from 'react-native-communications';

import Modal from 'react-native-modalbox';

import IconFA from 'react-native-vector-icons/FontAwesome';

import { priColor, activeColor } from '../../../constants/colors';
import { host } from '../../../constants/api';

import HTML from 'react-native-render-html';


const ListHeader = ({ title, size }) => {
    return (
        <View style={{ justifyContent: 'space-between', marginBottom: 10, paddingLeft: 5 }}>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(size), fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
}

const SameProduct = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={{ paddingBottom: 10, marginRight: 5, backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1, width: (width - 30) / 3, flex: 1, height: null }} onPress={onPress}>
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
        <Text style={{ marginBottom: 10, textAlign: 'justify' }}>
            <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', }}>{brand}: </Text>
            <Text style={{ fontSize: responsiveFontSize(1.7), color: 'white', fontWeight: 'bold', }}>{content}</Text>
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
            active_info: {},
            active_code: ''
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

    componentDidMount() {
        this.refs.notifyForm.open();
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

    encodeString = (text) => {
        if (text !== null && text.length >= 1) {
            const index = text.length >= 3 ? 3 : text.length;
            let str = text.slice(0, -index);
            return str + '***';
        }
        return text;
    }

    activateProduct = () => {
        if (this.props.user.isLogin === true) {
            fetch(`${host}/codes/active-warranty`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.user.token.access_token}`
                },
                body: JSON.stringify({
                    'code': this.state.data.serial
                })
            })
                .then(response => response.json())
                .then(responseData => {
                    // console.log(responseData);
                    if (responseData.code === 200) {
                        this.setState({ active_info: responseData });
                        if (responseData.can_active_warranty === 1) {
                            this.refs.activateProduct.open();
                        } else {
                            alert('Không thể kích hoạt cho sản phẩm này');
                        }
                    } else {
                        alert('Không thể kích hoạt cho sản phẩm này');
                    }
                })
                .catch(e => {
                    this.setState({ loading: false });
                    alert('Có lỗi khi lấy tin tức mới nhất');
                });
        } else {
            Alert.alert(
                'Lỗi!!!',
                'Bạn cần phải đăng nhập thì mới kích hoạt được',
                [
                    { text: 'Hủy', onPress: () => { }, style: 'cancel' },
                    { text: 'OK', onPress: () => this.props.navigation.navigate('AccountStack') },
                ],
                { cancelable: false }
            )
        }
    }

    onActivateWarranty = () => {
        fetch(`${this.state.active_info.confirm_url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.user.token.access_token}`
            },
            body: JSON.stringify({
                'code': this.state.active_code
            })
        })
            .then(response => response.json())
            .then(responseData => {
                // console.log('asas', responseData);
                if (responseData.code === 200) {
                    if (responseData.status === 0) {
                        alert('Kích hoạt thành công');
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
                            .then(res => res.json())
                            .then(resData => {
                                // console.log('tungbt', resData);
                                this.refs.activateProduct.close();
                                if (resData.code === 200) {
                                    this.setState({
                                        data: resData.data,
                                        loading: false,
                                    });
                                }
                            })
                            .catch(e => {
                                this.setState({ loading: false });
                                alert('Lỗi lấy dữ liệu');
                            });
                        this.refs.activateProduct.close();
                    } else if (responseData.status === 1) {
                        this.refs.activateProduct.close();
                        Alert.alert(
                            'Không thành công',
                            'Mã kích hoạt của bạn đã hết hạn. Mời bạn lấy mã khác để kích hoạt lại',
                            [
                                { text: 'OK', onPress: () => { }, style: 'cancel' },
                            ],
                            { cancelable: false }
                        )
                    } else if (responseData.status === 2) {
                        this.refs.activateProduct.close();
                        alert('Mã kích hoạt đã được sử dụng rồi');
                    } else if (responseData.status === 3) {
                        alert('Mã kích hoạt không chính xác');
                    } else {
                        alert('Kích hoạt không thành công');
                    }
                } else {
                    alert('Kích hoạt không thành công');
                }
            })
            .catch(e => {
                alert('Kích hoạt không thành công');
            });
    }

    getDate = (time) => {
        let parts = time.split(" ");
        return parts[0];
    }

    onProductSelected = (item) => {
        console.log('item', item);
        this.props.navigation.navigate('DetailProduct', { item: item });
    }

    checkCode = () => {
        textWithoutEncoding("8079", `VBH ${this.state.data.sms}`);
    }

    render() {

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
                    <UppperLabel title='Nhà sản xuất' content={(typeof (this.state.data.producer) !== 'undefined' && this.state.data.producer !== null && typeof (this.state.data.producer.name) !== 'undefined') ? this.state.data.producer.name : ' '} />
                    <UppperLabel title='Nhà nhập khẩu' content={(typeof (this.state.data.importer) !== 'undefined' && this.state.data.importer !== null && typeof (this.state.data.importer.name) !== 'undefined') ? this.state.data.importer.name : ' '} />
                    {/* <UppperLabel title='Thông tin phân phối' content='Chưa có thông tin này' /> */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
                        <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', padding: 10 }}>
                            {typeof (this.state.data) !== 'undefined' && typeof (this.state.data.product_same_category) !== 'undefined' ?
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.state.data.product_same_category.map((product, index) => (<SameProduct onPress={() => this.onProductSelected(product)} key={index.toString() + 'SameProducts'} item={product} />))}
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
                    <GuaranteeView brand='Thời gian bảo hành' content={(typeof (this.state.data) !== 'undefined' && typeof (this.state.data.warranty_period) !== 'undefined' && typeof (this.state.data.warranty_period_unit) !== 'undefined') && this.state.data.warranty_period + ' ' + this.state.data.warranty_period_unit} />
                    <GuaranteeView brand='Hạn sử dụng' content={(typeof (this.state.data) !== 'undefined' && typeof (this.state.data.expiry) !== 'undefined' && typeof (this.state.data.expiry_unit) !== 'undefined' && this.state.data.expiry !== 0) ? (this.state.data.expiry + ' ' + this.state.data.expiry_unit) : 'Không có hạn sử dụng cho sản phẩm này'} />
                    <GuaranteeView brand='Giá' content={(typeof (this.state.data) !== 'undefined' && typeof (this.state.data.price) !== 'undefined') && this.state.data.price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') + ' vnđ'} />
                    {/* <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <GuaranteeView brand='Số lô' content={typeof (this.state.data.batch) !== 'undefined' && typeof (this.state.data.batch.id) !== 'undefined' && this.state.data.batch.id} />
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <GuaranteeView brand='Ký hiệu' content={typeof (this.state.data.batch) !== 'undefined' && typeof (this.state.data.batch.name) !== 'undefined' && this.state.data.batch.name} />
                        </View>
                    </View> */}

                </View>
            </View>
        );


        let product = (
            <View style={{ backgroundColor: priColor, }}>
                <View style={{ borderColor: 'white', paddingVertical: 10, paddingHorizontal: 10 }}>
                    {(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.short_description) !== 'undefined' && this.state.data.product.short_description !== null) && this.state.data.product.short_description !== "" &&
                        <View style={{ padding: 5, marginBottom: 10 }}>
                            <Text numberOfLines={3} ellipsizeMode='tail' style={{ textAlign: 'justify', color: 'white', fontSize: responsiveFontSize(1.8) }}>{(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.short_description) !== 'undefined' && this.state.data.product.short_description !== null) && this.state.data.product.short_description}</Text>

                            <TouchableOpacity onPress={() => this.refs.moreInfor.open()} style={{ marginTop: 10, padding: 5, backgroundColor: '#538240', width: 100, borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), textAlign: 'center' }}>Xem thêm</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <UppperLabel title='Đơn vị sở hữu mã vạch' content={typeof (this.state.data.organization) !== 'undefined' && this.state.data.organization.name} />
                    <UppperLabel title='Nhà sản xuất' content={(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.importer) !== 'undefined' && this.state.data.product.importer !== null) ? this.state.data.product.importer.name : ' '} />
                    <UppperLabel title='Nhà nhập khẩu' content={(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.importer) !== 'undefined' && this.state.data.product.importer !== null) ? this.state.data.product.importer.name : ' '} />
                    {/* <UppperLabel title='Thông tin phân phối' content='CÔNG TY TNHH ABC' /> */}

                    {this.state.data.agent && this.state.data.agency && this.state.data.first_class_agent &&
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
                            <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', padding: 10 }}>
                                <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                    <Text style={{ flex: 0.3, fontSize: responsiveFontSize(1.8), color: 'white', }}>Nhà phân phối độc quyền: </Text>
                                    <Text style={{ textAlign: 'justify', flex: 0.7, fontWeight: 'bold', fontSize: responsiveFontSize(1.8), color: 'white', marginLeft: 5 }}>{typeof (this.state.data.agent) !== 'undefined' && this.state.data.agent !== null && typeof (this.state.data.agent.name) !== 'undefined' && this.state.data.agent.name !== null && this.state.data.agent.name}</Text>
                                </View>
                                <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                    <Text style={{ flex: 0.3, fontSize: responsiveFontSize(1.8), color: 'white', }}>Điểm bán: </Text>
                                    <Text style={{ textAlign: 'justify', flex: 0.7, fontWeight: 'bold', fontSize: responsiveFontSize(1.8), color: 'white', marginLeft: 5 }}>{typeof (this.state.data.agency) !== 'undefined' && this.state.data.agency !== null && typeof (this.state.data.agency.name) !== 'undefined' && this.state.data.agency.name !== null && this.state.data.agency.name}</Text>
                                </View>
                                <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                    <Text style={{ flex: 0.3, fontSize: responsiveFontSize(1.8), color: 'white', }}>Đại lý cấp 1: </Text>
                                    <Text style={{ textAlign: 'justify', flex: 0.7, fontWeight: 'bold', fontSize: responsiveFontSize(1.8), color: 'white', marginLeft: 5 }}>{typeof (this.state.data.first_class_agent) !== 'undefined' && this.state.data.first_class_agent !== null && typeof (this.state.data.first_class_agent.name) !== 'undefined' && this.state.data.first_class_agent.name !== null && this.state.data.first_class_agent.name}</Text>
                                </View>
                                <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                    <Text style={{ flex: 0.3, fontSize: responsiveFontSize(1.8), color: 'white', }}>Nhà vườn / Trang trại cung cấp: </Text>
                                    <Text style={{ textAlign: 'justify', flex: 0.7, fontWeight: 'bold', fontSize: responsiveFontSize(1.8), color: 'white', marginLeft: 5 }}>{typeof (this.state.data.first_class_agent) !== 'undefined' && this.state.data.first_class_agent !== null && typeof (this.state.data.first_class_agent.name) !== 'undefined' && this.state.data.first_class_agent.name !== null && this.state.data.first_class_agent.name}</Text>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), }}>Thông tin phân phối</Text>
                            </View>
                        </View>
                    }
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
                        <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', padding: 10 }}>
                            {typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.product_same_category) !== 'undefined' ?
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.state.data.product.product_same_category.map((product, index) => (<SameProduct onPress={() => this.onProductSelected(product)} key={index.toString() + 'OwnedProducts'} item={product} />))}
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
                    <CustomerView icon='user' brand='Họ và tên:' content={(typeof (this.state.data.user_active_warranty) !== 'undefined' && this.state.data.user_active_warranty !== null && typeof (this.state.data.user_active_warranty.name) !== 'undefined' && this.state.data.user_active_warranty.name !== null) && this.state.data.user_active_warranty.name} />
                    <CustomerView icon='phone' brand='Số điện thoại:' content={(typeof (this.state.data.user_active_warranty) !== 'undefined' && this.state.data.user_active_warranty !== null && typeof (this.state.data.user_active_warranty.telephone) !== 'undefined' && this.state.data.user_active_warranty.telephone !== null) && ('+' + this.encodeString(this.state.data.user_active_warranty.telephone))} />
                    <CustomerView icon='address-card' brand='CMND:' content={(typeof (this.state.data.user_active_warranty) !== 'undefined' && this.state.data.user_active_warranty !== null && typeof (this.state.data.user_active_warranty.people_id) !== 'undefined' && this.state.data.user_active_warranty.people_id !== null) && this.state.data.user_active_warranty.people_id} />
                    <CustomerView icon='envelope' brand='Mail:' content={(typeof (this.state.data.user_active_warranty) !== 'undefined' && this.state.data.user_active_warranty !== null && typeof (this.state.data.user_active_warranty.email) !== 'undefined' && this.state.data.user_active_warranty.email !== null) && this.state.data.user_active_warranty.email} />
                    <CustomerView icon='map-marker' brand='Địa chỉ:' content={(typeof (this.state.data.user_active_warranty) !== 'undefined' && this.state.data.user_active_warranty !== null && typeof (this.state.data.user_active_warranty.address) !== 'undefined' && this.state.data.user_active_warranty.address !== null) && this.state.data.user_active_warranty.address} />
                </View>
                {/* <View style={{ borderColor: 'white', borderWidth: 1, paddingTop: 15, paddingBottom: 5, paddingHorizontal: 15, marginTop: 10 }}>
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
                </View> */}
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
                    <GuaranteeView brand='Thời gian bảo hành' content={(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.warranty_period) !== 'undefined' && typeof (this.state.data.product.warranty_period_unit) !== 'undefined') && this.state.data.product.warranty_period + ' ' + this.state.data.product.warranty_period_unit} />
                    <GuaranteeView brand='Hạn sử dụng' content={(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.expiry) !== 'undefined' && typeof (this.state.data.product.expiry_unit) !== 'undefined' && this.state.data.product.expiry !== 0) ? (this.state.data.product.expiry + ' ' + this.state.data.product.warranty_period_unit) : 'Không có hạn sử dụng cho sản phẩm này'} />
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
                    {typeof (this.state.data.active_warranty_date) !== 'undefined' && this.state.data.active_warranty_date !== null &&
                        <View>
                            <GuaranteeView brand='Ngày kích hoạt' content={typeof (this.state.data.active_warranty_date) !== 'undefined' && this.state.data.active_warranty_date !== null && this.getDate(this.state.data.active_warranty_date)} />
                            <GuaranteeView brand='Tình trạng' content='Đang trong thời gian bảo hành' />
                        </View>
                    }
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

        let activate = (
            <View style={{ backgroundColor: priColor, padding: 10 }}>
                {this.props.user.isLogin ?
                    <View style={{ borderColor: 'white', borderWidth: 1, padding: 15 }}>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', }}>
                            <Text style={[{ flex: 0.3 }, styles.normalTitleActiveStyle]}>Họ tên: </Text>
                            <Text style={[{ flex: 0.7 }, styles.titleActiveStyle]}>{this.props.user.infor.name}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 15, }}>
                            <Text style={[{ flex: 0.3 }, styles.normalTitleActiveStyle]}>Địa chỉ: </Text>
                            <Text style={[{ flex: 0.7 }, styles.titleActiveStyle]}>{this.props.user.infor.address}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 15, }}>
                            <Text style={[{ flex: 0.3 }, styles.normalTitleActiveStyle]}>SĐT: </Text>
                            <Text style={[{ flex: 0.7 }, styles.titleActiveStyle]}>+{this.encodeString(this.props.user.infor.telephone)}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 15, }}>
                            <Text style={[{ flex: 0.3 }, styles.normalTitleActiveStyle]}>CMND: </Text>
                            <Text style={[{ flex: 0.7 }, styles.titleActiveStyle]}>{this.props.user.infor.people_id}</Text>
                        </View>
                    </View>
                    :
                    <Text style={{ fontSize: responsiveFontSize(1.8), color: 'white', textAlign: 'center', marginTop: 20 }}>Bạn cần đăng nhập để có thể kích hoạt</Text>
                }

                <TouchableOpacity onPress={() => this.activateProduct()} style={{ borderRadius: 10, marginTop: 20, padding: 10, paddingHorizontal: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                    <Text style={{ color: priColor, fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }}>KÍCH HOẠT</Text>
                </TouchableOpacity>

            </View>
        );

        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} title='THÔNG TIN TRUY XUẤT' />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ paddingBottom: 5, backgroundColor: priColor }}>
                        {this.state.type === 'code' &&
                            <View>
                                <Image style={{ width: width, height: height / 5, resizeMode: 'cover' }} source={{ uri: typeof (this.state.data.product) !== 'undefined' ? this.state.data.product.logo : '' }} />
                                <View style={styles.foreground}>
                                    <Image style={{ width: width, height: height / 5, resizeMode: 'contain' }} source={{ uri: typeof (this.state.data.product) !== 'undefined' ? this.state.data.product.logo : '' }} />
                                </View>
                                <View style={{ backgroundColor: 'white', }}>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Sản phẩm:</Text>
                                        <Text style={[{ flex: 0.6 }, styles.titleStyle]}>{(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.name) !== 'undefined' && this.state.data.product.name !== null) && this.state.data.product.name}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Mã truy xuất:</Text>
                                        <View style={{ flex: 0.6, borderColor: priColor, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={[styles.titleStyle]}>{this.state.data.sms}</Text>
                                            <TouchableOpacity onPress={() => { this.checkCode() }} style={{ backgroundColor: '#008080', paddingVertical: 7, paddingHorizontal: 10, marginBottom: 2 }}>
                                                <Text style={{ fontSize: responsiveFontSize(2), color: 'white', fontWeight: '700' }}>KIỂM TRA</Text>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                    {/* <View style={{ flex: 1, flexDirection: 'row', marginTop: 2, marginHorizontal: 10 }}>
                                        <Text style={{ flex: 0.4 }}></Text>
                                        <Text style={{ flex: 0.6, color: 'red', fontSize: responsiveFontSize(1.7), textAlign: 'justify' }}>(Nhấn vào mã SMS để gửi tin nhắn truy xuất)</Text>
                                    </View> */}
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
                                        {typeof (this.state.data.active_warranty_date) !== 'undefined' && this.state.data.active_warranty_date !== null ?
                                            <Tab style={{ backgroundColor: priColor }} heading="KHÁCH HÀNG" tabStyle={{ backgroundColor: 'white', }} textStyle={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }} activeTabStyle={{ backgroundColor: priColor, }} activeTextStyle={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>
                                                {customer}
                                            </Tab>
                                            :
                                            <Tab style={{ backgroundColor: priColor }} heading="KÍCH HOẠT" tabStyle={{ backgroundColor: 'white' }} textStyle={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }} activeTabStyle={{ backgroundColor: priColor }} activeTextStyle={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>
                                                {activate}
                                            </Tab>
                                        }
                                    </Tabs>
                                </View>
                            </View>
                        }
                        {this.state.type === 'organization' &&
                            <View style={{ backgroundColor: priColor }}>
                                <Image style={{ width: width, height: height / 5, resizeMode: 'cover' }} source={{ uri: this.state.data.logo }} />
                                <View style={styles.foreground}>
                                    <Image style={{ width: width, height: height / 5, resizeMode: 'contain' }} source={{ uri: this.state.data.logo }} />
                                </View>

                                <View style={{ backgroundColor: priColor, paddingBottom: 20 }}>
                                    <View style={{ backgroundColor: 'white', paddingBottom: 10 }}>
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
                                            <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Email:</Text>
                                            <Text style={[{ flex: 0.6 }, styles.titleStyle]}>{typeof (this.state.data.email) !== 'undefined' && this.state.data.email}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10, marginBottom: 5 }}>
                                            <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Website:</Text>
                                            <Text style={[{ flex: 0.6 }, styles.titleStyle]}>{typeof (this.state.data.website) !== 'undefined' && this.state.data.website}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 1, backgroundColor: priColor }}>
                                        <View style={{ padding: 15, width: width, backgroundColor: priColor }}>
                                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(1.8) }}>THÔNG TIN DOANH NGHIỆP</Text>
                                        </View>
                                        <View style={{ paddingHorizontal: 10, backgroundColor: priColor, }}>
                                            <View style={{ borderColor: 'white', borderWidth: 1, backgroundColor: 'white', padding: 15 }}>
                                                <HTML containerStyle={{}} html={(typeof (this.state.data.description) !== 'undefined' && this.state.data.description !== null) ? this.state.data.description : ""} imagesMaxWidth={2 * width / 3} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10, marginTop: 15 }}>
                                        <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', padding: 10 }}>
                                            {typeof (this.state.data.products) !== 'undefined' && this.state.data.products !== null ?
                                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                                    {this.state.data.products.map((product, index) => (<SameProduct key={index.toString() + 'OwnedProductsssss'} item={product} />))}
                                                </ScrollView>
                                                :
                                                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7) }}>Không có sản phẩm nào</Text>
                                            }
                                        </View>
                                        <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), }}>Sản phẩm sở hữu</Text>
                                        </View>
                                    </View>
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
                                    {/* <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                                        <Text style={[{ flex: 0.4 }, styles.titleStyle]}>Mã truy xuất:</Text>
                                        <TouchableOpacity onPress={() => text('01642525299', this.state.data.sms)} style={{ flex: 0.6, borderColor: priColor, borderBottomWidth: 1 }}>
                                            <Text style={[styles.titleStyle]}>{this.state.data.sms}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 2, marginHorizontal: 10 }}>
                                        <Text style={{ flex: 0.4 }}></Text>
                                        <Text style={{ flex: 0.6, color: 'red', fontSize: responsiveFontSize(1.7), textAlign: 'justify' }}>(Nhấn vào mã SMS để gửi tin nhắn truy xuất)</Text>
                                    </View> */}
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
                    <Modal
                        ref={'moreInfor'}
                        style={{
                            backgroundColor: 'white',
                            alignItems: 'center',
                            borderRadius: Platform.OS === 'ios' ? 15 : 10,
                            shadowRadius: 10,
                            width: 3 * width / 4,
                            height: 3 * height / 5,
                        }}
                        position='center'
                        backdrop={true}
                        swipeToClose={false}
                        entry='bottom'
                    >
                        <View>
                            {(typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.description) !== 'undefined' && this.state.data.product.description !== null) ?
                                <View style={{ flex: 1, padding: 5 }}>
                                    <Text style={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(2), marginTop: 20 }}>{typeof (this.state.data.product) !== 'undefined' && typeof (this.state.data.product.name) !== 'undefined' && this.state.data.product.name}</Text>
                                    <TouchableOpacity onPress={() => this.refs.moreInfor.close()} style={{ position: 'absolute', right: 10 }}>
                                        <Icon name='close' style={{ color: activeColor, fontSize: 30 }} />
                                    </TouchableOpacity>

                                    <ScrollView style={{ flex: 1, paddingBottom: 20, paddingHorizontal: 10, paddingTop: 25 }}>
                                        <HTML containerStyle={{ paddingBottom: 5 }} html={this.state.data.product.description} imagesMaxWidth={2 * width / 3} />
                                        <Text>                                                                                 </Text>
                                    </ScrollView>
                                </View>
                                :
                                <View style={{ flex: 1, padding: 5 }}>
                                    <TouchableOpacity onPress={() => this.refs.moreInfor.close()} style={{ position: 'absolute', right: 10 }}>
                                        <Icon name='close' style={{ color: activeColor, fontSize: 30 }} />
                                    </TouchableOpacity>
                                    <View style={{ flex: 1, paddingBottom: 20, paddingHorizontal: 10, marginTop: 20 }}>
                                        <Text style={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(2) }}>Không có thông tin chi tiết cho sản phẩm này</Text>
                                    </View>
                                </View>
                            }
                        </View>

                    </Modal>
                    <Modal
                        ref={'activateProduct'}
                        style={{
                            paddingVertical: 20,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            borderRadius: Platform.OS === 'ios' ? 15 : 10,
                            shadowRadius: 10,
                            width: 7 * width / 8,
                            height: null,
                            paddingHorizontal: 10,
                        }}
                        position='center'
                        swipeToClose={false}
                        backdrop={false}
                        backdropPressToClose={false}
                    >
                        <View>
                            <Text style={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(2) }}>Nhập mã kích hoạt đã được gửi qua SMS</Text>
                            <TextInput underlineColorAndroid='transparent' placeholder='Mã kích hoạt' value={this.state.active_code} onChangeText={(text) => this.setState({ active_code: text })} style={{ fontWeight: 'bold', paddingTop: 15, width: 3 * width / 4, padding: 10, textAlign: 'center', fontSize: responsiveFontSize(2) }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: width / 10, paddingTop: 15 }}>
                                <TouchableOpacity onPress={() => this.refs.activateProduct.close()} style={{ borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: width / 4, backgroundColor: priColor, paddingVertical: 8 }}>
                                    <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: responsiveFontSize(1.7) }}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onActivateWarranty()} style={{ borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: width / 4, backgroundColor: priColor, paddingVertical: 8 }}>
                                    <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: responsiveFontSize(1.7) }}>Kích hoạt</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        ref={'notifyForm'}
                        style={{
                            backgroundColor: 'white',
                            alignItems: 'center',
                            borderRadius: Platform.OS === 'ios' ? 15 : 10,
                            shadowRadius: 10,
                            width: 3 * width / 4,
                            height: null,
                            borderColor: '#0aa3dc', borderWidth: 1.5
                        }}
                        position='center'
                        backdrop={true}
                        swipeToClose={false}
                        entry='bottom'
                    >
                        <View style={{ padding: 10 }}>
                            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.1), marginTop: 20, fontWeight: '700' }}>
                                <Text style={{ color: '#0aa3dc' }}>NẾU BẠN SỞ HỮU SẢN PHẨM NÀY, XIN BẤM </Text>
                                <Text style={{ color: 'red', }} onPress={() => {
                                    this.setState({ activePage: 2 });
                                    this.refs.notifyForm.close();
                                }}>"KÍCH HOẠT"</Text>
                                <Text style={{ color: '#0aa3dc' }}> ĐỂ XÁC THỰC THÔNG TIN SỞ HỮU. THỰC HIỆN ĐIỀU NÀY GIÚP BẠN</Text>
                                <Text style={{ color: 'red', }}> BẢO VỆ QUYỀN LỢI </Text>
                                <Text style={{ color: '#0aa3dc' }}>CỦA BẠN VÀ </Text>
                                <Text style={{ color: 'red', }}>THƯƠNG HIỆU DOANH NGHIỆP. </Text>
                                <Text style={{ color: '#0aa3dc' }}>XIN CÁM ƠN.</Text>
                            </Text>
                            <TouchableOpacity onPress={() => this.refs.notifyForm.close()} style={{ position: 'absolute', right: 10 }}>
                                <Icon name='close' style={{ color: activeColor, fontSize: 30 }} />
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}

const styles = {
    titleActiveStyle: {
        color: 'white', fontSize: responsiveFontSize(2), fontWeight: 'bold', textAlign: 'justify'
    },
    normalTitleActiveStyle: {
        color: 'white', fontSize: responsiveFontSize(2),
    },
    titleStyle: {
        color: priColor, fontSize: responsiveFontSize(2), fontWeight: 'bold', textAlign: 'justify'
    },
    normalTitleStyle: {
        color: priColor, fontSize: responsiveFontSize(2),
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
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScannedProduct);