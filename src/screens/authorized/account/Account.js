import React, { Component } from 'react';
import { TextInput, Text, View, Image, TouchableOpacity, ScrollView, Modal, Platform, KeyboardAvoidingView, PixelRatio, ActivityIndicator, Alert } from 'react-native';
import TextHeader from '../../../components/TextHeader';
import { width, height } from '../../../constants/dimensions';

import { Icon, Button } from 'native-base';
import { Input } from 'react-native-elements';
import { responsiveFontSize } from '../../../utils/helpers';

import { SocialIcon } from 'react-native-elements';

import ImagePicker from 'react-native-image-picker';
import { priColor } from '../../../constants/colors';

import { connect } from 'react-redux';
import { normalLogin, logout, loginWithSocial } from '../../../actions/index';

import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

class Account extends Component {
    static navigationOptions = {
    }

    state = {
        email: '',
        password: '',
        show: true,
        isLogin: false,
        avatarSource: null,
        phoneNumber: '',
        name: '',
        address: '',
        dob: '',
        dos: '',
        editable: false,
        loading: false,
        error_phone: '',
        error_pass: ''
    }

    componentWillMount() {
        try {
            GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // google services are available
        } catch (err) {
            console.error('play services are not available');
        }
        GoogleSignin.configure({
            iosClientId: '63667254394-pa9jspkf6tq037k8velf1nibobnj5mcd.apps.googleusercontent.com',
            webClientId: '63667254394-pnhhj6jvhm8teseohisb4dal6oc0cl8u.apps.googleusercontent.com'
        });
    }

    onLogin = () => {
        this.setState({ loading: true });
        let { email, password } = this.state;
        // console.log(email);
        if (email.length === 0 || email === '') {
            this.setState({ error_phone: 'Bạn cần phải nhập số điện thoại' });
            this.setState({ loading: false });
        } else {
            this.props.normalLogin(email, password);
        }
    }

