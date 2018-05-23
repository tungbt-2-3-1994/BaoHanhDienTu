import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, TouchableHighlight, FlatList, ActivityIndicator, Platform, TextInput } from 'react-native';
import BackHeaderQRCode from '../../../components/BackHeaderQRCode';

import { width, height } from '../../../constants/dimensions';

import { responsiveFontSize, responsiveHeight } from '../../../utils/helpers';

import { Tab, Tabs, Button, Icon, Text, Card, Body, Left, Textarea } from 'native-base';

import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux';

import { fetchProductDetail } from '../../../actions';

import { phonecall, email, text, textWithoutEncoding, web } from 'react-native-communications';

import ReadMore from 'react-native-read-more-text';

import Modal from 'react-native-modalbox';

import IconFA from 'react-native-vector-icons/FontAwesome';

import { normalLogin } from '../../../actions/index';
import { getAgencyInfo } from '../../../actions/Agency';

import ModalDropdown from 'react-native-modal-dropdown';

const fake_data = [
    { 'name': 'Táo ta', 'price': 40000, 'uri': 'https://lamtho.vn/wp-content/uploads/2017/11/ghep-cay-tao.jpg' },
    { 'name': 'Cam sành', 'price': 50000, 'uri': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqJy2M6n9XjUk54XDhtetxN3eHiR8jhiM-I3-lYo8WcvRIagAAcw' },
    { 'name': 'Chôm chôm', 'price': 60000, 'uri': 'https://lamtho.vn/wp-content/uploads/2017/11/ghep-cay-tao.jpg' },
];

const SameCate = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => alert(item.name)} style={{ width: (width - 20) / 3, height: null, flex: 1, marginRight: 5 }}>
            <Image source={{ uri: item.uri }} style={{ height: (width - 20) / 3, width: (width - 20) / 3, resizeMode: 'stretch' }} />
            <Text style={{ padding: 3, textAlign: 'center', fontSize: responsiveFontSize(1.5) }}>
                {item.name}
            </Text>
            <Text style={{ padding: 3, textAlign: 'center', opacity: 0.9, fontSize: responsiveFontSize(1.5), color: 'red' }}>
                {item.price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')}đ
                    </Text>
        </TouchableOpacity>
    );
}

const ListHeader = ({ title, moreEvent }) => {
    return (
        <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', backgroundColor: 'red', paddingVertical: 5 }}>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontWeight: 'bold' }}>{title}</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={moreEvent}>
                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.3), marginRight: 3 }}>Xem tất cả</Text>
                <Icon name='ios-arrow-forward-outline' style={{ color: 'white', fontSize: responsiveFontSize(2) }} />
            </TouchableOpacity>
        </View>
    );
}

class ProductDetail extends Component {

    static navigationOptions = {
    }

    constructor(props) {
        super(props);
        this.state = {
            qr_code: '',
            dataDetail: {},
            type: 1,
            productName: '',
            username: '',
            password: '',
            agency: {},
            loaded: false,
            loading: false,
            productPrice: 0,
            productDes: '',
            product_id: 0,
            agency_id: 0,
            note: '',
            url: []
        }
    }

    showCert = () => {
        this.refs.myModalCert.open();
    }
    showEdit = () => {
        this.refs.editModal.open();
    }

