import React, { Component } from 'react';
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import NormalHeader from '../../../components/NormalHeader';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import { connect } from 'react-redux';

import { fetchAllCategories } from '../../../actions';
import { width, height } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ImageSlider from 'react-native-image-slider';

const ListHeader = ({ title }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', paddingTop: 10, marginBottom: 10 }}>
            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5), fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
}

const CategoryBox = ({ src, size, title }) => (
    <TouchableOpacity onPress={() => alert(title)} style={{ paddingVertical: 10, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, width: (width - 40) / 3 }}>
        <Ionicons size={size} name={src} />
        <Text style={{ textAlign: 'center', opacity: 0.7, fontSize: responsiveFontSize(1.15), color: 'black', fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
);

const CategoryBoxM = ({ src, size, title }) => (
    <TouchableOpacity onPress={() => alert(title)} style={{ paddingVertical: 10, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1, width: (width - 40) / 3 }}>
        <MaterialIcons size={size} name={src} />
        <Text style={{ textAlign: 'center', opacity: 0.7, fontSize: responsiveFontSize(1.15), color: 'black', fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
);


class Categories extends Component {

    static navigationOptions = {
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories.loading === false) {
            this.setState({ refreshing: false });
        }
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.props.fetchAllCategories();
        });
    }

    componentDidMount() {
        this.props.fetchAllCategories();
    }

    renderEmpty = () => {
        if (this.props.categories.loading === true) {
            return (
                <ActivityIndicator animating={true} color='red' size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: 'red' }}>Không có phân khúc sản phẩm nào</Text>
            </View>
        );
    }

    render() {

        const images = [
            require('../../../assets/imgs/grape1.jpg'),
            require('../../../assets/imgs/grape2.jpeg'),
            require('../../../assets/imgs/grape3.jpg'),
            require('../../../assets/imgs/grape4.jpeg'),
        ];

        const brands = [
            require('../../../assets/imgs/fiat.png'),
            require('../../../assets/imgs/vina.jpg'),
            require('../../../assets/imgs/vegetexco.jpg'),
        ];

        return (
            <View style={styles.container}>
                <NormalHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH'/>
                <View style={{ flex: 1, paddingHorizontal: 4 }}>
                    <View style={{ width: width, height: height / 5 }}>
                        {(this.props.categories.loading === false && this.props.categories.categories.length !== 0) ?
                            <ImageSlider
                                loopBothSides
                                autoPlayWithInterval={3000}
                                images={this.props.categories.categories}
                                customSlide={({ index, item, style, width }) => (
                                    // It's important to put style here because it's got offset inside
                                    <View key={index} style={[style, styles.customSlide]}>
                                        <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/categories/${item.image}` }} style={styles.background} />
                                        <View style={styles.foreground}>
                                            <Image style={{ width: 3 * height / 20, height: 3 * height / 20, borderRadius: 3 * height / 40 }} source={{ uri: `http://vatapcheck.com.vn/static/common/img/categories/${item.image}` }} />
                                        </View>
                                    </View>
                                )}
                                customButtons={() => { return null }}
                            />
                            :
                            <ActivityIndicator animating={true} color='red' size='large' style={{}} />}
                    </View>

                    <FlatList
                        style={{ padding: 0 }}
                        data={this.props.categories.categories}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        numColumns={3}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Products', { item: item, logo: item.image })}>
                                    <Card style={{ width: (width - 20) / 3 }}>
                                        <View>
                                            <Body>
                                                <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/categories/${item.image}` }} style={{ height: (width - 20) / 3, width: (width - 20) / 3, flex: 1, resizeMode: 'stretch' }} />
                                                <Text style={{ textAlign: 'center', padding: 3, opacity: 0.9, fontSize: responsiveFontSize(1.5) }}>
                                                    {item.name}
                                                </Text>
                                            </Body>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => item.id + index + item.description}
                        ListEmptyComponent={this.renderEmpty}
                    />
                </View>
            </View>
        );
    }

}

const styles = {
    background: {
        width: width,
        height: height / 5,
        resizeMode: 'cover'
    },
    foreground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height / 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    buttons: {
        zIndex: 1,
        height: 15,
        marginTop: -25,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    normalButton: {
        width: 10, height: 10, borderRadius: 5, borderWidth: 1,
        backgroundColor: 'transparent', borderColor: 'white'
    },
    buttonSelected: {
        width: 10, height: 10, borderRadius: 5, borderWidth: 1,
        backgroundColor: 'white', borderColor: 'white'
    },
    button: {
        margin: 3,
        width: 15,
        height: 15,
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    customSlide: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: width,
        height: null,
        flex: 1
    },
};

const mapStateToProps = (state) => {
    return {
        categories: state.category
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCategories: () => {
            dispatch(fetchAllCategories());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);