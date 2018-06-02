'use strict';
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    InteractionManager,
    Platform,
    Animated,
    Easing, Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import NormalHeader from '../../../components/NormalHeader';

import { NavigationActions } from 'react-navigation';

import Modal from 'react-native-modalbox';
import { width, height } from '../../../constants/dimensions';

import { connect } from 'react-redux';

import QRScannerRectView from './QRScannerRectView';

class QRCode extends Component {

    constructor(props) {
        super(props);
        this.camera = null;

        this.state = {
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.on,
                barcodeFinderVisible: true,
            },
            barcodeCodes: [],
            isShow: true,
            marginAnim: new Animated.Value((height - 200) / 2)
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.marginAnim,
            {
                duration: 2500,
                toValue: 800,
            }
        ).start();
    }

    componentWillMount() {
        console.log('asasas')
    }

    componentWillReceiveProps(nextProps) {
    }

    async onBarCodeRead(scanResult) {

        if (scanResult.data !== null) {
            if (!this.state.barcodeCodes.includes(scanResult.data)) {
                await this.setState({
                    barcodeCodes: [...this.state.barcodeCodes, scanResult.data]
                }, () => {
                    // this.props.navigation.navigate('ProductDetail', scanResult.data, this);
                    this.props.navigation.dispatch(NavigationActions.navigate({
                        routeName: 'ProductDetail',
                        params: {
                            onDone: (showBool) => {
                                this.setState({
                                    isShow: showBool,
                                    barcodeCodes: []
                                });
                            },
                            'code': scanResult.data
                        }
                    }));
                });
                return;
            }
            return;
        }
        return;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Animated.View style={{ alignItems: 'center', justifyContent: 'flex-end', position: 'absolute', top: 0, right: 0, left: 0, bottom: this.state.marginAnim, backgroundColor: 'white' }}>
                    <Image style={{ width: width / 3, height: width / 6 }} source={require('../../../assets/imgs/up.png')} />
                </Animated.View>
                <Animated.View style={{ alignItems: 'center', justifyContent: 'flex-start', position: 'absolute', bottom: 0, right: 0, left: 0, top: this.state.marginAnim, backgroundColor: 'white' }}>
                    <Image style={{ width: width / 3, height: width / 6 }} source={require('../../../assets/imgs/down.png')} />
                </Animated.View>
                <NormalHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' count={1}/>
                <View style={styles.container}>
                    {this.props.nav.routes[0].index === 2 && this.state.isShow &&
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={styles.preview}
                            type={this.state.camera.type}
                            flashMode={this.state.camera.flashMode}
                            permissionDialogTitle={'Cấp quyền truy cập Camera'}
                            permissionDialogMessage={'Chúng tôi muốn sử dụng Camera của bạn để quét mã code'}
                            onBarCodeRead={this.onBarCodeRead.bind(this)}
                        >
                            <QRScannerRectView />

                        </RNCamera>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center'
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    enterBarcodeManualButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40
    },
    scanScreenMessage: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QRCode);