import React, { Component } from 'react';
import { Text, View, Image, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';

import { width, height } from '../../constants/dimensions';

import { NavigationActions } from 'react-navigation';
import { priColor } from '../../constants/colors';

class SplashScreen extends Component {
    static navigationOptions = {
    }

    state = {
        x_anim: new Animated.Value(width / 2 - width / 8),
        y_anim: new Animated.Value(height / 2 - width / 8),
    }

    componentDidMount() {
        const reset = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: "mainTab",
                })
            ]
        });

        // Animated.parallel([
        //     Animated.timing(
        //         this.state.x_anim,
        //         {
        //             duration: 1500,
        //             toValue: 0,
        //         },
        //     ),
        //     Animated.timing(
        //         this.state.y_anim,
        //         {
        //             duration: 1500,
        //             toValue: 0,
        //         },
        //     ),
        // ]).start();

        setTimeout(() => {
            this.props.navigation.dispatch(reset);
        }, 1500);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={priColor}
                    barStyle="light-content"
                />
                <Image source={require('../../assets/imgs/logoApp.png')} style={styles.img} />


                {/* <Image style={{ position: 'absolute', top: this.state.y_anim, left: this.state.x_anim, width: width / 8, height: width / 8 }} source={require('../../assets/imgs/p1.png')} />
                <Image style={{ position: 'absolute', top: this.state.y_anim, right: this.state.x_anim, width: width / 8, height: width / 8 }} source={require('../../assets/imgs/p2.png')} />
                <Image style={{ position: 'absolute', bottom: this.state.y_anim, left: this.state.x_anim, width: width / 8, height: width / 8 }} source={require('../../assets/imgs/p3.png')} />
                <Image style={{ position: 'absolute', bottom: this.state.y_anim, right: this.state.x_anim, width: width / 8, height: width / 8 }} source={require('../../assets/imgs/p4.png')} /> */}
            </View>


        );

    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: priColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: width,
        height: 2 * width / 3,
        resizeMode: 'contain'
    }
};

const mapStateToProps = (state) => {
    // console.log(state);
    return {
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);