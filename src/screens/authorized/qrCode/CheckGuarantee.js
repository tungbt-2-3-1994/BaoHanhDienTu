//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import BackHeader from '../../../components/BackHeader';
import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';
import { priColor } from '../../../constants/colors';

import { Icon, Button } from 'native-base';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

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
        brand: ''
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

    render() {
        return (
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} title='KIỂM TRA BẢO HÀNH' />

                <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: priColor, padding: 15 }}>
                    <ScrollView style={{ flex: 1, backgroundColor: priColor }}>
                        <ListHeader title='Thông tin khách hàng' />
                        <Input
                            containerStyle={{ width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
                            leftIcon={<Icon name='logo-whatsapp' style={{ fontSize: responsiveFontSize(2.5), color: '#969696' }} />}
                            placeholder='Số điện thoại'
                            errorStyle={{ color: 'red' }}
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
                            errorStyle={{ color: 'red' }}
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
                            errorStyle={{ color: 'red' }}
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
                            errorStyle={{ color: 'red' }}
                            placeholderTextColor='#969696'
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            ref={(input) => this.serial = input}
                            onSubmitEditing={() => this.category.focus()}
                            onChangeText={(text) => this.setState({ serial: text })}
                        />
                        <Input
                            containerStyle={{ width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
                            leftIcon={<IconFont name='shopping-cart' style={{ fontSize: responsiveFontSize(2), color: '#969696' }} />}
                            placeholder='Chọn ngành hàng'
                            errorStyle={{ color: 'red' }}
                            placeholderTextColor='#969696'
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            ref={(input) => this.category = input}
                            onSubmitEditing={() => this.brand.focus()}
                            onChangeText={(text) => this.setState({ category: text })}
                        />
                        <Input
                            containerStyle={{ width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
                            inputContainerStyle={{ borderColor: 'white' }}
                            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
                            leftIcon={<IconFont name='registered' style={{ fontSize: responsiveFontSize(2), color: '#969696' }} />}
                            placeholder='Thương hiệu'
                            errorStyle={{ color: 'red' }}
                            placeholderTextColor='#969696'
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            ref={(input) => this.brand = input}
                            onChangeText={(text) => this.setState({ brand: text })}
                        />
                        <TouchableOpacity onPress={() => this.onSearch()} style={{ alignSelf: 'center', borderWidth: 1, borderColor: 'white', backgroundColor: 'transparent', borderRadius: 10, padding: 10, marginTop: 5 }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: responsiveFontSize(2) }}>Tìm kiếm</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default CheckGuarantee;
