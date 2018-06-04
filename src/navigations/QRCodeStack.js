import { StackNavigator } from 'react-navigation';

import QRCode from '../screens/authorized/qrCode/QRCode';
import ProductDetail from '../screens/authorized/qrCode/ProductDetail';
import ScannedProduct from '../screens/authorized/qrCode/ScannedProduct';
import CheckGuarantee from '../screens/authorized/qrCode/CheckGuarantee';
import ExtractedInfor from '../screens/authorized/qrCode/ExtractedInfor';
import EditDetailInfor from '../screens/authorized/qrCode/EditDetailInfor';

const QRCodeStack = StackNavigator({
    QRCode: {
        screen: QRCode
    },
    ProductDetail: {
        screen: ProductDetail
    },
    ScannedProduct: {
        screen: ScannedProduct
    },
    CheckGuarantee: {
        screen: CheckGuarantee
    },
    ExtractedInfor: {
        screen: ExtractedInfor
    },
    EditDetailInfor: {
        screen: EditDetailInfor
    },
}, {
        navigationOptions: {
            header: null,
        },
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                const { position, layout, scene } = sceneProps

                const thisSceneIndex = scene.index
                const width = layout.initWidth

                const translateX = position.interpolate({
                    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                    outputRange: [width, 0, 0]
                })

                const slideFromRight = { transform: [{ translateX }] }

                return slideFromRight
            },
        })
    });

export default QRCodeStack;