import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Camera from 'react-native-camera';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Animated,
    Easing,
    Text,
    Image,
    Dimensions
} from 'react-native';
import { width } from '../../../constants/dimensions';

export default class QRScannerRectView extends Component {
    static defaultProps = {
        maskColor: '#0000004D',
        cornerColor: 'red',
        borderColor: '#000000',
        rectHeight: 3 * width / 4,
        rectWidth: 3 * width / 4,
        borderWidth: 0,
        cornerBorderWidth: 4,
        cornerBorderLength: 20,
        isLoading: false,
        cornerOffsetSize: 0,
        isCornerOffset: false,
        bottomMenuHeight: 0,
        scanBarAnimateTime: 2500,
        scanBarColor: 'rgb(255, 77, 77)',
        scanBarImage: null,
        scanBarHeight: 1.5,
        scanBarMargin: 6,
        hintText: '',
        hintTextStyle: { color: '#fff', fontSize: 14, backgroundColor: 'transparent' },
        hintTextPosition: 130,
        isShowScanBar: true
    };

    constructor(props) {
        super(props);

        this.getBackgroundColor = this.getBackgroundColor.bind(this);
        this.getRectSize = this.getRectSize.bind(this);
        this.getCornerSize = this.getCornerSize.bind(this);
        this.renderLoadingIndicator = this.renderLoadingIndicator.bind(this);

        this.state = {
            topWidth: 0,
            topHeight: 0,
            leftWidth: 0,
            animatedValue: new Animated.Value(0),
        }
    }

    getBackgroundColor() {
        return ({
            backgroundColor: this.props.maskColor,
        });
    }

    getRectSize() {
        return ({
            height: this.props.rectHeight,
            width: this.props.rectWidth,
        });
    }

    getBorderSize() {
        if (this.props.isCornerOffset) {
            return ({
                height: this.props.rectHeight - this.props.cornerOffsetSize * 2,
                width: this.props.rectWidth - this.props.cornerOffsetSize * 2,
            });
        } else {
            return ({
                height: this.props.rectHeight,
                width: this.props.rectWidth,
            });
        }
    }

    getCornerColor() {
        return ({
            borderColor: this.props.cornerColor,
        });
    }

    getCornerSize() {
        return ({
            height: this.props.cornerBorderLength,
            width: this.props.cornerBorderLength,
        });
    }

    getBorderWidth() {
        return ({
            borderWidth: this.props.borderWidth,
        });
    }

    getBorderColor() {
        return ({
            borderColor: this.props.borderColor,
        });
    }

    renderLoadingIndicator() {
        if (!this.props.isLoading) {
            return null;
        }

        return (
            <ActivityIndicator
                animating={this.props.isLoading}
                color={this.props.color}
                size='large'
            />
        );
    }

    measureTotalSize(e) {
        let totalSize = e.layout;
        this.setState({
            topWidth: totalSize.width,
        })
    }

    measureRectPosition(e) {
        let rectSize = e.layout;
        this.setState({
            topHeight: rectSize.y,
            leftWidth: rectSize.x,
        })
    }

    getTopMaskHeight() {
        if (this.props.isCornerOffset) {
            return this.state.topHeight + this.props.rectHeight - this.props.cornerOffsetSize;
        } else {
            return this.state.topHeight + this.props.rectHeight;
        }
    }

    getBottomMaskHeight() {
        if (this.props.isCornerOffset) {
            return this.props.rectHeight + this.state.topHeight - this.props.cornerOffsetSize;
        } else {
            return this.state.topHeight + this.props.rectHeight;
        }
    }

    getSideMaskHeight() {
        if (this.props.isCornerOffset) {
            return this.props.rectHeight - this.props.cornerOffsetSize * 2;
        } else {
            return this.props.rectHeight;
        }
    }

    getSideMaskWidth() {
        if (this.props.isCornerOffset) {
            return this.state.leftWidth + this.props.cornerOffsetSize;
        } else {
            return this.state.leftWidth;
        }
    }

    getBottomMenuHeight() {
        return ({
            bottom: this.props.bottomMenuHeight,
        });
    }

    getScanBarMargin() {
        return ({
            marginRight: this.props.scanBarMargin,
            marginLeft: this.props.scanBarMargin,
        })
    }

    getScanImageWidth() {
        return this.props.rectWidth - this.props.scanBarMargin * 2
    }

