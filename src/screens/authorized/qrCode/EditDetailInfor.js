import React, { Component } from 'react';
import { View, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView, TouchableHighlight, FlatList, ActivityIndicator, Platform, TextInput } from 'react-native';
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

import { priColor, thirdColor } from '../../../constants/colors';

import DatePicker from 'react-native-datepicker'

class EditDetailInfor extends Component {

    static navigationOptions = {
    }

    constructor(props) {
        super(props);
        this.state = {
            notes: '',
            date: this.formatDate(new Date())
        }
    }

    formatDate = (date) => {
        let today = new Date(date);
        let dd = today.getDate();

        let mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = `0${dd}`;
        }

        if (mm < 10) {
            mm = `0${mm}`;
        }
        today = `${dd}-${mm}-${yyyy}`;
        return today;
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

        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} title='THÔNG TIN TRUY XUẤT' />
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: priColor, paddingBottom: 20 }}>
                    <ScrollView style={{ paddingBottom: 5, backgroundColor: priColor, marginBottom: 20 }}>
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
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', marginTop: 10, textAlign: 'center', }}>Sản phẩm: Nho Ninh Thuận</Text>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', marginTop: 5, marginBottom: 5 }}>{this.state.type === 1 ? 'Serial' : 'Mã vạch'}: 12345678</Text>
                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'white', width: '100%', paddingTop: 15, paddingBottom: 10, paddingHorizontal: 10 }}>
                                    <TextInput underlineColorAndroid='transparent' style={{ flex: 0.9, marginRight: 15, padding: 10, fontSize: responsiveFontSize(1.8), backgroundColor: 'white', color: 'rgba(0, 0, 0, 0.8)' }} editable={false} value={this.state.date} />
                                    <DatePicker
                                        style={{ flex: 0.1, backgroundColor: 'transparent' }}
                                        date={this.state.date}
                                        mode="date"
                                        format="YYYY-MM-DD"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        hideText={true}
                                        customStyles={{
                                        }}
                                        onDateChange={(date) => {
                                            this.setState({ date: this.formatDate(date) });
                                        }}
                                    />
                                </View>
                                <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontWeight: 'bold' }}>Ngày kích hoạt</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', paddingTop: 15, paddingBottom: 10, paddingHorizontal: 10 }}>
                                    <TextInput underlineColorAndroid='transparent' style={{ padding: 10, fontSize: responsiveFontSize(1.8), backgroundColor: 'white', color: 'rgba(0, 0, 0, 0.8)' }} />
                                </View>
                                <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontWeight: 'bold' }}>Thời gian bảo hành</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', paddingTop: 15, paddingBottom: 10, paddingHorizontal: 10 }}>
                                    <TextInput underlineColorAndroid='transparent' style={{ padding: 10, fontSize: responsiveFontSize(1.8), backgroundColor: 'white', color: 'rgba(0, 0, 0, 0.8)' }} />
                                </View>
                                <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontWeight: 'bold' }}>Tình trạng</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', paddingTop: 15, paddingBottom: 10, paddingHorizontal: 10 }}>
                                    <TextInput underlineColorAndroid='transparent' style={{ padding: 10, fontSize: responsiveFontSize(1.8), backgroundColor: 'white', color: 'rgba(0, 0, 0, 0.8)' }} />
                                </View>
                                <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontWeight: 'bold' }}>Số lô</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', paddingTop: 15, paddingBottom: 10, paddingHorizontal: 10 }}>
                                    <TextInput underlineColorAndroid='transparent' style={{ padding: 10, fontSize: responsiveFontSize(1.8), backgroundColor: 'white', color: 'rgba(0, 0, 0, 0.8)' }} />
                                </View>
                                <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontWeight: 'bold' }}>Hạn sử dụng</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', paddingTop: 15, paddingBottom: 10, paddingHorizontal: 10 }}>
                                    <TextInput underlineColorAndroid='transparent' style={{ padding: 10, fontSize: responsiveFontSize(1.8), backgroundColor: 'white', color: 'rgba(0, 0, 0, 0.8)' }} />
                                </View>
                                <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontWeight: 'bold' }}>Điểm bảo hành</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: 'white', width: '100%', paddingTop: 15, paddingBottom: 10, paddingHorizontal: 10 }}>
                                    <Textarea
                                        underlineColorAndroid='transparent'
                                        style={{ backgroundColor: 'white', fontSize: responsiveFontSize(1.8) }}
                                        rowSpan={5}
                                        multiline={true}
                                        bordered
                                    />
                                </View>
                                <View style={{ position: 'absolute', top: 0, left: 15, backgroundColor: priColor }}>
                                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7), fontWeight: 'bold' }}>Note</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={{ alignSelf: 'center', borderColor: 'white', marginTop: 15, borderRadius: 10, borderWidth: 1, padding: 10, width: 2 * width / 3 }}>
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Xác nhận</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }

}

const styles = {
    title: {
        fontSize: responsiveFontSize(1.8), flex: 0.3, color: priColor,
    },
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDetailInfor);