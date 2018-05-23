import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import TextHeader from '../../../components/TextHeader';
import { width } from '../../../constants/dimensions';
import { responsiveFontSize } from '../../../utils/helpers';

const AllNews = ({ uri, title, detail, website, navigation, content }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('HomeNewsDetail', { 'uri': uri, 'title': title, 'content': content, 'website': website })} style={{ flexDirection: 'row', backgroundColor: '#dfdfdf', width: width - 10, height: null, flex: 1, marginBottom: 5, backgroundColor: 'white' }}>
            <Image source={{ uri: `http://vatapcheck.com.vn/static/common/img/tidings/${uri}` }} style={{ height: 2 * width / 9, width: 2 * width / 9 }} />
            <View style={{ padding: 3, width: 7 * width / 9, justifyContent: 'space-between', }}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{ padding: 3, fontSize: responsiveFontSize(1.5) }}>{title}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={{ padding: 3, fontSize: responsiveFontSize(1.2), color: '#787878' }}>{detail}</Text>
                <Text style={{ padding: 3, fontSize: responsiveFontSize(1.5) }}>Xem thêm  >></Text>
            </View>
        </TouchableOpacity >
    );
}

export default class ViewMoreNews extends Component {
    static navigationOptions = {
    }

    componentWillMount() {
        console.log(this.props.navigation.state.params);
    }

    state = {

    }

    renderEmpty = () => {
        return (<Text>Không có tin tức nào</Text>);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eceaeb', }}>
                <TextHeader navigation={this.props.navigation} title='Tất cả tin tức' />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <FlatList
                        style={{}}
                        data={this.props.navigation.state.params}
                        renderItem={({ item }) => {
                            return <AllNews content={item.content} website={item.link} navigation={this.props.navigation} key={item.id} title={item.title} detail={item.content} uri={item.image} />
                        }}
                        keyExtractor={(item, index) => item.id + index + item.name}
                        ListEmptyComponent={this.renderEmpty}
                    />

                </View>
            </View>
        );
    }
}

const styles = {

};