    _renderScanBar() {
        if (!this.props.isShowScanBar) return;
        if (this.props.scanBarImage) {
            return <Image style={{ resizeMode: 'contain', width: this.getScanImageWidth() }}
                source={this.props.scanBarImage} />
        } else {
            return <View style={[this.getScanBarMargin(), {
                backgroundColor: this.props.scanBarColor,
                height: this.props.scanBarHeight,
            }]} />
        }
    }

    render() {
        const animatedStyle = {
            transform: [
                { translateY: this.state.animatedValue }
            ]
        };

        return (
            <View
                onLayout={({ nativeEvent: e }) => this.measureTotalSize(e)}
                style={[styles.container, this.getBottomMenuHeight()]}>

                <View style={[styles.viewfinder, this.getRectSize()]}
                    onLayout={({ nativeEvent: e }) => this.measureRectPosition(e)}
                >

                    <View style={[
                        this.getBorderSize(),
                        this.getBorderColor(),
                        this.getBorderWidth(),
                    ]}>

                        <Animated.View
                            style={[
                                animatedStyle,]}>
                            {this._renderScanBar()}
                        </Animated.View>

                    </View>

                    <View style={[
                        this.getCornerColor(),
                        this.getCornerSize(),
                        styles.topLeftCorner,
                        {
                            borderLeftWidth: this.props.cornerBorderWidth,
                            borderTopWidth: this.props.cornerBorderWidth,
                        }
                    ]} />

                    <View style={[
                        this.getCornerColor(),
                        this.getCornerSize(),
                        styles.topRightCorner,
                        {
                            borderRightWidth: this.props.cornerBorderWidth,
                            borderTopWidth: this.props.cornerBorderWidth,
                        }
                    ]} />

                    {this.renderLoadingIndicator()}


                    <View style={[
                        this.getCornerColor(),
                        this.getCornerSize(),
                        styles.bottomLeftCorner,
                        {
                            borderLeftWidth: this.props.cornerBorderWidth,
                            borderBottomWidth: this.props.cornerBorderWidth,
                        }
                    ]} />

                    {/*扫描框转角-右下角*/}
                    <View style={[
                        this.getCornerColor(),
                        this.getCornerSize(),
                        styles.bottomRightCorner,
                        {
                            borderRightWidth: this.props.cornerBorderWidth,
                            borderBottomWidth: this.props.cornerBorderWidth,
                        }
                    ]} />
                </View>

                <View style={[
                    this.getBackgroundColor(),
                    styles.topMask,
                    {
                        bottom: this.getTopMaskHeight(),
                        width: this.state.topWidth,
                    }
                ]} />

                <View style={[
                    this.getBackgroundColor(),
                    styles.leftMask,
                    {
                        height: this.getSideMaskHeight(),
                        width: this.getSideMaskWidth(),
                    }
                ]} />

                <View style={[
                    this.getBackgroundColor(),
                    styles.rightMask,
                    {
                        height: this.getSideMaskHeight(),
                        width: this.getSideMaskWidth(),
                    }]} />

                <View style={[
                    this.getBackgroundColor(),
                    styles.bottomMask,
                    {
                        top: this.getBottomMaskHeight(),
                        width: this.state.topWidth,
                    }]} />

                <View style={{ position: 'absolute', bottom: this.props.hintTextPosition }}>
                    <Text style={this.props.hintTextStyle}>{this.props.hintText}</Text>
                </View>

            </View>
        );
    }

    componentDidMount() {
        this.scannerLineMove();
    }

    scannerLineMove() {
        this.state.animatedValue.setValue(0);  //重置Rotate动画值为0
        Animated.timing(this.state.animatedValue, {
            toValue: this.props.rectHeight,
            duration: this.props.scanBarAnimateTime,
            easing: Easing.linear,
            sInteraction: false
        }).start(() => this.scannerLineMove());
    }
}

const styles = StyleSheet.create({
    buttonsContainer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },
    viewfinder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topLeftCorner: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    topRightCorner: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    bottomLeftCorner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    bottomRightCorner: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    topMask: {
        position: 'absolute',
        top: 0,
    },
    leftMask: {
        position: 'absolute',
        left: 0,
    },
    rightMask: {
        position: 'absolute',
        right: 0,
    },
    bottomMask: {
        position: 'absolute',
        bottom: 0,
    }
});