import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList, ActivityIndicator, Platform } from 'react-native';
import BackHeader from '../../../components/BackHeader';
import { width } from '../../../constants/dimensions';

import { Card, Body } from 'native-base';
import { responsiveFontSize } from '../../../utils/helpers';
import { priColor } from '../../../constants/colors';

export default class ViewAll extends Component {
    static navigationOptions = {
    }

    state = {
        organizations: [],
        page: 1
    };

    componentDidMount() {
        this.setState({
            organizations: this.props.navigation.state.params
        });
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1,
            loading: true
        }, () => {
            fetch(`http://vatapcheck.com.vn/api/v1/organizations?page=${this.state.page}`)
                .then(res => res.json())
                .then(resData => {
                    if (resData.code === 200) {
                        this.setState({
                            organizations: [...this.state.organizations, ...resData.data.organizations],
                            loading: false
                        });
                    }
                })
                .catch(e => {
                    this.setState({ loading: false });
                })
        });
    }

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={{ height: 50, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={priColor} animating={true} size='large' />
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <BackHeader navigation={this.props.navigation} title='Settings' />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        style={{ paddingHorizontal: 3 }}
                        data={this.state.organizations}
                        numColumns={3}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('DetailBrand', item)}>
                                    <Card style={{ width: (width - 20) / 3 }}>
                                        <View >
                                            <Body style={{}}>
                                                <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/ogp/${item.cover}` }} style={{ height: 2 * (width - 20) / 9, width: (width - 20) / 3, flex: 1, resizeMode: 'contain' }} />
                                                <Text style={{ paddingHorizontal: 5, fontWeight: 'bold', paddingVertical: 15, alignItems: 'center', textAlign: 'center', opacity: 0.9, fontSize: responsiveFontSize(1.5) }}>
                                                    {item.name}
                                                </Text>
                                            </Body>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => item.name + index}
                        ListEmptyComponent={this.renderEmpty}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={Platform.OS === 'ios' ? -0.2 : 0.1}
                        removeClippedSubviews={true}
                        ListFooterComponent={this.renderFooter}
                    />
                </View>
            </View>
        );
    }
}

const styles = {

};