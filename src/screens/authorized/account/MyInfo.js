import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image, KeyboardAvoidingView, ScrollView, PixelRatio, TextInput
} from 'react-native';

import TextHeader from '../../../components/TextHeader';

import ImagePicker from 'react-native-image-picker';
import { width } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';

import { Icon } from 'native-base';

export default class MyInfo extends React.Component {

    state = {
        avatarSource: null,
        phoneNumber: '01642525299',
        name: 'Nguyễn Văn A',
        email: 'jsmile@gmail.com',
        address: 'Hà Nội',
        dob: '01/01/1981',
        dos: '14/04/2018',
        editable: false
    };

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

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

    onEdit = () => {
        this.setState({ editable: true });
    }
    onSubmit = () => {
        this.setState({ editable: false });
    }
    onExit = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#277dad' }}>
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: '#277dad', }}>
                    <TextHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' />
                    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }} style={{ flex: 1 }}>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                                {this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
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

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }

}

const styles = {
    textStyle: { fontSize: responsiveFontSize(1.9) },
    contentContainer: { width: width - 20 },
    rowInput: { backgroundColor: 'white', flex: 1, flexDirection: 'row', padding: 10, marginTop: 20, alignItems: 'center' },
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
        backgroundColor: 'white',

    }
};