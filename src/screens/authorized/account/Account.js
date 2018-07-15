import React, { Component } from 'react';
import { TextInput, Text, View, Image, TouchableOpacity, ScrollView, Modal, Platform, KeyboardAvoidingView, PixelRatio } from 'react-native';
import TextHeader from '../../../components/TextHeader';
import { width, height } from '../../../constants/dimensions';

import { Icon, Button } from 'native-base';
import { Input } from 'react-native-elements';
import { responsiveFontSize } from '../../../utils/helpers';
import { validateEmail } from '../../../utils/validateEmail';

import ImagePicker from 'react-native-image-picker';
import { priColor } from '../../../constants/colors';

export default class Account extends Component {
    static navigationOptions = {
    }

    state = {
        email: '',
        password: '',
        show: true,
        isLogin: false,
        avatarSource: null,
        phoneNumber: '01642525299',
        name: 'Nguyễn Văn A',
        email: 'jsmile@gmail.com',
        address: 'Hà Nội',
        dob: '01/01/1981',
        dos: '14/04/2018',
        editable: false
    }

    onLogin = () => {
        this.setState({ isLogin: true });
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        if (this.state.editable) {
            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) { }
                else if (response.error) { }
                else if (response.customButton) { }
                else {
                    let source = { uri: response.uri };

                    this.setState({
                        avatarSource: source
                    });
                }
            });
        }
    }

    onEdit = () => {
        this.setState({ editable: true });
    }
    onSubmit = () => {
        this.setState({ editable: false });
    }
    onExit = () => {
        this.setState({ isLogin: false });
    }

    render() {

        let accountView;
        if (this.state.isLogin === false) {
            accountView = (
                <View style={{ alignItems: 'center' }}>
                    {this.state.show && <Image style={{ alignSelf: 'center', width: 2 * height / 5, height: height / 5 }} source={require('../../../assets/imgs/logo.png')} />}
                    < View style={{ borderWidth: 1, borderColor: 'white', width: width - 20, paddingHorizontal: 10, paddingVertical: 25, alignItems: 'center', marginTop: 20 }
                    }>
                        <Input
                            containerStyle={{ width: 2 * width / 3, marginBottom: 10 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                            leftIcon={<Icon name='ios-mail' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                            placeholder='Email ID'
                            placeholderTextColor='white'
                            keyboardType='email-address'
                            underlineColorAndroid='transparent'
                            onFocus={() => this.setState({ show: false })}
                            returnKeyType='next'
                            selectionColor='white'
                            onSubmitEditing={() => {
                                this.password.focus();
                                this.setState({ show: false });
                            }}
                            onBlur={() => this.setState({ show: true })}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <Input
                            containerStyle={{ width: 2 * width / 3 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                            leftIcon={<Icon name='ios-lock' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                            placeholder='Mật khẩu'
                            placeholderTextColor='white'
                            secureTextEntry={true}
                            returnKeyType='done'
                            onFocus={() => this.setState({ show: false })}
                            ref={(input) => this.password = input}
                            selectionColor='white'
                            onBlur={() => this.setState({ show: true })}
                            onSubmitEditing={() => this.setState({ show: true })}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                        <View style={{ flexDirection: 'row', width: 2 * width / 3, justifyContent: 'flex-end', marginTop: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: 'transparent' }}>
                                <Text style={{ fontSize: responsiveFontSize(1.3), color: 'white' }}>Quên mật khẩu?</Text>
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
                    </View >
                    <View style={{ width: width, height: width / 3, justifyContent: 'center', paddingLeft: width / 8 }}>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(1.5), fontStyle: 'italic' }}>- Hotline: 0988.565.286 - 0941.375.866</Text>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(1.5), fontStyle: 'italic' }}>- Mail: admin@giaiphapbaohanhdientu.com</Text>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(1.5), fontStyle: 'italic' }}>- Website: www.giaiphapbaohanhdientu.com</Text>
                    </View>
                </View>
            );
        } else {
            accountView = (
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                            {this.state.avatarSource === null ?
                                <Image style={[styles.avatar]} source={require('../../../assets/imgs/camera.png')} />
                                :
                                <Image style={[styles.avatar]} source={this.state.avatarSource} />
                            }
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.titleName}>NGUYỄN VĂN A</Text>
                    <View style={styles.contentContainer}>
                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Điện thoại</Text>
                            <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.phoneNumber}
                                onChangeText={(text) => { this.setState({ phoneNumber: text }) }}
                            />
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Họ tên</Text>
                            <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.name}
                                onChangeText={(text) => { this.setState({ name: text }) }}
                            />
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Email</Text>
                            <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.email}
                                onChangeText={(text) => { this.setState({ email: text }) }}
                            />
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Địa chỉ</Text>
                            <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.address}
                                onChangeText={(text) => { this.setState({ address: text }) }}
                            />
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Ngày sinh</Text>
                            <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.dob}
                                onChangeText={(text) => { this.setState({ dob: text }) }}
                            />
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Tham gia</Text>
                            <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.dos}
                                onChangeText={(text) => { this.setState({ dos: text }) }}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 30 }}>
                            {
                                !this.state.editable ?
                                    (<TouchableOpacity onPress={() => this.onEdit()}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon type='MaterialIcons' name='settings' style={{ color: 'red' }} />
                                            <Text style={{ marginLeft: 5, color: 'white', fontSize: responsiveFontSize(1.7) }}>Chỉnh sửa</Text>
                                        </View>
                                    </TouchableOpacity>)
                                    :
                                    <View></View>
                            }
                            {this.state.editable &&
                                <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }} onPress={() => this.onSubmit()}>
                                    <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: 'bold', color: '#277dad', }}>Xác nhận</Text>
                                </TouchableOpacity>}

                            {
                                !this.state.editable ?
                                    (<TouchableOpacity onPress={() => this.onExit()}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon type='MaterialIcons' name='power-settings-new' style={{ color: 'red' }} />
                                            <Text style={{ marginLeft: 5, color: 'white', fontSize: responsiveFontSize(1.7) }}>Đăng xuất</Text>
                                        </View>
                                    </TouchableOpacity>)
                                    :
                                    <View></View>
                            }

                        </View>
                    </View>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: priColor }}>
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: priColor, }}>
                    <TextHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' />
                    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 30 }} style={{ flex: 1 }}>
                        {accountView}
                    </ScrollView>
                </KeyboardAvoidingView>
            </View >
        );
    }
}

const styles = {
    btnStyle: { width: width / 3, justifyContent: 'center', alignItems: 'center' },
    textStyle: { fontSize: responsiveFontSize(1.9) },
    contentContainer: { width: width - 20, },
    rowInput: { backgroundColor: 'white', flex: 1, flexDirection: 'row', padding: Platform.OS === 'ios' ? 10 : 3, marginTop: 20, alignItems: 'center' },
    titleName: { color: 'white', fontWeight: 'bold', fontSize: responsiveFontSize(1.9) },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width / 6,
        width: width / 3,
        height: width / 3,
    },
    avatar: {
        borderRadius: width / 6,
        width: width / 3,
        height: width / 3,
        backgroundColor: priColor
    }
};