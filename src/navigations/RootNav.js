import { StackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native'

import MainDrawer from './MainDrawer';
import MainTab from './MainTab';
import SplashScreen from '../screens/Splash/SplashScreen';
import Cart from '../screens/authorized/cart/Cart';

import fade from '../animations/fade';
import fade2 from '../animations/fade2';

const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
})

const RootNav = StackNavigator({
    SplashScreen: { screen: SplashScreen },
    mainTab: { screen: MainDrawer },
    Cart: { screen: Cart }
}, {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false
        },
        // transitionConfig: () => ({
        //     screenInterpolator: (props) => {
        //         const { scene } = props;
        //         return fade(props);
        //     }
        // })
    })

export default RootNav;