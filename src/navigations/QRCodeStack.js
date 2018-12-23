import { StackNavigator } from 'react-navigation';

import QRCode from '../screens/authorized/qrCode/QRCode';
import ScannedProduct from '../screens/authorized/qrCode/ScannedProduct';
import DetailProduct from '../screens/authorized/qrCode/DetailProduct';

const QRCodeStack = StackNavigator({
    QRCode: {
        screen: QRCode
    },
    ScannedProduct: {
        screen: ScannedProduct
    },
    DetailProduct: {
        screen: DetailProduct
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