    componentDidMount() {
        this.props.navigation.state.params.onDone(false);
        const { code } = this.props.navigation.state.params;
        var pieces = code.split('/');
        this.setState({
            qr_code: pieces[pieces.length - 1],
            loading: true
        }, () => {
            fetch(`http://vatapcheck.com.vn/api/v1/qrcode`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'code': this.state.qr_code
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.code === 200) {
                        if (responseData.data !== null) {
                            if (responseData.data.organization !== null && responseData.data.product !== null) {
                                this.setState({
                                    productName: responseData.data.product.name,
                                    productPrice: responseData.data.product.price,
                                    dataDetail: responseData.data.organization,
                                    productDes: responseData.data.product.description,
                                    type: 1,
                                    loading: false,
                                    url: responseData.data.product.logo
                                });
                            }
                        }
                    } else {
                        fetch(`http://vatapcheck.com.vn/api/v1/barcode`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                'gtin': this.state.qr_code
                            })
                        })
                            .then((res) => res.json())
                            .then((resData) => {
                                if (resData.code === 200) {
                                    if (resData.data !== null) {
                                        if (resData.data.organization !== null && resData.data.product !== null) {
                                            this.setState({
                                                productName: resData.data.product.name,
                                                dataDetail: resData.data.organization,
                                                productPrice: resData.data.product.price,
                                                productDes: resData.data.product.description,
                                                type: 2,
                                                loading: false,
                                                url: resData.data.product.logo
                                            });
                                        }
                                    }
                                }
                            })
                            .catch(e => {
                                this.setState({ loading: false });
                                alert('fail to load data 1');
                            })
                            .done();
                    }
                })
                .catch(e => {
                    this.setState({ loading: false });
                    alert('fail to load data 2');
                })
                .done();
        });
    }

    componentWillUnmount() {
        this.props.navigation.state.params.onDone(true);
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

    renderEmpty = () => {
        if (this.state.loading === true) {
            return (
                <ActivityIndicator animating={true} color='red' size='large' />
            );
        }
        return (
            <View>
                <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: responsiveFontSize(2), color: 'green' }}>Không có mặt hàng nào trong danh mục này</Text>
            </View>
        );
    }

    show = () => {
        if (this.props.user.status === false) {
            this.refs.modalLogin.open();
        } else {
            if (this.state.type === 1) {
                this.refs.modalLogin.close();
                this.setState({ loading: true });
                fetch(`http://vatapcheck.com.vn/api/v1/qrcode/edit/${this.state.qr_code}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${this.props.user.user.token_type} ${this.props.user.user.access_token}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        if (typeof (responseData.organization) !== 'undefined') {
                            this.setState({
                                agency: responseData,
                                loaded: true,
                                loading: false
                            }, () => {
                                this.refs.myEditModal.open();
                            });
                        } else {
                            this.setState({ loading: false });
                            alert('Có lỗi khi lấy dữ liệu về');
                        }
                    })
                    .catch(e => {
                        this.setState({ loading: false });
                        alert('Có lỗi khi lấy dữ liệu về');
                        console.log(e);
                    });
            } else {
                alert('Bạn không thể chỉnh sửa cho sản phẩm này');
            }

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.status === true) {
            this.setState({ loading: false });
            this.refs.modalLogin.close();
        }
    }

    _renderRow = () => {

    }

    _product_modal_renderButtonText(rowData) {
        const { name } = rowData;
        return name;
    }

    _product_modal_renderRow(rowData, rowID, highlighted) {
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={[styles.product_modal_row,]}>
                    <Text style={[styles.product_modal_row_text, highlighted && { color: 'red' }]}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    _product_modal_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID == this.state.agency.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.product_modal_separator}
            key={key}
        />);
    }

    _address_modal_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID == this.state.agency.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.product_modal_separator}
            key={key}
        />);
    }

    _product_onSelect(idx, value) {
        this.setState({
            product_id: value.id,
        });
    }

    _agency_onSelect(idx, value) {
        this.setState({
            agency_id: value.id,
        });
    }

    editInfor = () => {
        fetch(`http://vatapcheck.com.vn/api/v1/qrcode/edit`, {
            method: 'POST',
            headers: {
                'Authorization': `${this.props.user.user.token_type} ${this.props.user.user.access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'code': this.state.qr_code,
                'product_id': this.state.product_id,
                'agency_id': this.state.agency_id,
                'note': this.state.note
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.code === 200) {
                    alert('Cập nhật thành công');
                    fetch(`http://vatapcheck.com.vn/api/v1/qrcode`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            'code': this.state.qr_code
                        })
                    })
                        .then((resp) => resp.json())
                        .then(respData => {
                            if (respData.code === 200) {
                                if (respData.data !== null) {
                                    if (respData.data.organization !== null && respData.data.product !== null) {
                                        this.setState({
                                            productName: respData.data.product.name,
                                            productDes: respData.data.product.description,
                                        });
                                    }
                                }
                            } else {
                                alert('Lỗi khi cập nhật dữ liệu');
                            }
                        })
                        .catch(e => {
                            alert('Lỗi khi cập nhật dữ liệu');
                        });
                } else {
                    alert('Bạn không có quyền thay đổi');
                }
            })
            .catch(e => {
                this.setState({ loading: false });
                alert('Có lỗi khi sửa dữ liệu');
            })
            .done();
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

                    <Text style={{ color: '#3f3f3f', textAlign: 'auto', fontSize: responsiveFontSize(1.5) }}>
                        {this.state.dataDetail.description}
                    </Text>

                </Card>
            </View>
        );

        let partner = (
            <View style={{ paddingHorizontal: 3, backgroundColor: '#eceaeb' }}>
                <Card style={{ width: width - 10, backgroundColor: 'white', padding: 10 }}>
                    <Text style={{ textAlign: 'auto', fontSize: responsiveFontSize(1.5) }}>
                        Chưa có thông tin về địa điểm bán cho sản phẩm này
                    </Text>
                </Card>
            </View>

        );

        let productInfor = (
            <View style={{ paddingHorizontal: 3, backgroundColor: '#eceaeb' }}>
                <Card style={{ width: width - 10, backgroundColor: 'white', padding: 10, marginBottom: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ color: 'red', textAlign: 'auto', fontSize: responsiveFontSize(1.5), marginBottom: 5 }}>
                            Giá tham khảo
                        </Text>
                        <Text style={{ color: '#3f3f3f', textAlign: 'auto', fontSize: responsiveFontSize(1.5) }}>
                            {this.state.productPrice !== null ? this.state.productPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') : '0'}đ
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.show()} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <IconFA name='edit' style={{ color: 'red', marginRight: 5, fontSize: responsiveFontSize(2) }} />
                            <Text style={{ color: 'red', }}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
                <Card style={{ width: width - 10, backgroundColor: 'white', padding: 10, marginBottom: 1 }}>
                    <Text style={{ color: 'red', textAlign: 'auto', fontSize: responsiveFontSize(1.5), marginBottom: 5 }}>
                        Thông tin chi tiết
                    </Text>

                    <Text style={{ color: '#3f3f3f', textAlign: 'auto', fontSize: responsiveFontSize(1.5) }}>
                        {this.state.productDes}
                    </Text>

                </Card>
            </View>
        );

        return (
            <View style={styles.container}>
                <BackHeaderQRCode onPress={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ paddingBottom: 5 }}>
                        <View style={{ width: width, height: height / 5 }}>
                            {this.state.url === null ?
                                <Text style={{ alignSelf: 'center', textAlign: 'center' }}>Không có ảnh đại diện cho sản phẩm này</Text>
                                :
                                <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/products/${this.state.url}` }} style={styles.customImage} />
                            }

                        </View>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', marginTop: 10, alignText: 'center' }}>{this.state.productName}</Text>
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', marginTop: 5, opacity: 0.8 }}>{this.state.type === 1 ? 'Serial' : 'Mã vạch'}: {this.state.qr_code}</Text>
                        <View style={{ backgroundColor: 'red', marginTop: 10, flexDirection: 'row', padding: 4 }}>
                            <TouchableOpacity onPress={() => this.showCert()} style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                                <Text style={{ color: 'white', fontSize: responsiveFontSize(2), marginRight: 7 }}>Hàng chính hãng</Text>
                                <Icon name='ios-checkmark' style={{ fontSize: 40, color: 'white' }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Tabs initialPage={0} style={{}} tabBarUnderlineStyle={{ backgroundColor: 'red' }}>
                                <Tab heading="Chi tiết sản phẩm" tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'red', fontSize: responsiveFontSize(1.5) }} activeTabStyle={{ backgroundColor: 'red' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.5) }}>
                                    {productInfor}
                                </Tab>
                                <Tab heading="Nhà sản xuất" tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'red', fontSize: responsiveFontSize(1.5) }} activeTabStyle={{ backgroundColor: 'red' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.5) }}>
                                    {agency}
                                </Tab>
                                <Tab heading="Nhà phân phối" tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'red', fontSize: responsiveFontSize(1.5) }} activeTabStyle={{ backgroundColor: 'red' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(1.5) }}>
                                    {partner}
                                </Tab>
                            </Tabs>
                        </View>
                        <View>
                            <ListHeader title='Sản phẩm cùng nhà sản xuất' />
                            <ScrollView style={{ padding: 5, marginBottom: 5, }} horizontal={true}>
                                {fake_data.map((item, index) =>
                                    <SameCate key={index} item={item} />
                                )}
                            </ScrollView>
                        </View>
                    </ScrollView>
                    <Modal
                        ref={'modalLogin'}
                        style={{
                            paddingVertical: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: Platform.OS === 'ios' ? 15 : 10,
                            shadowRadius: 10,
                            width: 7 * width / 8,
                            height: null,
                            justifyContent: 'space-between'
                        }}
                        position='center'
                        backdrop={true}
                    >

                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(3), color: 'red' }}>Vui lòng đăng nhập</Text>
                        <TextInput
                            style={styles.textInput}
                            allowFontScaling={true}
                            placeholder='Tên đăng nhập'
                            placeholderTextColor='#a9b8bb'
                            keyboardType='email-address'
                            onChangeText={(text) => { this.setState({ username: text }) }}
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            onSubmitEditing={() => this.password.focus()}
                        />
                        <TextInput
                            style={styles.textInput}
                            allowFontScaling={true}
                            placeholder='Mật khẩu'
                            placeholderTextColor='#a9b8bb'
                            defaultValue=''
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            returnKeyType='done'
                            ref={(input) => this.password = input}
                        />
                        <Button onPress={() => {
                            this.setState({ loading: true });
                            this.props.normalLogin(this.state.username, this.state.password);
                        }}
                            style={styles.btnLoginContainer}>
                            <Text style={styles.goStyle}>Đăng nhập</Text>
                        </Button>

                    </Modal>
                    <Modal
                        ref={'myModalCert'}
                        style={{
                            paddingVertical: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: Platform.OS === 'ios' ? 15 : 10,
                            shadowRadius: 10,
                            width: 7 * width / 8,
                            height: null,
                            justifyContent: 'space-between'
                        }}
                        position='center'
                        backdrop={true}
                    >


                    </Modal>
                    <Modal
                        ref={'myEditModal'}
                        style={{
                            paddingVertical: 20,
                            alignItems: 'center',
                            borderRadius: Platform.OS === 'ios' ? 15 : 10,
                            shadowRadius: 10,
                            width: 7 * width / 8,
                            height: null,
                            paddingHorizontal: 10,
                            justifyContent: 'space-between'
                        }}
                        position='center'
                        backdrop={true}
                    >
                        <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(3), color: 'blue' }}>Chỉnh sửa thông tin</Text>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={styles.title}>Doanh nghiệp</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.8), flex: 0.7 }}>{(this.state.loaded && this.state.agency.organization !== null) ? this.state.agency.organization.name : ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={styles.title}>Serial</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.8), flex: 0.7 }}>{this.state.qr_code}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={styles.title}>Sản phẩm</Text>
                            <View style={{ flex: 0.7 }}>
                                <ModalDropdown
                                    style={styles.product_modal}
                                    defaultValue='Chọn sản phẩm'
                                    textStyle={styles.product_modal_text}
                                    onSelect={(idx, value) => this._product_onSelect(idx, value)}
                                    dropdownStyle={styles.product_modal_dropdown}
                                    options={this.state.agency.products}
                                    renderButtonText={(rowData) => this._product_modal_renderButtonText(rowData)}
                                    renderRow={this._product_modal_renderRow.bind(this)}
                                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._product_modal_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                                />
                            </View>
                            {/* <Text style={{ fontSize: responsiveFontSize(1.8), flex: 0.7 }}></Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={styles.title}>Điểm bán</Text>
                            <View style={{ flex: 0.7 }}>
                                <ModalDropdown
                                    style={styles.product_modal}
                                    defaultValue='Chọn điểm bán'
                                    onSelect={(item) => alert(item.id)}
                                    textStyle={styles.product_modal_text}
                                    onSelect={(idx, value) => this._agency_onSelect(idx, value)}
                                    dropdownStyle={styles.product_modal_dropdown}
                                    options={this.state.agency.agencies}
                                    renderButtonText={(rowData) => this._product_modal_renderButtonText(rowData)}
                                    renderRow={this._product_modal_renderRow.bind(this)}
                                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._address_modal_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={styles.title}>Ghi chú</Text>
                            <Textarea onChangeText={(text) => this.setState({ note: text })} value={this.state.note} style={{ fontSize: responsiveFontSize(1.8), flex: 0.7, }} rowSpan={5} bordered placeholder="Nhập ghi chú" />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 5 }}>
                            <Button onPress={() => { this.refs.myEditModal.close() }} style={styles.cancelContainer}>
                                <Text style={styles.cancelStyle}>   Hủy   </Text>
                            </Button>
                            <Button onPress={() => {
                                this.refs.myEditModal.close();
                                this.editInfor();
                            }} style={styles.btnLoginContainer}>
                                <Text style={styles.goStyle}>   Lưu   </Text>
                            </Button>
                        </View>
                    </Modal>

                </View>
                <ActivityIndicator style={{ position: 'absolute', top: height / 2 - 18, left: width / 2 - 18 }} size='large' color='red' animating={this.state.loading} />
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
        fontSize: responsiveFontSize(1.8), flex: 0.3, color: 'red',
    },
    textInput: { width: 3 * width / 4, marginTop: 10, marginHorizontal: 10, borderRadius: 10, textAlign: 'center', backgroundColor: '#d7eff1', padding: 15, fontSize: 16 },
    btnLoginContainer: { marginTop: 10, alignSelf: 'center', borderColor: 'white', borderRadius: 10, borderWidth: 1.5 },
    cancelContainer: { marginTop: 10, alignSelf: 'center', borderColor: 'white', borderRadius: 10, borderWidth: 1.5, backgroundColor: 'red', marginRight: 15 },
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);