import React, { Component } from 'react';
import { TextInput, Text, View, Image, TouchableOpacity, ScrollView, Modal, Platform, KeyboardAvoidingView, PixelRatio, ActivityIndicator } from 'react-native';
import TextHeader from '../../../components/TextHeader';
import { width, height } from '../../../constants/dimensions';

import { Icon, Button } from 'native-base';
import { Input } from 'react-native-elements';
import { responsiveFontSize } from '../../../utils/helpers';
import { validateEmail } from '../../../utils/validateEmail';
import { phoneNumber } from '../../../utils/validatePhoneNumber';

import ImagePicker from 'react-native-image-picker';
import { priColor } from '../../../constants/colors';

import { connect } from 'react-redux';
import { normalLogin, logout } from '../../../actions/index';

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

    onLogin = () => {
        this.setState({ loading: true });
        let { email, password } = this.state;
        console.log(email);
        if (email.length === 0 || email === '') {
            this.setState({ error_phone: 'Bạn cần phải nhập số điện thoại' });
            this.setState({ loading: false });
        } else {
            this.props.normalLogin(email, password);
        }
    }

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
        this.props.logout(this.props.user.token.access_token);
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
                            {/* <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.phoneNumber}
                                onChangeText={(text) => { this.setState({ phoneNumber: text }) }}
                            /> */}
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>+{this.props.user.infor.telephone !== null ? this.props.user.infor.telephone : ' '}</Text>
                            </View>
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Họ tên</Text>
                            {/* <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.name}
                                onChangeText={(text) => { this.setState({ name: text }) }}
                            /> */}
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>{this.props.user.infor.name !== null ? this.props.user.infor.name : ' '}</Text>
                            </View>
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Email</Text>
                            {/* <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.email}
                                onChangeText={(text) => { this.setState({ email: text }) }}
                            /> */}
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>{this.props.user.infor.email !== null ? this.props.user.infor.email : ' '}</Text>
                            </View>
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Địa chỉ</Text>
                            {/* <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.address}
                                onChangeText={(text) => { this.setState({ address: text }) }}
                            /> */}
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>{this.props.user.infor.address !== null ? this.props.user.infor.address : ' '}</Text>
                            </View>
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Ngày sinh</Text>
                            {/* <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.dob}
                                onChangeText={(text) => { this.setState({ dob: text }) }}
                            /> */}
                            <View style={{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <Text style={[styles.textStyle]}>{this.props.user.infor.birthday !== null ? this.props.user.infor.birthday : ' '}</Text>
                            </View>
                        </View>

                        <View style={styles.rowInput}>
                            <Text style={[{ flex: 0.3, }, styles.textStyle]}>Tham gia</Text>
                            {/* <TextInput
                                underlineColorAndroid='transparent'
                                editable={this.state.editable}
                                style={[{ paddingLeft: 10, flex: 0.7, borderLeftWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)' }, styles.textStyle]} value={this.state.dos}
                                onChangeText={(text) => { this.setState({ dos: text }) }}
                            /> */}
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

                        {/* <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 30 }}>
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
                                    (<TouchableOpacity onPress={() => this.onLogout()}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon type='MaterialIcons' name='power-settings-new' style={{ color: 'red' }} />
                                            <Text style={{ marginLeft: 5, color: 'white', fontSize: responsiveFontSize(1.7) }}>Đăng xuất</Text>
                                        </View>
                                    </TouchableOpacity>)
                                    :
                                    <View></View>
                            }

                        </View> */}
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
        logout: (accessToken) => {
            dispatch(logout(accessToken));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);