import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import BackHeader from '../../../components/BackHeader';
import { width, height } from '../../../constants/dimensions';

import { Icon, Button } from 'native-base';
import { Input, SocialIcon, CheckBox } from 'react-native-elements';
import { responsiveFontSize } from '../../../utils/helpers';
import { validateEmail } from '../../../utils/validateEmail';

export default class Account extends Component {
    static navigationOptions = {
    }

    state = {
        checked: false,
        email: '',
        password: '',
        confirm_password: '',
        error_email: '',
        error_password: '',
        error_confirm_password: ''
    }

    onRegister = () => {
        if (!validateEmail(this.state.email)) {
            this.setState({ error_email: 'Email không hợp lệ' });
        } else {
            if (this.state.password.length < 7) {
                this.setState({ error_password: 'Mật khẩu phải dài hơn 8 ký tự' });
            } else {
                if (this.state.password.localeCompare(this.state.confirm_password) != 0) {
                    this.setState({ error_confirm_password: 'Mật khẩu không trùng nhau' });
                } else {
                    alert('login');
                }
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#277dad', }}>
                <BackHeader navigation={this.props.navigation} title='ĐĂNG KÝ' />
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(2.3), textAlign: 'center', }}>Với mạng xã hội</Text>
                    <SocialIcon
                        style={{ paddingHorizontal: 20 }}
                        title='Đăng nhập với Facebook'
                        button
                        type='facebook'
                    />
                    <Text style={{ marginTop: 30, color: 'rgba(255, 255, 255, 0.4)', fontSize: responsiveFontSize(2.1), textAlign: 'center', }}>------------Hoặc------------</Text>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Input
                            containerStyle={{ width: 5 * width / 6, borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                            inputContainerStyle={{ borderColor: 'transparent' }}
                            inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                            leftIcon={<Icon name='ios-mail' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                            placeholder='Email'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.error_email}
                            placeholderTextColor='white'
                            keyboardType='email-address'
                            onChangeText={(text) => { this.setState({ email: text }) }}
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            onFocus={() => this.setState({ error_email: '' })}
                            onSubmitEditing={() => this.password.focus()}
                        />
                        <Input
                            containerStyle={{ marginTop: 10, width: 5 * width / 6, borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                            inputContainerStyle={{ borderColor: 'transparent' }}
                            inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                            leftIcon={<Icon name='ios-lock' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                            placeholder='Mật khẩu'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.error_password}
                            placeholderTextColor='white'
                            secureTextEntry={!this.state.checked}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            returnKeyType='next'
                            onFocus={() => this.setState({ error_confirm_password: '', error_password: '' })}
                            ref={(input) => this.password = input}
                            onSubmitEditing={() => this.confirmPassword.focus()}
                        />
                        <Input
                            containerStyle={{ marginTop: 10, width: 5 * width / 6, borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                            inputContainerStyle={{ borderColor: 'transparent' }}
                            inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                            leftIcon={<Icon name='ios-lock' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                            placeholder='Xác nhận mật khẩu'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.error_confirm_password}
                            onFocus={() => this.setState({ error_confirm_password: '', error_password: '' })}
                            placeholderTextColor='white'
                            secureTextEntry={!this.state.checked}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            returnKeyType='done'
                            ref={(input) => this.confirmPassword = input}
                            onSubmitEditing={() => this.onRegister()}
                        />
                        <View style={{ flexDirection: 'row', width: 6 * width / 7, justifyContent: 'flex-start', marginTop: 5 }}>
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
                        </View>
                        <Button full bordered light style={{ backgroundColor: '#3fa7c7', borderRadius: 20 }} onPress={() => this.onRegister()}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>Đăng ký</Text>
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = {
    btnStyle: { width: width / 3, justifyContent: 'center', alignItems: 'center' }
};