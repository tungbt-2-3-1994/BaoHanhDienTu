import React, { Component } from 'react';
import { Platform, View, Image, TouchableOpacity, ScrollView, TouchableHighlight, FlatList, TextInput, ActivityIndicator } from 'react-native';
import NormalHeader from '../../../components/NormalHeader';

import { width, height } from '../../../constants/dimensions';

import { responsiveFontSize } from '../../../utils/helpers';

import { Card, Text, Button, Icon, Body } from 'native-base';

import ImageSlider from 'react-native-image-slider';

import { connect } from 'react-redux';

import ImageProgress from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import { priColor } from '../../../constants/colors';

const ListHeader = ({ title, moreEvent }) => {
    return (
        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', paddingVertical: 10, marginBottom: 5, marginTop: 10 }}>
            <Text style={{ color: priColor, fontSize: responsiveFontSize(1.7), fontWeight: 'bold' }}>{title}</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={moreEvent}>
                <Text style={{ color: priColor, fontSize: responsiveFontSize(1.3), marginRight: 3 }}>Xem tất cả</Text>
                <Icon name='ios-arrow-forward-outline' style={{ color: priColor, fontSize: responsiveFontSize(2) }} />
            </TouchableOpacity>
        </View>
    );
}

class SearchView extends Component {

    static navigationOptions = {

    }

    state = {
        organizations: [],
        loading: false
    }

    viewMore = () => {
        this.props.navigation.navigate('ViewAll', this.state.organizations);
    }

    renderEmpty = () => {
        if (this.state.loading === true) {
            return (
                <ActivityIndicator animating={true} color={priColor} size='large' />
            );
        }
        return (
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: priColor }}>Không có thương hiệu nào</Text>
            </View>
        );
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch('https://vatapcheck.com.vn/api/v1/organizations')
            .then(res => res.json())
            .then(resData => {
                if (resData.code === 200) {
                    this.setState({
                        loading: false,
                        organizations: resData.data.organizations
                    });
                }
            })
            .catch(e => {
                this.setState({ loading: false });
            })
    }

    render() {

        const images = [
            require('../../../assets/imgs/grape1.jpg'),
            require('../../../assets/imgs/grape2.jpeg'),
            require('../../../assets/imgs/grape3.jpg'),
            require('../../../assets/imgs/grape4.jpeg'),
        ];

        return (
            <View style={styles.container}>
                <NormalHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' count={1} />
                <View style={{ flex: 1, backgroundColor: '#eceaeb' }}>
                    <ScrollView style={{ backgroundColor: '#eceaeb' }}>
                        <View style={{ width: width, height: height / 5 }}>
                            {(this.state.loading === false && this.state.organizations.length !== 0) ?
                                <ImageSlider
                                    loopBothSides
                                    autoPlayWithInterval={3000}
                                    images={this.state.organizations}
                                    customSlide={({ index, item, style, width }) => (
                                        <View key={index} style={[style, styles.customSlide]}>
                                            <Image source={{ uri: `https://vatapcheck.com.vn/static/common/img/ogp/${item.cover}` }} style={styles.customImage} />
                                        </View>
                                    )}
                                    customButtons={(position, move) => (
                                        <View style={styles.buttons}>
                                            {this.state.organizations.map((image, index) => {
                                                return (
                                                    null
                                                );
                                            })}
                                        </View>
                                    )}
                                />
                                :
                                <ActivityIndicator animating={true} color={priColor} size='large' style={{}} />
                            }
                        </View>

                        <ListHeader title='Thương hiệu nổi bật' moreEvent={this.viewMore} />

                        <FlatList
                            style={{ paddingHorizontal: 3 }}
                            data={this.state.organizations.slice(0, 18)}
                            numColumns={3}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('DetailBrand', item)}>
                                        <Card style={{ width: (width - 20) / 3 }}>
                                            <View >
                                                <Body style={{}}>
                                                    <ImageProgress
                                                        source={{ uri: `https://vatapcheck.com.vn/static/common/img/ogp/${item.cover}` }}
                                                        style={{ height: 2 * (width - 20) / 9, width: (width - 20) / 3, flex: 1, }}
                                                        indicator={Progress.Pie}
                                                        indicatorProps={{
                                                            size: 20,
                                                            borderWidth: 0,
                                                            unfilledColor: '#42b0ed'
                                                        }}
                                                    />
                                                    <Text style={{ paddingHorizontal: 5, fontWeight: 'bold', paddingVertical: 15, alignItems: 'center', textAlign: 'center', opacity: 0.9, fontSize: responsiveFontSize(1.5) }}>
                                                        {item.name}
                                                    </Text>
                                                </Body>
                                            </View>
                                        </Card>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => item.name + index + item.id}
                            ListEmptyComponent={this.renderEmpty}
                        />
                    </ScrollView>
                </View>
            </View >
        );
    }

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentText: { color: '#fff' },
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
        flex: 1,
        resizeMode: 'stretch'
    },
};

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);