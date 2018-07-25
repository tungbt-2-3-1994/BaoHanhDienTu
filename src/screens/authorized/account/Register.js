import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, TextInput, Alert, ActivityIndicator } from 'react-native';
import BackHeader from '../../../components/BackHeader';
import { width, height } from '../../../constants/dimensions';

import { Icon, Button } from 'native-base';
import { Input, SocialIcon, CheckBox } from 'react-native-elements';
import { responsiveFontSize } from '../../../utils/helpers';
import { validateEmail } from '../../../utils/validateEmail';
import { phoneNumber } from '../../../utils/validatePhoneNumber';
import { priColor, activeColor, thirdColor } from '../../../constants/colors';
import { connect } from 'react-redux';

import { host } from '../../../constants/api';

import Modal from 'react-native-modalbox';

class Register extends Component {
    static navigationOptions = {
    }

    state = {
        checked: false,
        phone: '',
        password: '',
        name: '',
        confirm_password: '',
        error_phone: '',
        error_password: '',
        error_confirm_password: '',
        error_name: '',
        show: false,
        active_code: '',
        url_to_activate: '',
        loading: false
    }

    onRegister = () => {

        if (this.state.phone.length === 0) {
            this.setState({ error_phone: 'Số điện thoại không hợp lệ' });
        } else {
            if (this.state.name.length === 0) {
                this.setState({ error_name: 'Bạn phải nhập tên của mình' });
            } else {
                if (this.state.password.length < 8) {
                    this.setState({ error_password: 'Mật khẩu phải dài hơn 8 ký tự' });
                } else {
                    if (this.state.password !== this.state.confirm_password) {
                        this.setState({ error_confirm_password: 'Mật khẩu không trùng nhau' });
                    } else {
                        fetch(`${host}/signup`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                'name': this.state.name,
                                'password': this.state.password,
                                'password_confirmation': this.state.confirm_password,
                                'telephone': this.state.phone,
                                'client_id': '1',
                                'client_secret': 'ieFnVZkuuJfrou5HFK2VVGQqmVUwwcTSrgHql9fb'
                            })
                        })
                            .then((response) => response.json())
                            .then((responseData) => {
                                console.log('asas', responseData);
                                if (responseData.code === 200) {
                                    this.setState({
                                        url_to_activate: responseData.confirm_url,
                                        show: true
                                    }, () => {
                                        this.refs.activateModal.open();
                                    });
                                } else {
                                    alert('Số điện thoại này đã được đăng ký rồi. \n Mời bạn đăng ký với số điện thoại khác');
                                }
                            })
                            .catch(e => {
                                console.log(e);
                                alert('Số điện thoại này đã được đăng ký rồi. \n Mời bạn đăng ký với số điện thoại khác');
                            })
                            .done();
                    }
                }
            }
        }
    }

    onActivate = () => {
        this.setState({ loading: true });
        fetch(`${this.state.url_to_activate}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'code': this.state.active_code
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('asas', responseData);
                if (responseData.code === 200) {
                    this.setState({
                        show: false
                    });
                    Alert.alert(
                        'Kích hoạt thành công',
                        'Mời bạn đăng nhập',
                        [
                            { text: 'OK', onPress: () => this.props.navigation.goBack() },
                        ],
                        { cancelable: false }
                    );
                } else {
                    Alert.alert(
                        'Kích hoạt thất bại',
                        'Mã kích hoạt không đúng hoặc đã quá thời gian để kích hoạt. \nVui lòng đăng ký lại',
                        { cancelable: false }
                    )
                }
                this.setState({ loading: false });
            })
            .catch(e => {
                console.log(e);
                this.setState({ loading: false });
                Alert.alert(
                    'Kích hoạt thất bại',
                    'Mã kích hoạt không đúng hoặc đã quá thời gian để kích hoạt. \nVui lòng đăng ký lại',
                    { cancelable: false }
                )
            })
            .done();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: priColor, }}>
                <BackHeader navigation={this.props.navigation} title='ĐĂNG KÝ' />
                <ScrollView contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }} >
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(2.3), textAlign: 'center', }}>Với mạng xã hội</Text>
                        <SocialIcon
                            style={{ paddingHorizontal: 20 }}
                            title='Đăng nhập với Facebook'
                            button
                            type='facebook'
                        />
                        <Text style={{ marginTop: 30, color: 'rgba(255, 255, 255, 0.4)', fontSize: responsiveFontSize(2.1), textAlign: 'center', }}>------------Hoặc------------</Text>
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <View style={{ borderWidth: 1, borderColor: 'white', paddingHorizontal: 10, paddingTop: 20, marginBottom: 5, alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                                <Input
                                    containerStyle={{ width: 4 * width / 5, borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                                    inputContainerStyle={{ borderColor: 'transparent' }}
                                    inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                                    leftIcon={<Icon name='ios-call' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                                    placeholder='Số điện thoại'
                                    errorStyle={{ color: 'red' }}
                                    errorMessage={this.state.error_phone === '' ? null : this.state.error_phone}
                                    placeholderTextColor='white'
                                    keyboardType='number-pad'
                                    onChangeText={(text) => { this.setState({ phone: text }) }}
                                    underlineColorAndroid='transparent'
                                    returnKeyType='next'
                                    selectionColor='white'
                                    onFocus={() => this.setState({ error_phone: '' })}
                                    onSubmitEditing={() => this.name.focus()}
                                />
                                <Input
                                    containerStyle={{ marginTop: 10, width: 4 * width / 5, borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                                    inputContainerStyle={{ borderColor: 'transparent' }}
                                    inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                                    leftIcon={<Icon name='ios-contact' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                                    placeholder='Tên hiển thị'
                                    errorStyle={{ color: 'red' }}
                                    errorMessage={this.state.error_name === '' ? null : this.state.error_name}
                                    placeholderTextColor='white'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => { this.setState({ name: text }) }}
                                    returnKeyType='next'
                                    selectionColor='white'
                                    onFocus={() => this.setState({ error_name: '' })}
                                    ref={(input) => this.name = input}
                                    onSubmitEditing={() => this.password.focus()}
                                />
                                {/* <Input
                                    containerStyle={{ marginTop: 10, width: 4 * width / 5, borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                                    inputContainerStyle={{ borderColor: 'transparent' }}
                                    inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                                    leftIcon={<Icon name='ios-lock' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                                    placeholder='Mật khẩu'
                                    errorStyle={{ color: 'red' }}
                                    errorMessage={this.state.error_password === '' ? null : this.state.error_password}
                                    placeholderTextColor='white'
                                    secureTextEntry={!this.state.checked}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => { this.setState({ password: text }) }}
                                    returnKeyType='next'
                                    selectionColor='white'
                                    onFocus={() => this.setState({ error_confirm_password: '', error_password: '' })}
                                    ref={(input) => this.password = input}
                                    onSubmitEditing={() => this.confirmPassword.focus()}
                                /> */}
                                <Input
                                    containerStyle={{ marginTop: 10, width: 4 * width / 5, borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                                    inputContainerStyle={{ borderColor: 'transparent' }}
                                    inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                                    leftIcon={<Icon name='ios-lock' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                                    placeholder='Mật khẩu'
                                    errorStyle={{ color: 'red' }}
                                    errorMessage={this.state.error_password === '' ? null : this.state.error_password}
                                    placeholderTextColor='white'
                                    secureTextEntry={!this.state.checked}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => { this.setState({ password: text }) }}
                                    returnKeyType='next'
                                    selectionColor='white'
                                    onFocus={() => this.setState({ error_confirm_password: '', error_password: '' })}
                                    ref={(input) => this.password = input}
                                    onSubmitEditing={() => this.confirmPassword.focus()}
                                />
                                <Input
                                    containerStyle={{ marginTop: 10, width: 4 * width / 5, borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                                    inputContainerStyle={{ borderColor: 'transparent' }}
                                    inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                                    leftIcon={<Icon name='ios-lock' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                                    placeholder='Xác nhận mật khẩu'
                                    errorStyle={{ color: 'red' }}
                                    errorMessage={this.state.error_confirm_password === '' ? null : this.state.error_confirm_password}
                                    onFocus={() => this.setState({ error_confirm_password: '', error_password: '' })}
                                    placeholderTextColor='white'
                                    secureTextEntry={!this.state.checked}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => { this.setState({ confirm_password: text }) }}
                                    returnKeyType='done'
                                    selectionColor='white'
                                    ref={(input) => this.confirmPassword = input}
                                // onSubmitEditing={() => this.onRegister()}
                                />
                                <View style={{ flexDirection: 'row', width: 5 * width / 6, justifyContent: 'space-between', marginTop: 5, alignItems: 'center', paddingRight: 8 }}>
                                    <CheckBox
                                        containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent', paddingHorizontal: 0 }}
                                        textStyle={{ color: !this.state.checked ? 'rgba(255, 255, 255, 0.5)' : 'white' }}
                                        title='Hiển thị mật khẩu'
                                        iconType='font-awesome'
                                        checkedIcon='check-square'
                                        uncheckedIcon='square'
                                        checkedColor='white'
                                        uncheckedColor='rgba(255, 255, 255, 0.5)'
                                        checked={this.state.checked}
                                        onPress={() => this.setState({ checked: !this.state.checked })}
                                    />
                                    {this.state.show &&
                                        <TouchableOpacity onPress={() => this.refs.activateModal.open()} style={{ padding: 8, borderWidth: 1, borderColor: 'white', borderRadius: 10, backgroundColor: activeColor }}>
                                            <Text style={{ color: 'white', fontSize: responsiveFontSize(1.7) }}>Kích hoạt</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <Button full bordered light style={{ backgroundColor: activeColor, borderRadius: 30 }} onPress={() => this.onRegister()}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Đăng ký</Text>
                            </Button>

                        </View>
                    </KeyboardAvoidingView>
                    <Modal
                        ref={'activateModal'}
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
                        backdrop={true}
                        swipeToClose={false}
                        entry='top'
                    >
                        <View>
                            <Text style={{ textAlign: 'center', color: priColor, fontSize: responsiveFontSize(2) }}>Nhập mã kích hoạt đã được gửi qua SMS</Text>
                            <TextInput underlineColorAndroid='transparent' placeholder='Mã kích hoạt' value={this.state.active_code} onChangeText={(text) => this.setState({ active_code: text })} style={{ fontWeight: 'bold', paddingTop: 15, width: 3 * width / 4, padding: 10, textAlign: 'center', fontSize: responsiveFontSize(2) }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: width / 10, paddingTop: 15 }}>
                                <TouchableOpacity onPress={() => this.refs.activateModal.close()} style={{ borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: width / 4, backgroundColor: priColor, paddingVertical: 8 }}>
                                    <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: responsiveFontSize(1.7) }}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onActivate()} style={{ borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: width / 4, backgroundColor: priColor, paddingVertical: 8 }}>
                                    <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: responsiveFontSize(1.7) }}>Kích hoạt</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
                {this.state.loading && <ActivityIndicator animating={true} size='large' color='red' style={{ position: 'absolute', top: height / 2 - 15, left: width / 2 - 15 }} />}
            </View>
        );
    }
}

const styles = {
    btnStyle: { width: width / 3, justifyContent: 'center', alignItems: 'center' }
};

const mapStateToProps = (state) => {
    return {
        // user: state.user,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // normalLogin: (name, phone, pass, confirm) => {
        //     dispatch(normalLogin(name, phone, pass, confirm));
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);