    _onLoginFbPress = async () => {
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            (result) => {
                console.log(result);
                if (!result.isCancelled) {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            let accessToken = data.accessToken;
                            const responseInfoCallback = (error, result) => {
                                console.log('responseData', result);
                                if (error) {
                                    console.log(error)
                                    alert('Login fail with Facebook!');
                                } else {
                                    this.props.loginWithSocial(result.email ? result.email : '', result.name, 1, result.id);
                                }
                            }

                            const infoRequest = new GraphRequest(
                                '/me',
                                {
                                    accessToken: accessToken,
                                    parameters: {
                                        fields: {
                                            string: 'email,name,middle_name,picture'
                                        }
                                    }
                                },
                                responseInfoCallback
                            );

                            // Start the graph request.
                            new GraphRequestManager().addRequest(infoRequest).start()

                        }
                    )
                } else {
                    this.setState({ loading: false });
                }
            },
            (error) => {
                this.setState({ loading: false });
                Alert.alert(
                    'Oop!',
                    'Login fail with Facebook!',
                    [
                        {
                            text: 'Đồng ý',
                        }
                    ],
                    { cancelable: false }
                );
            }
        );
    }

    _onGoogleSignin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo);
            this.props.loginWithSocial(userInfo.user.email, userInfo.user.name, 2, userInfo.user.id);
        } catch (error) {
            this.setState({ loading: false });
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert('user cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('operation (f.e. sign in) is in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('play services not available or outdated');
            } else {
                alert('some other error happened');
            }
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.isLogin === true && !this.state.isLogin) {
            this.setState({ isLogin: true, show: true });
        }

        if (nextProps.user.loading === false) {
            this.setState({ loading: false });
        }

        if (this.state.isLogin && nextProps.user.isLogin === false) {
            this.setState({ isLogin: false });
        }
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
    onLogout = () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn có thực sự muốn đăng xuất?',
            [
                { text: 'Hủy', onPress: () => { }, style: 'cancel' },
                { text: 'Đồng ý', onPress: () => this.props.logout(this.props.user.token.access_token) },
            ],
            { cancelable: false }
        )
    }

    getDate = (time) => {
        let parts = time.split(" ");
        return parts[0];
    }

    render() {
        let userInfor = this.props.user;
        let accountView;
        if (this.state.isLogin === false) {
            accountView = (
                <View style={{ alignItems: 'center' }}>
                    {this.state.show && <Image style={{ alignSelf: 'center', width: 1 * height / 4, height: height / 6 }} source={require('../../../assets/imgs/logo.png')} />}
                    < View style={{ borderWidth: 1, borderColor: 'white', width: width - 20, paddingHorizontal: 10, paddingVertical: 25, alignItems: 'center', marginTop: 20 }
                    }>
                        <Input
                            containerStyle={{ width: 2 * width / 3, marginBottom: 10 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'white', fontSize: responsiveFontSize(1.7) }}
                            leftIcon={<Icon name='ios-call' style={{ fontSize: responsiveFontSize(2.5), color: 'white' }} />}
                            placeholder='Số điện thoại'
                            placeholderTextColor='white'
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.error_phone === '' ? null : this.state.error_phone}
                            keyboardType='number-pad'
                            underlineColorAndroid='transparent'
                            onFocus={() => this.setState({ show: false, error_pass: '', error_phone: '' })}
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
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.error_pass === '' ? null : this.state.error_pass}
                            onFocus={() => this.setState({ show: false, error_pass: '', error_phone: '' })}
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
                            <Button bordered light style={styles.btnStyle} onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng ký</Text>
                            </Button>
                            <Button bordered light style={styles.btnStyle} onPress={() => this.onLogin()}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng nhập</Text>
                            </Button>
                        </View>
                        <Text style={{ marginTop: 20, color: 'white', }}>-------Hoặc Đăng nhập với-------</Text>
                        {Platform.OS === 'android' ?
                            <View style={{ flexDirection: 'row', width: 3 * width / 4, justifyContent: 'center', marginTop: 10 }}>
                                <SocialIcon onPress={() => this._onLoginFbPress()} style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 7, paddingBottom: 7 }} title='Facebook' button type='facebook' />
                            </View>
                            :
                            <View style={{ flexDirection: 'row', width: 3 * width / 4, justifyContent: 'space-around', marginTop: 10 }}>
                                <SocialIcon onPress={() => this._onLoginFbPress()} style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 7, paddingBottom: 7 }} title='Facebook' button type='facebook' />
                                <SocialIcon onPress={() => this._onGoogleSignin()} style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 7, paddingBottom: 7 }} title=' Google ' button type='google-plus-official' />
                            </View>
                        }
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
                    <Text style={styles.titleName}>{userInfor.infor.name.toUpperCase()}</Text>
                    <View style={styles.contentContainer}>
                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Điện thoại</Text>
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>+{this.props.user.infor.telephone !== null ? this.props.user.infor.telephone : ' '}</Text>
                            </View>
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Họ tên</Text>
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>{this.props.user.infor.name !== null ? this.props.user.infor.name : ' '}</Text>
                            </View>
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Email</Text>
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>{this.props.user.infor.email !== null ? this.props.user.infor.email : ' '}</Text>
                            </View>
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Địa chỉ</Text>
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>{this.props.user.infor.address !== null ? this.props.user.infor.address : ' '}</Text>
                            </View>
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Ngày sinh</Text>
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>{this.props.user.infor.birthday !== null ? this.props.user.infor.birthday : ' '}</Text>
                            </View>
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Tham gia</Text>
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>{this.getDate(this.props.user.infor.created_at !== null ? this.props.user.infor.created_at : ' ')}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={{ marginTop: 30, alignSelf: 'center' }} onPress={() => this.onLogout()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon type='MaterialIcons' name='power-settings-new' style={{ color: 'red' }} />
                                <Text style={{ marginLeft: 5, color: 'white', fontSize: responsiveFontSize(1.7) }}>Đăng xuất</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: priColor }}>
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: priColor, }}>
                    <TextHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' />
                    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 30, flexGrow: 1 }}>
                        {accountView}
                    </ScrollView>
                </KeyboardAvoidingView>
                {this.state.loading && <ActivityIndicator animating={true} size='large' color='red' style={{ position: 'absolute', top: height / 2 - 15, left: width / 2 - 15 }} />}
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        normalLogin: (username, password) => {
            dispatch(normalLogin(username, password));
        },
        loginWithSocial: (username, name, type, token) => {
            dispatch(loginWithSocial(username, name, type, token));
        },
        logout: (accessToken) => {
            dispatch(logout(accessToken));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);