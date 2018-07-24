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
    Easing, Image, Alert
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import NormalHeader from '../../../components/NormalHeader';

import { NavigationActions } from 'react-navigation';

import Modal from 'react-native-modalbox';
import { width, height } from '../../../constants/dimensions';

import { connect } from 'react-redux';

import QRScannerRectView from './QRScannerRectView';
import { priColor } from '../../../constants/colors';

import { isIphoneX } from 'react-native-iphone-x-helper';

const value = (isIphoneX() || Platform.OS === 'android') ? 100 : 48;

import Permissions from 'react-native-permissions';
import { host } from '../../../constants/api';

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
            cameraPermission: 'undetermined',
            barcodeCodes: [],
            isShow: true,
            marginTopAnim: new Animated.Value((height - 100 + value) / 2),
            marginBottomAnim: new Animated.Value((height - 2 * value) / 2),
            status: true
        };
    }

    _alertForCameraPermission() {
        Alert.alert(
            'Truy cập Camera?',
            'Chúng tôi cần truy cập Camera của bạn để quét mã vạch',
            [
                {
                    text: 'Không',
                    onPress: Permissions.openSettings,
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    onPress: Permissions.openSettings,
                },
            ],
        )
    }

    openSettingsAndroid = () => {

    }

    componentDidMount() {

        fetch(`${host}/scan-code`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'code': '8935210216465'
            })
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
            })
            .catch(e => {
                alert('Có lỗi khi lấy tin tức mới nhất');
            });


        Permissions.check('camera').then(response => {
            this.setState({ cameraPermission: response }, () => {
                if (this.state.cameraPermission !== 'authorized') {
                    this._alertForCameraPermission();
                }
            });
        })
        Animated.parallel([
            Animated.timing(
                this.state.marginTopAnim,
                {
                    duration: 2000,
                    toValue: 800,
                }),
            Animated.timing(
                this.state.marginBottomAnim,
                {
                    duration: 2000,
                    toValue: 800,
                })
        ]).start();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nav.routes[0].routes[0].routes[0].index === 2 && nextProps.nav.routes.length === 1 && this.state.status) {
            this.setState({
                marginTopAnim: new Animated.Value((height - 100 + value) / 2),
                marginBottomAnim: new Animated.Value((height - 2 * value) / 2)
            }, () => {

                Animated.parallel([
                    Animated.timing(
                        this.state.marginTopAnim,
                        {
                            duration: 2000,
                            toValue: 800,
                        }),
                    Animated.timing(
                        this.state.marginBottomAnim,
                        {
                            duration: 2000,
                            toValue: 800,
                        })
                ]).start();

            });
        }
    }

    async onBarCodeRead(scanResult) {

        if (scanResult.data !== null) {
            if (!this.state.barcodeCodes.includes(scanResult.data)) {
                await this.setState({
                    barcodeCodes: [...this.state.barcodeCodes, scanResult.data]
                }, () => {
                    // this.props.navigation.navigate('ProductDetail', scanResult.data, this);
                    this.props.navigation.dispatch(NavigationActions.navigate({
                        routeName: 'ScannedProduct',
                        params: {
                            onDone: (showBool, status) => {
                                this.setState({
                                    isShow: showBool,
                                    barcodeCodes: [],
                                    status: status
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

                <View style={styles.container}>
                    <Image style={{ position: 'absolute', top: (height-175) / 2 - 50, left: width / 2 - 50, width: 100, height: 100, alignSelf: 'center' }} source={require('../../../assets/imgs/vbh.png')} />
                    {this.props.nav.routes[0].routes[0].routes[0].index === 2 && this.state.isShow && this.props.nav.routes.length === 1 &&
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
                    {/* <TouchableOpacity onPress={() => {
                        this.props.navigation.dispatch(NavigationActions.navigate({
                            routeName: 'EditDetailInfor',
                            params: {
                                onDone: (showBool) => {
                                    this.setState({
                                        isShow: showBool,
                                        barcodeCodes: []
                                    });
                                },
                            }
                        }));
                    }} style={{ alignSelf: 'center', padding: 10 }}>
                        <Text>Go to edit detail infor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.dispatch(NavigationActions.navigate({
                            routeName: 'ExtractedInfor',
                            params: {
                                onDone: (showBool) => {
                                    this.setState({
                                        isShow: showBool,
                                        barcodeCodes: []
                                    });
                                },
                            }
                        }));
                    }} style={{ alignSelf: 'center', padding: 10 }}>
                        <Text>Go to Extracted Infor</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity onPress={() => {
                        this.setState({ status: false });
                        this.props.navigation.dispatch(NavigationActions.navigate({
                            routeName: 'ScannedProduct',
                            params: {
                                onDone: (showBool, status) => {
                                    this.setState({
                                        isShow: showBool,
                                        barcodeCodes: [],
                                        status: status
                                    });
                                },
                            }
                        }));
                    }} style={{ alignSelf: 'center', padding: 10 }}>
                        <Text>Go to thông tin quét</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity onPress={() => {
                        this.props.navigation.dispatch(NavigationActions.navigate({
                            routeName: 'DetailProduct',
                            params: {
                                onDone: (showBool) => {
                                    this.setState({
                                        isShow: showBool,
                                        barcodeCodes: []
                                    });
                                },
                            }
                        }));
                    }} style={{ alignSelf: 'center', padding: 10 }}>
                        <Text>Chi tiết sản phẩm</Text>
                    </TouchableOpacity> */}

                </View>
                <Animated.View style={{ alignItems: 'center', justifyContent: 'flex-end', position: 'absolute', top: 0, right: 0, left: 0, bottom: this.state.marginBottomAnim, backgroundColor: priColor }}>
                    <Image style={{ width: 100, height: 50, resizeMode: 'contain' }} source={require('../../../assets/imgs/up.png')} />
                </Animated.View>
                <Animated.View style={{ alignItems: 'center', justifyContent: 'flex-start', position: 'absolute', bottom: 0, right: 0, left: 0, top: this.state.marginTopAnim, backgroundColor: priColor }}>
                    <Image style={{ width: 100, height: 50, resizeMode: 'contain' }} source={require('../../../assets/imgs/down.png')} />
                </Animated.View>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                    <NormalHeader navigation={this.props.navigation} title='GIẢI PHÁP BẢO HÀNH' count={1} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 64 : 56,
        backgroundColor: priColor
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
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