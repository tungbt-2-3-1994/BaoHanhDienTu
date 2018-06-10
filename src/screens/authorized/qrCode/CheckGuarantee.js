//import liraries
import React, { Component } from 'react';
import { View, Text, Keyboard, KeyboardType, StyleSheet, Modal, Image, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TouchableHighlight } from 'react-native';

import BackHeader from '../../../components/BackHeader';
import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';
import { priColor } from '../../../constants/colors';

import { Icon, Button } from 'native-base';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import ModalBox from 'react-native-modalbox';

const pickerValues = [
    {
        title: 'Ngành 1',
        value: 'nganh1'
    },
    {
        title: 'Ngành 2',
        value: 'nganh2'
    },
    {
        title: 'Ngành 3',
        value: 'nganh3'
    },
    {
        title: 'Ngành 4',
        value: 'nganh4'
    },
]

const ListHeader = ({ title }) => {
    return (
        <View style={{ justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
}

// create a component
class CheckGuarantee extends Component {

    state = {
        email: '',
        phone_number: '',
        identified_number: '',
        serial: '',
        category: '',
        brand: '',
        language: '',
        toogleDisplay: false
    }

    componentDidMount() {
        this.props.navigation.state.params.onDone(false);

    }

    componentWillUnmount() {
        this.props.navigation.state.params.onDone(true);
    }

    onSearch = () => {
        alert('asasas');
    }

    setPickerValue = (value) => {
        this.setState({ category: value });
    }

    render() {
        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} title='KIỂM TRA BẢO HÀNH' />

                <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: priColor, padding: 15 }}>
                    <ScrollView style={{ flex: 1, backgroundColor: priColor, paddingBottom: 50 }}>
                        <ListHeader title='Thông tin khách hàng' />
                        <Input
                            containerStyle={{ width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
                            leftIcon={<Icon name='logo-whatsapp' style={{ fontSize: responsiveFontSize(2.5), color: '#969696' }} />}
                            placeholder='Số điện thoại'
                            placeholderTextColor='#969696'
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            onSubmitEditing={() => this.idenCard.focus()}
                            onChangeText={(text) => this.setState({ phone_number: text })}
                        />
                        <Input
                            containerStyle={{ width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
                            leftIcon={<IconFont name='address-card' style={{ fontSize: responsiveFontSize(1.8), color: '#969696' }} />}
                            placeholder='CMND'
                            placeholderTextColor='#969696'
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            ref={(input) => this.idenCard = input}
                            onSubmitEditing={() => this.gmail.focus()}
                            onChangeText={(text) => this.setState({ identified_number: text })}
                        />
                        <Input
                            containerStyle={{ width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
                            leftIcon={<Icon name='ios-mail' style={{ fontSize: responsiveFontSize(2.5), color: '#969696' }} />}
                            placeholder='Gmail'
                            placeholderTextColor='#969696'
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            ref={(input) => this.gmail = input}
                            onSubmitEditing={() => this.serial.focus()}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <ListHeader title='Thông tin sản phẩm' />
                        <Input
                            containerStyle={{ width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
                            leftIcon={<IconFont name='barcode' style={{ fontSize: responsiveFontSize(1.8), color: '#969696' }} />}
                            placeholder='Serial'
                            placeholderTextColor='#969696'
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            ref={(input) => this.serial = input}
                            onChangeText={(text) => this.setState({ serial: text })}
                        />

                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', paddingLeft: 18, paddingRight: 8, paddingVertical: 15, marginBottom: 20, justifyContent: 'space-between', backgroundColor: 'white' }} onPress={() => this.refs.modal.open()}>
                            {/* <Input
                                containerStyle={{ width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
                                inputContainerStyle={{ borderColor: 'white' }}
                                inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
                                leftIcon={<IconFont name='shopping-cart' style={{ fontSize: responsiveFontSize(2), color: '#969696' }} />}
                                rightIcon={<IconFont name='chevron-down' style={{ marginRight: 10, fontSize: responsiveFontSize(2), color: '#969696' }} />}
                                placeholder='Chọn ngành hàng'
                                placeholderTextColor='#969696'
                                underlineColorAndroid='transparent'
                                returnKeyType='next'
                                ref={(input) => this.category = input}
                                onSubmitEditing={() => this.brand.focus()}
                                onChangeText={(text) => this.setState({ category: text })}
                            >
                            </Input> */}
                            <View style={{ flexDirection: 'row', }}>
                                <IconFont name='shopping-cart' style={{ marginRight: 10, fontSize: responsiveFontSize(2), color: '#969696' }} />
                                <Text style={{ color: '#969696', fontSize: responsiveFontSize(1.8) }}>{this.state.category === '' ? 'Chọn ngành hàng' : this.state.category}</Text>
                            </View>
                            <IconFont name='chevron-down' style={{ marginRight: 10, fontSize: responsiveFontSize(2), color: '#969696' }} />
                        </TouchableOpacity>
                        <Input
                            containerStyle={{ width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
                            leftIcon={<IconFont name='registered' style={{ fontSize: responsiveFontSize(2), color: '#969696' }} />}
                            placeholder='Thương hiệu'
                            placeholderTextColor='#969696'
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            ref={(input) => this.brand = input}
                            onChangeText={(text) => this.setState({ brand: text })}
                        />
                        <TouchableOpacity onPress={() => this.onSearch()} style={{ alignSelf: 'center', borderWidth: 1, borderColor: 'white', backgroundColor: 'transparent', borderRadius: 10, padding: 10, marginTop: 5, marginBottom: 30 }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: responsiveFontSize(2) }}>Tìm kiếm</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
                <ModalBox ref={'modal'} swipeToClose={false} style={[styles.modal,]} backdrop={true} position={"bottom"} >
                    <ScrollView>
                        {pickerValues.map((value, index) => {
                            return (
                                <TouchableHighlight style={{ paddingVertical: 4, alignItems: 'center' }} key={index} onPress={() => this.setPickerValue(value.title)}>
                                    <Text>{value.title}</Text>
                                </TouchableHighlight>
                            );
                        })}
                    </ScrollView>
                </ModalBox>
            </View >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        backgroundColor: "#efefef"
    },
});

//make this component available to the app
export default CheckGuarantee;
