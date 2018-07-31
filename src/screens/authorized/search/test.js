// email: '',
// phone_number: '',
// identified_number: '',
// serial: '',
// category: '',
// brand: '',
// language: '',
// index_picker: null,
// toogleDisplay: false,
// error_phone_number: '',
// error_serial: '',
// error_brand: '',
// error_category: '',


// setPickerValue = (value, i) => {
//     this.setState({ category: value, index_picker: i });
// }
{/* <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: priColor, padding: 15 }}>
    <ScrollView style={{ flex: 1, backgroundColor: priColor, paddingBottom: 50 }}>
        <ListHeader title='Thông tin khách hàng' />
        <Input
            containerStyle={{ borderRadius: 30, width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
            inputContainerStyle={{ borderColor: 'transparent' }}
            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
            leftIcon={<Icon name='logo-whatsapp' style={{ fontSize: responsiveFontSize(2.5), color: '#969696' }} />}
            placeholder='Số điện thoại'
            placeholderTextColor='#969696'
            errorStyle={{ color: 'red' }}
            onFocus={() => this.setState({ error_phone_number: '' })}
            errorMessage={this.state.error_phone_number === '' ? null : this.state.error_phone_number}
            underlineColorAndroid='transparent'
            returnKeyType='next'
            onSubmitEditing={() => this.idenCard.focus()}
            onChangeText={(text) => this.setState({ phone_number: text })}
        />
        <Input
            containerStyle={{ borderRadius: 30, width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
            inputContainerStyle={{ borderColor: 'transparent' }}
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
            containerStyle={{ borderRadius: 30, width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
            inputContainerStyle={{ borderColor: 'transparent' }}
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
            containerStyle={{ borderRadius: 30, width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
            inputContainerStyle={{ borderColor: 'transparent' }}
            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
            leftIcon={<IconFont name='barcode' style={{ fontSize: responsiveFontSize(1.8), color: '#969696' }} />}
            placeholder='Serial'
            placeholderTextColor='#969696'
            underlineColorAndroid='transparent'
            returnKeyType='next'
            ref={(input) => this.serial = input}
            errorStyle={{ color: 'red' }}
            onFocus={() => this.setState({ error_serial: '' })}
            errorMessage={this.state.error_serial === '' ? null : this.state.error_serial}
            onChangeText={(text) => this.setState({ serial: text })}
        />

        <TouchableOpacity style={{ borderRadius: 30, width: '100%', paddingRight: 8, paddingVertical: 15, marginBottom: 20, backgroundColor: 'white' }} onPress={() => {
            this.refs.modal.open();
            this.setState({ error_category: '' });
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 18, }}>
                <View style={{ flexDirection: 'row', }}>
                    <IconFont name='shopping-cart' style={{ marginRight: 10, fontSize: responsiveFontSize(2), color: '#969696' }} />
                    <Text style={[this.state.category === '' ? { color: '#969696' } : { color: 'black' }, { fontSize: responsiveFontSize(1.8) }]}>{this.state.category === '' ? 'Chọn ngành hàng' : this.state.category}</Text>
                </View>
                <IconFont name='chevron-down' style={{ marginRight: 10, fontSize: responsiveFontSize(2), color: '#969696' }} />
            </View>
            {this.state.error_category !== '' && <Text style={{ fontSize: responsiveFontSize(1.4), paddingLeft: 6, color: 'red', marginTop: 15, marginBottom: -3 }}>{this.state.error_category}</Text>}
        </TouchableOpacity>
        <Input
            containerStyle={{ borderRadius: 30, width: '100%', backgroundColor: 'white', marginBottom: 20, padding: 5 }}
            inputContainerStyle={{ borderColor: 'transparent' }}
            inputStyle={{ color: 'black', fontSize: responsiveFontSize(1.8) }}
            leftIcon={<IconFont name='registered' style={{ fontSize: responsiveFontSize(2), color: '#969696' }} />}
            placeholder='Thương hiệu'
            placeholderTextColor='#969696'
            underlineColorAndroid='transparent'
            returnKeyType='next'
            ref={(input) => this.brand = input}
            errorStyle={{ color: 'red' }}
            onFocus={() => this.setState({ error_brand: '' })}
            errorMessage={this.state.error_brand === '' ? null : this.state.error_brand}
            onChangeText={(text) => this.setState({ brand: text })}
        />
        <TouchableOpacity onPress={() => this.onSearch()} style={{ alignSelf: 'center', borderWidth: 1, borderColor: 'white', backgroundColor: 'transparent', borderRadius: 10, padding: 10, marginTop: 5, marginBottom: 30 }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: responsiveFontSize(2) }}>Tìm kiếm</Text>
        </TouchableOpacity>
    </ScrollView>
</KeyboardAvoidingView>
    <ModalBox ref={'modal'} swipeToClose={false} style={[styles.modal,]} backdrop={true} position={"bottom"} >
        <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)', paddingHorizontal: 10, width: width, backgroundColor: priColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text> </Text>
            <Text style={{ fontWeight: 'bold', paddingVertical: 8, color: 'white', fontSize: responsiveFontSize(2.3) }}>Lựa chọn ngành hàng</Text>
            <TouchableOpacity onPress={() => this.refs.modal.close()}>
                <Icon name='ios-close' style={{ fontSize: responsiveFontSize(4), color: 'white' }} />
            </TouchableOpacity>
        </View>
        <ScrollView>
            {pickerValues.map((value, index) => {
                return (
                    <TouchableOpacity iconLeft light underlayColor='rgba(0, 0, 0, 0.3)' style={{ borderBottomWidth: 1, paddingHorizontal: 10, flexDirection: 'row', width: width, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', borderColor: 'rgba(0, 0, 0, 0.3)' }} key={index} onPress={() => {
                        this.setPickerValue(value.title, index);
                        this.refs.modal.close();
                    }}>
                        {/* <Icon name='home' style={{ color: priColor, marginRight: 10 }} /> */}
<Text style={[{ fontSize: responsiveFontSize(2), color: 'rgba(0, 0, 0, 0.7)' }, this.state.index_picker === index && { color: priColor, fontSize: responsiveFontSize(2.2), fontWeight: 'bold' }]}>{value.title}</Text>
                    </TouchableOpacity >
                );
            })}
        </ScrollView >
    </ModalBox > * /}
