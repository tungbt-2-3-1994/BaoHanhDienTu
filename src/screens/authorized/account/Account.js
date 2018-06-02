import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import TextHeader from '../../../components/TextHeader';
import { width, height } from '../../../constants/dimensions';

import { Icon, Button } from 'native-base';
import { Input } from 'react-native-elements';
import { responsiveFontSize } from '../../../utils/helpers';
import { validateEmail } from '../../../utils/validateEmail';

export default class Account extends Component {
    static navigationOptions = {
    }

    state = {
        email: '',
        password: ''
    }

    onLogin = () => {
        alert(`onLogin with ${this.state.email}, ${this.state.password}`);
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' scrollEnabled={false} style={{ flex: 1, backgroundColor: '#277dad', }}>
                <TextHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Image style={{ alignSelf: 'center', width: 2 * height / 5, height: height / 5 }} source={require('../../../assets/imgs/logo.png')} />
                    <View style={{ borderWidth: 1, borderColor: 'white', width: width - 20, paddingHorizontal: 10, paddingVertical: 25, alignItems: 'center', marginTop: 20 }}>
                        <Input
                            containerStyle={{ width: 2 * width / 3 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                            leftIcon={<Icon name='ios-mail' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                            placeholder='Email ID'
                            errorStyle={{ color: 'red' }}
                            errorMessage='  '
                            placeholderTextColor='white'
                            keyboardType='email-address'
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            onSubmitEditing={() => this.password.focus()}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <Input
                            containerStyle={{ width: 2 * width / 3 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                            leftIcon={<Icon name='ios-lock' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                            placeholder='Mật khẩu'
                            errorStyle={{ color: 'red' }}
                            placeholderTextColor='white'
                            secureTextEntry={true}
                            returnKeyType='done'
                            ref={(input) => this.password = input}
                            onSubmitEditing={() => this.onLogin()}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                        <View style={{ flexDirection: 'row', width: 2 * width / 3, justifyContent: 'flex-end', marginTop: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: 'transparent' }}>
                                <Text style={{ fontSize: responsiveFontSize(1.3), color: 'white' }}>Quên mật khẩu</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', width: 3 * width / 4, justifyContent: 'space-between', marginTop: 20 }}>
                            <Button bordered light style={styles.btnStyle} onPress={() => this.onLogin()}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng nhập</Text>
                            </Button>
                            <Button bordered light style={styles.btnStyle} onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng ký</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={{ width: width, height: width / 3, justifyContent: 'center', paddingLeft: width / 8 }}>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(1.5), fontStyle: 'italic' }}>- Hotline: 0988.565.286 - 0941.375.866</Text>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(1.5), fontStyle: 'italic' }}>- Mail: admin@giaiphapbaohanhdientu.com</Text>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(1.5), fontStyle: 'italic' }}>- Website: www.giaiphapbaohanhdientu.com</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    btnStyle: { width: width / 3, justifyContent: 'center', alignItems: 'center' }
};